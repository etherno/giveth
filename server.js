const express = require('express')
const path = require('path')
const next = require('next')
const web3 = require('web3')
const sigUtil = require('eth-sig-util')

const routes = require('./routes')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)

const i18nextMiddleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')
const { i18nInstance } = require('./i18n')

const admin = require("firebase-admin")

const serviceAccount = require("./privateKey.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://givethvideowalloffame.firebaseio.com"
});

var db = admin.database();

// init i18next with serverside settings
// using i18next-express-middleware
i18nInstance
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    load: 'languageOnly',
    preload: ['en', 'de'], // preload all langages
    ns: ['common', 'navigation'], // need to preload all the namespaces
    backend: {
      loadPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.missing.json')
    }
  }, () => {
    // loaded translations we can bootstrap our routes
    app.prepare()
      .then(() => {
        const server = express()

        // enable middleware for i18next
        server.use(i18nextMiddleware.handle(i18nInstance))

        // serve general static files
        server.use('/static', express.static(path.join(__dirname, '/static')))

        // serve locales for client
        server.use('/locales', express.static(path.join(__dirname, '/locales')))

        // missing keys
        server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18nInstance))

        server.get('/api/delete', (req, res) => {
          const { videoId, signedMsg } = req.query

          const validAddress = sigUtil.recoverPersonalSignature({
            data: web3.utils.utf8ToHex(videoId),
            sig: signedMsg,
          })

          var ref = db.ref("GVWOF_v2/" + videoId);
          ref.once("value", function(snapshot) {
            const { wallet } = snapshot.val()
            if (validAddress === wallet.toLowerCase()) {
              // delete video logic
              res.status(200).end()
            }
            res.status(404).end()
          });
        })

        // use next.js
        server.get('*', (req, res) => handle(req, res))

        server.listen(3000, (err) => {
          if (err) throw err
          console.log('> Ready on http://localhost:3000')
        })
      })
  })

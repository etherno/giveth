const express = require('express')
const path = require('path')
const url = require('url')
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
  databaseURL: "https://givethvideowalloffame.firebaseio.com",
  storageBucket: "givethvideowalloffame.appspot.com",
});

var db = admin.database();
var bucket = admin.storage().bucket();

// bucket.getFiles(function(err, files) {
//   if (!err) {
//     console.log(files)
//   }
// });
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
          // TODO: Refactor into real authentication scheme with sessions
          const validAddress = sigUtil.recoverPersonalSignature({
            data: web3.utils.utf8ToHex(videoId),
            sig: signedMsg,
          })

          var ref = db.ref("GVWOF_v2/" + videoId);
          ref.once("value", async (snapshot) => {
            const { wallet, src } = snapshot.val()
            if (validAddress === wallet.toLowerCase()) {
              let filePath = decodeURIComponent(src).split('https://firebasestorage.googleapis.com/v0/b/givethvideowalloffame.appspot.com/o/')[1]
              filePath = filePath.split(url.parse(src).search)[0]

              const file = bucket.file(filePath);
              const exists = await file.exists();

              if (exists) {
                await file.delete() // delete video from storage
                await ref.set(null) // delete info from realtime database
                res.status(200).end()
              }
            }
            res.status(404).end()
          });
        })

        // Some upload logic
        // Express server upload logic
        // Verify wallet address
        server.post('/api/upload', function (req, res, next) {
          // const { address, signedMsg } = req.query
          // TODO: Refactor into real authentication scheme with sessions
          // const validAddress = sigUtil.recoverPersonalSignature({
          //   data: web3.utils.utf8ToHex(address),
          //   sig: signedMsg,
          // })

          // if (validAddress === wallet.toLowerCase()) {

          //   res.status(200).end()
          // }

          const file = bucket.file('/test');

          req.pipe(file.createWriteStream())
            .on('error', function(err) {
              res.status(404).end()
            })
            .on('finish', function() {
              res.status(200).end()
            });
          // req.pipe(fs.createWriteStream('./uploadFile'));
          // req.on('end', next);
        });
        // const storageRef = firebase.storage().ref("/GVWOF_v2/" + week + "/" + title);
        // const file = bucket.file(filePath);
        // const result = await file.save(contents);
        // storageRef.getDownloadURL()
        // var ref = db.ref("GVWOF_v2/");
        // await ref.push({
        //   src: url,
        //   title: title,
        //   description: description,
        //   type: _type,
        //   timestamp: timestamp,
        //   week: week,
        //   wall: wall,
        //   social: social,
        //   wallet: wallet,
        //   ipfs: "http://35.188.240.194:8080/ipfs/" + self.state.ipfsId
        // })

        // use next.js
        server.get('*', (req, res) => handle(req, res))

        server.listen(3000, (err) => {
          if (err) throw err
          console.log('> Ready on http://localhost:3000')
        })
      })
  })

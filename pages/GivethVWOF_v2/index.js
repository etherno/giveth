import React, { Component } from "react";
import firebase from "firebase";
// import { isMobile } from "../lib/platformChecker";

// components
import MainMenu from "../../components/MainMenu";

// // views
// import VideoWallOfFame from "./../components/views/VideoWallOfFame.js";
// import CampaignsVideosViewer from "./../components/views/CampaignsVideosViewer.js";
// import MediaCaptureiOS from "./../components/views/MediaCapture_iOS.js";
// import MediaCaptureWeb from "./../components/views/MediaCapture_Web.js";

var config = {
  apiKey: "AIzaSyAGO0q7WjakjW2vNyxIVThAVPWxm-xozj8",
  authDomain: "givethvideowalloffame.firebaseapp.com",
  databaseURL: "https://givethvideowalloffame.firebaseio.com",
  projectId: "givethvideowalloffame",
  storageBucket: "givethvideowalloffame.appspot.com",
  messagingSenderId: "271393366127"
};

// Next.js firebase bug workaround when in development
!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

export default () => (
  <MainMenu />
);


import fs from 'fastclick';
import firebase from 'firebase';
import Game from './game';

fs.FastClick.attach(document.body);

const firebaseInst = firebase.initializeApp({
  apiKey: 'AIzaSyAV7icWQMVNXWsqhXSLNb_Zl-fICNc6sFw',
  authDomain: 'circle-smash.firebaseapp.com',
  databaseURL: 'https://circle-smash.firebaseio.com',
  storageBucket: ''
});

const game = new Game(firebaseInst, 'game');
game.state.start('boot');

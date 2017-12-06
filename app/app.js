import fs from 'fastclick';
import firebase from 'firebase';
import Game from './game';

fs.FastClick.attach(document.body);

const firebaseInst = firebase.initializeApp({
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  storageBucket: '',
  messagingSenderId: ''
});

const game = new Game({
  firebase: firebaseInst,
  assetPath: 'game'
});
game.state.start('boot');

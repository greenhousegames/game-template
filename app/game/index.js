import boot from './states/boot';
import menu from './states/menu';

class Game extends Phaser.Game {
  constructor(config) {
    super(window.innerWidth, window.innerHeight, Phaser.AUTO, 'game');
    this._greenhouseconfig = config;

    this.state.add('boot', boot);
    this.state.add('menu', menu);
  }

  resizeDevice() {
    this.scale.setGameSize(window.innerWidth, window.innerHeight);
  }
}

module.exports = Game;

import boot from './states/boot';
import menu from './states/menu';

class Game extends Phaser.Game {
  constructor(firebase, assetPath) {
    super(window.innerWidth, window.innerHeight, Phaser.AUTO, 'game');
    assetPath = assetPath || '/';

    this.data = {
      name: 'game-template',
      assetPath: assetPath.endsWith('/') ? assetPath : assetPath + '/',
      ads: {
        ima3: 'http://googleads.g.doubleclick.net/pagead/ads?ad_type=video&client=ca-games-pub-4968145218643279&videoad_start_delay=0&description_url=http%3A%2F%2Fwww.google.com&max_ad_duration=40000&adtest=on'
      }
    };

    this.firebase = firebase;

    this.state.add('boot', boot);
    this.state.add('menu', menu);
  }

  resizeDevice() {
    this.scale.setGameSize(window.innerWidth, window.innerHeight);
  }
}

module.exports = Game;

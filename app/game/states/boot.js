import GreenhousePlugin from '@greenhousegames/greenhouse-phaser-plugin';
import Reporting from '../reporting';
import Config from '../config';

class BootState extends Phaser.State {
  constructor(game) {
    super(game);
  }

  create() {
    this.game.stage.backgroundColor = '#ffffff';

    // enable greenhouse plugin
    this.game.greenhouse = this.game.plugins.add(new GreenhousePlugin(this));
    this.game.greenhouse.initialize({
      name: Config.name,
      responsive: Config.responsive,
      assetPath: this.game._greenhouseconfig.assetPath || '/',
      firebase: this.game._greenhouseconfig.firebase
    });
    this.game.greenhouse.reporting = new Reporting(this.game.greenhouse.refData(), this.game.greenhouse.refReporting());

    // enable ads plugin
    this.game.add.plugin(Fabrique.Plugins.AdManager);
    const provider = new Fabrique.AdProvider.Ima3(this.game, 'http://googleads.g.doubleclick.net/pagead/ads?ad_type=video&client=ca-games-pub-4968145218643279&videoad_start_delay=0&description_url=http%3A%2F%2Fwww.google.com&max_ad_duration=40000&adtest=on');
    this.game.ads.setAdProvider(provider);

    this.game.input.maxPointers = 2;

    this.game.greenhouse.auth.requireAuth().then(() => this.game.state.start('menu'));
  }

  update() {
  }
}

export default BootState;

class BootState extends Phaser.State {
  create() {
    this.game.stage.backgroundColor = '#ffffff';

    // enable ads plugin
    this.game.add.plugin(Fabrique.Plugins.AdManager);
    const provider = new Fabrique.AdProvider.Ima3(this.game, this.game.data.ads.ima3);
    this.game.ads.setAdProvider(provider);

    this.game.scale.setResizeCallback(this.game.resizeDevice, this.game);
    this.game.input.maxPointers = 2;
    this.game.resizeDevice();
  }

  update() {
    this.game.state.start('menu');
  }
}

export default BootState;

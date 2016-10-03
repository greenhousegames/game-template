class MenuState extends Phaser.State {
  constructor(game) {
    super(game);
  }

  preload() {
    this.game.greenhouse.loadAtlas();
  }

  create() {
    this.game.stage.backgroundColor = '#ffffff';

    this.homeButton = this.game.add.sprite(0, 0, this.game.greenhouse.name, 'logo');
    this.homeButton.anchor.setTo(0.5, 0.5);
    this.homeButton.inputEnabled = true;
    this.homeButton.tint = 0x000000;
    this.homeButton.events.onInputDown.add(() => {
      window.location = 'http://www.greenhousegames.com';
    }, this);
    this.game.greenhouse.responsive.register(this.responsive, this);
    this.responsive();
  }

  responsive() {
    this.homeButton.alignIn(this.game.world.bounds, Phaser.CENTER);
  }

  shutdown() {
    this.game.greenhouse.responsive.unregister(this.responsive, this);
  }
}

export default MenuState;

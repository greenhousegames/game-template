class MenuState extends Phaser.State {
  constructor(game) {
    super(game);
  }

  preload() {
    this.game.data.score = false;
    this.game.load.atlas(this.game.data.name, this.game.data.assetPath + this.game.data.name + '.png', this.game.data.assetPath + this.game.data.name + '.json');
  }

  create() {
    this.game.stage.backgroundColor = '#ffffff';

    this.homeButton = this.game.add.sprite(this.game.width/2, this.game.height/2, this.game.data.name, 'home');
    this.homeButton.anchor.setTo(0.5, 0.5);
    this.homeButton.inputEnabled = true;
    this.homeButton.tint = 0x000000;
    this.homeButton.events.onInputDown.add(() => {
      window.location = 'http://www.greenhousegames.com';
    }, this);
  }

  shutdown() {
  }
}

export default MenuState;

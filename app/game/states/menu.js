class MenuState extends Phaser.State {
  constructor(game) {
    super(game);
  }

  preload() {
    this.game.greenhouse.loadAtlas();

    this.timesAClickedByUser = 0;
    this.timesAClickedByAnyone = 0;

    this.timesBClickedByUser = 0;
    this.timesBClickedByAnyone = 0;
  }

  create() {
    this.game.stage.backgroundColor = '#ffffff';

    this.game.greenhouse.storage.queryUserStatValue('aclicked').then((num) => {
      this.timesAClickedByUser = num;
      this.aButtonText.text = 'Clicked by You: ' + this.timesAClickedByUser;
    });
    this.game.greenhouse.storage.queryUserStatValue('bclicked').then((num) => {
      this.timesBClickedByUser = num;
      this.bButtonText.text = 'Clicked by You: ' + this.timesBClickedByUser;
    });
    this.game.greenhouse.storage.queryTotalGamesWithStat('aclicked').then((num) => {
      this.timesAClickedByAnyone = num;
      this.aButtonText2.text = 'Clicked by Anyone: ' + this.timesAClickedByAnyone;
    });
    this.game.greenhouse.storage.queryTotalGamesWithStat('bclicked').then((num) => {
      this.timesBClickedByAnyone = num;
      this.bButtonText2.text = 'Clicked by Anyone: ' + this.timesBClickedByAnyone;
    });

    this.game.greenhouse.storage.onGamePlayed((snapshot) => {
      const game = snapshot.val();
      if (game.aclicked) {
        this.timesAClickedByAnyone++;
        this.aButtonText2.text = 'Clicked by Anyone: ' + this.timesAClickedByAnyone;
        this.aButtonText4.text = 'Last Clicked by Anyone: ' + game.endedAt;
      } else {
        this.timesBClickedByAnyone++;
        this.bButtonText2.text = 'Clicked by Anyone: ' + this.timesBClickedByAnyone;
        this.bButtonText4.text = 'Last Clicked by Anyone: ' + game.endedAt;
      }
    });

    this.aButton = this.game.add.sprite(0, 0, this.game.greenhouse.name, 'a');
    this.aButton.height = 100;
    this.aButton.width = 100;
    this.aButton.anchor.setTo(0.5, 0.5);
    this.aButton.inputEnabled = true;
    this.aButton.events.onInputDown.add(() => {
      this.timesAClickedByUser++;
      this.aButtonText.text = 'Clicked by You: ' + this.timesAClickedByUser;
      this.aButtonText3.text = 'Last Clicked by You: ' + (new Date()).getTime();

      this.game.greenhouse.storage.saveGamePlayed({
        aclicked: this.timesAClickedByUser
      });
    }, this);

    this.bButton = this.game.add.sprite(0, 0, this.game.greenhouse.name, 'b');
    this.bButton.height = 100;
    this.bButton.width = 100;
    this.bButton.anchor.setTo(0.5, 0.5);
    this.bButton.inputEnabled = true;
    this.bButton.events.onInputDown.add(() => {
      this.timesBClickedByUser++;
      this.bButtonText.text = 'Clicked by You: ' + this.timesBClickedByUser;
      this.bButtonText3.text = 'Last Clicked by You: ' + (new Date()).getTime();

      this.game.greenhouse.storage.saveGamePlayed({
        bclicked: this.timesBClickedByUser
      });
    }, this);

    this.aButtonText = this.game.add.text();
    this.aButtonText.text = 'Clicked by You: 0';
    this.aButtonText2 = this.game.add.text();
    this.aButtonText2.text = 'Clicked by Anyone: 0';
    this.aButtonText3 = this.game.add.text();
    this.aButtonText3.text = 'Last Clicked by You: never';
    this.aButtonText4 = this.game.add.text();
    this.aButtonText4.text = 'Last Clicked by Anyone: never';

    this.bButtonText = this.game.add.text();
    this.bButtonText.text = 'Clicked by You: 0';
    this.bButtonText2 = this.game.add.text();
    this.bButtonText2.text = 'Clicked by Anyone: 0';
    this.bButtonText3 = this.game.add.text();
    this.bButtonText3.text = 'Last Clicked by You: never';
    this.bButtonText4 = this.game.add.text();
    this.bButtonText4.text = 'Last Clicked by Anyone: never';

    this.homeButton = this.game.add.sprite(0, 0, this.game.greenhouse.name, 'logo');
    this.homeButton.anchor.setTo(0, 1);
    this.homeButton.inputEnabled = true;
    this.homeButton.tint = 0x000000;
    this.homeButton.events.onInputDown.add(() => {
      window.location = 'http://www.greenhousegames.com';
    }, this);

    this.game.greenhouse.responsive.register(this.responsive, this);
    this.responsive();
  }

  update() {
  }

  responsive() {
    this.homeButton.alignIn(this.game.world.bounds, Phaser.BOTTOM_LEFT, -8, -8);

    this.aButton.alignIn(this.game.world.bounds, Phaser.CENTER, -this.game.width/4, 0);
    this.aButtonText.alignTo(this.aButton, Phaser.BOTTOM_CENTER, 0, 0);
    this.aButtonText2.alignTo(this.aButtonText, Phaser.BOTTOM_CENTER, 0, 0);
    this.aButtonText3.alignTo(this.aButtonText2, Phaser.BOTTOM_CENTER, 0, 0);
    this.aButtonText4.alignTo(this.aButtonText3, Phaser.BOTTOM_CENTER, 0, 0);

    this.bButton.alignIn(this.game.world.bounds, Phaser.CENTER, this.game.width/4, 0);
    this.bButtonText.alignTo(this.bButton, Phaser.BOTTOM_CENTER, 0, 0);
    this.bButtonText2.alignTo(this.bButtonText, Phaser.BOTTOM_CENTER, 0, 0);
    this.bButtonText3.alignTo(this.bButtonText2, Phaser.BOTTOM_CENTER, 0, 0);
    this.bButtonText4.alignTo(this.bButtonText3, Phaser.BOTTOM_CENTER, 0, 0);
  }

  shutdown() {
    this.game.greenhouse.responsive.unregister(this.responsive, this);
    this.game.greenhouse.storage.off();
  }
}

export default MenuState;

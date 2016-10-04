import firebase from 'firebase';

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

    this.initMetrics();
    this.game.greenhouse.storage.onGamePlayed((game) => {
      if (game.aclicked) {
        this.timesAClickedByAnyone++;
        this.lastAClickedByAnyone = game.endedAt;
      } else {
        this.timesBClickedByAnyone++;
        this.lastBClickedByAnyone = game.endedAt;
      }

      this.updateText();
    });

    this.aButton = this.game.add.sprite(0, 0, this.game.greenhouse.name, 'a');
    this.aButton.height = 100;
    this.aButton.width = 100;
    this.aButton.anchor.setTo(0.5, 0.5);
    this.aButton.inputEnabled = true;
    this.aButton.events.onInputDown.add(() => {
      this.timesAClickedByUser++;
      this.lastAClickedByUser = (new Date()).getTime();
      this.updateText();

      this.game.greenhouse.storage.saveGamePlayed({
        aclicked: 1,
        aclickedtime: firebase.database.ServerValue.TIMESTAMP
      });
    }, this);

    this.bButton = this.game.add.sprite(0, 0, this.game.greenhouse.name, 'b');
    this.bButton.height = 100;
    this.bButton.width = 100;
    this.bButton.anchor.setTo(0.5, 0.5);
    this.bButton.inputEnabled = true;
    this.bButton.events.onInputDown.add(() => {
      this.timesBClickedByUser++;
      this.lastBClickedByUser = (new Date()).getTime();
      this.updateText();

      this.game.greenhouse.storage.saveGamePlayed({
        bclicked: 1,
        bclickedtime: firebase.database.ServerValue.TIMESTAMP
      });
    }, this);

    this.aButtonText = this.game.add.text();
    this.aButtonText.text = 'Clicked by You: n/a';
    this.aButtonText2 = this.game.add.text();
    this.aButtonText2.text = 'Clicked by Anyone: n/a';
    this.aButtonText3 = this.game.add.text();
    this.aButtonText3.text = 'Last by You: n/a';
    this.aButtonText4 = this.game.add.text();
    this.aButtonText4.text = 'Last by Anyone: n/a';

    this.bButtonText = this.game.add.text();
    this.bButtonText.text = 'Clicked by You: n/a';
    this.bButtonText2 = this.game.add.text();
    this.bButtonText2.text = 'Clicked by Anyone: n/a';
    this.bButtonText3 = this.game.add.text();
    this.bButtonText3.text = 'Last by You: n/a';
    this.bButtonText4 = this.game.add.text();
    this.bButtonText4.text = 'Last by Anyone: n/a';

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

  initMetrics() {
    this.game.greenhouse.storage.metrics.getMetrics().then((metrics) => {
      if (metrics.aclicked) {
        this.timesAClickedByUser = metrics.aclicked.sum || 0;
      }
      if (metrics.aclickedtime && metrics.aclickedtime.last) {
        this.lastAClickedByUser = metrics.aclickedtime.last;
      }
      if (metrics.bclicked) {
        this.timesBClickedByUser = metrics.bclicked.sum || 0;
      }
      if (metrics.bclickedtime && metrics.bclickedtime.last) {
        this.lastBClickedByUser = metrics.bclickedtime.last;
      }

      this.updateText();
    });

    this.game.greenhouse.storage.metrics.getTopMetrics('aclickedtime', 'last', 1).then((values) => {
      if (values[0]) {
        this.lastAClickedByAnyone = values[0];
        this.updateText();
      }
    });

    this.game.greenhouse.storage.metrics.getTotal('aclicked', 'greater', 0).then((value) => {
      this.timesAClickedByAnyone = value;
      this.updateText();
    });

    this.game.greenhouse.storage.metrics.getTopMetrics('bclickedtime', 'last', 1).then((values) => {
      if (values[0]) {
        this.lastBClickedByAnyone = values[0];
        this.updateText();
      }
    });

    this.game.greenhouse.storage.metrics.getTotal('bclicked', 'greater', 0).then((value) => {
      this.timesBClickedByAnyone = value;
      this.updateText();
    });
  }

  updateText() {
    this.aButtonText.text = 'Clicked by You: ' + this.timesAClickedByUser;
    this.aButtonText2.text = 'Clicked by Anyone: ' + this.timesAClickedByAnyone;
    this.aButtonText3.text = 'Last by You: ' + (new Date(this.lastAClickedByUser)).toLocaleString();
    this.aButtonText4.text = 'Last by Anyone: ' + (new Date(this.lastAClickedByAnyone)).toLocaleString();

    this.bButtonText.text = 'Clicked by You: ' + this.timesBClickedByUser;
    this.bButtonText2.text = 'Clicked by Anyone: ' + this.timesBClickedByAnyone;
    this.bButtonText3.text = 'Last by You: ' + (new Date(this.lastBClickedByUser)).toLocaleString();
    this.bButtonText4.text = 'Last by Anyone: ' + (new Date(this.lastBClickedByAnyone)).toLocaleString();

    this.responsive();
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

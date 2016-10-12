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
    this.game.greenhouse.reporting.onDataSaved((game) => {
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

      this.game.greenhouse.reporting.saveData({
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

      this.game.greenhouse.reporting.saveData({
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

    this.homeButton = this.game.add.sprite(0, 0, this.game.greenhouse.name, 'home');
    this.homeButton.anchor.setTo(0, 1);
    this.homeButton.inputEnabled = true;
    this.homeButton.events.onInputDown.add(() => {
      window.location = 'http://www.greenhousegames.com';
    }, this);

    this.game.greenhouse.responsive.register(this.responsive, this);
    this.responsive();
  }

  update() {
  }

  initMetrics() {
    this.game.greenhouse.reporting.filter('users', {uid: this.game.greenhouse.auth.currentUserUID()}).sum('aclicked').value().then((val) => {
      if (val) {
        this.timesAClickedByUser = val;
        this.updateText();
      }
    });

    this.game.greenhouse.reporting.filter('users', {uid: this.game.greenhouse.auth.currentUserUID()}).last('aclickedtime').value().then((val) => {
      if (val) {
        this.lastAClickedByUser = val;
        this.updateText();
      }
    });

    this.game.greenhouse.reporting.filter('users', {uid: this.game.greenhouse.auth.currentUserUID()}).sum('bclicked').value().then((val) => {
      if (val) {
        this.timesBClickedByUser = val;
        this.updateText();
      }
    });

    this.game.greenhouse.reporting.filter('users', {uid: this.game.greenhouse.auth.currentUserUID()}).last('bclickedtime').value().then((val) => {
      if (val) {
        this.lastBClickedByUser = val;
        this.updateText();
      }
    });

    this.game.greenhouse.reporting.filter().last('aclickedtime').value().then((value) => {
      if (value) {
        this.lastAClickedByAnyone = value;
        this.updateText();
      }
    });

    this.game.greenhouse.reporting.filter().sum('aclicked').value().then((value) => {
      if (value) {
        this.timesAClickedByAnyone = value;
        this.updateText();
      }
    });

    this.game.greenhouse.reporting.filter().last('bclickedtime').value().then((value) => {
      if (value) {
        this.lastBClickedByAnyone = value;
        this.updateText();
      }
    });

    this.game.greenhouse.reporting.filter().sum('bclicked').value().then((value) => {
      if (value) {
        this.timesBClickedByAnyone = value;
        this.updateText();
      }
    });
  }

  updateText() {
    this.aButtonText.text = 'Clicked by You: ' + this.timesAClickedByUser;
    this.aButtonText2.text = 'Clicked by Anyone: ' + this.timesAClickedByAnyone;
    this.aButtonText3.text = 'Last by You: ' + (!this.lastAClickedByUser ? 'never' : (new Date(this.lastAClickedByUser)).toLocaleString());
    this.aButtonText4.text = 'Last by Anyone: ' + (!this.lastAClickedByAnyone ? 'never' : (new Date(this.lastAClickedByAnyone)).toLocaleString());

    this.bButtonText.text = 'Clicked by You: ' + this.timesBClickedByUser;
    this.bButtonText2.text = 'Clicked by Anyone: ' + this.timesBClickedByAnyone;
    this.bButtonText3.text = 'Last by You: ' + (!this.lastBClickedByUser ? 'never' : (new Date(this.lastBClickedByUser)).toLocaleString());
    this.bButtonText4.text = 'Last by Anyone: ' + (!this.lastBClickedByAnyone ? 'never' : (new Date(this.lastBClickedByAnyone)).toLocaleString());

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
    this.game.greenhouse.reporting.clear();
  }
}

export default MenuState;

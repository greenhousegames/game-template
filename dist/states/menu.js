'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuState = function (_Phaser$State) {
  _inherits(MenuState, _Phaser$State);

  function MenuState(game) {
    _classCallCheck(this, MenuState);

    return _possibleConstructorReturn(this, (MenuState.__proto__ || Object.getPrototypeOf(MenuState)).call(this, game));
  }

  _createClass(MenuState, [{
    key: 'preload',
    value: function preload() {
      this.game.greenhouse.loadAtlas();

      this.timesAClickedByUser = 0;
      this.timesAClickedByAnyone = 0;

      this.timesBClickedByUser = 0;
      this.timesBClickedByAnyone = 0;
    }
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      this.game.stage.backgroundColor = '#ffffff';

      this.initMetrics();
      this.game.greenhouse.reporting.onDataSaved(function (game) {
        if (game.aclicked) {
          _this2.timesAClickedByAnyone++;
          _this2.lastAClickedByAnyone = game.endedAt;
        } else {
          _this2.timesBClickedByAnyone++;
          _this2.lastBClickedByAnyone = game.endedAt;
        }

        _this2.updateText();
      });

      this.aButton = this.game.add.sprite(0, 0, this.game.greenhouse.name, 'a');
      this.aButton.height = 100;
      this.aButton.width = 100;
      this.aButton.anchor.setTo(0.5, 0.5);
      this.aButton.inputEnabled = true;
      this.aButton.events.onInputDown.add(function () {
        _this2.timesAClickedByUser++;
        _this2.lastAClickedByUser = new Date().getTime();
        _this2.updateText();

        _this2.game.greenhouse.reporting.saveData({
          aclicked: 1,
          aclickedtime: _firebase2.default.database.ServerValue.TIMESTAMP
        });
      }, this);

      this.bButton = this.game.add.sprite(0, 0, this.game.greenhouse.name, 'b');
      this.bButton.height = 100;
      this.bButton.width = 100;
      this.bButton.anchor.setTo(0.5, 0.5);
      this.bButton.inputEnabled = true;
      this.bButton.events.onInputDown.add(function () {
        _this2.timesBClickedByUser++;
        _this2.lastBClickedByUser = new Date().getTime();
        _this2.updateText();

        _this2.game.greenhouse.reporting.saveData({
          bclicked: 1,
          bclickedtime: _firebase2.default.database.ServerValue.TIMESTAMP
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
      this.homeButton.events.onInputDown.add(function () {
        window.location = 'http://www.greenhousegames.com';
      }, this);

      this.game.greenhouse.responsive.register(this.responsive, this);
      this.responsive();
    }
  }, {
    key: 'update',
    value: function update() {}
  }, {
    key: 'initMetrics',
    value: function initMetrics() {
      var _this3 = this;

      this.game.greenhouse.reporting.filter('users', { uid: this.game.greenhouse.auth.currentUserUID() }).sum('aclicked').value().then(function (val) {
        if (val) {
          _this3.timesAClickedByUser = val;
          _this3.updateText();
        }
      });

      this.game.greenhouse.reporting.filter('users', { uid: this.game.greenhouse.auth.currentUserUID() }).last('aclickedtime').value().then(function (val) {
        if (val) {
          _this3.lastAClickedByUser = val;
          _this3.updateText();
        }
      });

      this.game.greenhouse.reporting.filter('users', { uid: this.game.greenhouse.auth.currentUserUID() }).sum('bclicked').value().then(function (val) {
        if (val) {
          _this3.timesBClickedByUser = val;
          _this3.updateText();
        }
      });

      this.game.greenhouse.reporting.filter('users', { uid: this.game.greenhouse.auth.currentUserUID() }).last('bclickedtime').value().then(function (val) {
        if (val) {
          _this3.lastBClickedByUser = val;
          _this3.updateText();
        }
      });

      this.game.greenhouse.reporting.filter().last('aclickedtime').value().then(function (value) {
        if (value) {
          _this3.lastAClickedByAnyone = value;
          _this3.updateText();
        }
      });

      this.game.greenhouse.reporting.filter().sum('aclicked').value().then(function (value) {
        if (value) {
          _this3.timesAClickedByAnyone = value;
          _this3.updateText();
        }
      });

      this.game.greenhouse.reporting.filter().last('bclickedtime').value().then(function (value) {
        if (value) {
          _this3.lastBClickedByAnyone = value;
          _this3.updateText();
        }
      });

      this.game.greenhouse.reporting.filter().sum('bclicked').value().then(function (value) {
        if (value) {
          _this3.timesBClickedByAnyone = value;
          _this3.updateText();
        }
      });
    }
  }, {
    key: 'updateText',
    value: function updateText() {
      this.aButtonText.text = 'Clicked by You: ' + this.timesAClickedByUser;
      this.aButtonText2.text = 'Clicked by Anyone: ' + this.timesAClickedByAnyone;
      this.aButtonText3.text = 'Last by You: ' + (!this.lastAClickedByUser ? 'never' : new Date(this.lastAClickedByUser).toLocaleString());
      this.aButtonText4.text = 'Last by Anyone: ' + (!this.lastAClickedByAnyone ? 'never' : new Date(this.lastAClickedByAnyone).toLocaleString());

      this.bButtonText.text = 'Clicked by You: ' + this.timesBClickedByUser;
      this.bButtonText2.text = 'Clicked by Anyone: ' + this.timesBClickedByAnyone;
      this.bButtonText3.text = 'Last by You: ' + (!this.lastBClickedByUser ? 'never' : new Date(this.lastBClickedByUser).toLocaleString());
      this.bButtonText4.text = 'Last by Anyone: ' + (!this.lastBClickedByAnyone ? 'never' : new Date(this.lastBClickedByAnyone).toLocaleString());

      this.responsive();
    }
  }, {
    key: 'responsive',
    value: function responsive() {
      this.homeButton.alignIn(this.game.world.bounds, Phaser.BOTTOM_LEFT, -8, -8);

      this.aButton.alignIn(this.game.world.bounds, Phaser.CENTER, -this.game.width / 4, 0);
      this.aButtonText.alignTo(this.aButton, Phaser.BOTTOM_CENTER, 0, 0);
      this.aButtonText2.alignTo(this.aButtonText, Phaser.BOTTOM_CENTER, 0, 0);
      this.aButtonText3.alignTo(this.aButtonText2, Phaser.BOTTOM_CENTER, 0, 0);
      this.aButtonText4.alignTo(this.aButtonText3, Phaser.BOTTOM_CENTER, 0, 0);

      this.bButton.alignIn(this.game.world.bounds, Phaser.CENTER, this.game.width / 4, 0);
      this.bButtonText.alignTo(this.bButton, Phaser.BOTTOM_CENTER, 0, 0);
      this.bButtonText2.alignTo(this.bButtonText, Phaser.BOTTOM_CENTER, 0, 0);
      this.bButtonText3.alignTo(this.bButtonText2, Phaser.BOTTOM_CENTER, 0, 0);
      this.bButtonText4.alignTo(this.bButtonText3, Phaser.BOTTOM_CENTER, 0, 0);
    }
  }, {
    key: 'shutdown',
    value: function shutdown() {
      this.game.greenhouse.responsive.unregister(this.responsive, this);
      this.game.greenhouse.reporting.clear();
    }
  }]);

  return MenuState;
}(Phaser.State);

exports.default = MenuState;
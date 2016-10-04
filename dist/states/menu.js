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
      this.game.greenhouse.storage.onGamePlayed(function (game) {
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

        _this2.game.greenhouse.storage.saveGamePlayed({
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

        _this2.game.greenhouse.storage.saveGamePlayed({
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

      this.homeButton = this.game.add.sprite(0, 0, this.game.greenhouse.name, 'logo');
      this.homeButton.anchor.setTo(0, 1);
      this.homeButton.inputEnabled = true;
      this.homeButton.tint = 0x000000;
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

      this.game.greenhouse.storage.metrics.getMetrics().then(function (metrics) {
        if (metrics.aclicked) {
          _this3.timesAClickedByUser = metrics.aclicked.sum || 0;
        }
        if (metrics.aclickedtime && metrics.aclickedtime.last) {
          _this3.lastAClickedByUser = metrics.aclickedtime.last;
        }
        if (metrics.bclicked) {
          _this3.timesBClickedByUser = metrics.bclicked.sum || 0;
        }
        if (metrics.bclickedtime && metrics.bclickedtime.last) {
          _this3.lastBClickedByUser = metrics.bclickedtime.last;
        }

        _this3.updateText();
      });

      this.game.greenhouse.storage.metrics.getTopMetrics('aclickedtime', 'last', 1).then(function (values) {
        if (values[0]) {
          _this3.lastAClickedByAnyone = values[0];
          _this3.updateText();
        }
      });

      this.game.greenhouse.storage.metrics.getTotal('aclicked', 'greater', 0).then(function (value) {
        _this3.timesAClickedByAnyone = value;
        _this3.updateText();
      });

      this.game.greenhouse.storage.metrics.getTopMetrics('bclickedtime', 'last', 1).then(function (values) {
        if (values[0]) {
          _this3.lastBClickedByAnyone = values[0];
          _this3.updateText();
        }
      });

      this.game.greenhouse.storage.metrics.getTotal('bclicked', 'greater', 0).then(function (value) {
        _this3.timesBClickedByAnyone = value;
        _this3.updateText();
      });
    }
  }, {
    key: 'updateText',
    value: function updateText() {
      this.aButtonText.text = 'Clicked by You: ' + this.timesAClickedByUser;
      this.aButtonText2.text = 'Clicked by Anyone: ' + this.timesAClickedByAnyone;
      this.aButtonText3.text = 'Last by You: ' + new Date(this.lastAClickedByUser).toLocaleString();
      this.aButtonText4.text = 'Last by Anyone: ' + new Date(this.lastAClickedByAnyone).toLocaleString();

      this.bButtonText.text = 'Clicked by You: ' + this.timesBClickedByUser;
      this.bButtonText2.text = 'Clicked by Anyone: ' + this.timesBClickedByAnyone;
      this.bButtonText3.text = 'Last by You: ' + new Date(this.lastBClickedByUser).toLocaleString();
      this.bButtonText4.text = 'Last by Anyone: ' + new Date(this.lastBClickedByAnyone).toLocaleString();

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
      this.game.greenhouse.storage.off();
    }
  }]);

  return MenuState;
}(Phaser.State);

exports.default = MenuState;
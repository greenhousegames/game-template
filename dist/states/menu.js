'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    }
  }, {
    key: 'create',
    value: function create() {
      this.game.stage.backgroundColor = '#ffffff';

      this.homeButton = this.game.add.sprite(this.game.width / 2, this.game.height / 2, this.game.greenhouse.name, 'logo');
      this.homeButton.anchor.setTo(0.5, 0.5);
      this.homeButton.inputEnabled = true;
      this.homeButton.tint = 0x000000;
      this.homeButton.events.onInputDown.add(function () {
        window.location = 'http://www.greenhousegames.com';
      }, this);
    }
  }, {
    key: 'shutdown',
    value: function shutdown() {}
  }]);

  return MenuState;
}(Phaser.State);

exports.default = MenuState;
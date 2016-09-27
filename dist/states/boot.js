'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BootState = function (_Phaser$State) {
  _inherits(BootState, _Phaser$State);

  function BootState() {
    _classCallCheck(this, BootState);

    return _possibleConstructorReturn(this, (BootState.__proto__ || Object.getPrototypeOf(BootState)).apply(this, arguments));
  }

  _createClass(BootState, [{
    key: 'create',
    value: function create() {
      this.game.stage.backgroundColor = '#ffffff';

      // enable ads plugin
      this.game.add.plugin(Fabrique.Plugins.AdManager);
      var provider = new Fabrique.AdProvider.Ima3(this.game, this.game.data.ads.ima3);
      this.game.ads.setAdProvider(provider);

      this.game.scale.setResizeCallback(this.game.resizeDevice, this.game);
      this.game.input.maxPointers = 2;
      this.game.resizeDevice();
    }
  }, {
    key: 'update',
    value: function update() {
      this.game.state.start('menu');
    }
  }]);

  return BootState;
}(Phaser.State);

exports.default = BootState;
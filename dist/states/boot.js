'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _greenhousePhaserPlugin = require('@greenhousegames/greenhouse-phaser-plugin');

var _greenhousePhaserPlugin2 = _interopRequireDefault(_greenhousePhaserPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BootState = function (_Phaser$State) {
  _inherits(BootState, _Phaser$State);

  function BootState(game) {
    _classCallCheck(this, BootState);

    return _possibleConstructorReturn(this, (BootState.__proto__ || Object.getPrototypeOf(BootState)).call(this, game));
  }

  _createClass(BootState, [{
    key: 'create',
    value: function create() {
      var _this2 = this;

      this.game.stage.backgroundColor = '#ffffff';

      // enable greenhouse plugin
      this.game.greenhouse = this.game.plugins.add(new _greenhousePhaserPlugin2.default(this));
      this.game.greenhouse.initialize({
        name: 'game-template',
        assetPath: this.game._greenhouseconfig.assetPath || '/',
        responsive: true,
        firebase: this.game._greenhouseconfig.firebase,
        metrics: {
          'aclicked': ['sum'],
          'aclickedtime': ['last'],
          'bclicked': ['sum'],
          'bclickedtime': ['last']
        }
      });

      // enable ads plugin
      this.game.add.plugin(Fabrique.Plugins.AdManager);
      var provider = new Fabrique.AdProvider.Ima3(this.game, 'http://googleads.g.doubleclick.net/pagead/ads?ad_type=video&client=ca-games-pub-4968145218643279&videoad_start_delay=0&description_url=http%3A%2F%2Fwww.google.com&max_ad_duration=40000&adtest=on');
      this.game.ads.setAdProvider(provider);

      this.game.input.maxPointers = 2;

      this.game.greenhouse.storage.auth.requireAuth().then(function () {
        return _this2.game.state.start('menu');
      });
    }
  }, {
    key: 'update',
    value: function update() {}
  }]);

  return BootState;
}(Phaser.State);

exports.default = BootState;
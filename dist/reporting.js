'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _firebaseReporting = require('firebase-reporting');

var _firebaseReporting2 = _interopRequireDefault(_firebaseReporting);

var _rsvp = require('rsvp');

var _rsvp2 = _interopRequireDefault(_rsvp);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameReporting = function (_FirebaseReporting) {
  _inherits(GameReporting, _FirebaseReporting);

  function GameReporting(refData, refReporting) {
    _classCallCheck(this, GameReporting);

    var _this = _possibleConstructorReturn(this, (GameReporting.__proto__ || Object.getPrototypeOf(GameReporting)).call(this, {
      firebase: refReporting
    }));

    _this._refData = refData;
    _this._onSavedQuery = null;

    _this.addFilter('modes', ['mode']);
    _this.addFilter('users', ['uid']);
    _this.addFilter('users-modes', ['mode', 'uid']);

    _this.addMetric('endedAt', ['first', 'last']);
    _this.addMetric('played', ['sum']);
    _this.addMetric('aclicked', ['sum']);
    _this.addMetric('aclickedtime', ['last']);
    _this.addMetric('bclicked', ['sum']);
    _this.addMetric('bclickedtime', ['last']);

    _this.enableRetainer('minute', 'aclicked', ['sum']);
    _this.enableRetainer('hour', 'aclicked', ['sum']);
    _this.enableRetainer('day', 'aclicked', ['sum']);
    _this.enableRetainer('week', 'aclicked', ['sum']);

    _this.enableRetainer('minute', 'bclicked', ['sum']);
    _this.enableRetainer('hour', 'bclicked', ['sum']);
    _this.enableRetainer('day', 'bclicked', ['sum']);
    _this.enableRetainer('week', 'bclicked', ['sum']);
    return _this;
  }

  _createClass(GameReporting, [{
    key: 'saveData',
    value: function saveData(data, phaserGame) {
      var _this2 = this;

      var origKeys = Object.keys(data);
      var gamedata = {
        endedAt: _firebase2.default.database.ServerValue.TIMESTAMP,
        played: 1
      };
      if (phaserGame) {
        gamedata.uid = phaserGame.greenhouse.auth.currentUserUID();
        gamedata.mode = phaserGame.greenhouse.mode;
        gamedata.name = phaserGame.greenhouse.name;
      }
      origKeys.forEach(function (key) {
        gamedata[key] = data[key];
      });

      var promise = new _rsvp2.default.Promise(function (resolve, reject) {
        var promises = [];
        promises.push(_this2._refData.push().set(gamedata));
        promises.push(_this2.saveMetrics(gamedata));

        _rsvp2.default.all(promises).then(resolve).catch(reject);
      });
      return promise;
    }
  }, {
    key: 'onDataSaved',
    value: function onDataSaved(cb) {
      var _this3 = this;

      if (this._onSavedQuery) {
        this._onSavedQuery.off();
      }
      this._onSavedQuery = this._refData.orderByChild('endedAt');

      this._onSavedQuery.limitToLast(1).once('value', function (snapshot) {
        var games = snapshot.val();
        var keys = games ? Object.keys(games) : null;

        if (keys && keys.length > 0) {
          _this3._onSavedQuery = _this3._onSavedQuery.startAt(games[keys[0]].endedAt + 1);
        }

        // setup listener
        _this3._onSavedQuery.on('child_added', function (snap) {
          return cb(snap.val());
        });
      });
    }
  }]);

  return GameReporting;
}(_firebaseReporting2.default);

module.exports = GameReporting;
import FirebaseReporting from 'firebase-reporting';
import firebase from 'firebase';

class GameReporting extends FirebaseReporting {
  constructor(refData, refReporting) {
    super({
      firebase: refReporting
    });

    this._refData = refData;
    this._onSavedQuery = null;

    this.addFilter('modes', ['mode']);
    this.addFilter('users', ['uid']);
    this.addFilter('users-modes', ['mode', 'uid']);

    this.addMetric('endedAt', ['first', 'last']);
    this.addMetric('played', ['sum']);
    this.addMetric('aclicked', ['sum']);
    this.addMetric('aclickedtime', ['last']);
    this.addMetric('bclicked', ['sum']);
    this.addMetric('bclickedtime', ['last']);

    this.enableRetainer('minute', 'aclicked', ['sum']);
    this.enableRetainer('hour', 'aclicked', ['sum']);
    this.enableRetainer('day', 'aclicked', ['sum']);
    this.enableRetainer('week', 'aclicked', ['sum']);

    this.enableRetainer('minute', 'bclicked', ['sum']);
    this.enableRetainer('hour', 'bclicked', ['sum']);
    this.enableRetainer('day', 'bclicked', ['sum']);
    this.enableRetainer('week', 'bclicked', ['sum']);
  }

  saveData(data, phaserGame) {
    const origKeys = Object.keys(data);
    const gamedata = {
      endedAt: firebase.database.ServerValue.TIMESTAMP,
      played: 1
    };
    if (phaserGame) {
      gamedata.uid = phaserGame.greenhouse.auth.currentUserUID();
      gamedata.mode = phaserGame.greenhouse.mode;
      gamedata.name = phaserGame.greenhouse.name;
    }
    origKeys.forEach((key) => {
      gamedata[key] = data[key];
    });

    const promise = new Promise((resolve, reject) => {
      const promises = [];
      promises.push(this._refData.push().set(gamedata));
      promises.push(this.saveMetrics(gamedata));

      Promise.all(promises).then(resolve).catch(reject);
    });
    return promise;
  }

  onDataSaved(cb) {
    if (this._onSavedQuery) {
      this._onSavedQuery.off();
    }
    this._onSavedQuery = this._refData.orderByChild('endedAt');

    this._onSavedQuery.limitToLast(1).once('value', (snapshot) => {
      const games = snapshot.val();
      const keys = games ? Object.keys(games) : null;

      if (keys && keys.length > 0) {
        this._onSavedQuery = this._onSavedQuery.startAt(games[keys[0]].endedAt + 1);
      }

      // setup listener
      this._onSavedQuery.on('child_added', (snap) => cb(snap.val()));
    });
  }
}

module.exports = GameReporting;

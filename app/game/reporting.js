import FirebaseReporting from 'firebase-reporting';
import Config from './config';

class GameReporting extends FirebaseReporting {
  constructor(firebase) {
    super({
      firebase: firebase.database().ref('reporting').child(Config.name)
    });

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
}

module.exports = GameReporting;

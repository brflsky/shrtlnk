import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { routes, onAuthChanged } from '../imports/routes/routes';
import '../imports/startup/configure-simpl-schema';


Tracker.autorun(() => {
  const isAuth = !!Meteor.userId();
  onAuthChanged(isAuth);
});

Meteor.startup(() => {
  Session.set('showVisible', true);
  ReactDOM.render(routes, document.getElementById('app'));
});

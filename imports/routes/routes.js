import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Link from '../ui/Link';
import Signup from '../ui/Signup';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const authPages = ['/links'];
const unAuthPages = ['/signup', '/'];
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/links');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

export const onAuthChanged = (isAuth) => {
  const currentPage = browserHistory.getCurrentLocation().pathname;
  const isCurentPageAuth = authPages.includes(currentPage);
  console.log('Is Auth: ', isAuth);
  if (isCurentPageAuth && !isAuth) {
    browserHistory.replace('/');
  } else if (!isCurentPageAuth && isAuth) {
    browserHistory.replace('/links');
  }
};

export const routes = (
  <Router history={browserHistory} >
    <Route path="/" component={Login} onEnter={onEnterPublicPage} />
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage} />
    <Route path="*" component={NotFound} />
  </Router>
);

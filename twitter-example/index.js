'use strict';

import React from 'react-native';

import Router from '../index';

import HomePage from './pages/HomePage';
import BackButton from './components/BackButton';
import SearchAndCompose from './components/icons/SearchAndCompose';
import AddPeople from './components/icons/AddPeople';

var {
  StyleSheet,
  View,
} = React;

export default class TwitterApp extends React.Component {
  constructor(props) {
    super(props);
    this.firstRoute = {
      name: 'Home',
      component: HomePage,
      leftCorner: AddPeople,
    };
    this.styles = StyleSheet.create({
      header: {
        backgroundColor: '#5cafec',
      }
    });
  }

  render() {
    return (
      <Router
        firstRoute={this.firstRoute}
        headerStyle={this.styles.header}
        backButtonComponent={BackButton}
        rightCorner={SearchAndCompose}
      />
    )
  }
}

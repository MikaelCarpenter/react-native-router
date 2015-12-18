'use strict';

import React from 'react-native';

var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;


export default class RightCorner extends React.Component {
  constructor(props) {
    super(props);
    this.styles = StyleSheet.create({
      button: {
        width: 100,
        height: 50,
        backgroundColor: 'orange'
      }
    });
  }

  render() {
    return (
      <View style={styles.button} />
    )
  }
}


export default class FindPeoplePage extends React.Component {
  constructor(props) {
    super(props);
    this.styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Find people!</Text>
      </View>
    )
  }
}

'use strict';

import React from 'react-native';

var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

export default class ThirdPage extends React.Component {
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
        <Text>Search page</Text>
      </View>
    )
  }
}

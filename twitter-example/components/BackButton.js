'use strict';

import React from 'react-native';

var {
  StyleSheet,
  TouchableHighlight,
  Image,
  View,
} = React;

export default class BackButton extends React.Component {
  constructor(props) {
    super(props);
    this.styles = StyleSheet.create({
      backButton: {
        width: 10,
        height: 17,
        marginLeft: 10,
        marginTop: 3,
        marginRight: 10
      }
    });
  }
  render() {
    return (
      <Image source={require('image!back_button')} style={this.styles.backButton} />
    )
  }
}

'use strict';

import React from 'react-native';

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

export default class NavButton extends React.Component {
  constructor(props) {
    super(props);
    this.styles = StyleSheet.create({
      navbarText: {
        color: 'white',
        fontSize: 16,
        margin: 10,
        fontWeight: '600',
        textAlign: 'center',
        alignItems: 'center',
      }
    });
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.onPress();
  }

  render() {
    let backButton;

    if (this.props.backButtonComponent) {
      const BackButton = this.props.backButtonComponent;
      backButton = <View><BackButton/></View>
    } else {
      backButton = <Text style={this.styles.navbarText}>Back</Text>
    }

    return (
      <TouchableHighlight onPress={this.onPress} underlayColor="transparent">
        {backButton}
      </TouchableHighlight>
    );
  }
};

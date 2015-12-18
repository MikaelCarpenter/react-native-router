'use strict';

import React from 'react-native';

import NavBarContent from './NavBarContent';

var {
  StyleSheet,
  View
} = React;

export default class NavBarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.styles = StyleSheet.create({
      navbarContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 64
      },
      navbarContainerHidden: {
        position: 'absolute',
        top: -64,
        left: 0,
        right: 0,
        height: 64
      }
    });
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
    this.customAction = this.customAction.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props && this.props.currentRoute.index !== newProps.currentRoute.index) {
      this.setState({
        previousRoute: this.props.currentRoute
      });
    }
  }

  goBack() {
    this.props.toBack(this.props.navigator);
  }

  goForward(route) {
    this.props.toRoute(route, this.props.navigator);
  }

  customAction(opts) {
    this.props.customAction(opts);
  }

  // We render both the current and the previous navbar (for animation)
  render() {
    let trans;
    let navbarStyle;
    let navbarContent;

    if (this.props.currentRoute.trans) {
      trans = {backgroundColor: 'transparent'};
    } else {
      trans = {};
    }

    if (this.props.currentRoute.hideNavigationBar) {
      navbarStyle = this.styles.navbarContainerHidden;
    } else {
      navbarStyle = this.styles.navbarContainer;
    }

    if(this.props.currentRoute.trans) {
      navbarContent = (
        <NavBarContent
        route={this.state.previousRoute}
        backButtonComponent={this.props.backButtonComponent}
        rightCorner={this.props.rightCorner}
        titleStyle={this.props.titleStyle}
        willDisappear="true"></NavBarContent>
      );
    } else if (this.props.currentRoute.hideNavigationBar) {
      navbarContent = (
        <NavBarContent
          route={this.props.currentRoute}
          backButtonComponent={this.props.backButtonComponent}
          rightCorner={this.props.rightCorner}
          titleStyle={this.props.titleStyle}
          borderBottomWidth={this.props.borderBottomWidth}
          borderColor={this.props.borderColor}
          goBack={this.goBack}
          goForward={this.goForward}
          leftProps={this.props.leftProps}
          rightProps={this.props.rightProps}
          titleProps={this.props.titleProps}
          customAction={this.customAction}>
      </NavBarContent>
      );
    } else {
      navbarContent = (
        <NavBarContent
          route={this.props.currentRoute}
          backButtonComponent={this.props.backButtonComponent}
          rightCorner={this.props.rightCorner}
          titleStyle={this.props.titleStyle}
          borderBottomWidth={this.props.borderBottomWidth}
          borderColor={this.props.borderColor}
          goBack={this.goBack}
          goForward={this.goForward}
          leftProps={this.props.leftProps}
          rightProps={this.props.rightProps}
          titleProps={this.props.titleProps}
          customAction={this.customAction}>
        </NavBarContent>
      );
    }

    return (
      <View style={[navbarStyle, this.props.style, trans]}>
        {navbarContent}
      </View>
    );
  }
};

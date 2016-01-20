import React from 'react-native'
import { EventEmitter } from 'fbemitter'

import NavBarContainer from './components/NavBarContainer'
import ExpensiveSceneWrapper from './components/ExpensiveSceneWrapper'

let {
  StyleSheet,
  Navigator,
  StatusBarIOS,
  View,
  Platform
} = React

class Router extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      route: {
        name: null,
        index: null
      }
    }
    this.emitter = new EventEmitter()
  }

  onWillFocus (route) {
    this.setState({ route: route })
    this.emitter.emit('willFocus', route.name)
  }

  onDidFocus (route) {
    this.emitter.emit('didFocus', route.name)
  }

  onBack (navigator) {
    if (this.state.route.index > 0) {
      navigator.pop()
    }
  }

  onForward (route, navigator) {
    route.index = this.state.route.index + 1 || 1
    navigator.push(route)
  }

  setRightProps (props) {
    this.setState({ rightProps: props })
  }

  setLeftProps (props) {
    this.setState({ leftProps: props })
  }

  setTitleProps (props) {
    this.setState({ titleProps: props })
  }

  customAction (opts) {
    this.props.customAction(opts)
  }

  toBack () {
    if (this.state.route.index > 0) {
      this.navigator.pop()
      return true
    }
    return false
  }

  configureScene (route) {
    return route.sceneConfig || Navigator.SceneConfigs.FloatFromRight
  }

  renderScene (route, navigator) {
    this.navigator = navigator
    let goForward = function (route) {
      route.index = this.state.route.index + 1 || 1
      navigator.push(route)
    }.bind(this)

    let replaceRoute = function (route) {
      route.index = this.state.route.index || 0
      navigator.replace(route)
    }.bind(this)

    let resetToRoute = function (route) {
      route.index = 0
      navigator.resetTo(route)
    }.bind(this)

    let goBackwards = function () {
      this.onBack(navigator)
    }.bind(this)

    let goToFirstRoute = function () {
      navigator.popToTop()
    }

    let setRightProps = function (props) {
      this.setState({ rightProps: props })
    }.bind(this)

    let setLeftProps = function (props) {
      this.setState({ leftProps: props })
    }.bind(this)

    let setTitleProps = function (props) {
      this.setState({ titleProps: props })
    }.bind(this)

    let customAction = function (opts) {
      this.customAction(opts)
    }.bind(this)

    let Content = route.component

    // Remove the margin of the navigation bar if not using navigation bar
    let extraStyling = {}
    if (this.props.hideNavigationBar) {
      extraStyling.marginTop = 0
    }

    let margin
    if (route.trans) {
      margin = 0
    } else if (this.props.hideNavigationBar || route.hideNavigationBar) {
      margin = (this.props.noStatusBar || route.noStatusBar) ? 0 : 20
    } else {
      margin = 64
    }

    if (Platform.OS === 'ios') {
      if (this.props.noStatusBar || route.noStatusBar) {
        StatusBarIOS.setHidden(true, 'none')
      } else {
        StatusBarIOS.setHidden(false, 'none')
      }
    } else {
      // Android not support
    }

    let Wrapper = (this.props.expensive || route.expensive) ? ExpensiveSceneWrapper : View

    return (
      <Wrapper
        style={[styles.container, this.props.bgStyle, extraStyling, { marginTop: margin }]}
        renderPlaceholderView={route.renderPlaceholderView || this.props.renderPlaceholderView}
      >
        <Content
          name={route.name}
          index={route.index}
          data={route.data}
          toRoute={goForward}
          toBack={goBackwards}
          routeEmitter={this.emitter}
          replaceRoute={replaceRoute}
          resetToRoute={resetToRoute}
          reset={goToFirstRoute}
          setRightProps={setRightProps}
          setLeftProps={setLeftProps}
          setTitleProps={setTitleProps}
          customAction={customAction}
          {...route.passProps}
        />
      </Wrapper>
    )
  }

  render () {
    let navigationBar
    // Status bar color
    if (Platform.OS === 'ios') {
      if (this.props.statusBarColor === 'black') {
        StatusBarIOS.setStyle(0)
      } else {
        StatusBarIOS.setStyle(1)
      }
    } else if (Platform.OS === 'android') {
      // no android version yet
    }

    if (!this.props.hideNavigationBar) {
      navigationBar = (
        <NavBarContainer
          style={this.props.headerStyle}
          navigator={navigator}
          currentRoute={this.state.route}
          backButtonComponent={this.props.backButtonComponent}
          rightCorner={this.props.rightCorner}
          titleStyle={this.props.titleStyle}
          borderBottomWidth={this.props.borderBottomWidth}
          borderColor={this.props.borderColor}
          toRoute={this.onForward.bind(this)}
          toBack={this.onBack.bind(this)}
          leftProps={this.state.leftProps}
          rightProps={this.state.rightProps}
          titleProps={this.state.titleProps}
          customAction={this.customAction.bind(this)}
        />
      )
    }

    return (
      <Navigator
        ref='navigator'
        initialRoute={this.props.firstRoute}
        navigationBar={navigationBar}
        renderScene={this.renderScene.bind(this)}
        onDidFocus={this.onDidFocus.bind(this)}
        onWillFocus={this.onWillFocus.bind(this)}
        configureScene={this.configureScene}
      />
    )
  }
}

Router.propTypes = {
  firstRoute: React.PropTypes.shape({
    name: React.PropTypes.string,
    component: React.PropTypes.element
  }).isRequired,

  rightCorner: React.PropTypes.element,
  backButtonComponent: React.PropTypes.element,

  customAction: React.PropTypes.func,

  hideNavigationBar: React.PropTypes.bool,
  noStatusBar: React.PropTypes.bool,

  headerStyle: View.propTypes.style,
  titleStyle: View.propTypes.style,
  bgStyle: View.propTypes.style,
  borderColor: React.PropTypes.string,
  statusBarColor: React.PropTypes.string,
  borderBottomWidth: React.PropTypes.number,

  expensive: React.PropTypes.bool,
  renderPlaceholderView: React.PropTypes.element
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  }
})

export default Router

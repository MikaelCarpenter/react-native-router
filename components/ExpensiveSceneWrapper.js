let React = require('react-native')

let {
  InteractionManager,
  Text,
  View
} = React

class ExpensiveSceneWrapper extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = { renderPlaceholderOnly: true }
  }

  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ renderPlaceholderOnly: false })
    })
  }

  _renderPlaceholderView () {
    if (this.props.renderPlaceholderView) {
      return this.props.renderPlaceholderView
    }

    return (
      <View style={[ this.props.style ]}>
        <Text>Loading...</Text>
      </View>
    )
  }

  render () {
    if (this.state.renderPlaceholderOnly) {
      return this._renderPlaceholderView()
    }

    return (
      <View style={this.props.style}>
        {this.props.children}
      </View>
    )
  }
};

ExpensiveSceneWrapper.propTypes = {
  renderPlaceholderView: React.PropTypes.element,
  children: React.PropTypes.node,
  style: View.propTypes.style
}

export default ExpensiveSceneWrapper

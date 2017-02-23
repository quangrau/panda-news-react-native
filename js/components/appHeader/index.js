import React, { Component, PropTypes } from 'react';
import { Header, Title, Text, Button, Icon, Left, Body, Right } from 'native-base';

class AppHeader extends Component {

  static propTypes = {
    title: PropTypes.string,
    onOpenDrawer: PropTypes.func,
  };

  static defaultProps = {
    title: 'Feeds',
  }

  render() {
    return (
      <Header>
        <Left />
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right>
          <Button transparent onPress={this.props.onOpenDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Right>
      </Header>
    );
  }
}

export default AppHeader;

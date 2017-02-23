import React, { Component, PropTypes } from 'react';
import { Header, Left, Body, Right, Title, Button, Icon } from 'native-base';

const HomeHeader = (props) => {
  return (
    <Header>
      <Left />
      <Body>
        <Title>{props.title}</Title>
      </Body>
      <Right>
        <Button transparent>
          <Icon name="settings" />
        </Button>
      </Right>
    </Header>
  );
};

HomeHeader.propTypes = {
  title: PropTypes.string,
};

HomeHeader.defaultProps = {
  title: 'Feeds',
};

export default HomeHeader;

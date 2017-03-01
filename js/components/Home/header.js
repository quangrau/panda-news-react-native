import React, { Component, PropTypes } from 'react';
import { Header, Left, Body, Right, Title, Button, Icon } from 'native-base';

const HomeHeader = (props) => {
  return (
    <Header>
      <Left>
        <Button transparent>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>{props.title}</Title>
      </Body>
      <Right />
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

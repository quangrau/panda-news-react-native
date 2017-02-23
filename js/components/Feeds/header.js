import React, { PropTypes } from 'react';
import { Header, Left, Right, Body, Title, Button, Icon } from 'native-base';

const FeedHeader = (props) => {
  return (
    <Header>
      <Left>
        <Button transparent onPress={props.onBack}>
          <Icon name="arrow-back" />
        </Button>
      </Left>

      <Body>
        <Title>{props.title}</Title>
      </Body>

      <Right>
        <Button transparent onPress={props.onToggleFilter}>
          {props.filter === 'popular'
            ? <Icon name="flame" />
            : <Icon name="clock" />
          }
        </Button>
      </Right>
    </Header>
  );
};

FeedHeader.defaultProps = {
  title: 'Feeds',
  filter: 'popular',
};

FeedHeader.propTypes = {
  title: PropTypes.string,
  onBack: PropTypes.func,
  onToggleFilter: PropTypes.func,
};

export default FeedHeader;

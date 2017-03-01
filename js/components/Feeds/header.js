import React, { PropTypes } from 'react';
import { Header, Left, Right, Body, Title, Button, Icon } from 'native-base';

const styles = {
  title: {
    color: '#FFFFFF',
  },
  icon: {
    color: '#FFFFFF',
  },
};

const FeedHeader = (props) => {
  return (
    <Header style={{ backgroundColor: props.color }}>
      <Left>
        <Button transparent onPress={props.onBack}>
          <Icon style={styles.icon} name="arrow-back" />
        </Button>
      </Left>

      <Body>
        <Title style={styles.title}>{props.title}</Title>
      </Body>

      <Right>
        <Button transparent onPress={props.onToggleFilter}>
          {props.filter === 'popular'
            ? <Icon style={styles.icon} name="flame" />
            : <Icon style={styles.icon} name="clock" />
          }
        </Button>
      </Right>
    </Header>
  );
};

FeedHeader.defaultProps = {
  color: '#000000',
  title: 'Feeds',
  filter: 'popular',
};

FeedHeader.propTypes = {
  title: PropTypes.string,
  onBack: PropTypes.func,
  onToggleFilter: PropTypes.func,
};

export default FeedHeader;

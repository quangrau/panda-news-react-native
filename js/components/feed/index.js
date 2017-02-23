import styles from './styles';
import React, { Component, PropTypes } from 'react';
import { TouchableOpacity } from 'react-native';
import { Content, View, Text, Icon, ListItem, Left, Body } from 'native-base';
import TimeAgo from 'react-native-timeago';

class Feed extends Component {

  static propTypes = {
    feed: PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.object,
      meta: PropTypes.object,
      source: PropTypes.object,
    }),
    onItemPress: PropTypes.func,
  };

  handleOnPress = () => {
    this.props.onItemPress(this.props.feed);
  }

  render() {
    const { index, feed, color } = this.props;
    const { source } = feed;

    return (
      <ListItem thumbnail>
        <Left>
          <View style={{
            ...styles.badge,
            backgroundColor: color
          }}>
            <Text style={styles.badgeText}>{index}</Text>
          </View>
        </Left>
        <Body>
          <TouchableOpacity onPress={this.handleOnPress}>
            <Text>{feed.title}</Text>
            <Text note>
              <TimeAgo time={source.createdAt} />
              {` by ${source.authorName}`}
            </Text>
          </TouchableOpacity>
        </Body>
      </ListItem>
    );
  }
}

export default Feed;

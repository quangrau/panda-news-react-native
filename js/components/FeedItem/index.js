import styles from './styles';
import React, { Component, PropTypes } from 'react';
import TimeAgo from 'react-native-timeago';

import { TouchableOpacity } from 'react-native';
import { Content, View, Text, Icon, ListItem, Left, Body } from 'native-base';

const FeedItem = (props) => {

  const { index, feed, color } = props;
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
        <TouchableOpacity onPress={props.onItemPress}>
          <Text>{feed.title}</Text>
          <Text note>
            <TimeAgo time={source.createdAt} />
            {` by ${source.authorName}`}
          </Text>
        </TouchableOpacity>
      </Body>
    </ListItem>
  );
};

FeedItem.propTypes = {
  feed: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.object,
    meta: PropTypes.object,
    source: PropTypes.object,
  }),
  onItemPress: PropTypes.func,
};

export default FeedItem;

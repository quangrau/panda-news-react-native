import styles from './styles';
import React, { PropTypes } from 'react';
import TimeAgo from 'react-native-timeago';
import { Image } from 'react-native';
import { Card, CardItem, Body, Thumbnail, Text, Button, Icon } from 'native-base';

const FeedCard = (props) => {
  const { feed } = props;
  const { image, source } = feed;

  if (!image.normal) return null;

  return (
    <Card>
      <CardItem
        cardBody
        button
        onPress={props.onItemPress}
      >
        <Image
          source={{ uri: image.normal }}
          style={{
            flex: 1,
            alignSelf: 'stretch',
            width: null,
            height: 300,
          }}
        />
      </CardItem>
      <CardItem>
        <Body>
          <Text>{feed.title}</Text>
          <Text note>
            {`${source.authorName || source.name} - `}
            <TimeAgo time={source.createdAt} />
          </Text>
        </Body>
      </CardItem>
    </Card>
  );
};

FeedCard.propTypes = {
  feed: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.object,
    meta: PropTypes.object,
    source: PropTypes.object,
  }),
  onItemPress: PropTypes.func,
};

export default FeedCard;

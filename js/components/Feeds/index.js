import styles from './styles';

import React, { Component } from 'react';
import { TouchableOpacity, Linking, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, List, Card, Spinner } from 'native-base';

import { getFeeds } from '../../actions/feed';
import { updateSettingFilter } from '../../actions/setting';

import FeedHeader from './header';
import FeedItem from '../FeedItem';
import FeedCard from '../FeedCard';

const {
  popRoute,
} = actions;

class Feeds extends Component {

  static propTypes = {
    feeds: React.PropTypes.arrayOf(React.PropTypes.object),
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  componentDidMount() {
    const { source } = this.props;
    if (source && source.key) this.getData(source.key);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.source.key !== this.props.source.key
      || nextProps.settings.filter !== this.props.settings.filter) {
      this.getData(nextProps.source.key, nextProps.settings.filter);
    }
  }

  getData(key, filter) {
    const { actionCreators, page, source, settings } = this.props;

    // Init params
    const sourceKey = key || source.key;
    const filterType = filter || settings.filter;
    const nextPage = page + 1;

    // Fetch
    actionCreators.getFeeds(sourceKey, nextPage, filterType);
  }

  handleOpenBrowser(feed) {
    if (feed && feed.source && feed.source.absoluteUrl) {
      const url = feed.source.absoluteUrl;

      // Opening external links
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          console.log('Can\'t handle url: ' + url);
        } else {
          return Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err));
    }
  }

  handleBack = () => {
    this.props.actionCreators.popRoute(this.props.navigation.key);
  }

  handleToggleFilter = () => {
    const { actionCreators, settings } = this.props;
    const filter = settings.filter === 'popular' ? 'latest' : 'popular';
    actionCreators.updateSettingFilter(filter);
  }

  handleOnScroll = (e) => {
    const windowHeight = Dimensions.get('window').height;
    const offset = e.nativeEvent.contentOffset.y;
    const height = e.nativeEvent.contentSize.height;

    if ((windowHeight + offset > height + 30) && this.props.canLoadMore) {
      this.getData();
    }
  }

  renderNewsFeed() {
    const { feeds, source } = this.props;

    return (
      <List
        dataArray={feeds}
        renderRow={(feed, s, i) => (
          <FeedItem
            index={parseInt(i) + 1}
            feed={feed}
            color={source.ios.color}
            onItemPress={this.handleOpenBrowser.bind(this, feed)}
          />
        )}
      />
    );
  }

  renderDesignFeed() {
    return this.props.feeds.map((feed, i) => (
      <FeedCard
        key={i}
        feed={feed}
        onItemPress={this.handleOpenBrowser.bind(this, feed)}
      />
    ));
  }

  renderFeedItems() {
    switch (this.props.source.type) {
      case 'news':
        return this.renderNewsFeed();
      default:
        return this.renderDesignFeed();
    }
  }

  render() {
    const { loading, source, feeds, settings, actionCreators } = this.props;
    const mainColor = source.ios.color || '#000000';

    return (
      <Container style={styles.container}>
        <FeedHeader
          filter={settings.filter}
          title={source.name}
          color={mainColor}
          onBack={this.handleBack}
          onToggleFilter={this.handleToggleFilter}
        />
        <Content
          scrollEventThrottle={1000}
          onScroll={this.handleOnScroll}
        >
          {this.renderFeedItems()}
          {loading && <Spinner color={mainColor} />}
        </Content>
      </Container>
    );
  }
}

const bindAction = dispatch => ({
  actionCreators: bindActionCreators({
    getFeeds,
    popRoute,
    updateSettingFilter,
  }, dispatch),
});

const mapStateToProps = state => {
  const { feeds, sources, settings, cardNavigation } = state;
  const { page, loading, canLoadMore, data } = feeds;
  const source = _.filter(sources.list, (s) => s.key === sources.selectedKey);

  return {
    page,
    loading,
    settings,
    canLoadMore,
    feeds: data,
    source: source[0],
    navigation: cardNavigation,
  };
};

export default connect(mapStateToProps, bindAction)(Feeds);

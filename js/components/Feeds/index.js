import styles from './styles';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import Browser from 'react-native-browser';
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  List,
  Left,
  Body,
  Right,
  Spinner,
} from 'native-base';

import { openDrawer } from '../../actions/drawer';
import { getFeeds } from '../../actions/feed';

import AppHeader from '../AppHeader';
import FeedItem from '../FeedItem';

const {
  pushRoute,
} = actions;

class Home extends Component {

  static propTypes = {
    feeds: React.PropTypes.arrayOf(React.PropTypes.object),
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  componentDidMount() {
    if (this.props.source) {
      this.getData(this.props.source.key);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.source.key !== this.props.source.key) {
      this.getData(nextProps.source.key);
    }
  }

  getData(source, page = 1) {
    this.props.actionCreators.getFeeds(source, page, 'popular');
  }

  pushRoute(route, index) {
    const { actionCreators, navigation } = this.props;
    actionCreators.pushRoute({ key: route, index: 1 }, navigation.key);
  }

  handleOpenBrowser(feed) {
    if (feed && feed.source && feed.source.absoluteUrl) {
      const url = feed.source.absoluteUrl;

      // Open browser in app
      Browser.open(url);
    }
  }

  render() {
    const { loading, source, feeds, actionCreators } = this.props;

    return (
      <Container style={styles.container}>
        <AppHeader
          title={source ? source.name : 'Home'}
          onOpenDrawer={actionCreators.openDrawer}
        />
        <Content>
          {loading
            ? <Spinner color={source.color} />
            : <List
                dataArray={feeds}
                renderRow={(feed, s, i) => (
                  <FeedItem
                    index={parseInt(i) + 1}
                    feed={feed}
                    color={source.color}
                    onItemPress={this.handleOpenBrowser}
                  />
                )}
              />
          }
        </Content>
      </Container>
    );
  }
}

const bindAction = dispatch => ({
  actionCreators: bindActionCreators({
    getFeeds,
    pushRoute,
    openDrawer,
  }, dispatch),
});

const mapStateToProps = state => {
  const { feeds, sources, cardNavigation } = state;

  return {
    loading: feeds.loading,
    feeds: feeds.data,
    source: sources.list[sources.selectedIndex],
    navigation: cardNavigation,
  };
};

export default connect(mapStateToProps, bindAction)(Home);

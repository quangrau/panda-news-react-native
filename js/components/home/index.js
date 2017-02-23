import styles from './styles';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
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
import { getFeeds } from '../../actions/feeds';

import AppHeader from '../appHeader';
import FeedItem from '../feed';

const {
  pushRoute,
} = actions;

class Home extends Component {

  static propTypes = {
    feeds: React.PropTypes.arrayOf(React.PropTypes.object),
    openDrawer: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  componentDidMount() {
    this.getData(this.props.source.key);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.source.key !== this.props.source.key) {
      this.getData(nextProps.source.key);
    }
  }

  getData(source, page = 1) {
    this.props.getFeeds(source, page);
  }

  pushRoute(route, index) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  handleOpenBrowser(feed) {
    if (feed && feed.source && feed.source.absoluteUrl) {
      const url = feed.source.absoluteUrl;
      console.log(url);
      Browser.open(url);
    }
  }

  render() {
    const { loading, source, feeds } = this.props;

    return (
      <Container style={styles.container}>
        <AppHeader
          title={source.name}
          onOpenDrawer={this.props.openDrawer}
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

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    getFeeds: (source, page) => dispatch(getFeeds(source, page)),
  };
}

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

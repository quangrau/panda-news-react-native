import styles from './styles';

import React, { Component } from 'react';
import { TouchableOpacity, Linking } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, List, Spinner } from 'native-base';

import { getFeeds } from '../../actions/feed';
import { updateSettingFilter } from '../../actions/setting';

import FeedHeader from './header';
import FeedItem from '../FeedItem';
import Browser from 'react-native-browser';

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
      this.getData(nextProps.source.key, 1, nextProps.settings.filter);
    }
  }

  getData(source, page = 1, filter) {
    const { actionCreators, settings } = this.props;
    actionCreators.getFeeds(source, page, filter || settings.filter);
  }

  handleOpenBrowser(feed) {
    if (feed && feed.source && feed.source.absoluteUrl) {
      const url = feed.source.absoluteUrl;

      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          console.log('Can\'t handle url: ' + url);
        } else {
          return Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err));

      // Open browser in app
      // Browser.open(url);
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

  render() {
    const { loading, source, feeds, settings, actionCreators } = this.props;
    const mainColor = source.ios.color || '#000000';

    return (
      <Container style={styles.container}>
        <FeedHeader
          filter={settings.filter}
          title={source.name}
          onBack={this.handleBack}
          onToggleFilter={this.handleToggleFilter}
        />
        <Content>
          {loading
            ? <Spinner color={mainColor} />
            : <List
                dataArray={feeds}
                renderRow={(feed, s, i) => (
                  <FeedItem
                    index={parseInt(i) + 1}
                    feed={feed}
                    color={mainColor}
                    onItemPress={this.handleOpenBrowser.bind(this, feed)}
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
    popRoute,
    updateSettingFilter,
  }, dispatch),
});

const mapStateToProps = state => {
  const { feeds, sources, settings, cardNavigation } = state;
  const source = _.filter(sources.list, (s) => s.key === sources.selectedKey);

  return {
    settings,
    loading: feeds.loading,
    feeds: feeds.data,
    source: source[0],
    navigation: cardNavigation,
  };
};

export default connect(mapStateToProps, bindAction)(Feeds);

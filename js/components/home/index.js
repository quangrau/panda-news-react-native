import styles from './styles';

import _ from 'lodash';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import Browser from 'react-native-browser';
import {
  Container,
  Content,
  Icon,
  List,
  Spinner,
} from 'native-base';

import { setIndex, getSources } from '../../actions/source';
import navigateTo from '../../actions/sideBarNav';

import HomeHeader from '../HomeHeader';
import SourceItem from '../SourceItem';

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
    if (!this.props.sources) {
      this.props.actionCreators.getSources();
    }
  }

  pushRoute(route, index) {
    const { actionCreators, navigation } = this.props;
    actionCreators.pushRoute({ key: route, index: 1 }, navigation.key);
  }

  changeSource(index) {
    this.props.actionCreators.setIndex(index);
    this.props.actionCreators.navigateTo('home', 'home');
  }

  render() {
    const { loading, sources } = this.props;
    const dataSources = _(sources)
      .filter(source => source.stats.popularity)
      .orderBy(source => source.stats.popularity, 'desc')
      .value();

    return (
      <Container style={styles.container}>
        <HomeHeader title="Panda News" />
        <Content>
          {loading
            ? <Spinner />
            : <List
                dataArray={dataSources}
                renderRow={(source) => (
                  <SourceItem
                    source={source}
                    onItemPress={this.changeSource}
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
    getSources,
    pushRoute,
  }, dispatch),
});

const mapStateToProps = state => {
  const { sources, cardNavigation } = state;

  return {
    loading: sources.loading,
    sources: sources.list,
    navigation: cardNavigation,
  };
};

export default connect(mapStateToProps, bindAction)(Home);

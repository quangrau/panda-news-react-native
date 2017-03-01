import styles from './styles';

import _ from 'lodash';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import {
  Container,
  Content,
  Icon,
  List,
  Spinner,
} from 'native-base';

import { selectSource, getSources } from '../../actions/source';
import navigateTo from '../../actions/sideBarNav';

import HomeHeader from './header';
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
    if (_.isEmpty(this.props.sources)) {
      this.props.actionCreators.getSources();
    }
  }

  handleSelectSource(index) {
    const { actionCreators, navigation } = this.props;

    actionCreators.selectSource(index);
    actionCreators.pushRoute({ key: 'feeds', index: 1 }, navigation.key);
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
            ? <Spinner color="#000000" />
            : <List
                dataArray={dataSources}
                renderRow={(source, s, i) => (
                  <SourceItem
                    key={i}
                    source={source}
                    onItemPress={this.handleSelectSource.bind(this, source.key)}
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
    selectSource,
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

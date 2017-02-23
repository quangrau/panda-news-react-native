import styles from './styles';
import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Content, Text, List, ListItem } from 'native-base';

import { setIndex, getSources } from '../../actions/source';
import navigateTo from '../../actions/sideBarNav';
import SourceItem from '../SourceItem';

class SideBar extends Component {

  static propTypes = {
    actionCreators: PropTypes.shape({
      setIndex: PropTypes.func,
      navigateTo: PropTypes.func,
    }),
  }

  componentDidMount() {
    if (!this.props.list.length) {
      this.props.actionCreators.getSources();
    }
  }

  changeSource(index) {
    this.props.actionCreators.setIndex(index);
    this.props.actionCreators.navigateTo('home', 'home');
  }

  render() {
    return (
      <Content style={styles.sidebar} >
        <List
          dataArray={this.props.list}
          renderRow={(source) => (
            <SourceItem source={source} onItemPress={this.changeSource} />
          )}
        />
      </Content>
    );
  }
}

const bindAction = dispatch => ({
  actionCreators: bindActionCreators({
    setIndex,
    getSources,
    navigateTo,
  }, dispatch),
});

const mapStateToProps = state => ({
  list: state.sources.list,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SideBar);

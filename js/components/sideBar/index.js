import styles from './style';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Content, Text, List, ListItem } from 'native-base';

import { setIndex } from '../../actions/source';
import navigateTo from '../../actions/sideBarNav';
import myTheme from '../../themes/base-theme';

class SideBar extends Component {

  static propTypes = {
    setIndex: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
  }

  changeSource(index) {
    this.props.setIndex(index);
    this.props.navigateTo('home', 'home');
  }

  render() {
    return (
      <Content style={styles.sidebar} >
        <List
          dataArray={this.props.list}
          renderRow={(source, s, i) => (
            <ListItem
              button
              onPress={this.changeSource.bind(this, i)}
            >
              <Text>{source.name}</Text>
            </ListItem>
          )}
        />
      </Content>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  list: state.sources.list,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SideBar);

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

  render() {
    return (
      <Content style={styles.sidebar} >
        <List>
          <ListItem button>
            <Text>Home</Text>
          </ListItem>
          <ListItem button>
            <Text>Blank Page</Text>
          </ListItem>
        </List>
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

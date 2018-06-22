import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { MessagesComponent } from './messages.component';
import { displayPosts } from '../../actions/messages/messages.actions'

const mapStateToProps = (state: IState) => (state.messages);

export const mapDispatchToProps = {
  displayPosts
};

export const MessagesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessagesComponent);

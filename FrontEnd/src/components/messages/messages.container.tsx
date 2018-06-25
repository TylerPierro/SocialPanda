import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { MessagesComponent } from './messages.component';
// import { updateUsername } from '../../actions/sign-in/sign-in.actions';
import { submitNewPost, updateMsgBoard, updateNewPost } from '../../actions/messages/messages.actions';

const mapStateToProps = (state: IState) => (state.messages);

export const mapDispatchToProps = {
  submitNewPost,
  updateMsgBoard,
  updateNewPost,
  // updateUsername
};

export const MessagesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessagesComponent);

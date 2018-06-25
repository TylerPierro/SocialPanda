import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { MessagesComponent } from './messages.component';
import { updateUsername, updateError } from '../../actions/sign-in/sign-in.actions';
import { submitNewPost, updateMsgBoard, updateNewPost } from '../../actions/groups/groups.actions';

const mapStateToProps = (state: IState) => (state.messages);

export const mapDispatchToProps = {
  submitNewPost,
  updateError,
  updateMsgBoard,
  updateNewPost,
  updateUsername
};

export const MessagesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessagesComponent);

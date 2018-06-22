import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { GroupsComponent } from './groups.component';
import { updateUsername, updatePassword, updateError } from '../../actions/sign-in/sign-in.actions';
import { updateCity, updateDisplay1, updateDisplay2, updateTag, updateMsgBoard } from '../../actions/groups/groups.actions';

const mapStateToProps = (state: IState) => (state.groups);

export const mapDispatchToProps = {
  updateCity,
  updateDisplay1,
  updateDisplay2,
  updateError,
  updateMsgBoard,
  updatePassword,
  updateTag,
  updateUsername
};

export const GroupsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupsComponent);

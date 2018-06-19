import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { GroupsComponent } from './groups.component';
import { updateUsername, updatePassword, updateError } from '../../actions/sign-in/sign-in.actions';

const mapStateToProps = (state: IState) => (state.signIn);

export const mapDispatchToProps = {
  updateError,
  updatePassword,
  updateUsername,
};

export const GroupsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupsComponent);

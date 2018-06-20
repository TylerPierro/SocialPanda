import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { GroupsComponent } from './groups.component';
import { updateUsername, updatePassword, updateError } from '../../actions/sign-in/sign-in.actions';
import { updateCity, updateDisplay } from '../../actions/groups/groups.actions';

const mapStateToProps = (state: IState) => (state.groups);

export const mapDispatchToProps = {
  updateCity,
  updateDisplay,
  updateError,
  updatePassword,
  updateUsername
};

export const GroupsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupsComponent);

import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { RegisterComponent } from './register.component';
import { updateUsername, updatePassword, updateError } from '../../actions/register/register.actions';

const mapStateToProps = (state: IState) => (state.register);

export const mapDispatchToProps = {
  updateError,
  updatePassword,
  updateUsername,
};

export const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterComponent);

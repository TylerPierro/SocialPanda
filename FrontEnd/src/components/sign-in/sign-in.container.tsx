import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { SignInComponent } from './sign-in.component';
import { updateConfirmationPassword, updateNewPassword, setFirstSignin, updateUsername, updatePassword, updateError } from '../../actions/sign-in/sign-in.actions';
import { updateCognitoUser } from '../../actions/cognito-user/cognito-user.actions'

const mapStateToProps = (state: IState) => ({...state.signIn, cognito: {...state.cognitoUser}});

export const mapDispatchToProps = {
  setFirstSignin,
  updateCognitoUser,
  updateConfirmationPassword,
  updateError,
  updateNewPassword,
  updatePassword,
  updateUsername,
};

export const SignInContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInComponent);

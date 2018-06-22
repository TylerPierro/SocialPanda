import { ISignIn } from '.';
import { signInTypes } from '../actions/sign-in/sign-in.types';

const initialState: ISignIn = {
  errorMessage: '',
  firstSignIn: {
    isFirstSignIn: false,
    password: '',
    passwordConfirmation: ''
  },
  password: '',
  username: '',
}

export const signInReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case signInTypes.UPDATE_ERROR:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        password: '',
        username: '',
      };
    case signInTypes.UPDATE_PASSWORD:
      return {
        ...state,
        password: action.payload.password
      };
    case signInTypes.UPDATE_NEW_PASSWORD:
      return {
        ...state,
        firstSignIn: {
          ...state.firstSignIn,
          password: action.payload.password
        }
      };
    case signInTypes.UPDATE_CONFIRMATION_PASSWORD:
      return {
        ...state,
        firstSignIn: {
          ...state.firstSignIn,
          passwordConfirmation: action.payload.password
        }
      };
    case signInTypes.UPDATE_USERNAME:
      return {
        ...state,
        username: action.payload.username
      }
    case signInTypes.SET_FIRST_SIGNIN:
      return {
        ...state,
        firstSignIn: {
          isFirstSignIn: action.payload.isFirstSignIn,
          password: '',
          passwordConfirmation: ''
        }
      }
  }

  return state;
};

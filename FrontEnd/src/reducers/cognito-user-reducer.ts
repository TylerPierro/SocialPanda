import { ICognitoUser } from '.';
import { cognitoUserTypes } from '../actions/cognito-user/cognito-user.types';
const initialState: ICognitoUser = {
  user: null
}

export const cognitoUserReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case cognitoUserTypes.UPDATE_COGNITO_USER:
      return {
        user: action.payload.user
      };
  }

  return state;
};

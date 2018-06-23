import { INewGroup } from '.';
import { newGroupTypes } from '../actions/newGroup/newGroup.types';

const initialState: INewGroup = {
  newGroupObject: {}
}


// NEED TO CHANGE THE STATES BELOW WITH WHAT IS RETURNED IN EACH

export const newGroupReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case newGroupTypes.UPDATE_DESCRIPTION:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        password: '',
        username: '',
      };
    case newGroupTypes.UPDATE_LOCATION:
      return {
        ...state,
        password: action.payload.password
      };
    case newGroupTypes.UPDATE_STATUS:
      return {
        ...state,
        firstSignIn: {
          ...state,
          password: action.payload.password
        }
      };
    case newGroupTypes.UPDATE_TAG:
      return {
        ...state,
        firstSignIn: {
          ...state,
          passwordConfirmation: action.payload.password
        }
      };
  }

  return state;
};

import { IRegister } from ".";
import { registerTypes } from "../actions/register/register.types";

const initialState: IRegister = {
    errorMessage: '',
    password: '',
    username: '',
  }
  
  export const RegisterReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case registerTypes.UPDATE_ERROR:
        return {
          ...state,
          errorMessage: action.payload.errorMessage,
          password: '',
          username: '',
        };
      case registerTypes.UPDATE_PASSWORD:
        return {
          ...state,
          password: action.payload.password
        };
      case registerTypes.UPDATE_USERNAME:
        return {
          ...state,
          username: action.payload.username
        }
    }
  
    return state;
  };
  
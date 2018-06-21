import { combineReducers } from "redux";
import { signInReducer } from "./sign-in.reducer";
import { groupsReducer } from "./groups.reducer";
import { Post } from "../model/Post";
// import { RegisterReducer } from "./register.reducer";
import { CityTag } from "../model/CityTag";
import { CognitoUser } from "amazon-cognito-identity-js";
import { cognitoUserReducer } from "./cognito-user-reducer";

export interface ICognitoUser { 
  user: CognitoUser | null
}

export interface IGroups {
  citySearch: string;
  msgBoard: Post[];
  displayGroups: CityTag[];
  // displayTags: CityTag;
  tagSearch: string;
  
}

export interface IRegister {
  username: string,
  password: string, 
  errorMessage: string
}

export interface ISignIn {
  firstSignIn: {
    isFirstSignIn: boolean,
    password: string,
    passwordConfirmation: string
  },
  username: string,
  password: string,
  errorMessage: string
}

export interface IState {
  cognitoUser: ICognitoUser,
  groups: IGroups,
  register: IRegister,
  signIn: ISignIn
};

export const state = combineReducers<IState>({
  cognitoUser: cognitoUserReducer,
  groups: groupsReducer,
  signIn: signInReducer
});
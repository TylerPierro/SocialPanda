import { combineReducers } from "redux";
import { signInReducer } from "./sign-in.reducer";
import { groupsReducer } from "./groups.reducer";
import { Post } from "../model/Post";
import { CityTag } from "../model/CityTag";
import { CognitoUser } from "amazon-cognito-identity-js";
import { cognitoUserReducer } from "./cognito-user-reducer";
import { messagesReducer } from "./messages.reducer";

export interface ICognitoUser { 
  user: CognitoUser | null
}

export interface IGroups {
  citySearch: string;
  msgBoard: Post[];
  newPost: string;
  displayGroups: CityTag[];
  groupStatus: string;
  tagSearch: string;
}

export interface IMessages {
  msgBoard: Post[];
  newPost: string;
  displayGroups: CityTag[];
  groupStatus: string;
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
  messages: IMessages,
  register: IRegister,
  signIn: ISignIn
};

export const state = combineReducers<IState>({
  cognitoUser: cognitoUserReducer,
  groups: groupsReducer,
  messages: messagesReducer,
  signIn: signInReducer
});
import { combineReducers } from "redux";
import { signInReducer } from "./sign-in.reducer";
import { groupsReducer } from "./groups.reducer";
import { messagesReducer } from "./messages.reducer";
import { Post } from "../model/Post";
import { RegisterReducer } from "./register.reducer";
import { CityTag } from "../model/CityTag";

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
  username: string,
  password: string,
  errorMessage: string
}

export interface IMessages {
  msgBoard: Post[]
}

export interface IState {
  groups: IGroups,
  messages: IMessages,
  register: IRegister,
  signIn: ISignIn
};

export const state = combineReducers<IState>({
  groups: groupsReducer,
  messages: messagesReducer,
  register: RegisterReducer,
  signIn: signInReducer
});
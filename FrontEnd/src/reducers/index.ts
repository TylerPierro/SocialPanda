import { combineReducers } from "redux";
import { signInReducer } from "./sign-in.reducer";
import { homeReducer } from "./home.reducer";
import { Post } from "../model/Post";

export interface IHome {
  msgBoard: Post[];
}

export interface ISignIn {
  username: string,
  password: string,
  errorMessage: string
}

export interface IState {
  signIn: ISignIn,
  home: IHome,
};

export const state = combineReducers<IState>({
  home: homeReducer,
  signIn: signInReducer
});
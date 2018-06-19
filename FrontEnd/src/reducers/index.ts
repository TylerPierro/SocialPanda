import { combineReducers } from "redux";
import { signInReducer } from "./sign-in.reducer";
import { homeReducer } from "./home.reducer";
import { Post } from "../model/Post";
import { RegisterReducer } from "./register.reducer";

export interface IHome {
  msgBoard: Post[];
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

export interface IState {
  home: IHome,
  register: IRegister,
  signIn: ISignIn
};

export const state = combineReducers<IState>({
  home: homeReducer,
  register: RegisterReducer,
  signIn: signInReducer
});
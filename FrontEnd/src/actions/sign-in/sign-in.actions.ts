import { signInTypes } from "./sign-in.types";

export const updateError = (errorMessage: string) => {
  return {
    payload: {
      errorMessage
    },
    type: signInTypes.UPDATE_ERROR,
  }
}

export const updatePassword = (password: string) => {
  return {
    payload: {
      password
    },
    type: signInTypes.UPDATE_PASSWORD,
  }
}

export const updateUsername = (username: string) => {
  return {
    payload: {
      username
    },
    type: signInTypes.UPDATE_USERNAME,
  }
}

export const updateNewPassword = (password: string) => {
  return {
    payload: {
      password
    },
    type: signInTypes.UPDATE_NEW_PASSWORD,
  }
}

export const updateConfirmationPassword = (password: string) => {
  return {
    payload: {
      password
    },
    type: signInTypes.UPDATE_CONFIRMATION_PASSWORD,
  }
}

export const setFirstSignin = (isFirstSignIn: boolean) => {
  return {
    payload: {
      isFirstSignIn
    },
    type: signInTypes.SET_FIRST_SIGNIN
  }
}

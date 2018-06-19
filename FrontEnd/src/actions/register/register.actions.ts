import { registerTypes } from "./register.types";

export const updateError = (errorMessage: string) => {
  return {
    payload: {
      errorMessage
    },
    type: registerTypes.UPDATE_ERROR,
  }
}

export const updatePassword = (password: string) => {
  return {
    payload: {
      password
    },
    type: registerTypes.UPDATE_PASSWORD,
  }
}

export const updateUsername = (username: string) => {
  return {
    payload: {
      username
    },
    type: registerTypes.UPDATE_USERNAME,
  }
}
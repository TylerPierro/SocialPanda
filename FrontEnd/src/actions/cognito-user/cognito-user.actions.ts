import { CognitoUser } from "amazon-cognito-identity-js";
import { cognitoUserTypes } from "./cognito-user.types";

export const updateCognitoUser = (user: CognitoUser) => {
  return {
    payload: {
      user
    },
    type: cognitoUserTypes.UPDATE_COGNITO_USER,
  }
}

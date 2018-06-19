import { IHome } from ".";
import { homeTypes } from "../actions/home/home.types";

const initialState: IHome = {
    msgBoard: [
    ]
}

export const homeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case homeTypes.CREATE_POST:
      return {
        ...state,
        msgBoard: action.payload.msgBoard
      };
  }

  return state;
}
import { IMessages } from ".";
import { messagesTypes } from "../actions/messages/messages.types";

const initialState: IMessages = {
  msgBoard: [],
}

export const messagesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case messagesTypes.DISPLAY_POSTS:
      return {
        ...state,
        msgBoard: action.payload.msgBoard
      };
  }

  return state;
}
import { IMessages } from ".";
import { messagesTypes } from "../actions/messages/messages.types";

const initialState: IMessages = {
  displayGroups: [],
  groupStatus: '',
  msgBoard: [],
  newPost: '',
}

export const messagesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case messagesTypes.SUBMIT_NEW_POST:
      return {
        ...state,
        msgBoard: [...state.msgBoard, action.payload.newPost],
        newPost: action.payload.newPost

      };
    case messagesTypes.UPDATE_DISPLAY:
      return {
        ...state,
        displayGroups: action.payload.displayGroups
      };
    case messagesTypes.UPDATE_MSG_BOARD:
      return {
        ...state,
        msgBoard: action.payload.msgBoard
      };
  }

  return state;
}
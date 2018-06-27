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
    console.log(action.payload.newPost)
      return {
        ...state,
        // msgBoard: ["{\"box\":\"2arf\",\"time\":\"Posted on: Tue Jun 26 2018 2…00 (Eastern Daylight Time)\",\"user\":\"From: admin\"}"]
        msgBoard: [...state.msgBoard, JSON.stringify(action.payload.newPost.messages)]
        // newPost: action.payload.newPost
      };
    case messagesTypes.UPDATE_NEW_POST:
      return {
        ...state,
        // msgBoard: [...state.msgBoard, action.payload.newPost],
        newPost: action.payload.newPost
      };
    case messagesTypes.UPDATE_DISPLAY:
      return {
        ...state,
        displayGroups: action.payload.displayGroups,
        // msgBoard: [...state.msgBoard, action.payload.newPost]
      };
    case messagesTypes.UPDATE_MSG_BOARD:
      return {
        ...state,
        msgBoard: action.payload.msgBoard
        // msgBoard: [...state.msgBoard, action.payload.newPost1]
      };
  }

  return state;
}
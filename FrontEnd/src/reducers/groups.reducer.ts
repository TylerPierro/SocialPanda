import { IGroups } from ".";
import { groupsTypes } from "../actions/groups/groups.types";

const initialState: IGroups = {
  citySearch: '',
  displayGroups: [],
  groupStatus: '',
  msgBoard: [],
  newPost: '',
  tagSearch: ''
}

export const groupsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case groupsTypes.UPDATE_NEW_POST:
      return {
        ...state,
        newPost: action.payload.newPost
      };
    case groupsTypes.UPDATE_CITY:
      return {
        ...state,
        citySearch: action.payload.citySearch
      };
    case groupsTypes.UPDATE_DISPLAY:
      return {
        ...state,
        displayGroups: action.payload.displayGroups
      };
    case groupsTypes.UPDATE_MSG_BOARD:
      return {
        ...state,
        msgBoard: action.payload.msgBoard
      };
    case groupsTypes.UPDATE_TAG:
      return {
        ...state,
        tagSearch: action.payload.tagSearch
      };
  }

  return state;
}
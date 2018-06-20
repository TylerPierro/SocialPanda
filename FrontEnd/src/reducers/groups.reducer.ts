import { IGroups } from ".";
import { groupsTypes } from "../actions/groups/groups.types";

const initialState: IGroups = {
  citySearch: '',
  displayTags: [],
  msgBoard: []
}

export const groupsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case groupsTypes.CREATE_POST:
      return {
        ...state,
        msgBoard: action.payload.msgBoard
      };
    case groupsTypes.UPDATE_CITY:
      return {
        ...state,
        citySearch: action.payload.citySearch
      };
    case groupsTypes.UPDATE_DISPLAY:
      return {
        ...state,
        displayTags: action.payload.displayTags
      };
  }

  return state;
}
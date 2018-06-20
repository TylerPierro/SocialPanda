import { IGroups } from ".";
import { groupsTypes } from "../actions/groups/groups.types";

const initialState: IGroups = {
  citySearch: '',
  msgBoard: [],
  tags: ['']
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
        citySearch: action.payload.citySearch
      };
    case groupsTypes.UPDATE_DISPLAY:
      return {
        ...state,
        tags: action.payload.tags
      };
  }

  return state;
}
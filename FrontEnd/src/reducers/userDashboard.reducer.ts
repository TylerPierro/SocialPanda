import { IDashboard } from ".";
import { dashboardTypes } from "../actions/userDashboard/userDashboard.types";

const initialState: IDashboard = {
  displayGroups: [],
}

export const dashboardReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case dashboardTypes.UPDATE_USER_GROUPS:
    console.log(action.payload.displayGroups)
      return {
        ...state,
        displayGroups: action.payload.displayGroups
      };
  }

  return state;
}
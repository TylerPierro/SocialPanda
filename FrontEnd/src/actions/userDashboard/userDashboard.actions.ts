import { dashboardTypes } from "./userDashboard.types";

export const updateGroupsDisplay = (displayGroups: object) => {
  return {
    payload: {
      displayGroups
    },
    type: dashboardTypes.UPDATE_USER_GROUPS
  }
}

// SEARCHES BY USER
export const  updateGroups = (user: string) => (dispatch: any) => {
  fetch(' https://dwbbn4f58g.execute-api.us-east-2.amazonaws.com/dev/groups/user/' + user, {
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(resp => {
      console.log(resp.status)
      if (resp.status === 401) {
        console.log('Nothing in your area.')
        return;
      }
      if (resp.status === 200) {
        return resp.json();
      }
      return;
    })
    .then(data => {
      // console.log(JSON.parse(data));
      console.log("searching: " + user);
      dispatch({
        payload: {
          displayGroups: data
        },
        type: dashboardTypes.UPDATE_USER_GROUPS
      })
    })
    .catch(err => {
      console.log('Unable to fetch groups');
    })
}
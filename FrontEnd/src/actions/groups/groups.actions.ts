import { Post } from "../../model/Post";
import { groupsTypes } from "./groups.types";

export const createPost = (msg: Post) => {
  return {
    payload: {
      msg
    },
    type: groupsTypes.CREATE_POST
  }
}

export const updateCity = (citySearch: string) => {
  return {
    payload: {
      citySearch
    },
    type: groupsTypes.UPDATE_CITY
  }
}

export const updateDisplay = (displayTags: string) => (dispatch: any) => {
  fetch('https://dwbbn4f58g.execute-api.us-east-2.amazonaws.com/dev/messages/' + displayTags, {
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
      console.log(data);
      dispatch({
        payload: {
          displayTags: data.Items
        },
        type: groupsTypes.UPDATE_DISPLAY
      })
    })
    .catch(err => {
      console.log('Unable to log in at this time, please try again later');
    })
}
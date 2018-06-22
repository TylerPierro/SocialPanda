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

export const updateTag = (tagSearch: string) => {
  return {
    payload: {
      tagSearch
    },
    type: groupsTypes.UPDATE_TAG
  }
}

export const updateMsgBoard = (msgBoard: object) => {
  return {
    payload: {
      msgBoard
    },
    type: groupsTypes.UPDATE_MSG_BOARD
  }
}

// SEARCHES BY JUST LOCATION
export const updateDisplay1 = (displayGroups: string) => (dispatch: any) => {
  fetch('https://dwbbn4f58g.execute-api.us-east-2.amazonaws.com/dev/messages/' + displayGroups, {
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
      // console.log(data.Items[0].messages.values[0]);
      dispatch({
        payload: {
          displayGroups: data.Items
        },
        type: groupsTypes.UPDATE_DISPLAY
      })
    })
    .catch(err => {
      console.log('Unable to log in at this time, please try again later');
    })
}

// SEARCHES BY LOCATION AND TAG
export const updateDisplay2 = (displayGroups: string, displayTags: string) => (dispatch: any) => {
  console.log('Location: ' + displayGroups + ' Tag: ' + displayTags);
  fetch('https://dwbbn4f58g.execute-api.us-east-2.amazonaws.com/dev/messages/' + displayGroups +'/' + displayTags, {
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
      console.log("searching: " + displayGroups + '\t' + displayTags);
      dispatch({
        payload: {
          displayGroups: [data.Item]
          // msgBoard: data.Items.messages.values
        },
        type: groupsTypes.UPDATE_DISPLAY
      })
    })
    .catch(err => {
      console.log('Unable to log in at this time, please try again later');
    })
}
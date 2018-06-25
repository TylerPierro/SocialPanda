import { groupsTypes } from "./groups.types";
import * as awsCognito from 'amazon-cognito-identity-js';

const cognitoData = {
  ClientId: '12345du353sm7khjj1q',
  UserPoolId: 'us-east-1_Iqc12345'
};
const userPool = new awsCognito.CognitoUserPool(cognitoData);
const cognitoUser = userPool.getCurrentUser();
let username = '';
if (cognitoUser !== null) {
  username = cognitoUser.getUsername();
}

export const submitNewPost = (newPost: string, city: string) => (dispatch: any) => {
  console.log(newPost);
  fetch("https://dwbbn4f58g.execute-api.us-east-2.amazonaws.com/dev/messages", {
    body: JSON.stringify({
      "Location": city,
      "Tag": "LARP",
      "messages": {
        "box": newPost,
        "time": Date.now().toLocaleString('en-US'),
        "user": username
      }
    }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'PUT'
  })
    .then(resp => {
      console.log(resp.status);
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
      dispatch({
        payload: {
          newPost: data.Items.messages.values
        },
        type: groupsTypes.SUBMIT_NEW_POST
      });
  })
  .catch(err => {
    console.log('Unable to log in at this time, please try again later');
  })
}

export const updateCity = (citySearch: string) => {
  return {
    payload: {
      citySearch
    },
    type: groupsTypes.UPDATE_CITY
  }
}

export const updateMsgBoard = (msgBoard: object) => {
  console.log(msgBoard)
  return {
    payload: {
      msgBoard
    },
    type: groupsTypes.UPDATE_MSG_BOARD
  }
}

export const updateNewPost = (newPost: string) => {
  return {
    payload: {
      newPost
    },
    type: groupsTypes.UPDATE_NEW_POST
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
      // console.log(data.Items);
      // console.log("searching: " + displayGroups);
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
  fetch('https://dwbbn4f58g.execute-api.us-east-2.amazonaws.com/dev/messages/' + displayGroups + '/' + displayTags, {
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
          displayGroups: [data.Item],
          groupStatus: data.Item.status
        },
        type: groupsTypes.UPDATE_DISPLAY
      })
    })
    .catch(err => {
      console.log('Unable to log in at this time, please try again later');
    })
}

export const updateTag = (tagSearch: string) => {
  return {
    payload: {
      tagSearch
    },
    type: groupsTypes.UPDATE_TAG
  }
}
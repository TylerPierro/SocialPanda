import { Post } from "../../model/Post";
import { newGroupTypes } from "./newGroup.types";

export const updateDescription = (description: Post) => {
  return {
    payload: {
      description
    },
    type: newGroupTypes.UPDATE_DESCRIPTION
  }
}

export const updateLocation = (location: string) => {
  return {
    payload: {
      location
    },
    type: newGroupTypes.UPDATE_LOCATION
  }
}

export const updateStatus = (status: string) => {
  return {
    payload: {
      status
    },
    type: newGroupTypes.UPDATE_STATUS
  }
}

export const updateTag = (tag: object) => {
  return {
    payload: {
      tag
    },
    type: newGroupTypes.UPDATE_TAG
  }
}

// // SEARCHES BY JUST LOCATION
// export const updateDisplay1 = (displayGroups: string) => (dispatch: any) => {
//   fetch('https://dwbbn4f58g.execute-api.us-east-2.amazonaws.com/dev/messages/' + displayGroups, {
//     headers: {
//       'content-type': 'application/json'
//     }
//   })
//     .then(resp => {
//       console.log(resp.status)
//       if (resp.status === 401) {
//         console.log('Nothing in your area.')
//         return;
//       }
//       if (resp.status === 200) {
//         return resp.json();
//       }
//       return;
//     })
//     .then(data => {
//       // console.log(data.Items[0].messages.values[0]);
//       dispatch({
//         payload: {
//           displayGroups: data.Items
//         },
//         type: groupsTypes.UPDATE_DISPLAY
//       })
//     })
//     .catch(err => {
//       console.log('Unable to log in at this time, please try again later');
//     })
// }

// // SEARCHES BY LOCATION AND TAG
// export const updateDisplay2 = (displayGroups: string, displayTags: string) => (dispatch: any) => {
//   console.log('Location: ' + displayGroups + ' Tag: ' + displayTags);
//   fetch('https://dwbbn4f58g.execute-api.us-east-2.amazonaws.com/dev/messages/' + displayGroups +'/' + displayTags, {
//     headers: {
//       'content-type': 'application/json'
//     }
//   })
//     .then(resp => {
//       console.log(resp.status)
//       if (resp.status === 401) {
//         console.log('Nothing in your area.')
//         return;
//       }
//       if (resp.status === 200) {
//         return resp.json();
//       }
//       return;
//     })
//     .then(data => {
//       console.log("searching: " + displayGroups + '\t' + displayTags);
//       dispatch({
//         payload: {
//           displayGroups: [data.Item]
//           // msgBoard: data.Items.messages.values
//         },
//         type: groupsTypes.UPDATE_DISPLAY
//       })
//     })
//     .catch(err => {
//       console.log('Unable to log in at this time, please try again later');
//     })
// }

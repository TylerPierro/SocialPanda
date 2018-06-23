// import { newGroupTypes } from "./newGroup.types";

// UPDATES GROUPS TABLE WITH NEW GROUP INFORMATION
export const addNewGroup = (newGroupObject: object) => 
// (dispatch: any) => 
{
  fetch('https://dwbbn4f58g.execute-api.us-east-2.amazonaws.com/dev/messages/' , {
    body: JSON.stringify({
        "Admin": "true",
        "Description": newGroupObject,
        "Location_Tag": newGroupObject,
        "Privacy": newGroupObject,
        "Users": "Fernando"
    }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
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
      console.log(data.Items);
    //   dispatch({
    //     payload: {
    //       displayGroups: data.Items
    //     },
    //     type: newGroupTypes.UPDATE_DISPLAY
    //   })
    })
    .catch(err => {
      console.log('Unable to log in at this time, please try again later');
    })
}

// // // SEARCHES BY LOCATION AND TAG
// // export const updateDisplay2 = (displayGroups: string, displayTags: string) => (dispatch: any) => {
// //   console.log('Location: ' + displayGroups + ' Tag: ' + displayTags);
// //   fetch('https://dwbbn4f58g.execute-api.us-east-2.amazonaws.com/dev/messages/' + displayGroups +'/' + displayTags, {
// //     headers: {
// //       'content-type': 'application/json'
// //     }
// //   })
// //     .then(resp => {
// //       console.log(resp.status)
// //       if (resp.status === 401) {
// //         console.log('Nothing in your area.')
// //         return;
// //       }
// //       if (resp.status === 200) {
// //         return resp.json();
// //       }
// //       return;
// //     })
// //     .then(data => {
// //       console.log("searching: " + displayGroups + '\t' + displayTags);
// //       dispatch({
// //         payload: {
// //           displayGroups: [data.Item]
// //           // msgBoard: data.Items.messages.values
// //         },
// //         type: groupsTypes.UPDATE_DISPLAY
// //       })
// //     })
// //     .catch(err => {
// //       console.log('Unable to log in at this time, please try again later');
// //     })
// // }

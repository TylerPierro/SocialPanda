import { messagesTypes } from "./messages.types";

export const displayPosts = (displayGroups: string, displayTags: string) => (dispatch: any) => {
  console.log('Location: ' + displayGroups + ' Tag: ' + displayTags);
  fetch('https://dwbbn4f58g.execute-api.us-east-2.amazonaws.com/dev/messages/' + displayGroups +'/' + displayTags, {
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(resp => {
      // console.log(resp.status)
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
      // console.log("searching: " + displayGroups + '\t' + displayTags);
      dispatch({
        payload: {
          msgBoard: [data.Item.messages]
        },
        type: messagesTypes.DISPLAY_POSTS
      })
    })
    .catch(err => {
      console.log('Unable to log in at this time, please try again later');
    })
}
import * as React from 'react';
import './newGroupStyle.css';
import * as awsCognito from 'amazon-cognito-identity-js';

const data = {
  ClientId: '12345du353sm7khjj1q',
  UserPoolId: 'us-east-1_Iqc12345'
};
const userPool = new awsCognito.CognitoUserPool(data);
const cognitoUser = userPool.getCurrentUser();

if (cognitoUser != null) {
  cognitoUser.getSession((err, session) => {
    if (err) {
      alert(err);
      return;
    }
    console.log('session validity: ' + session.isValid());
  });
}

const h1style = {
  // background: "#c9ff9e",
  // borderRadius: 30,
  margin: "auto",
  padding: "120px"
};

export class NewGroupComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public createNewGroup = (event: any) => {
    event.preventDefault()
    const form = event.target;
    const locationTag = form.newGroupLocation.value + "-" + form.newGroupName.value;

    const newGroupObject = {
      Description: form.newGroupDescription.value,
      LocationTag: locationTag,
      Privacy: form.newGroupPrivacy.value,
    }
    console.log(newGroupObject)

    if (cognitoUser !== null) {

      fetch('https://dwbbn4f58g.execute-api.us-east-2.amazonaws.com/dev/groups', {
        body: JSON.stringify({
          "Admin": "true",
          "Description": newGroupObject.Description,
          "Location_Tag": newGroupObject.LocationTag,
          "Privacy": newGroupObject.Privacy,
          // "Users": "Fernando",
          "Users": cognitoUser.getUsername()
        }),
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
        .then(fetchData => {
          console.log(fetchData.Items);
        })
        .catch(err => {
          console.log('Unable to log in at this time, please try again later');
        })
    }
    else{
      alert("Not Logged In");
    }
  }

  public render() {
  return (
    <form id="social-form" onSubmit={this.createNewGroup} action="action_page.php" style={{ border: '1px solid #ccc' }}>
      <div id="social-div" className="stripe stripe--inverted stripe--photoHero inverted start-photo-banner">
        <div id="title">
          <h1 style={h1style}>Be a Social Panda and start your own group!</h1>
        </div>
      </div>
      <div className="container">
        <hr />
        <label htmlFor="newGroupLocation" id="newGroupLocationTitle"><b>What city is your new group in?</b></label>
        <input id="newGroupLocation" type="text" placeholder="Ex. Tammpa, Orlando, etc..." name="newGroupLocation" required />

        <label htmlFor="newGroupName"><b>What will your group be named?</b></label>
        <input id="newGroupName" type="text" placeholder="Ex. Night life, Food, etc..." name="newGroupName" required />

        <br />
        <label htmlFor="newGroupDescription"><b>Give a description about your new group</b></label>
        <input id="newGroupDescription" type="text" placeholder="Ex. Tampa's group for all things about food" name="psw-repeat" required />


        <label htmlFor="newGroupName"><b>Privacy Setting</b></label>
        <br />

        <div>

          <input type="radio" name="newGroupPrivacy" id="newGroupPublic" value="public" required />
          <label htmlFor="newGroupPublic">Public</label>
          <div className="reveal-if-active">
            <label htmlFor="If public is selected">New users must request to join the group</label>
          </div>
        </div>

        <div>
          <input type="radio" name="newGroupPrivacy" id="newGroupPrivate" value="private" />
          <label htmlFor="newGroupPublic" >Private</label>

          <div className="reveal-if-active">
            <label htmlFor="If private is selected">New users must request to join the group</label>
          </div>
        </div>
        <br />

        {/* <p>By creating a group you agree to our <a href="#" style={{ color: 'dodgerblue' }}>Terms &amp; Privacy</a>.</p> */}
        <div className="clearfix">
          <button type="submit" className="newGroupButton">Create new group!</button>
        </div>
      </div>
    </form>
  );
}
}
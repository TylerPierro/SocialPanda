import * as React from 'react';
import './newGroupStyle.css';
import * as awsCognito from 'amazon-cognito-identity-js';

const h1style = {
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

    const cognitoData = {
      ClientId: '368mt4qt7ghc8jp8fsvu308i98',
      UserPoolId: 'us-east-2_eoUFN3DJn'
    };
    const userPool = new awsCognito.CognitoUserPool(cognitoData);
    const cognitoUser = userPool.getCurrentUser();
    console.log(cognitoUser && cognitoUser.getUsername());

    if (cognitoUser != null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          return;
        }
      });
    }

    const form = event.target;

    const newGroupObject = {
      Description: form.newGroupDescription.value,
      Location: form.newGroupLocation.value,
      Privacy: form.newGroupPrivacy.value,
      Tag: form.newGroupName.value
    }

    if (cognitoUser != null) {

      fetch('https://dwbbn4f58g.execute-api.us-east-2.amazonaws.com/dev/groups', {
        body: JSON.stringify({
          "Admin": "true",
          "Description": newGroupObject.Description,
          "Location": newGroupObject.Location,
          "Privacy": newGroupObject.Privacy,
          "Tag": newGroupObject.Tag,
          "Users": cognitoUser.getUsername()
        }),
        method: 'POST'
      })
        .then(resp => {
          return resp.status;
        })
        .then(data => {
          this.props.history.push('/groups');
        })
        .catch(err => {
          console.log(err);
        })
    }
    else {
      this.props.history.push('/sign-in');
    }
  }

  public render() {
    return (
      <form id="social-form" onSubmit={this.createNewGroup} action="action_page.php" style={{ border: '1px solid #ccc' }}>
        <div id="offset"></div>
        <div id="social-div" className="stripe stripe--inverted stripe--photoHero inverted start-photo-banner">
          <div id="title">
            <h1 style={h1style}>Be a Social Panda and start your own group!</h1>
          </div>
        </div>
        <div className="container">
          <hr />
          <label htmlFor="newGroupLocation" id="newGroupLocationTitle"><b>What city is your new group in?</b></label>
          <input id="newGroupLocation" type="text" placeholder="Ex. Tampa, Orlando, etc..." name="newGroupLocation" required />

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

          <div className="clearfix">
            <button type="submit" className="newGroupButton">Create new group!</button>
          </div>
        </div>
      </form>
    );
  }
}
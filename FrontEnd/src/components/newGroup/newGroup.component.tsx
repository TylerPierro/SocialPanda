import * as React from 'react';
import './newGroupStyle.css';
import * as awsCognito from 'amazon-cognito-identity-js';

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

    const cognitoData = {
      ClientId: '2mrd11cqf2anle4nsid84uv5hj',
      UserPoolId: 'us-east-2_vCSElhZSd'
    };
    const userPool = new awsCognito.CognitoUserPool(cognitoData);
    const cognitoUser = userPool.getCurrentUser();
    console.log(cognitoUser);

    
    if (cognitoUser != null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          alert(err);
          return;
        }
        console.log('session validity: ' + session.isValid());
      });
    }

    const form = event.target;

    const newGroupObject = {
      Description: form.newGroupDescription.value,
      Location: form.newGroupLocation.value,
      Privacy: form.newGroupPrivacy.value,
      Tag: form.newGroupName.value
    }
    console.log(newGroupObject)



    if (cognitoUser != null) {

      // fetch('https://dwbbn4f58g.execute-api.us-east-2.amazonaws.com/dev/messages', {
      //   body: JSON.stringify({
      //     "Location": newGroupObject.Location,
      //     "Status": newGroupObject.Privacy,
      //     "Tag": newGroupObject.Tag,
      //     // "Users": cognitoUser.getUsername()
      //   }),
      //   method: 'PUT'
      // })
      //   .then(resp => {
      //     console.log(resp.status)
      //     return resp.json();
      //   })
      //   .then(data => {
      //     console.log(data.Items);
      //     // this.props.history.push('/groups');
      //   })
      //   .catch(err => {
      //     alert("Check in catch in newGroup.components. Switching componenets in catch.");
      //     // this.props.history.push('/groups');
      //     console.log('Unable to log in at this time, please try again later');
      //   })

      fetch('https://dwbbn4f58g.execute-api.us-east-2.amazonaws.com/dev/groups', {
        body: JSON.stringify({
          "Admin": "true",
          "Description": newGroupObject.Description,
          "Location": newGroupObject.Location,
          // "Location_Tag": newGroupObject.Location + "-" + newGroupObject.Tag,
          "Privacy": newGroupObject.Privacy,
          "Tag": newGroupObject.Tag,
          "Users": cognitoUser.getUsername()
        }),
        method: 'POST'
      })
        .then(resp => {
          console.log(resp)
          // return resp.json();
          return resp.status;

        })
        .then(data => {
          console.log(data);
          this.props.history.push('/groups');
        })
        .catch(err => {
          alert("Check in catch in newGroup.components. Switching componenets in catch.");
          // this.props.history.push('/groups');
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
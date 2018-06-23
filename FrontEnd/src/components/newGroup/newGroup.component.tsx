
import * as React from 'react';
import './newGroupStyle.css';
import { INewGroup } from '../../reducers';


interface IProps extends INewGroup {
  addNewGroup: (formObj: object) => void
}

const h1style = {
  // background: "#c9ff9e",
  // borderRadius: 30,
  margin: "auto",
  padding: "120px"
};

export class NewGroupComponent extends React.Component<IProps, any> {

  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public createNewGroup = (event: any) => {
    event.preventDefault()
    const form = event.target;
    const locationTag = form.newGroupLocation.value + "-" + form.newGroupName.value;

    const newGroupObject = {
      Admin: "true",
      Description: form.newGroupDescription.value,
      LocationTag: locationTag,
      Privacy: form.newGroupPrivacy.value,
      Users: "Fernando"
    }
    console.log(newGroupObject)

    this.props.addNewGroup(newGroupObject);
  }

  // public submit = (e: any) => {
  //   e.preventDefault();
  //   const { username, password } = this.props; // destructuring
  //   fetch('http://localhost:3001/users/login', {
  //     body: JSON.stringify({ username, password }),
  //     credentials: 'include',
  //     headers: {
  //       'content-type': 'application/json'
  //     },
  //     method: 'POST'
  //   })
  //     .then(resp => {
  //       console.log(resp.status)
  //       if (resp.status === 401) {
  //         this.props.updateError('Invalid Credentials, try again.')
  //         return;
  //       }
  //       if (resp.status === 200) {
  //         return resp.json();
  //       }
  //       return;
  //     })
  //     .then(data => {
  //       console.log(data);
  //       this.props.history.push('/clicker');
  //     })
  //     .catch(err => {
  //       this.props.updateError('Unable to log in at this time, please try again later');
  //     })
  // }

  public render() {
    return (
      <form id="social-form"  onSubmit={this.createNewGroup}   action="action_page.php" style={{ border: '1px solid #ccc' }}>
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
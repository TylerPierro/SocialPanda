import * as React from 'react';
import './groupsSearch.css';
import { IGroups } from '../../reducers';
import { CityTag } from '../../model/CityTag';
import * as awsCognito from 'amazon-cognito-identity-js';
import { Redirect } from 'react-router';
import { ApiAxios } from '../../interceptors/api-axios';
import { environment } from '../environment';


interface IProps extends IGroups {
  submitNewPost: (newPost: string, city: string) => void
  updateCity: (city: string) => void
  updateDisplay1: (displayGroups: string) => void
  updateDisplay2: (displayGroups: string, displayTags: string) => void
  updateError: (error: string) => void
  updateMsgBoard: (msgBoard: object) => void
  updateNewPost: (box: string) => void
  updateTag: (tag: string) => void
}

const cognitoData = {
  ClientId: '368mt4qt7ghc8jp8fsvu308i98',
  UserPoolId: 'us-east-2_eoUFN3DJn'
};
const userPool = new awsCognito.CognitoUserPool(cognitoData);
const cognitoUser = userPool.getCurrentUser();

if (cognitoUser != null) {
  cognitoUser.getSession((err, session) => {
    if (err) {
      return;
    }
  });
}

// ADDED BACKGROUND COLOR AND STYLE TO EACH GROUP SO THEY ARE SEPERATED NOW!
const groupsStyle = {
  background: "#c9ff9e",
  borderRadius: 30,
  margin: "20px",
  padding: "20px"
};

export class GroupsComponent extends React.Component<IProps, any> {
  public state = {
    location: this.props.updateCity,
    tag: this.props.updateTag,
    toMessages: -1,
  }

  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public updateError = (e: any) => {
    const password = e.target.value;
    this.props.updateError(password);
  }

  public displayMessageGroup = (msgBoard: CityTag, e: any) => {
    e.preventDefault();
    let test: boolean = true;
    console.log(msgBoard.Tag);
    const group = `${msgBoard.Location.split(' ').join('+')}-${msgBoard.Tag.split(' ').join('+')}`;
    console.log(group);
    const username = cognitoUser && cognitoUser.getUsername();
    console.log(username);
    fetch(`https://dwbbn4f58g.execute-api.us-east-2.amazonaws.com/dev/groups/${group}/user/${username}`, {
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(resp => {
        console.log(resp.status)
        if (resp.status === 200) {
          return resp.json();
        } else {
          console.log('Either no matching group or user');
          return resp.status;
        }
      })
      .then(data => {
        console.log(data);
        this.setState(() => ({
          location: msgBoard.Location,
          tag: msgBoard.Tag,
          toMessages: 1
        }))
      })
      .catch(err => {
        console.log(err);
        console.log('User is not in group');
        this.setState(() => ({
          location: msgBoard.Location,
          tag: msgBoard.Tag,
          toMessages: 0
        }))
        test = false;
      })
    if (test === true) {
      // Then switch to messages component
      // Pass paramaters msgBoard.location, msgBoard.tag
    } else {
      // Display "join group button"
      // if (group.privacy === 'private') {
      // Send request to admins
      // Display request sent to admin// if (group.privacy === 'private') {
      // Send request to admins
      // Display request sent to admin
      // }
    }
  }

  public joinGroup = (locationTag: string, e: any) => {
    console.log(locationTag);
    console.log(cognitoUser && cognitoUser.getUsername());
    ApiAxios.patch(environment.gateway + 'groups', {
      "Admin": "false",
      "Location_Tag": locationTag,
      "Users": cognitoUser && cognitoUser.getUsername()
    })
      .then(resp => {
        return resp.status;
      })
      .then(data => {
        console.log(data);
        this.setState(() => ({
          toMessages: 1
        }))
      })
      .catch(err => {
        console.log("Failed to add user to group");
        console.log(err);
      })
  }

  public submit = (e: any) => {
    e.preventDefault();
    let location = this.props.citySearch;
    location = location.replace(' ', '+')
    let tag = this.props.tagSearch;
    tag = tag.replace(' ', '+')
    if (tag === '' || tag === null) {
      this.props.updateDisplay1(location);
    }
    else {
      this.props.updateDisplay2(location, tag);
    }
  }

  public render() {
    if (this.state.toMessages === 1) {
      return <Redirect to={`/messages/${String(this.state.location).split(' ').join('+')}/${String(this.state.tag).split(' ').join('+')}`} />
    }
    return (
      <div id="groupBody">
        <form onSubmit={this.submit}>
          <div className="allSearch">
            <input className="searchBar"
              type="string"
              value={this.props.citySearch}
              onChange={(e: any) => this.props.updateCity(e.target.value)}
              placeholder="Search by Location" />

            <input type="submit" id="searchButton" className="btn search-submit" value="Search" />

            <input className="searchBar2"
              type="string"
              value={this.props.tagSearch}
              onChange={(e: any) => this.props.updateTag(e.target.value)}
              placeholder="Search a Tag" />
          </div>
        </form>
        <br />
        <div className="tagList">
          {this.props.displayGroups.length > 0
            ?
            this.props.displayGroups.map(disp =>
              <h3 style={groupsStyle} key={disp.Tag}
                onClick={this.displayMessageGroup.bind(this, disp)}
              >{disp.Tag} <br /> <h5>{disp.Description}</h5></h3>)
            :
            this.props.citySearch !== "" ? <h3 id="noMessages">There are no groups in this area.<br /> Don't be shy! Start a group !</h3> : null
          }
        </div>
        <div className="join">
          {this.state.toMessages ? null : <button type="button" id="joinButton" onClick={this.joinGroup.bind(this, `${this.state.location}-${this.state.tag}`)}>Join Group</button>}
        </div>
      </div>
    );
  }
}
import * as React from 'react';
import './groupsSearch.css';
import { IGroups } from '../../reducers';
import { CityTag } from '../../model/CityTag';
import * as awsCognito from 'amazon-cognito-identity-js';
import { Redirect } from 'react-router';

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
  ClientId: '2mrd11cqf2anle4nsid84uv5hj',
  UserPoolId: 'us-east-2_vCSElhZSd'
};
const userPool = new awsCognito.CognitoUserPool(cognitoData);
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

// ADDED BACKGROUND COLOR AND STYLE TO EACH MESSAGE SO THEY ARE SEPERATED NOW!
// const messageStyle = {
//   background: "#86b2d8",
//   borderRadius: 20,
//   margin: "20px",
//   padding: "20px"
// };

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
    toMessages: -1
  }

  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public updateError = (e: any) => {
    const password = e.target.value;
    this.props.updateError(password);
  }

  public displayMessageGroup(msgBoard: CityTag, e: any) {
    e.preventDefault();
    let test: boolean = true;
    const group = `${msgBoard.Location.replace(' ','+')}-${msgBoard.Tag.replace(' ','+')}`;
    console.log(group);
    const username = cognitoUser&&cognitoUser.getUsername();
    console.log(username);
    fetch (`https://dwbbn4f58g.execute-api.us-east-2.amazonaws.com/dev/groups/${group}/user/${username}`, {
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
        // loadMessagesComponent(msgBoard.Location.replace(' ','+'), msgBoard.Tag.replace(' ','+'));
        this.setState(() => ({
          location: msgBoard.Location.replace(' ','+'),
          tag: msgBoard.Tag.replace(' ','+'),
          toMessages: 1
        }))
      })
      .catch(err => {
        console.log(err);
        console.log('User is not in group');
        this.setState(() => ({
          toMessages: 0
        }))
        test = false;
      })
    if(test === true) {
      // Then switch to messages component
      // Pass paramaters msgBoard.location, msgBoard.tag
    } else {
      // Display "join group button"
       // if (group.privacy === 'private') {
         // Send request to admins
         // Display request sent to admin
       // } else {
         // If public, then switch to messages component
         // Pass paramaters msgBoard.location, msgBoard.tag
       // }
    }
  }

  public createPost = (e: any) => {
    e.preventDefault();
    // if (cognitoUser !== null) {
      const city = this.props.citySearch;
      const box = this.props.newPost;
      console.log(box);
      this.props.submitNewPost(box, city);
      // this.setState(this.props.updateDisplay2(this.props.citySearch, tagT));
    // }
  }

  public submit = (e: any) => {
    // console.log(this.props.citySearch);
    // console.log(this.props.tagSearch);
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
      return <Redirect to={`/messages/${this.state.location}/${this.state.tag}`} />
    }
    return (
      <div>
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
          {this.props.displayGroups.map(disp =>
            <h3 style={groupsStyle} key={disp.Tag} 
            onClick={this.displayMessageGroup.bind(this, disp)}
            >{disp.Tag}</h3>
            // <h3>-{disp.}</h3>
            // <img src={disp.groupPic}/>
          )}
        </div>
        <div className="join">
          { this.state.toMessages ? null : <button type="submit" id="joinButton" /> }
        </div>
      </div>
    );
  }
}
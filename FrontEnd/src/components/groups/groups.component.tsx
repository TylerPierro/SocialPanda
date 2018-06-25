import * as React from 'react';
import './groupsSearch.css';
import { IGroups } from '../../reducers';
import { CityTag } from '../../model/CityTag';
import * as awsCognito from 'amazon-cognito-identity-js';

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

// ADDED BACKGROUND COLOR AND STYLE TO EACH MESSAGE SO THEY ARE SEPERATED NOW!
const messageStyle = {
  background: "#86b2d8",
  borderRadius: 20,
  margin: "20px",
  padding: "20px"
};

// ADDED BACKGROUND COLOR AND STYLE TO EACH GROUP SO THEY ARE SEPERATED NOW!
const groupsStyle = {
  background: "#c9ff9e",
  borderRadius: 30,
  margin: "20px",
  padding: "20px"
};


export class GroupsComponent extends React.Component<IProps, any> {

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
    console.log(this.props.updateTag)
    if(msgBoard !== undefined) {
      this.props.updateMsgBoard(JSON.parse(JSON.stringify(msgBoard)).values);
      // this.props.updateMsgBoard(msgBoard.messages);
    }
    else{
      alert("No messages here.")
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
    console.log(this.props.citySearch);
    console.log(this.props.tagSearch);
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
            onClick={this.displayMessageGroup.bind(this, disp.messages)}
            >{disp.Tag}</h3>
            // <h3>-{disp.}</h3>
            // <img src={disp.groupPic}/>
          )}
        </div>
        <div className="messageBoard">
          {
              (JSON.parse(JSON.stringify(this.props.msgBoard))).map(disp =>
                <div style={messageStyle} key={JSON.parse(disp).time} className="postBox">
                  <h4> {JSON.parse(disp).user} </h4>
                  <p> {JSON.parse(disp).box} </p>
                  <h5> {JSON.parse(disp).time} </h5>
                </div>
              )
            
            // (JSON.parse(JSON.stringify(this.props.msgBoard))).map(disp =>
            //   <div style={messageStyle} key={JSON.parse(disp).time} className="postBox">
            //     <h4> {JSON.parse(disp).user} </h4>
            //     <p> {JSON.parse(disp).box} </p>
            //     <h5> {JSON.parse(disp).time} </h5>
            //   </div>
            // )
          }
          {/* <form onSubmit={this.createPost}> */}
            <input className="messageBox"
              type="string"
              value={this.props.newPost}
              onChange={(e: any) => this.props.updateNewPost(e.target.value)}
              placeholder="Be a social panda" />
            <input onClick={this.createPost.bind(this)} type="submit" id="sendButton" className="btn search-submit" value="Send" />
          {/* </form> */}
        </div>
      </div>
    );
  }
}
import * as React from 'react';
import './messages.css';
import { IMessages } from '../../reducers';
import { CityTag } from '../../model/CityTag';
import * as awsCognito from 'amazon-cognito-identity-js';
import { ApiAxios } from '../../interceptors/api-axios';
import { environment } from '../environment';

interface IProps extends IMessages {
  submitNewPost: (newPost: string) => void
  updateDisplay1: (displayGroups: string) => void
  updateDisplay2: (displayGroups: string, displayTags: string) => void
  updateError: (error: string) => void
  updateMsgBoard: (msgBoard: object) => void
  updateNewPost: (box: string) => void
}

const cognitoData = {
  ClientId: '12345du353sm7khjj1q',
  UserPoolId: 'us-east-1_Iqc12345'
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
const messageStyle = {
  background: "#86b2d8",
  borderRadius: 20,
  margin: "20px",
  padding: "20px"
};

export class MessagesComponent extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public componentWillMount() {
    this.setState({
      user: cognitoUser&&cognitoUser.getUsername()
    })
    const params = window.location.href.split('/');
    console.log(params);
    const location = params[5];
    const tag = params[6];
    ApiAxios.get(environment.gateway + `messages/${location}/${tag}`)
      .then(resp => {
        console.log(resp.status)
        if (resp.status === 200) {
          console.log(resp.data);
          return resp.data;
        } else if (resp.status === 403) {
          console.log("User does not belong to this group");
          return resp.status;
        } else {
          console.log('Either no matching group or user');
          return resp.status;
        }
      })
      .then(data => {
        console.log(data.Item.messages.values);
        this.props.updateMsgBoard(data.Item.messages.values);
      })
      .catch(err => {
        console.log('Error building the message board');
        console.log(err);
      })
  }

  public updateError = (e: any) => {
    const password = e.target.value;
    this.props.updateError(password);
  }

  public displayMessageGroup(msgBoard: CityTag, e: any) {
    e.preventDefault();
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
      const box = this.props.newPost;
      this.props.submitNewPost(box);
      // this.setState(this.props.updateDisplay2(this.props.citySearch, tagT));
    // }
  }

  // public submit = (e: any) => {
  //   console.log(this.props.citySearch);
  //   console.log(this.props.tagSearch);
  //   e.preventDefault();
  //   let location = this.props.citySearch;
  //   location = location.replace(' ', '+')
  //   let tag = this.props.tagSearch;
  //   tag = tag.replace(' ', '+')
  //   this.props.updateDisplay2(location, tag);
  // }

  public render() {
    return (
      <div>
        <div className="tagList">
          {this.props.displayGroups.map(disp =>
            <h3 
            // style={groupsStyle} 
            key={disp.Tag} 
            onClick={this.displayMessageGroup.bind(this, disp.messages)}
            >{disp.Tag}</h3>
            // <h3>-{disp.}</h3>
            // <img src={disp.groupPic}/>
          )}
        </div>
        <div className="messageBoard">
          {
            JSON.parse(JSON.stringify(this.props.msgBoard)).map(disp =>
              <div style={messageStyle} key={JSON.parse(disp).time} className="postBox">
                <h4> {JSON.parse(disp).user} </h4>
                <p> {JSON.parse(disp).box} </p>
                <h5> {JSON.parse(disp).time} </h5>
              </div>
            )
          }
          <form onSubmit={this.createPost.bind(this)}>
            <input className="messageBox"
              type="string"
              value={this.props.newPost}
              onChange={(e: any) => this.props.updateNewPost(e.target.value)}
              placeholder="Be a social panda" />
            <input onClick={this.createPost.bind(this)} type="submit" id="sendButton" className="btn search-submit" value="Send" />
          </form>
        </div>
      </div>
    );
  }
}
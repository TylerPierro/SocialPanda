import * as React from 'react';
import './messages.css';
import { IMessages } from '../../reducers';
import * as awsCognito from 'amazon-cognito-identity-js';
import { ApiAxios } from '../../interceptors/api-axios';
import { environment } from '../environment';
import { Redirect } from 'react-router';
import { updateGroups } from '../../actions/messages/messages.actions';
import { RouteProps } from 'react-router';

interface IProps extends IMessages, RouteProps {
  clearMessageBar: () => void
  history: any;
  submitNewPost: (location: string, tag: string, user: string, newPost: string) => void
  updateGroupsDisplay: (displayGroups: object) => void
  updateError: (error: string) => void
  updateMsgBoard: (msgBoard: object) => void
  updateNewPost: (box: string) => void
}

// ADDED BACKGROUND COLOR AND STYLE TO EACH MESSAGE SO THEY ARE SEPERATED NOW!
const messageStyle = {
  background: "#86b2d8",
  borderRadius: 20,
  // margin: "20px",
  padding: "20px",
  marginTop: "2%",
  marginLeft: "-15%",
  marginRight: "21%"
};

export class MessagesComponent extends React.Component<IProps, any> {

  constructor(props: any) {
    super(props);

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
    } else {
      this.props.history.push('/sign-in');
    }

    const params = window.location.href.split('/');
    const loc = params[5];
    const t = params[6];

    this.state = {
      hasMessages: true,
      location: loc,
      locationTag: `${loc.split('+').join(' ')}-${t.split('+').join(' ')}`,
      tag: t,
      toMessages: -1,
      user: cognitoUser && cognitoUser.getUsername()
    }

    ApiAxios.get('https://dwbbn4f58g.execute-api.us-east-2.amazonaws.com/dev/groups/user/' + this.state.user)
      .then(resp => {
        if (resp.status === 200) {
          return resp;
        }
        return;
      })
      .then(data => {
        console.log("searching: " + this.state.user);
        console.log(this.state.locationTag);
        console.log(data&&data.data.indexOf(this.state.locationTag));
        if(data&&data.data.indexOf(this.state.locationTag) === -1) {
          this.props.history.push('/dashboard');
        }
      })
      .catch(err => {
        console.log('Unable to fetch groups');
      })
  }

  public componentWillMount() {
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

    // SPLITS URL INTO PIECES TO ALLOW US TO GRAB THE LOCATION AND TAG FROM PARAMS
    const params = window.location.href.split('/');
    const location = params[5];
    const tag = params[6];
    this.setState({
      user: cognitoUser && cognitoUser.getUsername()
    })

    ApiAxios.get(environment.gateway + `messages/${location}/${tag}`)
      .then(resp => {
        if (resp.status === 200) {
          this.setState({
            location: params[5],
            tag: params[6]
          })
          return resp.data;

        } else if (resp.status === 403) {
          console.log("User does not belong to this group");
          return resp.status;
        } else {
          console.log("Either no matching group or user");
          return resp.status;
        }
      })
      .then(data => {
        if (data.Item.messages !== undefined) {
          this.props.updateMsgBoard(data.Item.messages.values);

        } else {
          this.setState({ hasMessages: false })
        }
      })
      .catch(err => {
        console.log('Error building the message board');
        console.log(err);
        this.setState({
          location: params[5],
          tag: params[6],
        })
      })
    updateGroups(this.state.user);
  }

  public componentWillUnmount() {
    this.props.updateMsgBoard([]);
    this.props.updateGroupsDisplay([]);
    // updateGroups('');
  }

  public updateError = (e: any) => {
    const password = e.target.value;
    this.props.updateError(password);
  }

  public removeUserFromGroup(e: any) {
    e.preventDefault();
    console.log(this.state.user);
    const group = `${this.state.location}-${this.state.tag}`;
    ApiAxios.delete(environment.gateway + `groups/${group}/user/${this.state.user}`)
      .then(resp => {
        console.log(resp.status)
        if (resp.status === 200) {
          return resp;
        } else {
          console.log('Either no matching group or user');
          return resp.status;
        }
      })
      .catch(err => {
        console.log(err);
        console.log('User is not in group');
        this.setState(() => ({
          toMessages: 0
        }))
      })
    this.props.history.push('/dashboard')
  }

  public createPost = (e: any) => {
    e.preventDefault();
    const location = this.state.location;
    const tag = this.state.tag;
    console.log(tag);
    const box = this.props.newPost;
    const user = this.state.user
    this.props.submitNewPost(location, tag, user, box);
    this.props.clearMessageBar();
    this.setState(() => ({
      hasMessages: true
    }))
  }

  public render() {
    if (this.state.toMessages === 1) {
      return <Redirect to={`/messages/${this.state.location}/${this.state.tag}`} />
    }
    return (
      <div id="messageBody">
        <div id="offset"></div>
        <button id="leaveGroupBtn" onClick={this.removeUserFromGroup.bind(this)} >Leave Group</button>
        <h1 id="groupTitle">{this.state.tag.split('+').join(' ')} in {this.state.location.split('+').join(' ')}</h1>
        <div className="messageBoard">
          {
            this.props.msgBoard.length > 0 &&
            this.props.msgBoard.map((disp: any) =>
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
          <div>
            {this.state.hasMessages ? null : <h3 id="noMessages">This group has no messages.<br /> Don't be shy! Send a message!</h3>}
          </div>
        </div>
      </div>
    );
  }
}
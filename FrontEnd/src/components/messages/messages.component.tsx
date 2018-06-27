import * as React from 'react';
import './messages.css';
import { IMessages } from '../../reducers';
import * as awsCognito from 'amazon-cognito-identity-js';
import { ApiAxios } from '../../interceptors/api-axios';
import { environment } from '../environment';
import { Redirect } from 'react-router';
import { updateGroups } from '../../actions/messages/messages.actions';

interface IProps extends IMessages {
  clearMessageBar: () => void
  submitNewPost: (location: string, tag: string, user: string, newPost: string) => void
  updateGroupsDisplay: (displayGroups: object) => void
  updateError: (error: string) => void
  updateMsgBoard: (msgBoard: object) => void
  updateNewPost: (box: string) => void
}

// ADDED BACKGROUND COLOR AND STYLE TO EACH GROUP SO THEY ARE SEPERATED NOW!
// const groupsStyle = {
//   background: "#c9ff9e",
//   borderRadius: 30,
//   margin: "20px",
//   padding: "20px"
// };

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
    // console.log(props);
  

    const cognitoData = {
      ClientId: '368mt4qt7ghc8jp8fsvu308i98',
      UserPoolId: 'us-east-2_eoUFN3DJn'
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


  this.state = {
    hasMessages: true,
    location: '',
    tag: '',
    toMessages: -1,
    user: cognitoUser&&cognitoUser.getUsername()
  }
  // console.log(this.state.user)
  // updateGroups(this.state.user);
  
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
          alert(err);
          return;
        }
        // console.log('session validity: ' + session.isValid());
      });
    }

    // SPLITS URL INTO PIECES TO ALLOW US TO GRAB THE LOCATION AND TAG FROM PARAMS
    const params = window.location.href.split('/');
    // console.log(params);
    const location = params[5];
    const tag = params[6];
    this.setState({
      user: cognitoUser&&cognitoUser.getUsername()
    })
    // console.log(this.state.user)

    ApiAxios.get(environment.gateway + `messages/${location}/${tag}`)
      .then(resp => {
        // console.log(resp.status)
        if (resp.status === 200) {
          // console.log(resp.data);
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
        console.log(data.Item.messages.values);
        if(data.Item.messages !== undefined){
          this.props.updateMsgBoard(data.Item.messages.values);

        }else{
          this.setState({hasMessages: false})
          // alert("There are no messages currently in this group!")
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
    // console.log(this.state.user)
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

  public displayMessageGroup(disp, e: any) {
    const cognitoData = {
      ClientId: '368mt4qt7ghc8jp8fsvu308i98',
      UserPoolId: 'us-east-2_eoUFN3DJn'
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

    console.log(disp.username);
    console.log(disp.Tag);
    const username = cognitoUser&&cognitoUser.getUsername();
    const group = `${disp.Location.split(' ').join('+')}-${disp.Tag.split(' ').join('+')}`;
    ApiAxios.get(environment.gateway + `groups/${group}/user/${username}`)
    .then(resp => {
      console.log(resp.status)
      if (resp.status === 200) {
        return resp;
      } else {
        console.log('Either no matching group or user');
        return resp.status;
      }
    })
    .then(data => {
      console.log(data);
      // loadMessagesComponent(msgBoard.Location.replace(' ','+'), msgBoard.Tag.replace(' ','+'));
      this.setState(() => ({
        location: disp.Location,
        tag: disp.Tag,
        toMessages: 1
      }))
    })
    .catch(err => {
      console.log(err);
      console.log('User is not in group');
      this.setState(() => ({
        location: disp.Location,
        tag: disp.Tag,
        toMessages: 0
      }))
    })
  }

  // public displayMessageGroup(disp, e: any) {
  //   e.preventDefault();
  //   console.log(disp);
  //   this.setState({
  //     location: disp.Location.replace(' ','+'),
  //     tag: disp.Tag.replace(' ','+'),
  //     toMessages: 1
  //   })
  //   this.props.updateGroupsDisplay = (this.state.user);
  // }

  public createPost = (e: any) => {
    e.preventDefault();
    const location = this.state.location;
    const tag = this.state.tag;
    console.log(tag);
    const box = this.props.newPost;
    const user = this.state.user
    this.props.submitNewPost(location, tag, user, box);
    this.props.clearMessageBar();
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
    if (this.state.toMessages === 1) {
      return <Redirect to={`/messages/${this.state.location}/${this.state.tag}`} />
    }
    // if (this.state.hasMessages === false) {
    //   return <p>This group has no messages. Don't be shy! Send a message!</p>
    // }
    return (
      <div>
        {/* <div className="tagList">
          {this.props.displayGroups.map(disp =>
            <h3 
            style={groupsStyle} 
            key={disp.Tag} 
            onClick={this.displayMessageGroup.bind(this, disp)}
            >{disp.Location+'-'+disp.Tag}</h3>
            // <h3>-{disp.}</h3>
            // <img src={disp.groupPic}/>
          )}
        </div> */}
        <div className="messageBoard">
          {
            // JSON.parse(JSON.stringify(this.props.msgBoard)).map(disp =>
            //   <div style={messageStyle} key={JSON.parse(disp).time} className="postBox">
            //     <h4> {JSON.parse(disp).user} </h4>
            //     <p> {JSON.parse(disp).box} </p>
            //     <h5> {JSON.parse(disp).time} </h5>
            //   </div>
            // )
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
            {this.state.hasMessages ? (
              null
            ) : (
              <h3 id= "noMessages">This group has no messages.<br/> Don't be shy! Send a message!</h3>
              )}
          </div>
        </div>
      </div>
    );
  }
}
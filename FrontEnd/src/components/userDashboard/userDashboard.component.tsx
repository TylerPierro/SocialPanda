import * as React from 'react';
import { IDashboard } from '../../reducers';
import * as awsCognito from 'amazon-cognito-identity-js';
import { Redirect } from 'react-router';

interface IProps extends IDashboard {
  updateGroups: (user: string) => void,
  updateGroupsDisplay: (displayGroups: object) => void
}

// ADDED BACKGROUND COLOR AND STYLE TO EACH GROUP SO THEY ARE SEPERATED NOW!
const groupsStyle = {
  background: "#c9ff9e",
  borderRadius: 30,
  margin: "20px",
  padding: "20px"
};

// ADDED BACKGROUND COLOR AND STYLE TO EACH MESSAGE SO THEY ARE SEPERATED NOW!
// const messageStyle = {
//   background: "#86b2d8",
//   borderRadius: 20,
//   margin: "20px",
//   padding: "20px"
// };

export class DashboardComponent extends React.Component<IProps, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      location: '',
      tag: '',
      toMessages: -1,
      user: ''
    }
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
        console.log('session validity: ' + session.isValid());
      });
    }

    this.state = {
      location: '',
      tag: '',
      toMessages: -1,
      user: cognitoUser&&cognitoUser.getUsername()
    }
    console.log(this.state.user)
    this.props.updateGroups(this.state.user);
    console.log(this.props.displayGroups);
  }

  public displayMessageGroup(disp, e: any) {
    e.preventDefault();
    console.log(disp);
    this.setState({
      location: disp.split('-')[0],
      tag: disp.split('-')[1],
      toMessages: 1
    })
  }

  public render() {
    if (this.state.toMessages === 1) {
      return <Redirect to={`/messages/${this.state.location}/${this.state.tag}`} />
    }
    return (
      <div>
        <h1>{this.props.displayGroups[0]}</h1> 
        <div className="tagList">
          {this.props.displayGroups.map(disp =>
            <h3 
            style={groupsStyle} 
            key={disp.split('-')[0]} 
            onClick={this.displayMessageGroup.bind(this, disp)}
            >{disp.split('-')[0]+'-'+disp.split('-')[1]}</h3>
          )}
        </div>
      </div>
    );
  }
}
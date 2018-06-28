import * as React from 'react';
import { IDashboard } from '../../reducers';
import * as awsCognito from 'amazon-cognito-identity-js';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import SocialPanda2 from './SocialPanda2.png';
import "./userDashboard.css";

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
          return;
        }
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
      return <Redirect to={`/messages/${this.state.location.split(' ').join('+')}/${this.state.tag.split(' ').join('+')}`} />
    }
    return (
      <div>
        <div id="offset"></div>
        <h1 id="welcome">My Dashboard</h1> 
        <div className="dashTagList">
          {
            this.props.displayGroups.length >= 0
            ? this.props.displayGroups.map(disp =>
              <h3 
              style={groupsStyle} 
              key={disp.split('-')[0]} 
              onClick={this.displayMessageGroup.bind(this, disp)}
              >{`${disp.split('-')[0].split('+').join(' ')}-${disp.split('-')[1].split('+').join(' ')}`}</h3>
            )
            : <div>
                <h1>Be a Social Panda!
                  <br/>
                  <Link to="/groups" className="unset-anchor">Join some groups</Link>
                </h1>
              </div>
          }
        </div>
        <div className="dashboardImageContainer">
          <img id="logoPanda2" src={SocialPanda2} alt="logo"/>
        </div>
      </div>
    );
  }
}
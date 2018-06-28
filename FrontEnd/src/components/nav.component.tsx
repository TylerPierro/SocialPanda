import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PandaLogo from '../assets/SocialPanda1.png';
import * as awsCognito from 'amazon-cognito-identity-js';
import "./nav.css";

const data = {
  ClientId: '368mt4qt7ghc8jp8fsvu308i98',
  UserPoolId: 'us-east-2_eoUFN3DJn'

};
const userPool = new awsCognito.CognitoUserPool(data);
const cognitoUser = userPool.getCurrentUser();
console.log(cognitoUser);
export function isLoggedIn() {
  return cognitoUser !== null ? true : false;
}

function logout() {
  localStorage.clear()
  return <Redirect to={'/sign-in'} />
}

export const NavComponent: React.StatelessComponent<{}> = () => {
  return (
    <div id="navContainer">
      <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-light bg-light display-front nav-pad">
        <div className="navbar-header c-pointer shift-left">
          <Link to="/home" className="unset-anchor">
            <img className="img-adjust-position rev-logo" src={PandaLogo} alt="revature" />
          </Link>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav ml-auto margin-nav">
            <li className="nav-item active">
              {
                isLoggedIn()
                ? <Link to="/dashboard" className="unser-anchor nav-link">{cognitoUser && cognitoUser.getUsername()}'s Dashboard</Link> : null
              }
            </li>
            <li className="nav-item active">
              <Link to="/groups" className="unset-anchor nav-link">Explore Groups</Link>
            </li>
            <li className="nav-item active">
              {
                isLoggedIn()
                ? <Link to="/newGroup" className="unset-anchor nav-link">Create Group</Link> : null
              }
            </li>
            <li className="nav-item active">
              {
                isLoggedIn() 
                ? <Link to="/profile" className="unset-anchor nav-link">Profile</Link> : null
              }
            </li>
            <li className="nav-item active">
              {/* This won't work unless this component is rerendered. */}
              { 
                isLoggedIn()
                ? <Link onClick={ () => logout() } to="/sign-in" className="unset-anchor nav-link">Log Out</Link>
                : <Link to="/sign-in" className="unset-anchor nav-link">Sign In</Link>
              }
            </li>
          </ul>
        </div>
      </nav>
    </div >
  );
}
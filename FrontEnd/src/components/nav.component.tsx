import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PandaLogo from '../assets/SocialPanda1.png';
import * as awsCognito from 'amazon-cognito-identity-js';

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
    <div>
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
              <Link to="/groups" className="unset-anchor nav-link">Explore Groups</Link>
            </li>
            <li className="nav-item active">
              <Link to="/newGroup" className="unset-anchor nav-link">Create Group</Link>
            </li>
            <li className="nav-item active">
              <Link to="/register" className="unset-anchor nav-link">Register</Link>
            </li>
            <li className="nav-item active">
              <Link to="/profile" className="unset-anchor nav-link">Profile</Link>
            </li>
            <li className="nav-item active">
              {/* This won't work unless this component is rerendered. */}
              { 
                isLoggedIn()
                ? <Link onClick={ () => logout() } to="/sign-in" className="unset-anchor nav-link">Log Out</Link>
                : <Link to="/sign-in" className="unset-anchor nav-link">Sign In</Link>
              }
            </li>
            {/* <li className="nav-item active">
              <Link to="/second" className="unset-anchor nav-link">Second</Link>
            </li>
            <li className="nav-item active">
              <Link to="/clicker" className="unset-anchor nav-link">Clicker</Link>
            </li> */}
            {/* <li className="nav-item active dropdown">
              <a className="nav-link dropdown-toggle pointer" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Examples</a>
              <div className="dropdown-menu" aria-labelledby="dropdown04">
                { <div className="dropdown-item"><Link to="/movies" className="unset-anchor nav-link active">Movies</Link></div>
                <div className="dropdown-item"><Link to="/clicker" className="unset-anchor nav-link active">Clicker Game</Link></div>
                <div className="dropdown-item"><Link to="/tic-tac-toe" className="unset-anchor nav-link active">Tic Tac Toe Game</Link></div>
                <div className="dropdown-item"><Link to="/chuck-norris" className="unset-anchor nav-link active">Chuck Norris Jokes</Link></div>
                <div className="dropdown-item"><Link to="/pokemon" className="unset-anchor nav-link active">Pokemon</Link></div> }
              </div>
            </li>
            <li className="nav-item active">
              <Link to="/nested" className="unset-anchor nav-link">Nested</Link>
            </li> */}
          </ul>
        </div>
      </nav>
    </div >
  );
}

import * as React from 'react';
import * as awsCognito from 'amazon-cognito-identity-js';
import './signin-style.css'
import { Link } from 'react-router-dom';
import { ApiAxios } from '../../interceptors/api-axios';
import { environment } from '../environment';
// import { s3ListSkylines, s3Print } from '../image-uploader/s3iterator';

// const socialpandaParams = {
//   Bucket: 'image-uploads-socialpanda  ',
//   EncodingType: 'url',
//   MaxKeys: 30
//   // Prefix: '/skylines/'
// }

// try {
//   s3ListSkylines(socialpandaParams, s3Print);
// } catch(e) {
//   console.log(e + "\n" + e.stack);
// }

export class SignInComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    console.log(props);
    this.state = {
      url: ''
    }
  }

  public componentWillMount() {
    ApiAxios.get(environment.context + 'files/bagus-ghufron-42002-unsplash.jpg')
        .then(resp => {
          this.setState({
            url: resp.data
          })
        })
        .catch(err => {
          console.log(environment.context + 'files/skylines/bagus-ghufron-42002-unsplash.jpg');
            console.log(err);
        })
  }

  public updateUsername = (e: any) => {
    const username = e.target.value;
    this.props.updateUsername(username);
  }

  public updatePassword = (e: any) => {
    const password = e.target.value;
    this.props.updatePassword(password);
  }
  public updateConfirmationPassword = (e: any) => {
    const password = e.target.value;
    this.props.updateConfirmationPassword(password);
  }
  public updateNewPassword = (e: any) => {
    const password = e.target.value;
    this.props.updateNewPassword(password);
  }

  public onSuccess = (result: awsCognito.CognitoUserSession) => {
    const token = result.getIdToken().getJwtToken();
    localStorage.setItem('token', token);
    // console.log(userPool.getCurrentUser());
    // console.log(result.getIdToken().decodePayload())
    // const idtok: any = result.getIdToken();
    // console.log(idtok.payload['cognito:groups']) //payload has the user info on it

    // navigate pages now that we have successfully logged in
    this.props.history.push('/groups');
  }

  public onFailure = (err: any) => {
    console.log(err);
    if (err.code === 'UserNotFoundException' || err.code === 'NotAuthorizedException') {
      this.props.updateError('Invalid Credentials, try again.');
    } else {
      this.props.updateError('Unable to login at this time, please try again later');
    }
  }

  public submit = (e: any) => {
    e.preventDefault();
    const { username, password } = this.props; // destructuring
    const credentials = { username, password };

    const authenticationData = {
      Password: credentials.password,
      Username: credentials.username,
    };
    const authenticationDetails = new awsCognito.AuthenticationDetails(authenticationData);
    const poolData = {
      ClientId: '2mrd11cqf2anle4nsid84uv5hj', // Your client id here
      UserPoolId: 'us-east-2_vCSElhZSd', // Your user pool id here
    };
    const userPool = new awsCognito.CognitoUserPool(poolData);
    const userData = {
      Pool: userPool,
      Username: credentials.username,
    };
    const cognitoUser = new awsCognito.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        this.props.setFirstSignin(true);
        this.props.updateCognitoUser(cognitoUser);
        // User was signed up by an admin and must provide new 
        // password and required attributes, if any, to complete 
        // authentication.

        // userAttributes: object, which is the user's current profile. It will list all attributes that are associated with the user. 
        // Required attributes according to schema, which don’t have any values yet, will have blank values.
        // requiredAttributes: list of attributes that must be set by the user along with new password to complete the sign-in.


        // Get these details and call 
        // newPassword: password that user has given
        // attributesData: object with key as attribute name and value that the user has given.

      },
      onFailure: this.onFailure,
      onSuccess: this.onSuccess,


    });
  }

  public submitNewPassword = (e: any) => {
    e.preventDefault();
    const { password, passwordConfirmation } = this.props.firstSignIn;
    if (password !== passwordConfirmation) {
      alert('passwords do not match');
      return;
    }
    const user: awsCognito.CognitoUser = this.props.cognito.user;
    user.getUserAttributes((attributes) => {
      user.completeNewPasswordChallenge(this.props.firstSignIn.password, attributes, {
        onFailure: this.onFailure,
        onSuccess: this.onSuccess,
      })
    })

  }

  public render() {
    const signinDivStyle = {
      // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url('https://codetheweb.blog/assets/img/posts/full-image-hero/image.jpg')`
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url(${this.state.url})`
    }
    return (
      <div id="signin-div" style={signinDivStyle} >
      <form className="signin-form" /* onSubmit={this.registerUser} */ action="action_page.php" style={{ border: '1px solid #ccc' }}>
          {!this.props.firstSignIn.isFirstSignIn &&
            <form className="form-signin" id="container" onSubmit={this.submit}>
              {/* <img className="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" /> */}
              <br />
              <h1 id="signinText" className="h3 mb-3 font-weight-normal">Sign in</h1>
              <label htmlFor="inputUsername" className="sr-only">Username</label>
              <input value={this.props.username}
                onChange={this.updateUsername}
                type="text" id="inputUsername"
                className="form-control"
                placeholder="Username"
                required />
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input value={this.props.password}
                onChange={this.updatePassword}
                type="password"
                id="inputPassword"
                className="form-control"
                placeholder="Password"
                required />
              {this.props.errorMessage !== '' &&
                <div id="error-message">
                  {this.props.errorMessage}
                </div>
              }
              <div className="checkbox mb-3">
                <label id="signinText">
                  <input id="signinText" type="checkbox" value="remember-me" /> Remember me
          </label>
              </div>
              <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>
          }
          {/* {this.props.firstSignIn.isFirstSignIn &&
          <form className="form-signin" onSubmit={this.submitNewPassword}>
            <h1 className="h3 mb-3 font-weight-normal">Choose a new password.</h1>
            <label htmlFor="inputNewPassword" className="sr-only">New Password</label>
            <input value={this.props.firstSignIn.password}
              onChange={this.updateNewPassword}
              type="password" id="inputNewPassword"
              className="form-control"
              placeholder="New Password"
              required />
            <label htmlFor="inputConfimPassword" className="sr-only">Confirm Password</label>
            <input value={this.props.firstSignIn.confirmationPassword}
              onChange={this.updateConfirmationPassword}
              type="password"
              id="inputConfirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              required />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Update</button>
          </form>
        } */}

          <br />
          <h5 id="signinText">Don't have an account?
          <button id="signInRegisterButton">
              <Link to="/register" className="unset-anchor nav-link">Sign up here!</Link>
            </button>
          </h5>
          {/* <Link to="/register" className="unset-anchor nav-link">Sign up here!</Link> */}
      </form>
      {/* <img src="https://s3.us-east-2.amazonaws.com/image-uploads-socialpanda/skylines/carl-solder-532353-unsplash.jpg" /> */}
      </div>
    );
  }
}
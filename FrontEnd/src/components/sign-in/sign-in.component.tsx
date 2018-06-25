
import * as React from 'react';
import * as awsCognito from 'amazon-cognito-identity-js';

export class SignInComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    console.log(props);
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
    alert("SUCCESSO")
    this.props.history.push('/profile');
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
      UserPoolId: 'us-east-2_tQAMzx7rx', // Your user pool id here
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

  public registerUser = (e: any) => {
    const poolData = {
      ClientId: '2mrd11cqf2anle4nsid84uv5hj',
      UserPoolId: 'us-east-2_vCSElhZSd',
    };
    const userPool = new awsCognito.CognitoUserPool(poolData);

    const attributeList: awsCognito.CognitoUserAttribute[] = []; 

    const dataEmail = {
      Name: 'email',
      Value: 'email@mydomain.com'
    };
    const dataPhoneNumber = {
      Name: 'phone_number',
      Value: '+15555555555'
    };

    const attributeEmail = new awsCognito.CognitoUserAttribute(dataEmail);
    const attributePhoneNumber = new awsCognito.CognitoUserAttribute(dataPhoneNumber);


    attributeList.push(attributePhoneNumber);
    attributeList.push(attributeEmail);

    let CognitoUser;

    userPool.signUp('simply', '1234567', attributeList, [], (err: any, result: any) => {
      if (err) {
        alert(err);
        return;
      }
      CognitoUser = result.user;
      console.log('user name is ' + CognitoUser.getUsername());
    });
  }

  public render() {
    return (
      <div>
        {!this.props.firstSignIn.isFirstSignIn &&
          <form className="form-signin" onSubmit={this.submit}>
            <img className="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
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
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
          </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
          </form>
        }
        {this.props.firstSignIn.isFirstSignIn &&
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
        }
        <h1>
          <button className="btn btn-lg btn-primary btn-block" onClick={this.registerUser}>Register New User</button>
        </h1>
      </div>
    );
  }
}
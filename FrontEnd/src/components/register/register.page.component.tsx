import * as React from 'react';
import './style.css'
import * as awsCognito from 'amazon-cognito-identity-js';

export class RegisterPageComponent extends React.Component<any, any> {

  public registerUser = (event: any) => {
    event.preventDefault()
    const form = event.target;

    const formObj = {
      email: form.email1.value,
      password: form.password1.value,
      username: form.username1.value
      
    }
    console.log(formObj)


    const poolData = {
      ClientId: '2mrd11cqf2anle4nsid84uv5hj',
      UserPoolId: 'us-east-2_vCSElhZSd',
    };
    const userPool = new awsCognito.CognitoUserPool(poolData);

    const attributeList: awsCognito.CognitoUserAttribute[] = []; 

    const dataEmail = {
      Name: 'email',
      Value: formObj.email
    };
    const dataPhoneNumber = {
      Name: 'phone_number',
      Value: '+15555555555'
    };

    const dataNami ={
      Name: 'nami',
      Value: 'Im a value of a custom attribute!'
    }

    const attributeNami = new awsCognito.CognitoUserAttribute(dataNami);
    const attributeEmail = new awsCognito.CognitoUserAttribute(dataEmail);
    const attributePhoneNumber = new awsCognito.CognitoUserAttribute(dataPhoneNumber);

    attributeList.push(attributeNami);
    attributeList.push(attributePhoneNumber);
    attributeList.push(attributeEmail);

    let CognitoUser;

    userPool.signUp(formObj.username, formObj.password, attributeList, [], (err: any, result: any) => {
      if (err) {
        alert(err);
        return;
      }
      CognitoUser = result.user;
      console.log('user name is ' + CognitoUser.getUsername());


      // CognitoUser.authenticateUser(authenticationDetails, {
      //   onSuccess: function (result) {
      //       var accessToken = result.getAccessToken().getJwtToken();
            
      //       /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
      //       var idToken = result.idToken.jwtToken;
      //   },

      //   onFailure: function(err) {
      //       alert(err);
      //   },
      // }








    });
  }

  public render() {
        return (
          <form onSubmit={this.registerUser} action="action_page.php" style={{border: '1px solid #ccc'}}>
            <div className="container">
              <h1>Sign Up</h1>
              <p>Please fill in this form to create an account.</p>
              <hr />

              
              <label htmlFor="username"><b>Username</b></label>
              <input id ="username1" type="text" placeholder="Enter Username" name="eml" required />

              <label htmlFor="email"><b>Email</b></label>
              <input id ="email1" type="text" placeholder="Enter Email" name="email" required />

              <label htmlFor="psw"><b>Password</b></label>
              <input id ="password1" type="password" placeholder="Enter Password" name="psw" required />

              <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
              <input id ="password2" type="password" placeholder="Repeat Password" name="psw-repeat" required />

              <label>
                <input type="checkbox" name="remember" style={{marginBottom: 15}} /> Remember me
              </label>
              <p>By creating an account you agree to our <a href="#" style={{color: 'dodgerblue'}}>Terms &amp; Privacy</a>.</p>
              <div className="clearfix">
                <button type="button" className="cancelbtn">Cancel</button>
                <button type="submit" className="signupbtn">Sign Up</button>
              </div>
            </div>
          </form>
        );
     












  }
}
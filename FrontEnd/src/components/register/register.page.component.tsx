import * as React from 'react';
import './register-style.css'
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

    const attributeEmail = new awsCognito.CognitoUserAttribute(dataEmail);
    const attributePhoneNumber = new awsCognito.CognitoUserAttribute(dataPhoneNumber);


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
    });
  }

  public render() {
        return (
          <form onSubmit={this.registerUser} action="action_page.php" style={{border: '1px solid #ccc'}} className="form-register-body">
            <div className="container">
            <br/>
              <h1 id="registeText">Sign Up</h1>
              {/* <p id="registeText">Tell us about you so we can create an account for you!</p> */}
              <hr />

              
              <label id="registeText" htmlFor="username"><b>Username</b></label>
              <input id ="username1" className="registerFields" type="text" placeholder="Enter Username" name="eml" required />

              <label id="registeText" htmlFor="email"><b>Email</b></label>
              <input id ="email1" className="registerFields" type="text" placeholder="Enter Email" name="email" required />

              <label id="registeText" htmlFor="psw"><b>Password</b></label>
              <input id ="password1" className="registerFields" type="password" placeholder="Enter Password" name="psw" required />

              <label id="registeText" htmlFor="psw-repeat"><b>Repeat Password</b></label>
              <input id ="password2" className="registerFields" type="password" placeholder="Repeat Password" name="psw-repeat" required />

              {/* <p id="registeText" >By creating an account you agree to our <a href="#" style={{color: 'dodgerblue'}}>Terms &amp; Privacy</a>.</p> */}
              <div className="clearfix">
                {/* <button type="button" className="cancelbtn">Cancel</button> */}
                <button type="submit" className="signupbtn">Sign Up</button>
              </div>
            </div>
          </form>
        );
     












  }
}
import * as React from 'react';
import './register-style.css'
import * as awsCognito from 'amazon-cognito-identity-js';

export class RegisterPageComponent extends React.Component<any, any> {

  public registerUser = (event: any) => {
    event.preventDefault()
    const form = event.target;

    const formObj = {
      email: form.email1.value,
      name: form.name1.value,
      password: form.password1.value,
      username: form.username1.value

    }
    console.log(formObj)


    const poolData = {
      ClientId: '368mt4qt7ghc8jp8fsvu308i98',
      UserPoolId: 'us-east-2_eoUFN3DJn',
    };
    const userPool = new awsCognito.CognitoUserPool(poolData);

    const attributeList: awsCognito.CognitoUserAttribute[] = [];


    const dataEmail = {
      Name: 'email',
      Value: formObj.email
    };

    

    const dataName = {
      Name: 'name',
      Value: formObj.name
    };

    // Optional
    const dataDescription = {
      Name: 'custom:description',
      Value: "You haven't set a description!"
    };

    const dataPhoneNumber = {
      Name: 'phone_number',
      Value: '+15555555555'
    };
    
    const dataProfile = {
      Name: 'custom:profile',
      Value: ' '
    };

    const dataAddress = {
      Name: 'address',
      Value: 'N/A'
    };

    const attributeProfile = new awsCognito.CognitoUserAttribute(dataProfile);
    const attributeAddress = new awsCognito.CognitoUserAttribute(dataAddress);
    const attributeEmail = new awsCognito.CognitoUserAttribute(dataEmail);
    const attributeDescription = new awsCognito.CognitoUserAttribute(dataDescription);
    const attributePhoneNumber = new awsCognito.CognitoUserAttribute(dataPhoneNumber);
    const attributeName = new awsCognito.CognitoUserAttribute(dataName);

    attributeList.push(attributeProfile);
    attributeList.push(attributeAddress);
    attributeList.push(attributePhoneNumber);
    attributeList.push(attributeEmail);
    attributeList.push(attributeName);
    attributeList.push(attributeDescription);
    

    let CognitoUser;

    userPool.signUp(formObj.username, formObj.password, attributeList, [], (err: any, result: any) => {
      if (err) {
        console.log(err);
        return;
      }
      CognitoUser = result.user;
      console.log('user name is ' + CognitoUser.getUsername());
    });
  }

  public render() {
    return (
      <form onSubmit={this.registerUser} action="action_page.php" style={{ border: '1px solid #ccc' }} className="form-register-body">
        <div className="container">
          <br />
          <h1 id="registeText">Sign Up</h1>
          <hr />

          <label id="registeText" htmlFor="username"><b>Username</b></label>
          <input id="username1" className="registerFields" type="text" placeholder="Enter Username" name="eml" required />

          <label id="registeText" htmlFor="name"><b>Name</b></label>
          <input id="name1" className="registerFields" type="text" placeholder="Enter Name" name="eml" required />

          <label id="registeText" htmlFor="email"><b>Email</b></label>
          <input id="email1" className="registerFields" type="text" placeholder="Enter Email" name="email" required />

          <label id="registeText" htmlFor="psw"><b>Password</b></label>
          <input id="password1" className="registerFields" type="password" placeholder="Enter Password" name="psw" required />

          <label id="registeText" htmlFor="psw-repeat"><b>Repeat Password</b></label>
          <input id="password2" className="registerFields" type="password" placeholder="Repeat Password" name="psw-repeat" required />

          <div className="clearfix">
          
            <button type="submit" className="signupbtn">Sign Up</button>
          </div>
        </div>
      </form>
    );













  }
}
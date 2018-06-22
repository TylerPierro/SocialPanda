import * as React from 'react';
import './style.css'

export class RegisterPageComponent extends React.Component<any, any> {

  public submitForm = (event: any) => {
    event.preventDefault()
    const form = event.target;

    const formObj = {
      email: form.email1.value,
      password: form.password1.value,
      username: form.username1.value
      
    }
    console.log(formObj)

  }

  public render() {
        return (
          <form onSubmit={this.submitForm} action="action_page.php" style={{border: '1px solid #ccc'}}>
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
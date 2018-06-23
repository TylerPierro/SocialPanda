
import * as React from 'react';
import './newGroupStyle.css';


const h1style = {
  // background: "#c9ff9e",
  // borderRadius: 30,
  margin: "auto",
  padding: "120px"
};

export class NewGroupComponent extends React.Component<any, any> {

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

  public submit = (e: any) => {
    e.preventDefault();
    const { username, password } = this.props; // destructuring
    fetch('http://localhost:3001/users/login', {
      body: JSON.stringify({ username, password }),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
      .then(resp => {
        console.log(resp.status)
        if (resp.status === 401) {
          this.props.updateError('Invalid Credentials, try again.')
          return;
        }
        if (resp.status === 200) {
          return resp.json();
        }
        return;
      })
      .then(data => {
        console.log(data);
        this.props.history.push('/clicker');
      })
      .catch(err => {
        this.props.updateError('Unable to log in at this time, please try again later');
      })
  }

  public render() {
    return (
      <form id="social"
        // onSubmit={this.registerUser} 
        action="action_page.php" style={{ border: '1px solid #ccc' }}>
        <div id="socialDiv" className="stripe stripe--inverted stripe--photoHero inverted start-photo-banner">
          <div id="title">
          <h1 style = {h1style}>Be a Social Panda and start your own group!</h1>
          </div>
        </div>
        <div className="container">
          <p>Please fill in this form to create an account.</p>
          <hr />


          <label htmlFor="username"><b>Username</b></label>
          <input id="username1" type="text" placeholder="Enter Username" name="eml" required />

          <label htmlFor="email"><b>Email</b></label>
          <input id="email1" type="text" placeholder="Enter Email" name="email" required />

          <label htmlFor="psw"><b>Password</b></label>
          <input id="password1" type="password" placeholder="Enter Password" name="psw" required />

          <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
          <input id="password2" type="password" placeholder="Repeat Password" name="psw-repeat" required />

          <label>
            <input type="checkbox" name="remember" style={{ marginBottom: 15 }} /> Remember me
              </label>
          <p>By creating an account you agree to our <a href="#" style={{ color: 'dodgerblue' }}>Terms &amp; Privacy</a>.</p>
          <div className="clearfix">
            <button type="button" className="cancelbtn">Cancel</button>
            <button type="submit" className="signupbtn">Sign Up</button>
          </div>
        </div>
      </form>
    );
  }
}
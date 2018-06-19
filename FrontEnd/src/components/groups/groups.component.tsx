
import * as React from 'react';
import './groupsSearch.css';
// import SkyLine from 'src/assets/SkyLine.jpg';

export class GroupsComponent extends React.Component<any, any> {

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
      <div>
        {/* <img className="img-adjust-position" src={SkyLine} alt="skyline" /> */}
        <div className="searchBar">
          <input className="searchBar" type="search" placeholder="Search by Location" />
          <input type="submit" className="btn search-submit" value="Search" />
        </div>
      </div>
    );
  }
}

import * as React from 'react';
import './groupsSearch.css';
import { IGroups } from '../../reducers';
// import { groupsTypes } from '../../actions/groups/groups.types';
// import { updateDisplay } from '../../actions/groups/groups.actions';
// import { updateError } from '../../actions/sign-in/sign-in.actions';
// import SkyLine from 'src/assets/SkyLine.jpg';

interface IProps extends IGroups {
  updateCity: (city: string) => void
  updateDisplay: (displayTags: string) => void
  updateError: (error: string) => void
}

export class GroupsComponent extends React.Component<IProps, any> {

  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public updateError = (e: any) => {
    const password = e.target.value;
    this.props.updateError(password);
  }

  public submit = (e: any) => (dispatch: any) => {
    e.preventDefault();
    const location = this.props.citySearch;
    console.log(location);
    this.props.updateDisplay(location);
  }

  //   fetch('https://dwbbn4f58g.execute-api.us-east-2.amazonaws.com/dev/messages/' + location, {
  //     headers: {
  //       'content-type': 'application/json'
  //     }
  //   })
  //     .then(resp => {
  //       console.log(resp.status)
  //       if (resp.status === 401) {
  //         this.props.updateError('Nothing in your area.')
  //         return;
  //       }
  //       if (resp.status === 200) {
  //         return resp.json();
  //       }
  //       return;
  //     })
  //     .then(data => {
  //       console.log(data);
  //       dispatch({
  //         payload: {
  //           data
  //         },
  //         type: groupsTypes.UPDATE_DISPLAY
  //       })
  //     })
  //     .catch(err => {
  //       this.props.updateError('Unable to log in at this time, please try again later');
  //     })
  // }

  public render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <div className="searchBar">
            <input className="searchBar"
              type="string"
              value={this.props.citySearch}
              onChange={(e: any) => this.props.updateCity(e.target.value)}
              placeholder="Search by Location" />
            <input type="submit" className="btn search-submit" value="Search" />
          </div>
        </form>
        <div>
          <h3 id="Tags">{this.props.tags}</h3>
        </div>
      </div>
        );
      }
}
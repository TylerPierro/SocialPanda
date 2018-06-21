import * as React from 'react';
import './groupsSearch.css';
import { IGroups } from '../../reducers';
// import { groupsTypes } from '../../actions/groups/groups.types';
// import { updateDisplay } from '../../actions/groups/groups.actions';
// import { updateError } from '../../actions/sign-in/sign-in.actions';
// import SkyLine from 'src/assets/SkyLine.jpg';

interface IProps extends IGroups {
  updateCity: (city: string) => void
  updateDisplay1: (displayGroups: string) => void
  updateDisplay2: (displayGroups: string, displayTags: string) => void
  updateError: (error: string) => void
  updateTag: (tag: string) => void
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

  public displayMessageGroup(e: any) {
    e.preventDefault();

    // MAYBE IN HERE ON CLICKING A GROUP WE WOULD RENDER A NEW COMPNENT CALLED MESSAGE OR SOMETHING
    // THAT SHOWS JUST A LIST OF ALL MESSAGES FOR NOW AND AFTER WE CAN CHECK IF USER IS IN GROUP OR NOT.
    // IF USER IS NOT, THEN ASK IF THEY WOULD LIKE TO JOIN, OTHERWISE LET THEM SEE ALL THE MESSAGES.



    // (let i =0; i < this.props.displayGroups[0].messages.values.length; i++){
    //   console.log(this.props.displayGroups[0].messages.values.length)
    // }
    console.log(this.props.displayGroups[0].messages.values.length)
    // let location = this.props.citySearch;
    // location = location.replace(' ', '+')
    // let tag = this.props.tagSearch;
    // tag = tag.replace(' ', '+')
    // if (tag === '' || tag === null) {
    //   this.props.updateDisplay1(location);
    // }
    // else {
    //   this.props.updateDisplay2(location, tag);
    // }

  }

  public submit = (e: any) => {
    e.preventDefault();
    let location = this.props.citySearch;
    location = location.replace(' ', '+')
    let tag = this.props.tagSearch;
    tag = tag.replace(' ', '+')
    if (tag === '' || tag === null) {
      this.props.updateDisplay1(location);
    }
    else {
      this.props.updateDisplay2(location, tag);
    }
  }

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
          {/* </form>
          <form onSubmit={this.submit2}> */}
          <div className="searchBar">
            <input className="searchBar"
              type="string"
              value={this.props.tagSearch}
              onChange={(e: any) => this.props.updateTag(e.target.value)}
              placeholder="Search a Tag" />
            {/* <input type="submit" className="btn search-submit" value="Search" /> */}
          </div>
        </form>
        <br />
        <div>
          {this.props.displayGroups.map(disp =>
            <h3 key={disp.Tag} onClick={this.displayMessageGroup.bind(this)}>-{disp.Tag}</h3>
            // <h3>-{disp.}</h3>
            // <img src={disp.groupPic}/>
          )}
        </div>
      </div>
    );
  }
}
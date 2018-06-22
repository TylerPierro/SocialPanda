import * as React from 'react';
import './groupsSearch.css';
import { IGroups } from '../../reducers';

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
    // console.log(JSON.stringify(this.props.displayGroups[0].messages.values[0]));
    // this.props.msgBoard = this.props.displayGroups[0].messages;
    // console.log(JSON.stringify(this.props.msgBoard));
    // return(<MessagesComponent />)
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
        {/* <div className="messageBoard">
          {this.props.msgBoard.map(disp => 
            <div key={disp.time} className="postBox">
              <h4> {disp.user} </h4>
              <p> {disp.box} </p>
              <h5> {disp.time} </h5>
            </div>
          )}
        </div> */}
      </div>
    );
  }
}
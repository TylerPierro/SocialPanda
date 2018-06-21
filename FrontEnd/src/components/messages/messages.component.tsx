import * as React from 'react';
import './messagesSearch.css';

// interface IProps extends IMessages {
//   updateMessage: (messages: string) => void
//   updateDisplayM: (displayMessages: string) => void
// }

export class MessagesComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    console.log(props);
  }

  // public submit = (e: any) => {
  //   e.preventDefault();
  //   let location = this.props.citySearch;
  //   location = location.replace(' ', '+')
  //   let tag = this.props.tagSearch;
  //   tag = tag.replace(' ', '+')
  //   if (tag === '' || tag === null) {
  //     this.props.updateDisplay1(location);
  //   }
  //   else {
  //     this.props.updateDisplay2(location, tag);
  //   }
  // }

  public render() {
    return (
      <div>
        {/* <form onSubmit={this.submit}>
          <div className="searchBar">
            <input className="searchBar"
              type="string"
              value={this.props.citySearch}
              onChange={(e: any) => this.props.updateCity(e.target.value)}
              placeholder="Search by Location" />
            <input type="submit" className="btn search-submit" value="Search" />
          </div> */}
          {/* </form>
          <form onSubmit={this.submit2}> */}
          {/* <div className="searchBar">
            <input className="searchBar"
              type="string"
              value={this.props.tagSearch}
              onChange={(e: any) => this.props.updateTag(e.target.value)}
              placeholder="Search a Tag" />
            <input type="submit" className="btn search-submit" value="Search" />
          </div>
        </form>
        <br /> */}
        {/* <div>
          {this.props.displayGroups.map(disp =>
            <h3 key={disp.Tag} onClick={this.displayMessageGroup.bind(this)}>-{disp.Tag}</h3>
            // <h3>-{disp.}</h3>
            // <img src={disp.groupPic}/>
          )}
        </div> */}
        <h3>Messages component</h3>
      </div>
    );
  }
}
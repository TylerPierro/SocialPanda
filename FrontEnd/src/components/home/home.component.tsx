import * as React from 'react';
import { IHome } from '../../reducers';
import { Post } from '../../model/Post';

interface IProp extends IHome {
    createPost: (msg: Post) => void
}

export class HomeComponent extends React.Component<IProp, any> {
    constructor(props: any) {
        super(props);
        console.log(props);
    }

    public render() {
      return (
        <div className="container">
          <h1> Home </h1>
        </div>
      );
    }
}
import * as React from 'react';
import Dropzone from 'react-dropzone';
import { ApiAxios } from '../../interceptors/api-axios';
import { environment } from '../environment';
import Axios from 'axios';

export class MovieImageUploaderComponent extends React.Component<any, any> {

  public constructor(props: any) {
    super(props);
    this.state = {
      url: ''
    }
  }

  public componentDidMount() {
    ApiAxios.get(environment.context + '/upload-file/uploadz.jpg')
      .then(resp => {
        this.setState({
          url: resp.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  public onDrop = (files: any) => {
    const file = files[0];
    console.log(file);
    ApiAxios.get(environment.context + 'movie/upload-file/' + file.name)
      .then(resp => {
        Axios.put(resp.data, file)
          .then(uploadResp => {
            alert(uploadResp.status);
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })
  }

  public render() {
    return (
      <div className="centered-content">
        <Dropzone onDrop={this.onDrop}>
          <p>Drop your files here or click to select one.</p>
        </Dropzone>

        <img src={this.state.url} />
      </div>


    );
  }
}
import * as React from 'react';
import Dropzone from 'react-dropzone';
// Make sure to npm install --save react-dropzone
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
        ApiAxios.get(environment.gateway + '/files/skylines/bagus-ghufron-42002-unsplash.jpg')
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
        const file = files[0];  // This will only ever upload one file at a time
        console.log(file);
        ApiAxios.get(environment.gateway + '/movies/upload-file/' + file.name)
            .then(resp => { // resp.data is the url it's going to give us back
                Axios.put(resp.data, file)
                    .then(uploadResp => {
                        alert(uploadResp.status);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                this.setState({
                    url: resp.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    public render() {
        const backgroundStyle = {
            backgroundImage: 'url('+this.state.url+')'
        }
        return (
            <div className="centered-content" style={backgroundStyle}>
                <div>                
                    <Dropzone onDrop={this.onDrop}>
                        <p>Drop your files here or click to select one.</p>
                    </Dropzone>
                </div>                
                {/* <div id="imageDisplay">
                    <img src={this.state.url} />
                </div>*/}
            </div>
        );
    }
}
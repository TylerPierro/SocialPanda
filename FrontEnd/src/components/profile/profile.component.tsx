import * as React from 'react';
import './style.css'
import * as awsCognito from 'amazon-cognito-identity-js';;
import Dropzone from 'react-dropzone';
import { ApiAxios } from '../../interceptors/api-axios';
import { environment } from '../environment';
import Axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
// import { demoApiAxios } from '../../interceptors/demo-api-axios';
// import { environment } from '../environment';

export class ProfileComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    // Default State
    this.state = {
      description: '',
      email: '',
      name: '',
      phoneNumber: '',
      profile: '',
      showEdit: '',
      showEditAddress: '',
      showEditEmail: '',
      showEditPhone: '',
      showEditProfilePic: '',
      username: "TOM"

    }



    const data = {
      ClientId: '368mt4qt7ghc8jp8fsvu308i98',
      UserPoolId: 'us-east-2_eoUFN3DJn'

    };
    const userPool = new awsCognito.CognitoUserPool(data);
    const cognitoUser = userPool.getCurrentUser();




    // Retreive token for reading attributes
    if (cognitoUser != null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('session validity: ' + session.isValid());
      });
    }

    if (cognitoUser != null) {
      cognitoUser.getUserAttributes((err, result) => {
        if (err) {
          console.log(err);
          return;
        }

        let i;
        if (result != null) {
          for (i = 0; i < result.length; i++) {
            // alert("NOTIN MYHOUSE")
            console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue() + " with index " + i);

            // Set Attributes 

          }


          this.setState((prevState) => {
            return {
              address: result[2].getValue(),
              description: result[7].getValue(),
              email: result[8].getValue(),
              name: result[4].getValue(),
              phoneNumber: result[6].getValue(),
              profile: result[1].getValue(),
              showEdit: '',
              username: "BLANK"
            };
          });





          console.log(this.state.profile)
          ApiAxios.get(environment.gateway + 'get-file/' + this.state.profile)
            .then(resp => {
              this.setState({
                // url: resp.data
                url: resp.data
              })
            })
            .catch(errz => {
              console.log(errz);
            })


          // this.state={
          //   email: result[2].getValue(),
          //   phoneNumber: result[1].getValue(),
          //   username: "TOM"
          // }

        }
      });
    }

    // // Check if user is authenicated
    // if (cognitoUser != null) {
    //   cognitoUser.getSession((err, session)=> {
    //     if (err) {

    //       alert(err);
    //       return;
    //     }
    //     console.log('username is: ' + cognitoUser.getUsername())
    //     console.log('session validity: ' + session.isValid());

    //     this.state={
    //       email: '',
    //       username: cognitoUser.getUsername()
    //     }
    //   });
    // }
    // else{
    //   console.log("WHere dey at doe?")
    // }
  }

  public logout() {
    console.log("asd")
    localStorage.clear()
    // this.props.history.push('/sign-in')
  }
  public updateDescription = (event: any) => {
    event.preventDefault()

    const data = {
      ClientId: '368mt4qt7ghc8jp8fsvu308i98',
      UserPoolId: 'us-east-2_eoUFN3DJn'

    };
    const userPool = new awsCognito.CognitoUserPool(data);
    const cognitoUser = userPool.getCurrentUser();

    // Grab from event
    const formObj = {
      Name: 'custom:description',
      Value: event.target.description1.value

    }

    console.log('STAGING CHANGES')
    console.log(formObj)

    // Authenticate User
    if (cognitoUser != null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('session validity: ' + session.isValid());
      });
    }

    // Update Cognito User Description
    if (cognitoUser != null) {
      cognitoUser.updateAttributes([formObj], (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('success')
        console.log('call result: ' + result);
      });
    }

    // Get rid of textbox and update state
    this.setState((prevState) => {
      return {
        description: formObj.Value,
        showEdit: '',
      };
    }, () => {
      console.log('sdad')
    });

    // Reload Page
    // window.location.reload();

  }

  public updatePhone = (event: any) => {
    event.preventDefault()

    const data = {
      ClientId: '368mt4qt7ghc8jp8fsvu308i98',
      UserPoolId: 'us-east-2_eoUFN3DJn'

    };
    const userPool = new awsCognito.CognitoUserPool(data);
    const cognitoUser = userPool.getCurrentUser();

    // Grab from event
    const formObj = {
      Name: 'phone_number',
      Value: event.target.phone1.value

    }

    console.log('STAGING CHANGES')
    console.log(formObj)


    // Authenticate User
    if (cognitoUser != null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('session validity: ' + session.isValid());
      });
    }

    // Update Cognito User Description
    if (cognitoUser != null) {
      cognitoUser.updateAttributes([formObj], (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('success')
        console.log('call result: ' + result);
      });
    }

    // Get rid of textbox and update state



    this.setState((prevState) => {
      return {

        address: prevState.address,
        description: prevState.description,
        email: prevState.email,
        name: prevState.name,
        phoneNumber: formObj.Value,
        showEdit: '',
        showEditEmail: '',
        showEditPhone: '',
        username: "BLANK"
      };
    }, () => {
      console.log('sdad')
    });

    // Reload Page
    // window.location.reload();

  }


  public updateAddress = (event: any) => {
    event.preventDefault()

    const data = {
      ClientId: '368mt4qt7ghc8jp8fsvu308i98',
      UserPoolId: 'us-east-2_eoUFN3DJn'

    };
    const userPool = new awsCognito.CognitoUserPool(data);
    const cognitoUser = userPool.getCurrentUser();

    // Grab from event
    const formObj = {
      Name: 'address',
      Value: event.target.address1.value

    }

    console.log('STAGING CHANGES')
    console.log(formObj)


    // Authenticate User
    if (cognitoUser != null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('session validity: ' + session.isValid());
      });
    }

    // Update Cognito User Description
    if (cognitoUser != null) {
      cognitoUser.updateAttributes([formObj], (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('success')
        console.log('call result: ' + result);
      });
    }

    this.setState((prevState) => {
      return {

        address: formObj.Value,
        description: prevState.description,
        email: prevState.email,
        name: prevState.name,
        phoneNumber: prevState.phoneNumber,
        showEdit: '',
        showEditAddress: '',
        showEditEmail: '',
        showEditPhone: '',
        username: "BLANK"
      };
    }, () => {
      console.log('sdad')
    });

  }




  public updateEmail = (event: any) => {


    event.preventDefault()

    const data = {
      ClientId: '368mt4qt7ghc8jp8fsvu308i98',
      UserPoolId: 'us-east-2_eoUFN3DJn'

    };
    const userPool = new awsCognito.CognitoUserPool(data);
    const cognitoUser = userPool.getCurrentUser();

    // Grab from event
    const formObj = {
      Name: 'email',
      Value: event.target.email1.value

    }

    console.log('STAGING CHANGES')
    console.log(formObj)


    // Authenticate User
    if (cognitoUser != null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('session validity: ' + session.isValid());
      });
    }

    // Update Cognito User Description
    if (cognitoUser != null) {
      cognitoUser.updateAttributes([formObj], (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('success')
        console.log('call result: ' + result);
      });
    }



    // Get rid of textbox and update state

    this.setState((prevState) => {
      return {

        address: prevState.address,
        description: prevState.description,
        email: formObj.Value,
        name: prevState.name,
        phoneNumber: prevState.phoneNumber,
        showEditEmail: '',
        showEdit: '',
        username: "BLANK"
      };
    }, () => {
      console.log('sdad')
    });

    // Reload Page
    // window.location.reload();

  }



  public editDescription = (e: any) => {
    e.preventDefault()
    console.log("editing description...")

    if (this.state.showEdit === '') {
      this.setState({
        showEdit: 'true'
      })
    } else {
      this.setState({
        showEdit: ''
      })
    }
  }

  public editPhone = (e: any) => {
    e.preventDefault()
    console.log("editing description...")

    if (this.state.showEditPhone === '') {
      this.setState({
        showEditPhone: 'true'
      })
    } else {
      this.setState({
        showEditPhone: ''
      })
    }
  }

  public editEmail = (e: any) => {
    e.preventDefault()
    console.log("editing email...")

    console.log(this.state.showEditEmail)
    if (this.state.showEditEmail === '') {
      this.setState({
        showEditEmail: 'true'
      })
    } else {
      this.setState({
        showEditEmail: ''
      })
    }
  }

  public editAddress = (e: any) => {
    e.preventDefault()
    console.log("editing email...")

    console.log(this.state.showEditAddress)
    if (this.state.showEditAddress === '') {
      this.setState({
        showEditAddress: 'true'
      })
    } else {
      this.setState({
        showEditAddress: ''
      })
    }
  }

  // S3

  public editProfilePic = (e: any) => {
    e.preventDefault()
    console.log("editing email...")

    console.log(this.state.showEditProfilePic)
    if (this.state.showEditProfilePic === '') {
      this.setState({
        showEditProfilePic: 'true'
      })
    } else {
      this.setState({
        showEditProfilePic: ''
      })
    }
  }



  public componentDidMount() {


    // ApiAxios.get(environment.context + '/get-file/' + this.state.profile)
    //   .then(resp => {
    //     this.setState({
    //       // url: resp.data
    //       url: this.state.profile
    //     })
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
  }

  public onDrop = (files: any) => {
    const file = files[0];
    console.log(file);





    const data = {
      ClientId: '368mt4qt7ghc8jp8fsvu308i98',
      UserPoolId: 'us-east-2_eoUFN3DJn'

    };
    const userPool = new awsCognito.CognitoUserPool(data);
    const cognitoUser = userPool.getCurrentUser();

    // Grab from event
    const formObj = {
      Name: 'custom:profile',
      Value: file.name

    }

    // Authenticate User
    if (cognitoUser != null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('session validity: ' + session.isValid());
      });
    }

    // Update Cognito User Description
    if (cognitoUser != null) {
      cognitoUser.updateAttributes([formObj], (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('success')
        console.log('call result: ' + result);
      });
    }


    this.setState({
      profile: file.name
    })


    const uploader = (filez: any) => {
      // alert("uploading")
      ApiAxios.get(environment.gateway + 'upload-file/' + filez.name)
        .then(resp => {
          Axios.put(resp.data, filez)
            .then(uploadResp => {
              // alert(uploadResp.status);


              
              // Profile should be changed, do rerender
              ApiAxios.get(environment.gateway + 'get-file/' + filez.name)
                .then(resp1 => {
                  this.setState({
                    url: resp1.data
                  })
                })
                .catch(err => {
                  console.log(err);
                })
              // Close Edit box
              this.setState({
                showEditProfilePic: ''
              })



            })
            .catch(err => {
              console.log(err);
            })
        })
        .catch(err => {
          console.log(err);
        })
    }

    // const downloader = (filez: any) => {
    //   alert("downloading")
    //   // Profile should be changed, do rerender
    //   ApiAxios.get(environment.gateway + '/get-file/' + filez.name)
    //     .then(resp => {
    //       this.setState({
    //         url: resp.data
    //       })
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     })


    //   // Close Edit box
    //   this.setState({
    //     showEditProfilePic: ''
    //   })
    // }

    uploader(file)
    // alert("break")
    // downloader(file)

  }

  // public downloader = () => {
  //   alert("downloading")
  //   // Profile should be changed, do rerender
  //   ApiAxios.get(environment.gateway + '/get-file/' + this.state.profile)
  //     .then(resp => {
  //       this.setState({
  //         url: resp.data
  //       })
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })


  //   // Close Edit box
  //   this.setState({
  //     showEditProfilePic: ''
  //   })

  //   console.log(this.state.url)
  // }
  


  // Rebuild
  public render() {
    return (
      <div id="profileBackground">
        <div id="offset"></div>
        <title>W3.CSS Template</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <style dangerouslySetInnerHTML={{ __html: "\nhtml,body,h1,h2,h3,h4,h5,h6 {font-family: \"Roboto\", sans-serif}\n" }} />
        {/* Page Container */}
        <div className="w3-content w3-margin-top" style={{ maxWidth: 1400 }}>
          {/* The Grid */}
          <div className="w3-row-padding">
            {/* Left Column */}
            <div className="w3-third">
              <div className="w3-white w3-text-grey w3-card-4">
                <div onClick={this.editProfilePic} className="w3-display-container">

                  {((this.state.profile === ' ') || (this.state.profile === '')) ?
                    <img src={require("./Pop.jpg")} style={{ width: '100%' }} alt="Avatar" /> :
                    <img src={this.state.url} style={{ width: '100%' }} alt="Avatary" />
                  }
                  <div className="centered-content">


                    {this.state.showEditProfilePic ?
                      <Dropzone onDrop={(event)=>{this.onDrop(event)}}>

                        <p>Upload a new Profile picture!</p>
                      </Dropzone>
          


                      : null

                    }


                    {/* <Dropzone onDrop={this.onDrop}>
                      <p>Drop your files here or click to select one.</p>
                    </Dropzone> */}


                  </div>

                  <div className="w3-display-bottomleft w3-container w3-text-black">
                    <h2 style={{ color: 'white' }}>{this.state.name}</h2>

                  </div>
                </div>
                <div className="w3-container">
                  <br></br>
                  {/* <p><i className="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-teal" />{this.state.username}</p> */}
                  <p><i onClick={this.editAddress} className="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal" />{this.state.address}</p>
                  {this.state.showEditAddress ?
                    <form onSubmit={this.updateAddress}>
                      Edit: <input id="address1" type="text" name="address" size={512} /><br />
                      <input type="submit" defaultValue="Submit" />
                    </form>



                    : null

                  }
                  <p><i onClick={this.editEmail} className="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal" />{this.state.email}</p>
                  {this.state.showEditEmail ?
                    <form onSubmit={this.updateEmail}>
                      Edit: <input id="email1" type="text" name="email" size={512} /><br />
                      <input type="submit" defaultValue="Submit" />
                    </form>



                    : null

                  }
                  <p><i onClick={this.editPhone} className="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal" />{this.state.phoneNumber}</p>
                  {this.state.showEditPhone ?
                    <form onSubmit={this.updatePhone}>
                      Edit: <input id="phone1" type="text" name="phone" size={512} /><br />
                      <input type="submit" defaultValue="Submit" />
                    </form>



                    : null

                  }
                  <hr />
                  {/* <p className="w3-large"><b><i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal" />Skills</b></p> */}

                  <br />
                  {/* <p className="w3-large w3-text-theme"><b><i className="fa fa-globe fa-fw w3-margin-right w3-text-teal" />Languages</b></p> */}

                  <br />
                </div>
              </div><br />
              {/* End Left Column */}
            </div>
            {/* Right Column */}
            <div className="w3-twothird">
              <div className="w3-container w3-card w3-white w3-margin-bottom">
                <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal" />About Me</h2>
                <div className="w3-container">


                  <p>{this.state.description}</p>
                  <button onClick={this.editDescription}>Edit description</button>


                  {this.state.showEdit ?
                    <form onSubmit={this.updateDescription}>
                      Edit: <input id="description1" type="text" name="email" size={512} /><br />
                      <input type="submit" defaultValue="Submit" />
                    </form>



                    : null

                  }

                  <hr />
                </div>


              </div>
              {/* <div className="w3-container w3-card w3-white">
                <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal" />Education</h2>
                <div className="w3-container">
                  <h5 className="w3-opacity"><b>W3Schools.com</b></h5>
                  <h6 className="w3-text-teal"><i className="fa fa-calendar fa-fw w3-margin-right" />Forever</h6>
                  <p>Web Development! All I need to know in one place</p>
                  <hr />
                </div>
              </div> */}
              {/* End Right Column */}
            </div>
            {/* End Grid */}
          </div>
          {/* End Page Container */}
        </div>
        {/* <footer className="w3-container w3-teal w3-center w3-margin-top">
          <p>Find me on social media.</p>
          <i className="fa fa-facebook-official w3-hover-opacity" />
          <i className="fa fa-instagram w3-hover-opacity" />
          <i className="fa fa-snapchat w3-hover-opacity" />
          <i className="fa fa-pinterest-p w3-hover-opacity" />
          <i className="fa fa-twitter w3-hover-opacity" />
          <i className="fa fa-linkedin w3-hover-opacity" />
          <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p>
        </footer> */}
        {/* <button onClick={()=>{this.downloader()}}>WHATS THE URL</button> */}
      </div>

                  
    );
  }
}
import React, { Component } from 'react'
import {getUserDetails} from "./../api/user"
import CircularProgress from 'material-ui/CircularProgress';

export default class LoginPage extends Component {

  state = {details: null};

  constructor(props) {
    super()
  }

  async componentDidMount() {
    let details = await getUserDetails()
    console.log("details",details)
    if(details){
      console.log(details[0])
      this.setState({
        details: details[0]
      })
    }
  }

  render() {
    return (
      <div>
        {this.state.details ? (
        <h1>Haiiiiii {this.state.details.firstName}</h1>
      ):(
        <CircularProgress/>
      )}
      </div>
    )
  }
}

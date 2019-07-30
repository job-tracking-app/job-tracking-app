import React, { Component } from 'react';
import './Register.scss';
import {connect} from "react-redux"
import {signup} from "../../ducks/authReducer"

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      verifyPassword: "",
      errorMessage: ""
    }
  }
  handleChange = e => {
    e.preventDefault();
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    const {email, password, verifyPassword} = this.state
    e.preventDefault();
    if(password === verifyPassword){
      this.props.signup(email, password)
    }else{
      this.setState({
        errorMessage: "Passwords don't match"
      })
    }
  }
  render() {
    const { email, password, verifyPassword, errorMessage } = this.state
    return (
      <div className="row" id="register">
        <div className="col">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={this.handleChange} 
                required/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.handleChange} 
                required/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Verify Password</label>
              <input type="password"
                className="form-control"
                id="exampleInputPassword2"
                placeholder="Password"
                name="verifyPassword"
                value={verifyPassword}
                onChange={this.handleChange} 
                required/>
            </div>
            {errorMessage ? <div className = "alert alert-danger">{errorMessage}</div> : null}

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className="col">
          <h3>Why be old fashioned? <br /> Just sign in with:</h3>
          <button className=" btn btn-primary">Facebook</button>
          <button className=" btn btn-danger">Gmail</button>
        </div>

      </div>
    );
  }
}
function mapStateToProps (state) {
  return {
    authReducer: state.authReducer
  }
} 
export default connect (mapStateToProps, {signup})(Register);

import '../App.css';

import React from 'react';
import { Link } from "react-router-dom";

class getOTP extends React.Component {
  constructor(props){
    super(props);
    this.state={
    errors: {},
    fields: {},
    otp:''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitOTP = this.handleSubmitOTP.bind(this);
    this.handleOTP = this.handleOTP.bind(this);
  }

  handleChange (event) {
    let fields = this.state.fields;
    fields[event.target.name]=event.target.value;
    this.setState({fields});
  }

  handleSubmit(event) {
    
    event.preventDefault();

    if(this.validate()){
      console.log(this.state);
      let fields=this.state.fields;
      //fields['mob'] = "";
      //fields['email'] = "";
      this.setState({fields});
      
      alert("OTP sent")

    }
  }

  validate(){  
    let fields = this.state.fields;
    let errors = {};
    let isValid = true;

    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);


    if (!fields['email']){
      isValid=false;
      errors['req'] = "Please enter registered email to receive OTP.";
    }  

    // else if (fields['mob'] && fields['email']){
    //   isValid=false;
    //   errors['req'] = "Please enter either email or mobile number to receive OTP.";
    // } 

    //validator.isEmail(fields['email'])===false

   
      
      
    else if (fields['email'] && !pattern.test(fields["email"])){
      isValid=false;
      errors['email'] = "Please enter a valid Email ID.";
    }
      
    

    this.setState({
      errors: errors
    });

    return isValid;
  }

  

  handleOTP(event) {
    let otp = this.state.otp;
    this.setState({otp:event.target.value});
       
  }
  
  handleSubmitOTP = (event) => {
    event.preventDefault();
    let isOtpValid = this.state.isOtpValid;
    let otp = this.state.otp;
    let errors = this.state.errors;
   
    this.setState({
      errors: errors})

    if (isOtpValid===true){
      this.setState({
        otp :otp
      });
      console.log(this.state);
    }
    
  }


  
  render() {
      
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>
            Password Change
          </h1>
          <h4>Enter registered Email ID to receive an OTP to set a new password.</h4>
          <form onSubmit={this.handleSubmit}>
            <div><span className="errorMessage">{this.state.errors.req}</span></div>
            <br></br>
            <br></br>
            
            
            <div className="email">
              <label htmlFor='email'>Email:</label>
              <input 
                className={this.state.errors.email ? "error" : null}
                type="email" 
                name="email"
                value={this.state.fields.email}
                placeholder='Email' 
                onChange={this.handleChange} 
              />
              <span className="errorMessage">{this.state.errors.email}</span>
            </div>

            <br></br>
            <br></br>
            <div className="mySubmit"><button type="submit" value="Send OTP" >Get OTP</button></div>
          </form>
          <br></br>
          <br></br>
          <form onSubmit={this.handleSubmitOTP}>
            <div className="email">
            <label htmlFor='otp'>Enter OTP:</label>
            <input 
                className={this.state.errors.otp ? "error" : null}
                type="text" 
                name="otp"
                value={this.state.otp}
                placeholder="OTP" 
                onChange={this.handleOTP} 
              />
            {/* <span className="errorMessage">{this.state.errors.otp}</span> */}
            {/* {submitOTPButton()} */}
            </div>
            <div className="mySubmit">
              <Link to={'/passwordGet'} >
                <button type="submit" value="submit" style={{width:"100%", padding:"8px"}}>Submit</button>
              </Link>
            </div>           
          </form>

        </div>
      </div>

      );
    }
  }
  
  export default getOTP;


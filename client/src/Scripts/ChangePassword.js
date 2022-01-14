import React from 'react';

class changePassword extends React.Component {
    constructor(props){
      super(props);
      this.state={
        errors: {},
        fields: {},
      }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (event) => {
      let fields = this.state.fields;
      fields[event.target.name]=event.target.value;
      this.setState({fields});
    }

    onSubmit = (event) => {
      event.preventDefault();
      
      let fields = this.state.fields;
      let errors = {};
      let isValid = true;

      if (!fields['nPswd'] ){
        isValid=false;
        errors['newP'] = "Please enter new password."
      }  

      if (!fields['cPswd']){
        isValid=false;
        errors['confP'] = "Please enter confirm password."
      } 

      if (fields['nPswd']!==fields[['cPswd']]){
        isValid=false;
        errors['match'] = "New Password and Confirm Password are not the same."
      }

      this.setState({
        errors: errors
      });
      
      if (isValid===true){
        this.setState({fields:fields});
        console.log(this.state);
        alert("password set")
      }
      

    }

    render() {
        return (
          <div className="wrapper">
            <div className="form-wrapper">
              <h1>
              Password Change
            </h1>
              
              <form onSubmit={this.onSubmit}>
                <div><span className="errorMessage">{this.state.errors.match}</span></div>
                <br></br>
                <br></br>
                <div className="password">
                  <label htmlFor='nPswd'>New Password:</label>
                  <input 
                    className={this.state.errors.newP ? "error" : null}
                    type='password' 
                    name='nPswd' 
                    placeholder='Enter new password' 
                    onChange={this.onChange} 
                  />
                  <span className="errorMessage">{this.state.errors.newP}</span>
                </div>

                <div className="password">
                  <label htmlFor='cPswd'>Confirm Password:</label>
                  <input 
                    className={this.state.errors.confP ? "error" : null}
                    type='password' 
                    name='cPswd' 
                    placeholder='Enter confirm password' 
                    onChange={this.onChange} 
                  />
                  <span className="errorMessage">{this.state.errors.confP}</span>
                </div>
              <br></br>
              <br></br>

              <div className="mySubmit"><button type="submit" value="Set Password" >Set Password</button></div>
            </form>
          </div>
        </div>
        )
    }
}  

export default changePassword;
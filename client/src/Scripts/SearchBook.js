import React from 'react';
import Navbar from "./NavBar";
import "./SearchPg.css";
import ShowSearch from "./ShowSearch";


class SearchBooks extends React.Component {

  constructor(props){
    super(props);
    this.state={
      errors: {},
      fields: {},
      searchB: false
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
 

    if (!fields['bname'] ){
      isValid=false;
      errors['bname'] = "Please enter a book name to search."
    }  

    
    this.setState({
      errors: errors
    });
    
    if (isValid===true){
      this.setState({fields:fields, searchB:isValid});
      console.log(this.state);
      localStorage.setItem("query",fields['bname'])
    }

  }

  render() {
    let searchB = this.state.searchB
      return (
        <div>
          <Navbar></Navbar>
          <div className="pg-wrapper">
          <div className="search-wrapper">
            <br></br>
            <br></br>
            <br></br>
          <form onSubmit={this.onSubmit}>
            <div className="searchbox">
              <input 
                className={this.state.errors.bname ? "error" : null}
                type='text' 
                name='bname' 
                placeholder='Search by book name ...' 
                onChange={this.onChange} 
              />
              <span className="errorMessage">{this.state.errors.bname}</span>
            </div>
            <div className="SSubmit"><button type="submit" value="Search">Submit</button></div>
          </form>
          </div>
          <br></br>
          <div>
            {searchB? (<ShowSearch></ShowSearch>):(<p></p>)}
          </div>


          </div>

        </div>  
        );
  }
}

export default SearchBooks;

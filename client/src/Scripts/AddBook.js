import React from 'react';
import Tabs from "./Tabs"; 
import './App.css';
import AvailableBooks from "./AvailableBooks";
import ReqBooks from "./ReqBooks";
import Navbar from "./NavBar";


class AddBooks extends React.Component {

  render() {
      return (
        <div>
          <Navbar></Navbar>
          <div>
          {/* <div className="wrapper"> */}
            {/* <div > */}
            <div className="tab-wrapper">
              <b><h1>Add Your Books</h1></b>
              <Tabs> 
              <div label="Available Books"> 
              <br></br><br></br>
                  <AvailableBooks></AvailableBooks>
              </div> 
              <div label="Required Books"> 
              <br></br><br></br>
                  <ReqBooks></ReqBooks>
              </div>  
              </Tabs> 
            </div>
          
          </div>
        </div>  
        );
  }
}
export default AddBooks;
import React from 'react';
import './App.css';
import Navbar from "./NavBar";


class Dashboard extends React.Component {

  render() {
      return (
        <div>
          <Navbar></Navbar>
          <div>
          <br></br>
          <br></br>    
          <h4>Dashboard is a part of future User Stories. The user will be able to see the pending requests for books here. </h4>
          </div>
        </div>  
        );
  }
}
export default Dashboard;
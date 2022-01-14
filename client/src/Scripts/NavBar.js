import React from "react";
import "./Navbar.css";
import Logo from "../Images/logo.PNG";
import {NavLink} from "react-router-dom";


function Navbar (){
  
return(
  <div className="menubar">
    <img className="logo" src={Logo} alt="Logo"></img>
    <NavLink exact activeClassName="active_class" to="/home">Dashboard</NavLink>
    <NavLink exact activeClassName="active_class" to="/add_a_book">Add Books</NavLink>
    <NavLink exact activeClassName="active_class" to="/search_a_book">Search Books</NavLink>
    {/* <NavLink exact activeClassName="active_class" to="/nav">Nav</NavLink> */}
    
    <NavLink exact activeClassName="active_class" className="rt" to="/">Logout</NavLink>
    <NavLink exact activeClassName="active_class" className="rt" to="/profile">My Profile</NavLink>
  
  </div>
  
  )
}
export default Navbar;
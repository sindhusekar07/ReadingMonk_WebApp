
import './pageStyle.css';

import React from 'react';
import './App.css';
//import axios from 'axios'
import Register from './Scripts/Register';
import HomePage from './Scripts/Homepage'
import AddBook from './Scripts/AddBook'
import SearchBook from './Scripts/SearchBook'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import getOTP from "./Scripts/GetOTP"
import changePassword from "./Scripts/ChangePassword"
import Dashboard from './Scripts/Dashboard'
import Profile from './Scripts/Profile'
import userprofile from './Scripts/userprofile'


function App(props){
  React.useEffect(()=>{
    tracker();
  },[])
  var TimeOutFun;

  const NotIdle = ()=>{
    clearTimeout(TimeOutFun)
    TimeOutFun = setTimeout(()=>{
      if(window.location.pathname !== "/"){
        console.log(window.location.pathname)
        alert("Session Expired.")
        window.location.href="http://localhost:80/"
      }

    },900000)
  }
  const tracker = ()=>{
    window.addEventListener('click',()=>{
      NotIdle();
    })
    window.addEventListener('mousemove',()=>{
      NotIdle();
    })
    window.addEventListener('scroll',()=>{
      NotIdle();
    })
    window.addEventListener('keydown',()=>{
      NotIdle();
    })
  }
  return(    
    <Router>
      <Switch>
      <Route path='/' exact component={HomePage} />
      <Route path='/register' exact component={Register} />
      <Route path='/home' exact component={Dashboard} />
      <Route path="/pass_req" exact component={getOTP}/>
      <Route path="/passwordGet" exact component={changePassword}/>
      <Route path='/add_a_book' exact component={AddBook} />
      <Route path='/search_a_book' exact component={SearchBook} />
      <Route path='/profile' exact component={Profile} />
      <Route path='/userprofile' exact component={userprofile} />
      </Switch>     
    </Router>
  )
}

export default App;
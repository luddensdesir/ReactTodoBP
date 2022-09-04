import React, {Component, useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Redirect, Switch, Link} from "react-router-dom";
// import {PropTypes} from "prop-types";

import LocalStore from "../../stores/LocalStore";

import Register from "../../globalComponents/Register";
import Login from "../../globalComponents/Login";
import List from "../../globalComponents/List";

export default function Main() {
  const [loggedIn, setLoggedIn] = useState(LocalStore.store.getLoggedIn());
  const [unmountLoginForms, setUnmountLoginForms] = useState(LocalStore.store.getLoggedIn());
  
  const updateLoggedInStatus = (loggedIn)=>{
    setLoggedIn(loggedIn);
  };

  const updateMountStatus = (mount)=>{
    setUnmountLoginForms(mount);
  };

  const revealLoginForms = (delay) => { 
    setTimeout(()=>{
      updateLoggedInStatus(false);
      updateMountStatus(false);
    }, delay);
  };

  const hideLoginForms = (showDelayTime)=>{;

    updateLoggedInStatus(true);

    setTimeout(()=>{
      updateMountStatus(true);
    }, 1000); //1000 is the scss animation time

    revealLoginForms(showDelayTime);
  };

  useEffect(()=>{
    if(LocalStore.store.getLoggedIn()){
      revealLoginForms(LocalStore.store.getLoginExpiryTime());
    }
  }, []);

  var loginInnerContainerClasses = ( loggedIn ?"hidden": "") + " anim";
  return (
    <Router>
      <div id = "main">
        <div>
          <div id = "header">
            <h1>React Todo</h1>
            <ul >
              <li><Link to = "/account">Account</Link></li>
              <li><Link to = "/newlist">New List</Link></li>
              {/* <li><Link to = "/stores">Stores</Link></li> */}
            </ul>
          </div>  
            <List />
          <div id = "loginFormsContainer">
            <div className = {loginInnerContainerClasses} >
              {!unmountLoginForms ? <Register hideSelf = {hideLoginForms} showSelf = {revealLoginForms} /> :null}
              {!unmountLoginForms ? <Login  hideSelf = {hideLoginForms} showSelf = {revealLoginForms}/> :null}
            </div>
          </div> 
        </div>
      </div>
    </Router>
  );
} 

Main.displayName = "Main";

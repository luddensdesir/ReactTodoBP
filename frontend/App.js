import React from "react"; 
import ReactDOM from "react-dom";
import Main from "./pages/Main/Main";
export default function App(){
  return ( 
    <div id = "app">
      <Main/>
    </div>
  );
}

App.displayName = "MainApp";
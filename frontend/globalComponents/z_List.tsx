// import {PropTypes} from "prop-types";
import React, {Component} from "react";
import Todoitem from "./Todoitem";
import Api from "../API/globalAPI";
import {v4} from "uuid";
import TodoListStore from "../stores/TodoListStore";
import LocalStore from "../stores/LocalStore";

declare global {
  interface Window {
    actuallyEmpty: boolean;
    }
}

interface AppProps {
  //code related to your props goes here
}

interface AppState {
  constructedList: any
}

 // ...
var lastUsedList = TodoListStore.store.getLastUsed();

class Todolist extends React.Component<AppProps, AppState> {
  constructor(props){
    super(props);
    
    let list:string[];
    
    if(typeof(lastUsedList) !== "string" && lastUsedList !== undefined && lastUsedList !== null && lastUsedList.length > 0){
      list = lastUsedList;
    } else {
      if(window.actuallyEmpty === true){
        list = [];
      } else {
        // console.log("localList");
        
        list= [ 
          "do thing a",
          "do thing b",
          "do thing c",
          "do thing d",
          "do thing e",
          "do thing f",
          "do thing g",
        ];
      }
    }

    this.textList = list;
    
    this.state = ({
      constructedList: this.buildTodoList(list)
    });
  }

  
  textList:string[]; //just the text representation of the list to get constructed later;
  listDefaultLength:number = 10;
  listMaxLength:number = 20;
  activeListItem:number = 0;
  

  getList = ():void => {Api.getList();}

  componentDidMount():void{
    LocalStore.store.on("update_login_status", this.retrieveLoginList);
  } 

  retrieveLoginList=():void=>{

    console.log("retrieveLoginList");
    console.log(LocalStore.store.getLoginList());
    
    this.textList = LocalStore.store.getLoginList();
    // this.textList = LocalStore.store.getLoginList().data;
    TodoListStore.store.setListFromLogin(this.textList);
    this.updateConstructedList();
  }
  updateConstructedList =()=>{
    this.setState( state => {
      return{
        constructedList: this.buildTodoList(this.textList),
      };
    });
  }

  addListItem = ():void => {

    console.log("addListItem");
    console.log(this.state.constructedList);
    
    this.textList.push("");

    const loggedIn = LocalStore.store.getLoggedIn();
    if(loggedIn){
      Api.setList(this.textList,
        (err)=>{
          this.updateConstructedList();
        },
        (errMsg)=>{ console.log(errMsg);});
      } else {
        this.updateConstructedList();
      TodoListStore.store.saveListToLocalStorage(this.state.constructedList);
    }
  }

  deleteListItem = (index: number) => {
    this.textList = this.textList.filter((item, i)=>{
      return i !== index;
    });
    
    const loggedIn = LocalStore.store.getLoggedIn();
    if(loggedIn){
      Api.setList(this.textList,
        (err)=>{
          this.updateConstructedList();
        },
        (errMsg)=>{ console.log(errMsg);});
    } else {
      this.updateConstructedList();

      console.log(this.state.constructedList);
      
      TodoListStore.store.saveListToLocalStorage(this.state.constructedList);
    }
  };

  clearList = ():void => {
    this.textList.length = 0;
    this.updateConstructedList();
  }

  setToActive=(index):void=>{
    this.activeListItem = index;
  }
  
  updateCompleteList = (event: { target: HTMLInputElement }, index:number):void => {  
    this.textList[index] = event.target.value;
  }
  // emitWordCount(event: { target: HTMLInputElement }) {
  //   this.countUpdate.emit(event.target.value);
  // }

  buildTodoList = (todoList) =>{
    const renderedList = [];

    for(var i = 0; i < todoList.length; i++){
      renderedList.push(
        <Todoitem key = {v4()}
                  index = {i}
                  active = {i === this.activeListItem?true:false} 
                  setToActive = {this.setToActive} 
                  delete = {this.deleteListItem} 
                  task = {todoList[i]}
                  placeholder = "enter new task here"
                  updateParent = {this.updateCompleteList}/>
      );
    }
    
    return renderedList;
  }

  render(){
    return ( 
      <div id = "todolist">
        <button className = "getlist" onClick = {()=>this.getList()}>Save List</button>
        <button className = "additem" onClick = {()=>this.addListItem()} >Add Item</button>
        {this.state.constructedList}
        {/* <button className = "clearall" onClick = {()=>this.clearList()}>Clear All</button> */}
      </div>
    );
  }
};

// Todolist.displayName = "Todolist";

export default Todolist;

import React, {Component} from "react";

interface AppProps {
  key : string,
  index: number,
  active:boolean,
  setToActive: Function,
  delete:Function,
  task: string,
  placeholder: String,
  updateParent: Function
};

interface AppState {
  task: React.FormEvent<HTMLInputElement>,
  index: number
}

class Todoitem extends Component<AppProps, AppState> {
  // state = {
  //   task: ""
  // } 

  constructor(props){
    super(props);

    this.state = {
      task: props.task,
      index: props.index
    };
  }

  updateTodo(ev:React.FormEvent<HTMLInputElement>):void{ 
    this.props.updateParent(ev, this.props.index);
    this.setState({
      task: ev
    });
  }

  setToActive():void{
    this.props.setToActive(this.props.index);
  }

  deleteTodo():void{
    this.props.delete(this.props.index);
  }

  render(){
    return ( 
      <div className = "todoItem">
        <input value={(this.state.task.target as HTMLInputElement).value}            
            onClick ={()=>this.setToActive()} 
            onInput = {(ev)=>this.updateTodo(ev)}
            onChange = {(ev)=>"test"}
            />
        <div className = "deleteTodo" onClick = {(ev)=>this.deleteTodo()}>
          <div id="mdiv">
            <div className="mdiv">
              <div className="md"></div>
            </div>
          </div>
        </div>
        <div className = "clear"></div>
      </div>
    );
  }
}

export default Todoitem;

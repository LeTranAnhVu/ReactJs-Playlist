import React, { Component } from 'react';

import './App.css';

let list = ['di ngu', 'giat do', 'nau com'];
class Note extends Component{
  constructor(props){
    super(props);
    this.deleteNoteReporter = this.deleteNoteReporter.bind(this);
  };

  deleteNoteReporter(){    
    // report the deleted note id to the List
    this.props.deleteNoteHandler(this.props.id);
  };
  render(){
    return (
      <div className="app-note">
        <h5 className="m-0 note-content">{this.props.note}</h5>
        <button className="app-delete-btn sticky-btn" onClick={this.deleteNoteReporter}>Done</button>
      </div>
    );
  }
}

class FormAddNote extends Component{
  constructor(props){
    super(props);
    this.state = {list: this.props.list, clearedText: "ngu"};
    this.addNoteHandler= this.addNoteHandler.bind(this);
    this.noteContentHandler = this.noteContentHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event){
    event.preventDefault();
    event.target.reset();
  }
  noteContentHandler(event){
    if(event.keyCode ===13 && event.target.value.length > 0){
      console.log("check here");
      console.log(event.target.value.length);
      console.log(event.target.value);
      this.addNoteHandler();
    }else{
      // do nothing
    }

  };
  addNoteHandler(event){
    if(this.refs.content.value.length > 0){
      this.state.list.push(this.refs.content.value);
      this.props.onChangeList(this.state.list);
    }else{
      // do nothing
    }
    
  }
  render(){
    return(
      <form className="form-add-note" onSubmit={this.handleSubmit}>
        <input type="text" ref="content" onKeyUp={this.noteContentHandler} placeholder="Type What You Want ..." />
        <button onClick={this.addNoteHandler}>Push</button>
      </form>
    );
  }
}

class List extends Component{
  constructor(props){
    super(props);
    this.state = {list: this.props.list};
    this.deleteNoteHandler = this.deleteNoteHandler.bind(this);

  };

  deleteNoteHandler(id){
    this.state.list.splice(id,1);
    this.setState({list: this.state.list});
  }
  render(){
    return(
      this.state.list.map((note,i)=>{
        return <Note key={i} id={i} note={note} deleteNoteHandler={this.deleteNoteHandler} />
      })
    );
  }
}

class App extends Component{
  constructor(props){
    super(props);
    this.onUpdateList = this.onUpdateList.bind(this);
    this.state= {list: list}
  };

  onUpdateList(list){
    this.setState({list: list});
    console.log("call from onUpdateList- App ");
  }

  render(){
    return (
      <div className="app-container">
        <h1>Toto App</h1>
        <hr />
        <List list={this.state.list}/>
        <hr />
        <FormAddNote list={this.state.list} onChangeList={this.onUpdateList} />
      </div>
    );
  }
}
export default App;

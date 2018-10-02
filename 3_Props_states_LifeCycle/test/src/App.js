import React, { Component } from 'react';
import MyComponent from './MyComponent'
import MyLifeCycle from './MyLifeCycle'

const getRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

class App extends Component {
  state = {
    color: '#000000'
  }

  handleClick = () => {
    this.setState({
      color: getRandomColor()
    })
  }
  render() {
    return (
      <div className="App">
      여기는 App입니다.
      <MyComponent name = "리웩트" age = {29}/>
      <button onClick={this.handleClick}>랜덤 색상</button>
      <MyLifeCycle color={this.state.color}/>
      </div>
    );
  }
}

export default App;

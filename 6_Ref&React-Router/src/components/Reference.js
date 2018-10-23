import React, { Component } from 'react'
import './Reference.css'

class Sample extends Component {
	state = {
		size: 0,
  }

  inputTag = null
	divBox = null

  handleClick = () => {
    this.inputTag.value = '이렇게 직접 접근이 가능합니다';
  }
	
	calculateSize = () => {
    console.log(this.divBox)
    this.setState({
    	size: this.divBox.clientHeight,
		})
  }

  

  render() {
    return (
    <div>
      <input ref = { ref => {this.inputTag = ref}} />
      <button onClick = {this.handleClick}> 이렇게 쓰는 겁니다</button>
      <div ref = { ref => {this.divBox = ref}} >
        <b>height</b> {this.state.size}
        <button onClick={this.calculateSize}>크기나와라 얍!</button>
      </div>
    </div>
    )
  }
}

export default Sample
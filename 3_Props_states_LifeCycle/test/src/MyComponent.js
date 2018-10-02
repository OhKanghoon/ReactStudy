import React, { Component } from 'react'
import PropTypes from 'prop-types'
 class MyComponent extends Component {
     constructor(props){
         super(props)
         this.state = {
             number : 0
         }
     }
     static defaultProps = {
         name : '민수'
     }

     static propTypes = {
         name : PropTypes.string,
         age : PropTypes.number.isRequired
     }
     
  render() {
    return (
      <div>
          <p>여기는 컴포넌트</p>
          <p>이 부분은 jsx 내부에서 렌더링 하는 부분 : 내 이름은 {this.props.name} 입니다. </p>
          <p>이 부분은 jsx 내부에서 렌더링 하는 부분 : 내 나이는 {this.props.age} 입니다. </p>
          <p>이 부분은 jsx 내부에서 렌더링 하는 부분 : 숫자는 {this.state.number} 입니다. </p>
          <button onClick={() => {
              this.setState({
                  number : this.state.number + 1
              })
          }}>플러스</button>
            <button onClick={() => {
              this.setState({
                  number : this.state.number - 1
              })
          }}>마이너스</button>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
      </div>

    )
  }
}

export default MyComponent
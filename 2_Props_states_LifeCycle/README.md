# props(정적)

- properties 
- 컴포넌트 속성을 설정 할때 사용하는 요소 
- props 값은 해당 컴포넌트를 불러와 사용하는 부모 컴포넌트 에서만 설정 가능
- 부모로 부터 받은 컴포넌트(자식 컴포넌트)는 해당 props 를 읽 전용으로만 사용가능 = 수정 불가



순서

1. props 렌더링

   ```jsx
   import React, { Component } from 'react'
   
    class MyComponent extends Component {
     render() {
       return (
         <div>
           내이름은 {this.props.name} 입니다.
         </div>
       )
     }
   }
   
   export default MyComponent
   ```

2. props 값 설정

   ```jsx
   import React, { Component } from 'react'
   import MyComponent from './MyComponent'
   
    class MyComponent extends Component {
     render() {
       return (
       <MyComponent name="React" />
       )
     }
   }
   
   export default MyComponent
   ```

3. props 기본값 설정

   3.1 현재 속성 값을 지정하지 않을 경우 초기 값 설정

```jsx
import React, { Component } from 'react'
import MyComponent from './MyComponent'

 class MyComponent extends Component {
  render() {
    return (
    <MyComponent name="React" />
    )
  }
}

MyComponent.defaultProps = {
    name : '기본 이름'
}

export default MyComponent
```



 3.2 클래스 내부의 선언 

```jsx
import React, { Component } from 'react'
import MyComponent from './MyComponent'

 class MyComponent extends Component {
     static defaultProps = {
         name : '기본 이름'
     }
  render() {
    return (
    <MyComponent name="React" />
    )
  }
}

export default MyComponent
```



1. props 값 검증 

- 필수 props 를 지정

- Props type을 지정 할 때는 propTypes를 사용

- ```yarn
  $ yarn add prop-types
  ```



4.1 클래스 밖 설정

```jsx
import React, { Component } from 'react'
import PropTypes from 'prop-types'

 class MyComponent extends Component {
  render() {
    return (
    <MyComponent name="React" />
    )
  }
}

MyComponent.propTypes = {
    name : propTypes.string
}

export default MyComponent
```



4.2 클래스 내부 설정 (transform-class-properties)

```jsx
import React, { Component } from 'react'
import PropTypes from 'prop-types'


 class MyComponent extends Component {
     static defaultProps = {
         name : '기본 이름'
     }

static propTypes = {
    // string 타입이 아닌 것들은 에러
    name : PropTypes.string 
    //해당 속성 값은 무조건 필수, 없다면 에러
    age : PropTypes.numbert.isRequired 
}
  render() {
    return (
     // 문자열 종류는 {} 사용
    <MyComponent name="React" age = {3} /> 
    )
  }
}

export default MyComponent
```





## propTyes 종류

- array
- bool
- func
- number
- object
- string
- symbol
- node
- elemnt
- instanceOf(MyClass)
- oneOf('a','b')
- any
- ...



# States(동적)



- 컴포넌트 내부에서 값을 읽고, 없데이트 할수 있음 = 컴포넌트 고유의 것







1. State 초기값 설정

```jsx
import React, { Component } from 'react'
import PropTypes from 'prop-types'


 class MyComponent extends Component {
   (...)
    
    constructor(props){
       super(props)
       this.state = {
           // 초기값 0으로 설정
           number : 0
       }
   	}
    
   render() {
     (...)
   }
}

export default MyComponent
```



- MyComponent 는 Component 클래스를 상속 
- 따로 constructor 메소드를 만들지 않는 다면 Component 클래스의 생성자 메소드를 그대로 사용 
- 오버라이딩 하기 위해, 부모 클래스인 Component 의 construtor를 먼저 호출 
- super 키워드 사용 why?
- 컴포넌트를 만들 시, props 값을 이용 -> props를 메소드 파리미터로 전달 





1. 렌더링

```jsx
render(){
    return(
    <div>
            <p>이름 : {this.props.name}</p>
            <p>나이 : {this.props.age}</p>
			<p>숫자 : {this.state.number}</p>


    </div>
    )
}
```



1. 업데이트

```jsx
render(){
    return(
    <div>
            <p>이름 : {this.props.name}</p>
            <p>나이 : {this.props.age}</p>
			<p>숫자 : {this.state.number}</p>
            <button onClick ={() => {
                    this.setState({
                        number : this.state.number + 1
                    })
                }}>더하기</button>

    </div>
    )
}
```



1. constructor에서 꺼내기 

```jsx
import React, { Component } from 'react'
import propTypes from 'prop-types'


 class MyComponent extends Component {
     static defaultProps = {
         name : '기본 이름'
     }

	static propTypes = {
   		 // string 타입이 아닌 것들은 에러
   	 	name : PropTypes.string 
    	//해당 속성 값은 무조건 필수, 없다면 에러
    	age : PropTypes.numbert.isRequired 
	}

    state = {
        number : 0
    }
  render() {
    return (
     // 문자열 종류는 {} 사용
    <MyComponent name="React" age = {3} /> 
    )
  }
}

export default MyComponent
```





## State 업데이트 시 주의사항

- 오직 setState만 이용 가능



### 잘못된 코드 

```jsx
this.state.number = this.state.number + 1
this.state.someArray.push(3)
this.state.someObject.value = 3
```



## 왜 setState??

setState() 매소드 : 파라미터로 전달 받은 필드 업데이트 후 컴포넌트를 리렌더링 하도록 트리거 역할

직접 접근하여 수정할 시, 리렌더링이 되질 않음 

강제적 방법이 존재, 무척 비효울적 -> 사용자제



## 하지만

props를 사용한다고 해서 값이 고정적인것은 아님

- 부모 컴포넌트의 state를 자식 컴포넌트의 props로 전달 

- 자식 컴포넌트에서 특정 이벤트가 발생할 때 부모 컴포넌트의 메소드를 호출하면 props도 유동적 사용 가능





# LifeCycle(생명주기) (16.3v 이후)

![라이프사이클](./lifeCycle.png)



- Wil : 작업 작동 하기 **전**에 실행되는 메소드 
- Did : 작동 **후**에 실행되는 메소드





# 마운트(DOM 생성 되고 웹 브라우저 상에 나타나는 것)

Constructor

 -> getDerivedStateFromProps

​	 -> render 

​		-> componentDidMount



-  : 컴포넌트를 새로 만들 때 마다 호출 되는 클래스 생성자 메소드
- getDreviedStateFromProps : props에 있는 값을 동기화 하는 메소드 
- Render : UI 렌더링 하는 메소드 
- componentDidMount : 컴포넌트가 웹 브라우저 상에 나타난 후 호출되는 메소드 



# 업데이트



## 업데이트 하는 경우

1. props가 바뀔 때 
2. state가 바뀔 때 
3. 부모 컴포넌트가 리 렌더링 될 때
4. this.forceUpdate로 강제로 렌더링을 트리거 할 때 



getDerivedStateFromProps (1,2)

​	-> shouldComponentUpdate (false를 반환하면 취소)(3)

​		-> render(4)

​			-> getSnapshotBeforeUpdate (웹 브라우저상 DOM 변화)

​				-> componentDidUpdate



- getDerivedStateFromProps : 마운트 과정에서도 호출 되며, props가 업데이트시 호출
- shouldComponentUpdate : 컴포넌트가 리렌더링 여부를 결정하는 메소드, false반환시 호출 불가 
- render : 컴포넌트 리 렌더링
- getSnapshotBeforeUpdate : 컴포넌트 변화를 DOM에 반영하기 직전에 호출하는 메소드
- componentDidUpdate : 업데이트 작업이 끝난 후 호출하는 메소드 



# 언마운트(컴포넌트를 DOM 에서 제거 작업)



componentWillUnmount 끗..



componentWillUnmount : 컴포넌트가 웹 브라우저 상에서 사라지기 전에 호출하는 메소드 















# Detail

## render()

```jsx
render(){...}
```

- 컴포넌트 모양새 정의 
- 라이프사이클 중 필수 메소드 
- this.props와 this.state 에 접근 가능
- 리액트 요소 반환 (div, 만든 컴포넌트 등..)



이 메소드 안에서는 state 변형해서는 안됨 

웹 브라우져에 접근해서도 안됨 



DOM 정보를 가져오거나 update 시 ComponentDidMount에서 처리 



## Constructor

```jsx
constructor(props) {...}
```

- 초기 state 설정



## getDerivedStateFromProps

```jsx
static getDerivedStateFromProps(nextProps, prevState) {
  // 조건의 따라 특정 값 동기화 
  /*
  if (nextProps.value !== prevState.value) {
    return { value: nextProps.value };
  }
  return null; // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미
  */
}
```

- props로 받아온 값을 state에 동기화 용도



## componentDidMount

```jsx
componentDidMount() {...}
```

- 컴포넌트를 만들고, 첫 렌더링을 다 마친 후 실행 
- 라이브러리, 프레임워크 호출
- 이벤트 등록, setTimeout, setInterval, api 요청 등 비동기 작업 여기서!



## shouldComponentUpdate

```jsx
shouldComponentUpdate(nextProps, nextState) {...}
```

- Props 또는 state를 변경 시, 리렌더링 여부 결정 
- 반환값은 true or false 필수 반환 
- 이 메소드를 따로 생성 하지 않을 시, true 기본 반환 
- false 시 업데이트 중지 



- 현재 props와 state는 this.props와 this.state로 접근
- 새로 설정 된props 또는 state는 nextProps와 nextState로 접근

## getSnapshotBeforeUpdate

```jsx
getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.array !== this.state.array) {
      const {
        scrollTop, scrollHeight
      } = this.list;

      return {
        scrollTop, scrollHeight
      };
    }
  }
```

- render 메소드 호출 한 후, DOM에 변화를 반영하기 바로 직전!!!! 호출하는 메소드 
- 스크롤바 위치 유지 활용

- componentDidUpdate 3rd parameter에서 값 전달 받음.



## componentDidUpdate

```jsx
componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      const { scrollTop } = this.list;
      if (scrollTop !== snapshot.scrollTop) return; // 기능이 이미 구현되어있다면 처리하지 않습니다.
      const diff = this.list.scrollHeight - snapshot.scrollHeight;
      this.list.scrollTop += diff;
    }
  }
```

- 리렌더링 완료 후 실행 
- 업데이트가 끝난 직 후라서, DOM 관련 처리 가능 
- 이전에 가졋던 props state를 접근 가능 (prevProps prevState) 





## componentWilUnmount

```jsx
componentWillUnmount() {...}
```

- DOM제거 할 때 실행
- 등록한 이벤트, 타이머 , 직접 생성한 DOM 제거 시 활용




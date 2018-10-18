> ## DOM조작(Ref) 과 React-Router

Reference에 대해서 알아보자!

> ### Reference란 무엇일까?

Reference란 단어 뜻과 마찬가지로 "참조"를 위한 명령어? 속성? 입니다.

개발자는 DOM에 대해 직접적인 접근을 하기위해 해당 명령어를 통해 DOM정보를 가져올 수 있습니다.

"이게 무슨소리야?", "뭘 직접접근한다는 거야???"

저도 처음에 뭔 소린지 잘 이해가 가지 않았지만  간단한 예제를 보면서 이해를 도와봅시다.
```
import React, { Component } from 'react'
import './RefSample.css'

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
```

#### 예제에서 담고있는 내용은 다음과 같습니다.

1. 버튼 이벤트를 발생시켜 inputTag의 값을 변경 시켜주는 것

1. 버튼 이벤트를 발생시켜 State의 값을 변경시켜주는 것 입니다.

```
ref = { ref => this.divBox = ref }
```
이 부분을 통해서 위에 만들어 놓은 inputTag 변수에 본인 스스로를 불러오는 파라메터 ref를 대입하여 줍니다.



console.log(this.divBox)를 하였을떄 아래와 같이 콘솔창에 로그가 찍힙니다.



> 보통 어떤경우에 ref를 참조하는 걸까?

1. Input / texarea 등에 포커스를 줄 때 사용합니다.
2. 특정 DOM의 크기를 가져와야 할 때 사용합니다.
3. 특정 DOM 에서 스크롤 위치를 가져오거나 설정을 할 때 사용합니다.
4. 외부 라이브러리를 이용할 때 사용합니다.



---

### React-Router_V4

> #### 리액트 라우터를 사용하는 이유

- 여러 페이지를 url주소나 특정 상태에 따라서 뷰를 나누기 위해서 사용합니다.
- code-spllitting과 함께 사용할 수 있습니다.

- 페이스북의 정식 라이브러리는 아니며, 다양한 리엑트 라우터 라이브러리가 존재합니다. <br> \* 일반적으로 react-router를 사용합니다.

- react-router v4로 변경되면서 react-router-dom을 설치하여야 합니다.
<br> \* react-router는 자동으로 같이 설치됩니다.
  

> #### React-Router를 통해 이용할 수 있는 기능

React-Router를 통해 이용할 수 있는 기본적인 기능은 다음과 같습니다.

- Browser-Router
- Route
  - component, render, children
  - path, exact, stritct
- Router-props
  - history
  - match
  - location
- Link, NavLink
- Switch
  

> ### BrowserRouter

browser history를 사용해서 구현한 라우터입니다.<br>
\* 최상단 component를 BrowserRouter로 감싸주면 App위치 어디에서든 Router를 사용 가능합니다.

HTML5의 history API(pushState, replaceState, popState)를 활용하여 URL과 화면을 동기화하는 종류 중 하나입니다.


```
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div> </div>
      </BrowserRouter>
    )
  }
}
```

> ### Router로 Component를 어떻게 불러올까?

우선 예제부터 보자.

```
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path='/' component={}/>
          <Route path='/sopt' render={() => <h1>솝트 스터디 만세!</h1>}/>
          <Route path='/sopt2' render={() => <Test value={value}>}/>
          <Route path='/react' children={() => <h1>리액트 스터디 만세!</h1>}
        </div>
      </BrowserRouter>
    )
  }
}
```

> ### Route에서 Component를 Rendering하는 방법은 총 세가지 이다.

1. component={Component}
2. render = {() => <element />}
3. children = {() => <element />}



> ## component

경로가 일치하는 경우에 알맞은 Comopnent를 랜더링 해줍니다.

component 경로에 있는 Component를 React element를 만들기 위해 라우터는 React.createElement를 사용한다.

component 속성으로 인라인 함수를 전달하면 렌더링시 마다 새로운 컴포넌트를 생성하지만,

이 방식을 이용하면 기존의 컴포넌트를 갱신하지 않고 언마운트 한 뒤 새로운 컴포넌트를 마운트하게 된다.

```
<Route paht='/' component={Temp} />

const Temp = () => {
  return <h1> Temp component, Reder Success:) </h1>
}
```


> ## render

component에서 인라인 함수로 랜더링할 때 발생하던 원치않는 마운트 없이 렌더링이나 래핑을 위한 방법.
```
import { Home } from 'pages';

<Route path="/home" render={
    () => (
      1. <div> Temp component, Reder Success:)</div>
      2. <Home value={'value'}/>
		)
}/>
```


> ## children

경로 일치여부와 상관없이 렌더링을 진행하는 경우 사용한다.

기능은 render와 거의 동일하며 경로에 대한 매칭여부와 상관없이 랜더링 된다.
```
<ul>
  <ListItemLink to="/somewhere"/>
  <ListItemLink to="/somewhere-else"/>
</ul>

const ListItemLink = ({ to, ...rest }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest}/>
    </li>
  )}/>
)
```


> ## Route의 기타 속성들 (path, exact, strict)

- path: path-to-regexp 모듈이 인식할 url경로를 적어줍니다.
- exact: location.pathname과 정확히 일치할 떄만 매칭됩니다.
- strict: path가 슬래시로 끝나면 location.pathname에서 마지막 슬래시 전까지 제외한 부분에 대하여 일치여부를 판단한다. location.pathname에 추가적으로 붙은 URL 정보에 대해 영향을 주지 않습니다.
   

다음과 같이 사용합니다.
```
<Route path='/react/study' component={Temp} />
<Route exact path='/react/study' />
<Route strict path='/react/study/' />

/*
strict의 경우 path가 /react/ 일때,
1) location.path => /react => false
2) location.path => /react/ => true
3) location.path => /react/study => true
*/
```


> ## history, location, match

각각의 객체는 다음과 같은 정보를 담고 있습니다.



Link, NavLInk

우리가 설정한  Router에 대해서 경로를 변경해주는 역할을 합니다. 음... html로 생각하면 <a href='/'></a> 이것과 같은 기능을 한다고 생각하시면 될 꺼 같아요.

Link는 링크해주는 역할만 합니다. 위에서 알아본 to:string, to:object, replace 등의 옵션을 같이 사용할 수 있어요

```
<Link to='/sopt/react' replace(do or not)> 이렇게 사용합니다. </Link>
```


NavLink의 경우 Link와 거의 같은 기능을 하지만 이벤트들이  발생했을 때 효과(link style => hover, ative..)를 줄 수 있습니다.

```
activeStyle = {
    background: blue;
    font-szie: 2rem;  
}

- Temp.css 
.active {
    background: blue;
    font-szie: 2rem;
}

<NavLink exact to="/study" activeStyle={activeStyle}> 이렇게도 주고 </NavLink>
<NavLink to="/sopt/react" activceClassName={active}> 이렇게도 가능합니다.</NavLink>
```

스타일은 주는 경우는 **1.CSS를 이용하는 경우** 와 **2. js 코드 지정 스타일(?)** 두 가지 경우로 사용할 수 있습니다.



> ## Switch

Switch는 기본 역할 자체는 저희가 if, if..else 같은 조건문을 사용할 때 쓰는 Switch와 같은 역할을 합니다.

기본 Route로 사용할 때는 exact 속성을 걸어주지 않으면 중복되는 Route가 모두 View에 출력이 되게 되지만,

Switch를 통해 묶어주면 조건에 해당하는 단 하나의 Route만 작동하여 View에 랜더링되게 됩니다.

예제를 한번 살펴보죠 :)s



> ## 1.Route만 사용했을떄
```
import { React } from 'react'

class Temp extends Component {
  render() {
    return (
      <div>
        <Route path='/' />
        <Route path='/1/2' />
        <Route path='/2' />
      </div>
    )
  }  
}
```


> ## 
w2.Switch를 이용했을 때 
```
import { React } from 'react'

class Temp extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' />
          <Route path='/1' />
          <Route path='/3' />
        </Switch>
      </div>
    )
  }  
}
```


1번 예제의 경우(Route만 사용한 경우),  첫번째 Route가 중첩되어 다른 Route와 함께 View에 랜더링 됩니다.

2번 예제의 경우(Swich를 사용한 경우) exact를 통해 경로를 명확히 해주면 하나의 Route만 출력 됩니다. exact를 사용하는 이유는 계속 첫번째 Route에만 조건이 성립하는 경우를 제어하기 위해서 입니다 :)

물론, 1번 예제에서도 exact를 사용하면 경로를 분류해줄 수 있습니다.
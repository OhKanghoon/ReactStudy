# React 이벤트 처리, 믹스인, 컴포넌트 구성

이번 스터디 시간에 다룰 주제는 ...

React의 이벤트 핸들링 방법, 컴포넌트  믹스인, 그리고 컴포넌트 구성 방식이다. 



## 이벤트 처리

> 1.이벤트 처리의 기본

React의 이벤트(event) 시스템은 웹 브라우저의 **HTML 이벤트와 사용법이 거의 비슷**하나 몇 가지 주의할 점이 있다.

#### 1-1. React 이벤트 사용 시 주의사항

* **이벤트 이름은 표준 W3C의 DOM 이벤트를 <u>camelCase</u>로 작성해야 한다.** ^[이벤트 사용]^

  예컨대 HTML과 React는 사용자가 요소를 클릭할 때 발생하는 이벤트인 `onclick`을 각각 다음과 같이 다르게 작성한다.

  ```jsx
  // HTML
  <button onclick="activateLasers()">
    Activate Lasers
  </button>
  
  // React
  <button onClick={activateLasers}>
    Activate Lasers
  </button>
  ```



  추가적으로, 이벤트 리스너에서 이벤트의 전파를 정지하는 방식도 다르다. ^[이벤트 취소]^

  예컨대 HTML에서 새로운 페이지를 여는 기본 링크 동작을 막으려면 `false`를 리턴하는 방식을 사용하나, React에서는 v0.12부터 이를 지원하지 않는다. 아래와 같이 `e.preventDefault()`나 `e.stopPropagation()`를 사용하여 다른 이벤트를 차단한다. (React쪽으로 이벤트가 전달되지 않는다.)

  ```jsx
  // HTML
  <a href="#" onclick="console.log('The link was clicked.'); return false">
    Click me
  </a>
  
  // React
  function ActionLink() {
    function handleClick(e) {	//매개변수로 사용된 이벤트 객체 e는 아래에서 더 자세하게 다루도록 한다.
      e.preventDefault();
      console.log('The link was clicked.');
    }
  
    return (
      <a href="#" onClick={handleClick}>
        Click me
      </a>
    );
  }
  ```

* **이벤트의 내용에는 <u>함수 형태의 값</u>이 전달되어야 한다.**

  위에서 확인할 수 있듯이 HTML에서 이벤트를 설정할 때는 큰따옴표("") 안에 실행할 자바스크립트 코드를 넣었지만, React에서는 중괄호({}) 안에 함수 형태의 객체(이벤트 핸들러)를 전달해야 한다. 이때 함수는 화살표 함수나, `render()` 외부에 작성한 함수를 전달하는 형태 모두 가능하다.

* **<u>DOM 요소에만</u> 이벤트를 설정할 수 있다.**

  div, button, input과 같은 DOM 요소에는 이벤트를 설정할 수 있지만, 우리가 직접 만든 컴포넌트에는 이벤트를 자체적으로 설정할 수 없다. 

  만약 컴포넌트에 이벤트를 사용한다면, 컴포넌트는 해당 이벤트 이름의 props를 전달받게 되는 것이다. 그리고 전달받은 props는 컴포넌트 내부의 DOM 이벤트로 사용될 수 있다.

  ```jsx
  // MyComponent를 포함하는 외부 컴포넌트
  <MyComponent onClick={doSomething} />
  
  // MyComponent 내부
  <div onClick={this.props.onClick}>
  { /*...*/ }
  </div>
  ```



#### 1-2. React에서 지원하는 이벤트 종류 ~(v16.5.2)~

[Clipboard](https://reactjs.org/docs/events.html#clipboard-events), [Composition](https://reactjs.org/docs/events.html#composition-events), [Keyboard](https://reactjs.org/docs/events.html#keyboard-events), [Focus](https://reactjs.org/docs/events.html#focus-events), [Form](https://reactjs.org/docs/events.html#form-events) ,[Mouse](https://reactjs.org/docs/events.html#mouse-events), [Pointer](https://reactjs.org/docs/events.html#pointer-events), [Selection](https://reactjs.org/docs/events.html#selection-events), [Touch](https://reactjs.org/docs/events.html#touch-events), [UI](https://reactjs.org/docs/events.html#ui-events), [Wheel](https://reactjs.org/docs/events.html#wheel-events), [Media](https://reactjs.org/docs/events.html#media-events), [Image](https://reactjs.org/docs/events.html#image-events), [Animation](https://reactjs.org/docs/events.html#animation-events), [Transition](https://reactjs.org/docs/events.html#transition-events), [Others](https://reactjs.org/docs/events.html#other-events)

React는 여러 브라우저에서 일관된 속성을 갖도록 이벤트를 표준화했기 때문에 기본적인 이벤트는 모두 지원해준다.

~React에서 지원하지 않는 이벤트의 사용 방법은 실습으로 자세하게 다루도록 한다.~



#### 1-3. 컴포넌트 유형에 따라 다른 이벤트 함수 호출 문제

React에서 컴포넌트는 크게 함수형 컴포넌트와 클래스 컴포넌트로 구분되는데, 컴포넌트의 유형에 따라 이벤트 처리 시 호출하는 함수에 대해 고려할 문제가 다르다. 아래 코드를 통해 확인해보자.

(React.createClass(...)를 사용하는 방식은 v16부터 deprecated되었으니 논의하지 않는다.) 

- 클래스 컴포넌트에서 `onClick` 이벤트를 처리하는 경우

  ```jsx
  class Toggle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isToggleOn: true};
  
      // 이 바인딩은 콜백에서 this가 작동하게 하기 위해 꼭 필요하다!
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
    }
  
    render() {
      return (
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
      );
    }
  }
  
  ReactDOM.render(
    <Toggle />,
    document.getElementById('root')
  );
  ```

  생성자 내부에는 `this.handleClick = this.handleClick.bind(this);`라는 구문이 있다 . 만약 이 부분이 없다면, 즉 `this`를 bind를 하지 않는다면, `handleClick()`을 호출했을 때 `this`는 `undifined` (또는 `null` 또는 `window`)이 되고 this.setState를 사용할 수 없게 된다. 왜냐하면  `handleClick()`는 `render()`에서 콜백으로 실행되어 컨텍스트를 잃게 되기 때문이다. 따라서 해당 컴포넌트의 this를 사용하기 위해 생성자에서 명시적으로 this를 bind 해주고 있다.

  *이러한 현상은 JavaScript에서 this 바인딩이 작동하는 방식 때문에 발생한다. 자세한 설명은 [이곳](https://medium.freecodecamp.org/this-is-why-we-need-to-bind-event-handlers-in-class-components-in-react-f7ea1a6f93eb)을 참고하자.*



  **Ref) 위와 다른 방법으로 이벤트 핸들러를 등록하는 방식**

  1. 꼭 생성자 내부에 바인딩 구문을 작성하지 않아도 된다. 

     ```jsx
     <button onClick={this.handleClick.bind(this)}>
       {this.state.isToggleOn ? 'ON' : 'OFF'}
     </button>
     ```

     (하지만 생성자가 클래스를 초기화하는 부분이기 때문에 this 바인딩을 하기에 가장 적절하다.)

  2. 이벤트 핸들러를 화살표 함수를 이용하여 작성한다. 

     ```jsx
     state = {
       	isToggleOn: true
     };
     
     handleClick = () => {
         this.setState(prevState => ({
             isToggleOn: !prevState.isToggleOn
         }));
     }
     ```

     이 방식은 실험적인 Public Class Fields Syntax으로 **@babel/plugin-proposal-class-properties**가 필요하지만, Create React App에서 기본적으로 사용하는 방식이다. 화살표 함수를 이용하면 this를 자동으로 bind해주기 때문에 바인딩 구문이 필요하지 않고, 컴포넌트 구조를 더욱 간단하게 만들 수 있다.

  3. 콜백 함수에 화살표 함수를 사용하여 작성한다.

     ```jsx
     <button onClick={(e) => this.handleClick(e)}>
       {this.state.isToggleOn ? 'ON' : 'OFF'}
     </button>
     ```

     이 방식을 이용하면 해당 컴포넌트를 렌더링할 때마다 다른 콜백이 생성된다. 만약 그 콜백이 하위 컴포넌트에 전달되는 구조라면 하위 컴포넌트는 매번 추가적으로 다시 렌더링될 수 있다. 따라서 성능을 위해서 생성자에서 this를 바인딩하는 방법이나 이벤트 핸들러를 화살표 함수로 구현하는 방식을 사용하는 것이 좋을 것 같다.


* 함수형 컴포넌트에서 `onClick` 이벤트를 처리하는 경우

  ```jsx
  const SomeButton = props => {
    const onClick = e => (...)
  
    return <button onClick={onClick}>Click me!</button>
  }
  ```

  함수형 컴포넌트는 stateless하고 간단한 구조를 이룰 때 아주 적합하지만, 사실 이벤트를 처리하기에는 적합하지 않다. 왜냐하면 컴포넌트가 렌더링될 때마다 새로운 이벤트 핸들러 함수가 생성되고, 이로 인해 비효율적인 렌더링을 초래하기 때문이다. 따라서 함수형 컴포넌트에 이벤트 핸들러를 구현하고 싶다면 자주 렌더링되지 않는 부분에 사용하는 것이 좋을 것 같다.



#### 1-4. 이벤트 핸들러에 인자 전달하기

```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

화살표 함수와 Function.prototype.bind를 사용하는 방식 모두 두번째 인자로 React 이벤트 객체 e를 전달하는데, <u>화살표 함수에서는 명시적으로 표시</u>해야 하는 반면, <u>bind의 경우에는 명시하지 않아도</u> 자동적으로 다음 인자로 추가되어 전달된다.



>심화





## 믹스인(Mixins)

일반적으로 믹스인이란 기능을 수집하는 수단을 말하며, React에서 믹스인은 컴포넌트의 공통 로직을 Object로 분리, 추출하여 컴포넌트에서 공통적으로 사용할 수 있도록 하는 기능이다. 과거 믹스인이 유용하다는 관점도 있었으나 단점이 크다는 움직임과 함께, ES6 문법(클래스...)에서 믹스인을 지원하지 않게 되면서 현재에는 거의 사용하지 않는 추세가 되었다(심지어 React.createClass도 deprecated됨). 여전히 여러 라이브러리에서 믹스인을 사용하지만, 믹스인은 HOC(Higher Order Component)로 대체될 수 있다는 의견이 강력하다.

> 간단한 사용방법과 특성

##### 1. 사용방법

컴포넌트의 오브젝트에 배열로 지정하고, 배열의 요소들로는 오브젝트 또는 오브젝트를 반환하는 함수 호출문이 가능하다.

```jsx
var Logger = {
  logging(str) {
  console.log(str);
},
componentDidMount() {
  this.logging('component did mount');
}};

var Hello = React.createClass({
  mixins: [Logger],
  render() {
    this.logging('render');
    return <div>Hello</div>
}});
```

##### 2. 믹스인이 로드되는 순서

복수의 믹스인은 순서대로 호출되고 컴포넌트의 메서드는 마지막에 호출된다.

```jsx
var MixinA = {
  componentWillMount() {
  console.log('mixinA');
}};

var MixinB = {
  componentWillMount() {
  console.log('mixinB');
}};

var Hello = React.createClass({
  mixins: [MixinA, MixinB],
  componentWillMount() {
    console.log('hello');
  },
  render() {
    return <div>hello</div>
}});

React.render(<Hello />, document.body);// mixinA// mixinB// hello
```

##### 3. Conflict State or Prop

getInitialState와 getDefaultProps 등을 믹스인으로 지정하면 State와 Props는 각각 컴포넌트의 것과 합쳐진다.

```jsx
var Mixin = {
  getInitialState() {
    return {
      mixinValue: 'mixin state'
    };
}};

var Hello = React.createClass({
  mixins: [Mixin],
  getInitialState() {
    return {
      componentValue: 'component state'
    };
  },
  render() {
    console.log(this.state);
    return <div>hello</div>
}});

React.render(<Hello />, document.body);// Object {mixinValue: 'mixin state', componentValue: 'component state'}
```

##### 4. getInitialState에서 같은 key를 지정

믹스인과 같은 key를 지정할 경우 에러가 발생한다.

```jsx
var Mixin = {
  getInitialState() {
    return {
      value: 'mixin state'
    };
}};

var Hello = React.createClass({
  mixins: [Mixin],
  getInitialState() {
    return {
      value: 'component state'
    };
  },
  render() {
    console.log(this.state);
    return <div>hello</div>
}});

React.render(<Hello />, document.body);// Uncaught Error: Invariant Violation: mergeObjectsWithNoDuplicateKeys(): Tried to merge two objects with the same key: `value`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.
```

##### 5. 메서드 재정의

믹스인과 동일한 이름의 메서드를 컴포넌트에서 재정의하면 에러가 발생한다.

```jsx
var Mixin = {
  foo: function() {
    console.log('mixin foo');
}};

var Hello = React.createClass({
  mixins: [Mixin],
  foo: function() {
    console.log('component foo');
  },
  render: function() {
    return <div>hello</div>
}});

React.render(<Hello />, document.body);// Uncaught Error: Invariant Violation: ReactCompositeComponentInterface: You are attempting to define `foo` on your component more than once. This conflict may be due to a mixin.
```

> 한계

* 컴포넌트는 강한 결합을 유지해야 하는 반면, 믹스인을 변경하면 여러 컴포넌트에 영향을 주게 된다.
* 암시적인 종속성을 지닌다. state와 method가 어디에서 오게 되었는지 알기 어렵다. 특히 여러 믹스인이 적용된 경우에는 더 어렵다.
* 이름 충돌을 일으키기 쉽다. 컴포넌트는 동일한 state와 method로 작동하는 믹스인을 사용할 수 없다. 컴포넌트는  내부의 로직이 강한 결합을 이루고 있기 때문에 state와 method 이름을 수정하는 방법은 쉽지 않다.



## 컴포넌트 구성(Composition)과 디자인 패턴 개괄                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

> 지금까지 우리는 컴포넌트를 기반으로 React를 공부하고 실습했다. *당신은 컴포넌트의 역할이 무엇인지 설명할 수 있는가? 그리고 컴포넌트가 그렇게 구성된 이유에 대해 이야기 할 수 있는가?* 

소프트웨어 개발에서 반복되는 코드를 재사용할 수 있게 만들어야 한다는 원리(DRY: Don't Repeat Yourself)가 중요하듯이, 컴포넌트 또한 재사용 가능하도록 만들어야 한다는 근본적인 목적을 지닌다. **UI를 재사용할 수 있고 독립적인 단위로 쪼개어 생각**할 수 있도록 React에서는 ==<u>구성(Composition)</u>==을 이용한다. 사실 상속도 코드 재사용을 위해 자주 논의되는 방법이며 대게 컴포넌트도 React.Component를 상속받아 정의한다. 그러나 <u>컴포넌트 간</u>의 코드를 재사용(반복되는 부분을 제거)하는 방법으로는 구성이 보다 적절하다. React에서 제공하는 컴포넌트 구성 모델이 뛰어나기 때문이다. 그렇다면 **컴포넌트 구성으로 코드를 재활용하는 방법**에는 어떤 것이 있을까?

##### Ref) 상속과 구성의 차이

* 상속(Inheritance)은 Is A 형태이다.

  : Burger클래스와 Fastfood클래스의 관계는, Burger Is A Fastfood 관계이다.

  ```jsx
  class Burger extends Fastfood {
      // 메소드
  }
  ```

* 구성(Composition)은 Has A 형태이다.

  : BurgerSet클래스와 Burger클래스의 관계는, BurgerSet Has A Burger이다.

  ```jsx
  class BurgerSet {
    Burger name;
  }
  ```



#### 1. 포함(Containment)

내용물이 들어갈 박스(껍데기)형태의 컴포넌트는 자신의 구성(자식)을 미리 알 수 없다. 이러한 컴포넌트는 children prop을 사용하여 자식 컴포넌트를 출력에 직접 전달하는 것이 좋다. 

예컨대 구성을 알지 못하는(자신 안에 어떤 내용이 포함되는지 모르는) `FancyBorder` 컴포넌트는 children props을 통해 `WelcomeDialog`컴포넌트에서 전달된 내용을 렌더링하고 이는 최종 출력된다. 

```jsx
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

```jsx
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

추가적으로, 이렇게 자신의 자식을 미리 알기어려운 컴포넌트에 여러 개의 컴포넌트를 포함하려고 한다면 children prop을 사용하기보다 일반적인 props 전달방식을 이용하는 것이 편하다. React에서는 어떤 데이터든 props를 통해 전달될 수 있기 때문이다. 

예컨대 `<Contacts />`나 `<Chat />`같은 React 컴포넌트도 단순 객체이기 때문에, props를 통해 이를 전달하고 `props.left`와 `props.right`와 같은 방식으로 이용될 수 있다.

```jsx
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={<Contacts />}
      right={<Chat />} 
     />
  );
}
```

#### 2. 구체화(Specialization)

컴포넌트의 구성이 일반적인 컴포넌트보다 구체적인 경우이다. React에서는 구체적인 컴포넌트가 일반적인 컴포넌트를 포함하는 형태이며, 더 구체적인 컴포넌트가 일반적인 컴포넌트로 렌더링하고 props를 전달한다.

예컨대 아래 코드에서 `WelcomDialog`는 `Dialog`의 구체적인 컴포넌트라고 할 수 있다.

```jsx
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />

  );
}
```

이러한 특성은 클래스로 정의한 컴포넌트도 마찬가지로 적용된다. 

```jsx
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />

        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
```

```jsx
const RedButton = () => <Button className="red">
const BlueButton = () => <Button className="blue">
    
// {this.props.theme === RED ? <RedButton> : <BlueButton>}
```



**Ref) 컴포넌트 디자인 패턴**

##### 1. 기본 컴포넌트(Basic Component)

```jsx
// class Button extends React.Component {
//   render() {
//     const { className } = this.props;
//     return <button type="button" className={className} >;
//   }
// }
<Button className="myBtn" />
```

Button이라는 기본 컴포넌트는 개발자가 컴포넌트에 일일이 `<button type="button">`를 작성해야 하는 것을 위와 같이 일반화하여 DRY원리를 유지하도록 도와준다. 이런 컴포넌트들은 다른 컴포넌트에 포함되어 컴포넌트의 구성으로 사용된다.

##### 2. 믹스인(Mixins)

위에서 잠깐 살펴보았던 믹스인도 컴포넌트 구성 패턴의 하나이다. React의 시작부터 컴포넌트 구성을 담당했던 나름 독창적이고 오래된 방법이다. 그러나 ES6 클래스 구문에서 사용이 불가하여 더이상 권장되지 않는 방식이다.

##### 3. 고차 컴포넌트(Higher Order Component)

>개념

믹스인이 더이상 컴포넌트 구성 패턴으로 사용하기 어렵게 되자, 그 대안으로 등장한 React의 새롭고 강력한 컴포넌트 구성 패턴이다. 고차 컴포넌트는 쉽게 말해 **컴포넌트를 인자로 받아 다른 컴포넌트를 반환하는 함수**이다. 

```jsx
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

이 함수는 기존의 컴포넌트의 props를 변경한다거나, 새로운 props를 추가하여 전달한다거나, lifecycle에 접근한다거나, 아예 새로운 컴포넌트를 반환할 수도 있다. 고차 컴포넌트는 이런 기능을 이용하여 다양한 역할을 수행할 수 있지만(고차 컴포넌트는 Redux의 [`connect`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) 나 Relay의 [`createContainer`](https://facebook.github.io/relay/docs/api-reference-relay.html#createcontainer-static-method) 같은 유명 React 라이브러리에서 사용됨), **핵심은 공통으로 사용하는 로직을 한 컴포넌트의 역할로 분리한다는 것**이다. 이를 통해 컴포넌트의 <u>내부 로직을 간결하고 명확하게 유지</u>하는 것이 가능하고, 컴포넌트들의 <u>재사용성</u>이 올라간다.

> 구현과 사용법 [참고](https://reactjs.org/docs/higher-order-components.html)

##### 4. 무상태 컴포넌트(Stateless Component)

**무상태 컴포넌트는 완전한 함수형 컴포넌트**를 말하며, 재사용성이 매우 높은 컴포넌트를 작성하도록 도와준다. *무상태* 컴포넌트라는 이름과 특성이 명시적으로 드러나도록, state가 없을 때 무상태 컴포넌트로 작성하는 것이 적절한 것으로 보인다. 

```jsx
const Button = (props) => (
  <button type="button" className={props.className} />
)

// ES6의 비구조화 할당문 이용
const Button = ({ className }) => (
  <button type="button" className={className} />
)
```

##### 5. Presentational & Container 컴포넌트

핵심 아이디어는 한 컴포넌트 내에 존재하는 <u>**render**와 관련된 로직</u>과 <u>**데이터**와 관련된 로직</u>을 각각 Presentational 컴포넌트, Container 컴포넌트로 분리하는 것이다. 이를 통해 재사용성과 유지보수성을 높일 수 있으며, 앱과 UI에 대한 이해가 쉬워진다. 

| Presentational 컴포넌트의 특징                      | Container 컴포넌트의 특징                                    |
| --------------------------------------------------- | ------------------------------------------------------------ |
| 어떻게 보여질지를 책임진다.                         | 어떻게 동작해야 할지를 책임진다.                             |
| JSX를 이용한 **마크업과 자체 스타일이 존재**한다.   | JSX를 이용한 **마크업이나 스타일이 거의 없다**.              |
| `render`에 필요한 **데이터는 이미 존재**한다고 가정 | Ajax 요청, HOC 등을 이용해 **render에 필요한 데이터를 Fetching** 한다. |
| UI를 위한 `state`가 존재할 수 있다.                 | 데이터 Fetching 등을 위한 `state`가 존재할 수 있다.          |
| 예시) Page, Sidebar, Story, UserInfo, List          | 예시) UserPAge, FollowersSidebar, StoryContainer, FollowedUserList |



> 이번 시간에 다룬 컴포넌트 디자인 패턴은 ''컴포넌트 구성''에 곁들여 개념 정도만 대략적으로 살펴본 것이다.  
> 컴포넌트 통신까지 공부하고 나서 다룰 내용이 많기 때문에 차후에 자세하게 공부해보는 것이 좋을 것 같다.



------

## 이벤트 핸들링에 대한 실습

이벤트의 기본 개념과 더불어 심화적인 부분까지 확인해보았는데, 실습을 통해 좀 더 자세히 알아보자.

1. Creating Event

```jsx
import React, { Component } from 'react';

class App extends Component {
  state = {
    input: "",
    reversedText: ""
  };

  handleChange = e => {
    const value = e.target.value;
    this.setState({
      input: value
    });
  };

  handleReverse = e => {
    e.preventDefault();
    const text = this.state.input;
    this.setState({
      reversedText: text.split("").reverse().join("")
    });
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleReverse}>
          <div>
            <label>Text: {this.state.input}</label>
          </div>
          <div>
            <input type="text" value={this.state.input} onChange={this.handleChange} placeholder="Enter a text" />
          </div>
          <div>
            <button>Reverse Text</button>
          </div>
        </form>
        <p>Reversed Text: {this.state.reversedText}</p>
      </React.Fragment>
    );
  }
}

export default App;
```

간단하게 이벤트를 만들고 다루는 예제이다. JSX는 크게 사용자로부터 텍스트를 받고 입력받은 텍스트를 거꾸로 만드는 폼, 거꾸로 된 텍스트를 보여주는 부분으로 구성된다. 



2. 

```jsx
class App extends Component {
  state = {
    count: 0
  }

  handleIncrement = e => {
    this.setState({ count: this.state.count + 1})
  }

  render() {
    return (
      <React.Fragment>
        <h1>{this.state.count}</h1>
        <IncrementButton increaseButton={this.handleIncrement}/>
      </React.Fragment>
    );
  }
}
```

```jsx
const IncrementButton = (props) => {
  return (
    <React.Fragment>
        <button onClick={props.increaseButton}>+</button>
    </React.Fragment>
  )
}
```



3. dnffkdk

```jsx
class App extends Component {
  state = {
    windowWidth: window.innerWidth
  }

  handleResize = e => {
    this.setState({ windowWidth: window.innerWidth })
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentDidUnMount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    return (
      <React.Fragment>
        <h1>Window Width</h1>
        <h1>{this.state.windowWidth}</h1>
      </React.Fragment>
    );
  }
}
```


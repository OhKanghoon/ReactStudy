# Redux & Immutable.js

## Redux

> " **Redux** 는 Javascript 앱을 위한 예측 가능한 상태 컨테이너입니다. " (Redux Read me 발췌)

한 번에 보고 이해하실 수 있으실까요? 전 이해하기가 조금 어렵더라구요.

React를 개발하고, 공부하기 시작하면 Redux와는 필연적으로 만나게 되어있습니다.

다들 이야기 하길, state를 관리하기 위해서 꼭 필요한 도구라고들 해요.

그래서 Redux를 State Management for React 라고 부르기도 합니다.

그렇다면 왜 Redux를 사용해서 state를 관리해야할까요? Redux가 필요한 이유는 무엇일까요?



### Redux가 탄생한 동기

자바스크립트 싱글 페이지 애플리케이션이 갖추어야 할 요건은 날이 갈 수록 점점 복잡해지고 있습니다.

어느 때보다도 **많은 상태**<small>( 서버 응답, 캐시 데이터, 지속적으로 사용하고 있지만 아직 서버에 저장되지 않은 데이터 등 )</small>를 자바스크립트 코드로 관리할 필요가 생겼죠. 
기존의 MVC 모델로 위와 같은 복잡하고 많은 상태를 관리하기엔 한계가 있었습니다. 모델<->모델, 뷰<->모델, 상태를 변경하기 위하여 접근해야할 곳이 너무 많았고, 로직은 더욱 복잡해져 갔기 때문입니다. 게다가 그런 상황에서 새로운 기능을 추가하기란? 더욱 힘든 일이죠.

그래서 Facebook은 효율적인, 다른 종류의 시스템 구성을 시도하기로 결정했습니다. 그 구조가 바로, Redux의 코어 개념이 되는 Flux Design Pattern 입니다.

<br>

### Flux

![Flux](http://bestalign.github.io/2015/10/06/cartoon-guide-to-flux/05.png)  

<br>

#### ACTION (액션 생성자)

액션 생성자는 type과 payload를 포함한 액션을 생성합니다. (액션의 예 > MESSAGE_CREATE, MESSAGE_READ ...)

생성한 후, 디스패처로 해당 액션 메세지를 전송합니다.  

<br>

#### DISPATCHER (디스패처)

기존의 디스패처는 정해진 타입에 해당하는 핵션을 그 액션이 필요한 스토어에게만 보냈습니다. 하지만 Flux의 디스패처는 다른 아키텍처 속의 디스패처와 조금 다릅니다.

액션의 타입과는 관계없이 등록된 모든 스토어에 액션을 전송합니다.

이말인 즉슨, 스토어가 특정 액션만 구독(subscribe)하는 것이 아니란 이야기입니다. 스토어는 모든 액션을 받은 뒤 받은 액션을 처리할지 말지 해당 스토어가 직접 결정합니다.

디스패처는 액션을 보낼 필요가 있는 모든 스토어에 연결되어 있으며, 액션 생성자가 보낸 액션 메세지를 연결된 모든 스토어에 전달해줍니다.

또한 Flux Dispatcher의 처리 방식은 동기적으로 실행되기 때문에 여러 액션이 들어와도 우선순위를 가진 액션 순으로 처리합니다.  

<br>

#### STORE (스토어)

스토어는 애플리케이션 내의 모든 상태(state)와 그와 관련된 로직을 가지고 있습니다. 그리고 모든 상태 변경은 스토어에 의해서 결정되지요.

모든 액션을 받은 스토어는 내부에서 상태변경을 결정하기 위해 보통 switch 구문을 통해 필요한 액션을 구분하게 됩니다. 상태변경에 대한 내용이 포함되어 있다면, 액션에서 전달받은 상태 변경을 진행합니다.

<small>또한 스토어에는 상태를 설정할 수 있는 설정자가 존재하지 않기 때문에 스토어에서 자체적으로 상태를 변경할 순 없습니다.</small>  

<br>

#### VIEW (컨트롤러 뷰 / 뷰)

스토어에서 상태가 변경되었다는 사실을 컨트롤러 뷰에게 알려줍니다. 그럼 컨트롤러 뷰는 자신 아래의 모든 뷰에게 새로운 상태를 넘겨주고 render 혹은 rerendering 하라고 알려줍니다.

컨트롤러 뷰에게 해당 내용을 전달받은 뷰는, 해당 내용을 사람들이 이해할 수 있는 포맷(HTML)로 변경하여 보여줍니다.

뷰는 애플리케이션 내부에 대해서는 아는 게 없으나, 전달받은 데이터를 처리해서 사람들이 이해할 수 있는 포맷으로 어떻게 바꾸는지에 대한 방법은 알고 있기 때문입니다.

<br>

#### 단방향 데이터 흐름으로 이루어진 동작

- 준비 (the setup)

애플리케이션 최초 초기화 단계에 거치는 과정

1. 스토어, 디스패처에게 '액션 생성자한테 액션 메세지가 오면 알려줘!' 를 공지
2. 컨트롤러 뷰, 스토어에게 '현재 보여줘야하는 최신 상태(state)가 뭐야?'

   스토어, 컨트롤러 뷰에게 '이게 최신 상태(state)야!' 와 함께 state 전달

1. 컨트롤러 뷰, 모든 자식 뷰에게 '이게 현재 최신 상태니까 rendering 해!'
2. 컨트롤러 뷰, 스토어에게 '상태가 바뀌면 또 알려줘!'


- 액션이 들어왔을 경우의 데이터 흐름

1. 사용자의 입력이 들어옴
2. 뷰, 액션 생성자에게 '입력 들어왔어, 액션 준비해!' -> 사용자가 입력한 액션을 액션 생성자에게 전달
3. 액션 생성자, 액션을 포맷에 맞게 가공 -> 디스패처에게 전달
4. 디스패처, 들어온 액션의 순서에 따라 액션을 스토어에 전달
5. 스토어, 모든 액션을 받지만 필요한 액션만을 골라 상태를 필요에 맞게 변경
6. 상태 변경 완료 후, 스토어는 자신을 구독하고 있는 컨트롤러 뷰에게 해당 사실을 공지 (상태 바꼈어!)
7. 컨트롤러 뷰, 스토어에게 변경된 상태 요청 후 해당 상태들을 전달 받음
8. 컨트롤러 뷰, 자신의 자식 뷰에게 새로운 상태에 맞게 렌더링(re-rendering)하라고 공지

<br>

### Flux의 아쉬운 점

#### 아쉬운 점 1. 스토어의 코드는 애플리케이션 상태를 삭제하지 않고선 리로딩이 불가능하다.

Flux Store의 두가지 특성은 아래와 같습니다.

> 1. 상태 변환을 위한 로직
> 2. 현재 애플리케이션의 상태

그러나 핫 리로딩<small>코드가 바뀌었을 때 기존의 상태를 유지할 수 있게 만들어주는 특성</small>을 할 때, 스토어 객체 하나가 위와 같은 두가지 특성을 가지고 있게 되면 문제가 발생합니다.

![flux store 문제점](http://bestalign.github.io/2015/10/26/cartoon-intro-to-redux/02.png)

새로운 상태 변환 로직을 위해 스토어 객체를 리로딩 하게 되면, 스토어에 저장되어 있는 기존의 상태까지 잃어버리는 상황이 발생합니다. 또, 스토어와 시스템의 나머지 부분 사이에 있는 이벤트 구독까지도 망가져버리죠.

<br>

#### Redux에서의 (1) 해결법

Redux에서 Store는 두 기능으로 분리됩니다.

애플리케이션의 상태만을 가지고 리로딩 되는 Store와, 모든 상태변환 로직을 관리하는 Reducer가 등장했습니다.

리듀서Reducer를 리로딩하는 것으로 애플리케이션 상태를 잃어버리지 않고 관련 로직만을 리로딩 하기 때문에 걱정없이 리로딩을 할 수 있게 되었습니다.

> 리듀서Reducer : 이전 상태와 Action을 합쳐, 새로운 State를 만드는 조작

<br>

#### 아쉬운 점 2. 애플리케이션의 상태는 매 액션마다 재기록된다.

시간 여행 디버깅(time travel debugging)<small>특정 상태로 돌아갈 수 있게 해주는 특성 (특정 상호작용을 빠르게 테스트할 수 있음)</small> 에 대한 이야기입니다.

시간 여행 디버깅을 위해선 상태 객체의 모든 버전을 기록해두어야 합니다. 그러기 위해선 상태가 매번 바뀔 때마다 이전 상태들을 버전 별로 저장해야하는 상황이 필요했죠. 또한 각각의 버전이 완전히 독립된 객체가 될 필요성이 있었습니다. (이전 버전의 상태들을 수정되지 않게 하기 위해서!)

<br>

#### Redux에서의 (2) 해결법

그래서 Redux에선 이 문제를 해결하기 위해서 액션이 스토어로 전달 되었을 때, 기존의 애플리케이션 상태를 수정하는 대신 그 상태를 복사한 뒤 복사본을 수정합니다.

<br>

### Redux가 나왔다!

Flux를 개선하여, 조금 더 개발자들이 상태 관리를 편리하게 할 수 있도록 Redux가 등장했습니다. 그리고, 그 Redux의 근본적인 원칙들은 다음과 같죠.

1. 하나의 애플리케이션 안에는 하나의 스토어가 있다

애플리케이션의 모든 상태는 하나의 스토어 안에 하나의 객체 트리 구조로 저장됩니다. <small>(여러 개의 스토어를 만들 수도 있긴 해요! 하지만, 그렇게 여러개를 만들면 개발 도구를 활용하지 못합니다.)</small>

이를 통해 범용적인 애플리케이션을 쉽게 제작하도록 만들 수 있습니다. 서버로부터 가져온 상태는 Serialized되거나 Hydrated되어 전달되며 클라이언트에서 추가적인 코딩 없이도 사용할 수 있습니다.

2. 상태는 읽기 전용이다

상태를 변화시키는 유일한 방법은 무슨 일이 벌어지는 지를 묘사하는 액션 객체를 전달하는 방법뿐입니다. 이를 통해서 뷰나 네트워크 콜백에서 결코 상태를 직접 바꾸지 못한다는 것을 보장할 수 있습니다. 모든 상태 변화는 중앙에서 관리되며 모든 액션은 엄격한 순서에 의해서 하나하나 실행되기 때문입니다.

3. 변화를 일으키는 함수, 리듀서는 순수한 함수여야 한다

액션에 의해 상태 트리가 어떻게 변화하는 지를 지정하기 위해, (상태 변화 로직을 구현하기 위해) 프로그래머는 리듀서<small>이전상태와 액션을 받아 다음 상태를 반환하는 순수 함수</small>를 작성해야 합니다. 

>  순수 함수란?
>
> - 리듀서 함수는 이전 상태와, 액션 객체를 파라미터로 받는다.
> - 이전의 상태는 절대 건드리지 않고, 변화를 일으킨 새로운 상태 객체만을 만들어서 반환
> - 똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과값을 반환

<br>

그러나 Redux가 Flux와 개선사항을 제외하고 완전히 동일한 건 아닙니다. Redux에는 Flux 에서 사용했던 디스패처라는 개념이 존재하지 않습니다. Redux는 이벤트 이미터<small>이벤트 송수신 클래스</small>보다 순수 함수에 의존하기 때문입니다. 어떻게 보면 Flux보다 구조가 조금 더 간단해질 수 있죠.

<br>

### 예시와 함께 보는 Redux가 필요한 이유

컴포넌트 - local state 有

- Instagram heart component
  1. 좋아요를 누르지 않은 상태 (회색 하트)
  2. 좋아요를 누른 상태 (빨간 하트)

앱 - global state 有

- 앱, 많은 컴포넌트를 기반으로 지어짐
- 그러나 동시에 global state도 가지고 있음
  1. user가 로그인을 한 상태
  2. user가 로그인을 하지 않은 상태

- global state 에서는 모든 컴포넌트가 영향을 받음 ( 로그인 여부에 따른 화면 구성 등… )

<br>

전반적으로 위의 두 분류로 state가 나뉘어집니다. 그리고, state 중 global state는 때때로 공유되어야 하죠.

특정 사진에 좋아요를 눌렀는지, 누르지 않았는지에 대한 정보는 네비게이션 컴포넌트나 댓글 컴포넌트에 필요하진 않습니다.

그러나 특정 사용자의 로그인 여부는 모든 컴포넌트들이 알기를 원합니다.

<small>(로그인을 하지 않으면 좋아요를 누를 수없고, 코멘트를 남길 수 없어야 함. 로그인을 하면 그 반대로!)</small>

이렇게, 공유된 state를 (위에선 로그인 여부 정보) 저장하는 방법이 Redux입니다. 즉, Redux는 State Container와 다름이 없죠.

![2018-10-31-1-56-53.png](https://i.postimg.cc/Gtn7gQ8Y/2018-10-31-1-56-53.png)

예시입니다. 위와 같은 프로젝트가 있다고 가정합시다. 우리는 ROOT에서 C까지 데이터를 전달하고 싶습니다.

![2018-10-31-1-57-31.png](https://i.postimg.cc/fy7HG9mP/2018-10-31-1-57-31.png)
그럼 ROOT에서 A를 또 거쳐야 C까지 데이터를 전달할 수 있습니다. 아, 얼마나 번거로운가요? 코드는 코드대로 작성해야 하지, 수정할 게 생기면 파일을 일일히 열어서 다 수정해줘야 합니다.

하지만 리덕스를 쓰면 이 모든 일이 해결됩니다!

![2018-10-31-2-45-50.png](https://i.postimg.cc/qB2Zh9SG/2018-10-31-2-45-50.png)

자, React 프로젝트에 Redux를 적용하면 다음과 같이 스토어가 생깁니다. 스토어엔 지금껏 말씀드렸던 것처럼, 프로젝트의 상태에 관한 데이터가 담겨 있어요.

<br>

#### 컴포넌트, 스토어 구독

![2018-10-31-2-41-44.png](https://i.postimg.cc/tC5SDFXZ/2018-10-31-2-41-44.png)

C 컴포넌트는 스토어를 구독합니다. 구독한다는 것은 해당 스토어의 변화에 관심이 있다는 뜻이고, 스토어 값이 변경되면 해당 변경 값을 받아보고 싶다는 의미입니다. (말 그대로 신문 구독 개념과 유사하죠?)

<br>

#### 스토어에 상태 변경 공지

![2018-10-31-2-50-41.png](https://i.postimg.cc/XYY2PXJ2/2018-10-31-2-50-41.png)

이제 B 컴포넌트에 이벤트가 생겨서, 상태를 변화할 일이 생겼다고 가정합시다.<small> (ex. 로그인 이벤트가 발생하였을 경우, user_id 나 로그인 여부를 알 수 있는 변수를 저장하면 되겠죠? )</small>

이때 dispatch 라는 함수를 통해서 액션<small>상태에 변화를 일으킬 때 참조할 수 있는 객체</small>을 스토어에 넘겨줍니다.

<br>

#### 리듀서를 통하여 상태 변화

![2018-10-31-2-44-44.png](https://i.postimg.cc/kgYjP9R7/2018-10-31-2-44-44.png)

전달받은 액션의 타입에 따라 상태를 업데이트 시키는 로직을 정의내린 함수가 리듀서입니다. 우리가 직접 필요에 따라서 구현하는 함수이죠! 만약, ACTION이 INCREMENT 라는 액션 메세지를 보내면 해당 메세지를 읽고 특정 숫자를 증가시키는 동작을 작동하고, DECREMENT 라는 액션 메세지를 보내면 숫자를 감소시키는 작업을 이 **리듀서Reducer**에서 하게됩니다.

리듀서 함수가 받는 두가지 파라미터는 아래와 같습니다.

> 1. state : 현재 상태
> 2. action : 액션 객체

그리고, 두 가지 파라미터를 참조하여 업데이트 로직에 따라 변화한 새로운 상태를 반환합니다.

<br>

#### 상태에 변화가 생기면, 구독하고 있던 컴포넌트에 공지

![2018-10-31-2-45-29.png](https://i.postimg.cc/vm10Qj5f/2018-10-31-2-45-29.png)

상태에 변화가 생긴 걸 store를 통해서 공지받게 되면, 해당 공지와 함께 새로운 상태값을 전달받게 됩니다. 그럼 컴포넌트는 무얼 하면 될까요? 새로운 상태를 보여주기 위해 리렌더링을 하면 되겠죠?

<br>

## Immutable.js

Redux는 뭐, 그럭저럭 개념을 이해한 거 같습니다. 아니 그런데 그거랑 또 같이 쓰는 Immutable.js 라는 게 있다고 하네요. 이건 또 뭘까요? 불변함(Immutability)을 지키며 상태관리 하는 것을 매우 편하게 해주는 라이브러리 Immutable.js! 라고만 해도 우리는 도통 그게 뭔지 모르겠잖아요.

<br>

### Immutability?

자, 그럼 불변성 먼저 이야기해봅시다. 이 불변성Immutability는 함수형 프로그래밍의 핵심 원리입니다. 객체가 생성된 이후 그 상태를 변경할 수 없는 디자인 패턴을 의미하죠.

해당 객체에 직접적으로 접근하여 값을 변경하거나, 전달하거나 전달받는 게 아닌 참조 형태로 해당 작업들이 진행됩니다. 그렇지만, 여기저기서 참조를 하다 보면 해당 객체의 상태는 언제든지 변경될 수도 있죠.

이는 객체의 참조를 가지고 있는 어떤 장소에서 객체를 변경하면, 참조를 공유하는 모든 장소에서 변경에 영향을 받기 때문입니다. 근데 해당 변경이 의도된 동작이라면 상관 없지만 의도한 동작이 아니라면? 변경한 해당 장소 말고, 객체를 참조하고 있는 다른 장소에도 이 상태가 변경되었다고 공지하고 추가 대응이 필요하겠죠. <small>(애초에 객체는 직접적으로 변경하는 걸 권장하고 있지 않지만요)</small>

```javascript
let a = 7;
let b = 7;

let object1 = { a: 1, b: 2 };
let object2 = { a: 1, b: 2 };

object1 === object2
// false : 서로 다른 객체이기 때문에

let object3 = object1

object1 === object3
// true : object3과 object1이 같은 객체를 가리키고 있기 때문에

object3.c = 3;
object1 === object3
//true
object1
// Object { a: 1, b: 2, c: 3 } :: object3 을 변경했는데 object1 까지 바뀜

```

<br>


그렇다면 이걸 해결하는 방법은 무엇일까요? 비용은 조금 들지만 객체를 불변객체로 만들어 내부 요소의 변경을 막는 방법이 있고, 객체의 변경이 필요하다면 방어 복사본을 생성하여 변경하거나 Observer 패턴으로 객체의 변경에 대처하는 방법이 있습니다.

React 에서는 컴포넌트의 state가 직접적으로 변경되서는 안되는 객체의 역할을 합니다. 무조건 setState를 통해서 업데이트를 해주어야 하죠.

ex )

```javascript
state = {
    users: [
        {
            id: 1,
            username: 'yujeong'
        }
    ]
}
```

이 users 배열에 새로운 객체를 추가하고 싶어요! 어떻게 하면 될까요?

```javascript
// Nooooooo
this.state.users.push({
    id: 2,
    username: 'nohYujeong'
});

//Noooooooooo
this.state.users[0].username = 'NYJ'
```

이처럼 하면 안됩니다! jQuery를 사용하여 웹 개발을 진행해보셨더라면 익숙한 방식이지만요.

왜냐하면 React에서 setState를 통해서 state를 변경하지 않으면 리렌더링이 되지 않기 때문입니다. 

> <small>(더 자세한 설명) :: 리액트 컴포넌트에서는 state 혹은 상위 컴포넌트에서 전달받은 props의 값이 변할 때마다 리렌더링을 해야하는데, 배열 혹은 객체를 직접적으로 수정한다면 내부의 값이 수정됐을지라도 레퍼런스가 가리키는 곳은 같음 -> 결국 똑같은 값으로 인식</small>

그리고 저렇게 코드를 계속 짜게 된다면? React의 기본적인 특성 상 문제가 발생하게 됩니다.

바로, 부모 컴포넌트가 리렌더링 되면 자식 컴포넌트들 또한 리렌더링이 되는 문제인데요. 이 과정은 가상 DOM에서만 이루어지는 렌더링이며, 렌더링을 마치고 리액트의 diffing 알고리즘을 통하여 변화가 일어난 부분만 실제로 업데이트 되긴 합니다.

그러나 저렇게 불변함을 지키지 않고 코딩할 경우, 계속해서 새로 렌더링되는 과정 속에서 자잘한 CPU 낭비가 발생하게 됩니다. 작은 프로젝트에선 문제가 없겠지만 프로젝트가 커진다면? 문제가 되겠죠.

<br>

### 불변함을 유지하다보면 코드가 복잡해진다..!

```javascript
/// 여기서 두 번째 계정의 이메일을 변경하고 싶으면..?
state = {
  users: [
    { 
      id: 1, 
      username: 'yujeong', 
      email: 'yujeong.noh@email.com' 
    },
    { 
      id: 2, 
      username: 'shdbwjd0326', 
      email: 'shdbwjd0326@email.com' 
    }
  ]
}

/// 이렇게 해야함..!! 으악 복잡해
const { users } = this.state;
const nextUsers = [ ...users ]; // users 배열 복사
nextUsers[1] = {
  ...users[index], // 기존의 객체 내용 복사
  email: 'new_shdbwjd0326@email.com' // 덮어 씌우기
};
// 이렇게 기존의 users 는 건들이지 않고
// 새로운 배열/객체를 만들어 setState
this.setState({
  users: nextUsers
});

```

<br>

### 이러한 작업을 쉽게 해줄 수 있는 것, Immutable.js!

```shell
$ npm install immutable --save
$ yarn add immutable --save
```

<br>

#### Immutable.js 사용 시 중요한 9가지 규칙

1. 객체는 Map() 을 사용하여 선언
2. 일반 javascript 객체로 변활할 땐, toJS() 사용
3. 배열은 List()를 사용하여 선언
4. 값 설정 시, set() 사용
5. 값 조회 시, get() 사용
6. 값 변경 시, update() 사용
7. 객체 혹은 배열 내부에 대한 값 제어시, In 이 붙여진 함수 사용 (setIn(), getIn(), updateIn())
8. List 내장함수는 일반 javascript 배열의 내장함수와 유사
9. 객체에서 특정 key 값을 삭제하거나, 배열 List에서 원소를 삭제하려 할 때는 delete 사용

```javascript
// 1. 객체는 Map
const obj = Map({
  foo: 1,
  inner: Map({
    bar: 10
  })
});

// 2. 일반 javascript 객체로 변활할 땐, toJS() 사용
console.log(obj.toJS());

// 3. 배열은 List()를 사용하여 선언
const arr = List([
  Map({ foo: 1 }),
  Map({ bar: 2 }),
]);

console.log(arr.toJS());

// 4. 값 설정 시, set() 사용
let nextObj = obj.set('foo', 5);
console.log(nextObj.toJS());
console.log(nextObj !== obj); // true

// 5. 값 조회 시, get() 사용
console.log(obj.get('foo'));
console.log(arr.get(0)); // List 에는 index 를 설정하여 읽음

// 6. 값 변경 시, update() 사용
// 두번째 파라미터로는 updater 함수가 들어감 
nextObj = nextObj.update('foo', value => value + 1);
console.log(nextObj.toJS());

// 7. 객체 혹은 배열 내부에 대한 값 제어시, In 이 붙여진 함수 사용 (setIn(), getIn(), updateIn())
nextObj = obj.setIn(['inner', 'bar'], 20);
console.log(nextObj.getIn(['inner', 'bar']));

let nextArr = arr.setIn([0, 'foo'], 10);
console.log(nextArr.getIn([0, 'foo']));

// 8. List 내장함수는 일반 javascript 배열의 내장함수와 유사
nextArr = arr.push(Map({ qaz: 3 }));
console.log(nextArr.toJS());
nextArr = arr.filter(item => item.get('foo') === 1);
console.log(nextArr.toJS());

// 9. 객체에서 특정 key 값을 삭제하거나, 배열 List에서 원소를 삭제하려 할 때는 delete 사용
nextObj = nextObj.delete('foo');
console.log(nextObj.toJS());

nextArr = nextArr.delete(0);
console.log(nextArr.toJS());

```

<br>

자, 그럼 리액트 컴포넌트에서 Immutable 을 사용해볼까요? state 내부에 하나의 Immutable 객체를 만들어두고, 상태 관리를 모두 이 객체를 통해서 진행하면 됩니다!

```jsx
// 객체를 Map으로, users 배열을 List로 정의
state = {
    data: Map({
      input: '',
      users: List([
        Map({
          id: 1,
          username: 'yujeong'
        }),
        Map({
          id: 2,
          username: 'nohyj'
        })
      ])
    })
  }

// data가 immutable 객체가 되었기 때문에, set을 사용
 onChange = (e) => {
    const { value } = e.target;
    const { data } = this.state;

    this.setState({
      data: data.set('input', value)
    });
  }

// data가 immutable 객체가 되었기 때문에, update를 사용
onButtonClick = () => {
    const { data } = this.state;

    this.setState({
      data: data.set('input', '')
        .update('users', users => users.push(Map({
          id: this.id++,
          username: data.get('input')
        })))
    })
  }

//Map or List의 값을 읽을 때 data.users 가 아닌, data.get('객체명') 으로!
render() {
    const { onChange, onButtonClick } = this;
    const { data } = this.state;
    const input = data.get('input');
    const users = data.get('users');

    return (
      <div>
        <div>
          <input onChange={onChange} value={input} />
          <button onClick={onButtonClick}>추가</button>
        </div>
        <h1>사용자 목록</h1>
        <div>
          <UserList users={users} />
        </div>
      </div>
    );
  }

```

<br>

그런데, 계속 setIn, getIn, 하는 게 너무 번거롭다! 할 수도 있어요.

그럴 때 이용하면 유용할 이것, 바로 **Record** 입니다.

#### Record

```javascript
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { Record } from 'immutable';

const Person = Record({
  name: '홍길동',
  age: 1
});


let person = Person();

console.log(person); 
// ▶Object {name: "홍길동", age: 1 }

console.log(person.name, person.age);
// "홍길동" 1

person = person.set('name', '노유정');
console.log(person.name); // 노유정


// 이건 오류 납니다: person.name = '철수';

// Record 에서 사전 준비해주지 않은 값을 넣어도 오류납니다.
// person = person.set('job', 5);


// 값을 따로 지정해줄수도 있습니다.
person = Person({
  name: '영희',
  age: 10
});

const { name, age } = person; // 비구조화 할당도 문제없죠.
console.log(name, age); // "영희" 10

// 재생성 할 일이 없다면 이렇게 해도 됩니다.
const dog = Record({
  name: '멍멍이',
  age: 1
})()

console.log(dog.name); // 멍멍이

// 이런것도 가능하죠.
const nested = Record({
  foo: Record({
    bar: true
  })()
})();

console.log(nested.foo.bar); // true

// Map 다루듯이 똑같이 쓰면 됩니다.
const nextNested = nested.setIn(['foo', 'bar'], false);
console.log(nextNested);

render(<App />, document.getElementById('root'));

```

<br>

## 정리하자면!

- 리액트에서 상태State를 관리하기 위해선 Redux 를 사용하는 게 편하다!
- State 는 불변성을 유지해주어야 한다!
- Immutable.js 를 사용하면 State의 불변성 유지가 편리하다!
- 다들 Redux와 Immutable.js 를 활용해서 즐거운 코딩 시간이 되어봅시다~

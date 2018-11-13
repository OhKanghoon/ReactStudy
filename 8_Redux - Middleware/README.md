# Redux middleware

## What is Middleware?

**미들웨어란?**

운영체제에서 제공되지 않는 서비스를 애플리케이션에 제공하는 다목적 소프트웨어

- 커널과 사용자 애플리케이션 사이에 있는 모든 소프트웨어
- 데이터베이스 시스템, 전자통신 소프트웨어, 메세지 및 쿼리 처리 소프트웨어 등...

**프레임워크에서 미들웨어란?**

프레임워크가 요청을 받고 응답을 만드는 사이에 놓을 수 있는 코드(ex. Express)



## Redux Middleware

Express와 같은 미들웨어와는 다른 문제를 해결하지만, 해결방법의 컨셉은 비슷합니다.

**액션을 보내는 순간부터 스토어에 도착하는 순간까지의 사이에 서드파티 확장을 사용할 수 있는 지점을 제공**한다는 점에서요!

위는 Redux 공식 Document에서 가져온 문구입니다. 조금 어렵지요? 아래에서 조금 더 쉽게 풀어서 설명해보겠습니다.

지난주 Redux를 설명드릴 때, 이벤트가 발생해 상태를 변경할 일이 생긴 컴포넌트는 발생 이벤트(액션)을 스토어에 dispatch 메소드로 전달드린다 말씀드렸습니다.

그리고 스토어에 도착한 액션은 리듀서 함수를 만나, 해당 액션에 따른 상태 업데이트 로직을 실행시키죠.

[![2018-11-07-3-09-36.png](https://i.postimg.cc/vB76jvSq/2018-11-07-3-09-36.png)](https://postimg.cc/9RMMwy2Z)

미들웨어는, 액션이 디스패치 되어서 리듀서에서 해당 액션이 처리되기 전에 사전에 지정된 작업들을 설정합니다.

액션과 리듀서 사이의 중간자라고 할까요?

- 액션이 처리되기 전, 콘솔에 기록해서 확인하고 싶다! -> 미들웨어에서

- 전달받은 액션이 '특정 조건'을 만족하지 않아 취소하고 싶다! -> 미들웨어에서

- 이 액션이 오면, 다른 B 액션도 같이 dispatch 시키고 싶다! -> 미들웨어에서



아니 그럼, 저게 그냥 Redux에서는 안됐다는 걸까요?

콘솔에 로그를 찍는 건 Redux 만 썼을 때도 console.log 만 찍으면 될 거 같은데? 다른 것도 조건문만 잘 설정하면 되지 않나?

#### 로깅

Redux의 장점 중 하나는 바로, 상태 변화를 예측 가능하고 투명하게 만든다는 점이죠. 액션이 보내질 때마다 상태가 계산되고 저장되니까요!

<sub>(상태는 스스로 변할 수도 없고, 특정 액션의 결과로만 변경되서 불변성도 잘 지켜지구요)</sub>

![React로깅](http://i.imgur.com/BjGBlES.png)

자, Redux에서 로깅을 어떻게 구현해야 엘레강스한 코드 스타일을 구현할 수 있을까요? 여러 번의 시도가 있었습니다.

##### 1. 직접 로깅하기

단순하면서 가장 세련되지 못한 방법이죠. store.dispatch(action) 을 호출할 때마다 액션과 다음 상태를 직접 로깅하는 방법이에요. 

```javascript
store.dispatch(addTodo('Use Redux'));
// 을 로깅하기 위해선?

let action = addTodo('Use Redux');

console.log('dispatching', action); // 특정 액션이 dispatch 되고
store.dispatch(action);
console.log('next state', store.getState()); // reducer 실행 후 상태변화 기록
```

##### 2. 로깅을 함수로 분리

```javascript
function dispatchAndLog(store, action) {
    console.log('dispatching', action); // 특정 액션이 dispatch 되고
    store.dispatch(action);
    console.log('next state', store.getState()); // reducer 실행 후 상태변화 기록
}

// 메소드 실행
dispatchAndLog(store, addTodo('Use Redux'));
```

그렇지만, 매번 메소드를 호출하기엔 번거롭잖아요?

##### 3. dispatch method 몽키패칭

그럼 우리가 직접 스토어 인스턴스의 dispatch 메소드를 다시 정의내리는 건 어떨까요?

<sub>이 작업을 앞으론 몽키패칭이라 부르겠습니다! (몽키패칭? 런타임중에 프로그램의 메모리를 직접 건드려 소스를 변형하는 행위)</sub>

```javascript
let next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
};
```

그럼 어디서 어떤 액션을 보내던 로깅은 보장되겠죠?

##### 여기서 문제, 디스패치 함수를 두 가지 이상의 로깅 동작으로 몽키패칭 하고 싶을 땐?

action 이 dispatch 되고, 그 과정을 추적하고, 상태 변경이 완료된 로그를 확인하고 싶을 수도 있습니다. 그렇다면, action 이 dispatch 되었을 때 error 가 발생한다면? 그리고 그걸 로그로 확인할 수 있다면?

코드로 나타내면 아래와 같게 될 겁니다.

```javascript
// 동작 로그
function patchStoreToAddLogging(store) {
  let next = store.dispatch;
  store.dispatch = function dispatchAndLog(action) {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
  };
}

// 충돌 보고 로그
function patchStoreToAddCrashReporting(store) {
  let next = store.dispatch;
  store.dispatch = function dispatchAndReportErrors(action) {
    try {
      return next(action);
    } catch (err) {
      // 에러가 발생하면 catch 해서 로그 찍기
      console.error('Caught an exception!', err);
      Raven.captureException(err, {
        extra: {
          action,
          state: store.getState()
        }
      });
      throw err;
    }
  };
}

// 분리해서 모듈로 만들면 아래처럼 호출할 수 있을 거에요
patchStoreToAddLogging(store);
patchStoreToAddCrashReporting(store);
```



##### 4. 몽키패칭 숨기기

하지만 몽키패칭은 임시방편이에요. 하나하나 다 뜯어 고칠 수도 없잖아요. 그리고, 직접 method 를 대체해야만 쓸만해지는 api는 없잖아요?

대신, 대체하는 게 아니라 새로운 dispatch 함수를 반환한다고 생각해봅시다.

```javascript
function logger(store) {
  let next = store.dispatch;

  // 앞에서는 아래와 같이 대체했었죠?
  // store.dispatch = function dispatchAndLog(action) {

  // 그걸 이번엔 반환합니다!
  return function dispatchAndLog(action) {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
  };
}
```

그리고, 몽키패칭 적용을 도와주는 헬퍼를 사용해봅시다. 

```javascript
function applyMiddlewareByMonkeypatching(store, middlewares) {
  // 2개 이상의 몽키패칭 메소드를 slice 하고
  middlewares = middlewares.slice();
  middlewares.reverse();

  // 각각의 미들웨어로 디스패치 함수를 변환합니다.
  middlewares.forEach(middleware =>
    store.dispatch = middleware(store)
  );
}
```

여러 동작(동작 로그, 충돌 로그) 를 적용할 땐 :

```javascript
applyMiddlewareByMonkeypatching(store, [logger, crashReporter]);
```

하지만 이건 코드를 숨긴 거지, 아직 몽키패칭이잖아요?

##### 5. 몽키패칭 제거

dispatch 에 덮어씌워서 동작을 변경해야만 하는 이유는, 그래야 모든 미들웨어들이 이전에 감싸진 (이전에 변경된) store.dispatch 에 접근할 수 있기 때문입니다.

```javascript
function logger(store) {
  // 반드시 앞의 미들웨어에 의해 반환된 함수를 가리켜야 합니다:
  let next = store.dispatch;

  return function dispatchAndLog(action) {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
  };
}
```

즉, 약간 풀어서 설명하자면 우리는 dispatch 메소드가 동작도 로그를 찍어줬으면 좋겠고 충돌도 로그를 찍어줬으면 좋겠잖아요?

**두 동작이 같이 실행** 되길 원한단 말이죠. 하나만 실행하고 reducer가 실행되는 일 없이 말이에요!

![미들웨어 체이닝1](http://redux-middleware.surge.sh/images/next-vs-dispatch.png)



자, 이 그림을 조금 쪼개봅시다<sub>(전 저렇게 되어있더니 좀 헷갈리더라구요)</sub>

원래 dispatch 동작은 아래와 같았죠.

[![2018-11-07-5-21-24.png](https://i.postimg.cc/vTQ6d6JQ/2018-11-07-5-21-24.png)](https://postimg.cc/cgbJR61j)

그런데 여기서 미들웨어가 추가되었습니다. 거기에 store.dispatch 를 그대로 사용하게 되면?

[![2018-11-07-5-26-46.png](https://i.postimg.cc/Y23WzbFj/2018-11-07-5-26-46.png)](https://postimg.cc/c6vCs7XN)

리듀서로 가지 못하고 미들웨어만 순환하게 됩니다.

(현재 미들웨어를 포함한 전체 미들웨어 체인을 **처음부터 다시** 따라가게 되어버려요 - Redux 의 applyMidleware() 함수에 구현되어있음)

그래서, 동작로깅 미들웨어에서 충돌로깅 미들웨어로, 충돌로깅 미들웨어에서 리듀서로 향하는 동작을 next 함수가 수행하게 됩니다.

[![2018-11-07-5-21-36.png](https://i.postimg.cc/BbMPZn32/2018-11-07-5-21-36.png)](https://postimg.cc/Lgg8NRns)

next는 다음 미들웨어가 있으면, 해당 미들웨어로 향하게 되고 미들웨어가 없으면 리듀서로 향하게 됩니다.

**순서**

[action dispatch -> 동작 로그 찍고(middleware A) -> 충돌 로그 찍고(middlewareB) -> reducer 실행 (상태 업데이트)]

이를 '미들웨어 체이닝' 이라고 부릅니다. 

```javascript
// 해당 arrow function 의 동작이 잘 설명되어있는 링크입니다.
// https://stackoverflow.com/questions/32782922/what-do-multiple-arrow-functions-mean-in-javascript
/*
const logger = function logger(store) {
    return function(next) {
        return function(action) {
        ...
        };
    };
};
*/
const logger = store => next => action => {
  console.log('dispatching', action);
  
  // 미들웨어가 뒤에 더 없다 : next = 리듀서로 go
  // 미들웨어가 뒤에 더 있다 : next = 다음 미들웨어로 go
  // 여기선 뒤에 충돌 로그 작업이 있기 때문에, 해당 미들웨어로 go
  let result = next(action); 
  console.log('next state', store.getState());
  return result;
};

const crashReporter = store => next => action => {
  try {
    // 미들웨어가 뒤에 더 없다 : next = 리듀서로 go
    // 미들웨어가 뒤에 더 있다 : next = 다음 미들웨어로 go
    // 충돌 발생 X여서 기록도 x, 이제 reducer 로 go
    return next(action);
  } catch (err) {
    console.error('Caught an exception!', err);
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    });
    // 충돌 발생하면 충돌 로그 찍고 에러 던지기
    throw err;
  }
}

```

자, 이게 바로 Redux middleware 가 생긴 모양입니다. 

##### 이제 미들웨어를 적용해보자, applyMiddleware

미들웨어를 구현했고, 이제 실질적으로 적용해야겠죠?

Redux 는 미들웨어를 적용하기 위한 모듈로 applyMiddleware를 제공합니다.

```javascript
// Redux API 안의 실제 applyMiddleware source code 가 아니라 적당히 동작 과정을 설명하기 위한 code
function applyMiddleware(store, middlewares) {
  middlewares = middlewares.slice(); // parameter로 들어온 미들웨어를 쪼갠다.
  middlewares.reverse();

  let dispatch = store.dispatch;
  middlewares.forEach(middleware =>
    dispatch = middleware(store)(dispatch)
  );

  return Object.assign({}, store, { dispatch });
}
```

자, 적용은 간단합니다! 

```javascript
import { createStore, applyMiddleware } from 'redux';

// 미들웨어가 여러개인경우에는 파라미터로 여러개를 전달 -> 예: applyMiddleware(a,b,c)
// 미들웨어의 순서는 여기서 전달한 파라미터의 순서대로 지정
// 동작 로그 먼저 찍고 -> 충돌 검사 후 report
// createStore 상에서 작동하는 이유 : 미들웨어를 처음 한 번만 적용하기 위해
const store = createStore(modules, applyMiddleware(logger, crashReporter))
```



#### 그리고 사실...

이와 같은 미들웨어는 보통 이미 오픈소스로 라이브러리가 나와있는 경우가 많아요.

위에 구현한 로그 작업도, 이미 redux-logger 라는 미들웨어로 오픈소스 등재가 되어있습니다.

하지만, 개념을 이해했으니 해당 미들웨어를  사용할 때 조금 더 수월하고 혹시나 미들웨어 코드를 수정할 일이 생길 때 문제가 될 일이 없겠죠?

# TypeScript (기본타입~함수)

홈페이지에서는 TypeScript를 간단하게 이렇게 소개하고 있다.

> - 자바스크립트에 **타입이 있는 슈퍼셋**이다.
>
> - 자바스크립트로 컴파일이 된다. (*컴파일형 언어*)



### 타입이 있는 자바스크립트?

타입이 있다는 말은 자바스크립트가 정적 타입 시스템(static type system)을 도입한 언어라는 뜻이다. 대표적인 정적 타입 언어로는 C, Java, C++ 등으로, 이러한 언어에서는 프로그램의 예상 동작을 타입을 통해 나타내고, 그 예상에 맞게 동작할지의 여부를 타입 검사기를 통해 실행 전에 확인할 수 있다. 그리고 타입스크립트로 작성된 코드는 타입스크립트 컴파일러에 의해 자바스크립트 코드로 컴파일된다.

### 자바스크립트의 슈퍼셋?

타입스크립트는 자바스크립트와 다른 언어가 아니다. 자바스크립트의 문법을 기반으로 하여 그 위에 추가적인 기능을 더한 것이다. 추가된 기능에는 class나 enum처럼 사용성을 향상시키기 위한 기능도 있고, private나 타입 어노테이션처럼 코드의 안전성을 향상시키기 위한 기능도 있다. 

------



### # 기본 타입

TypeScript에서 지원하는 기본 데이터 타입은 일반적인 프로그래밍 언어의 것과 유사하다. 여기에 몇 가지가 추가된다.

#### 1. 부울 (`boolean`)

```ts
let isCode: boolean = true;	//false도 존재
```



#### 2. 숫자형 (`number`)

```ts
let decimal: number = 6;  // 10진수
let hex: number = 0xf00d;  // 16진수
let binary: number = 0b1010;  // 2진수
let octal: number = 0o744;	// 8진수
```



#### 3. 문자열 (`string`)

쌍따옴표(`"`)와 홑따옴표(`'`) 모두 이용할 수 있으며, 일반적으로는 홑따옴표(`'`)를 사용하여 표현한다. 백틱(`` `)을 통해 여러 줄에 걸쳐 문자열을 입력할 수 있는 `template string`도 사용 가능하다.

```ts
let myName: string = "Crystal Rim";
let myAge: number = 24;
let myTemplateString = `Hi!!!
my name is ${myName}.
I'm ${ myNumber } years old.
`;
console.log(myTemplateString);

// Hi!!! 
// my name is Crystal Rim.
// I'm 24 years old.
```



#### 4. 배열 (`Array`)

자바스크립트와 마찬가지로 배열을 지원하는데, 원시 데이터 타입이 아닌 객체임에 주의하자.

```ts
// 일반적인 방식
let myArr: string[] = ["Hello", "Hi", "안녕하세요"];
// 배열 인터페이스와 제네릭을 이용하는 방식, Array<배열 요소의 타입>
let myNumArr: Array<number> = [1, 2, 3, 4];
```



#### 5. 튜플 (`Tuple`)

튜플은 원소마다 각기 다른 데이터 타입을 허용하는 특수한 배열이다. 

```ts
let myTuple: [string, number];
myTuple = ["Hello", 100]; // 굿
myTuple = ["Hello", "World"]; // 에러 발생, 튜플의 타입 선언에 맞지 않기 때문이다.

console.log(myTuple[0]);  // "Hello" 출력
console.log(myTuple[1]);  // 100 출력
console.log(myTuple[2]);  // undefined 출력

myTuple[2] = "World"; // 가능
myTuple[2] = 200;     // 가능
myTuple[2] = true;    // 불가능, string이나 number만 들어갈 수 있다. (string | number)
```

배열과 동일하게 사용가능한데, 현재 사용할 수 있는 인덱스를 넘어가는 곳에 데이터를 입력할 때는 튜플 선언에서 사용한 데이터 타입의 Union 타입을 이용한다. 



#### 6. 열거형 (`enum`)

숫자 대신 친숙한 이름으로 설정하기 위해 이용한다.

```ts
enum Color { Red, Green, Blue }
let myColor: Color = Color.Red;
console.log(myColor);   // 0


enum Animal { Dog = 1, Cat, Pig = 5 }
let myAnimal: Animal = Animal.Cat;
console.log(myAnimal);   // 2

myAnimal = Animal.Pig;
console.log(myAnimal);   // 5


enum Snack { Jelly = 1, Chocolate, Pudding }
let mySnackStr: string = Snack.Chocolate;  // 에러, 문자열에 숫자 대입 불가

let mySnack: string = Snack[3];        // 가능 (배열로 처리-index에 주의)
console.log(mySnack);                  // "Pudding" 출력
```

enum은 배열 형태로 사용이 가능하여, 해당 문자열을 바로 쓸 수 있다.



#### 7. Any (`any`)

코드를 작성할 때 어떤 변수의 데이터 타입을 결정할 수 없는 경우가 존재할 수 있다. 예컨대 동적으로 로딩되는 데이터 타입이 런타임에 결정되어 컴파일 시점에 데이터 타입을 지정할 수 없는 경우다. 이럴 때는 **어떠한 데이터 타입도 될 수 있다**는 의미로 any 데이터 타입을 사용하면 된다. 

```ts
let myVar: any = 100;
myVar = "This is Any!!"; // 가능
myVar = true;            // 가능
myVar.ifItExists();		 // 가능

// any를 이용하여 서로 다른 데이터 타입으로 이루어진 배열도 만들 수 있다.
let myArr: any[] = [100, "Hello", true]; 
```



#### 8. Void (`void`)

일반적으로는 함수의 반환값이 없을 때 함수의 반환 타입으로 이용한다. 일반 변수에 데이터 타입으로 선언된다면, 해당 변수에는 `null` 또는 `undefined`만 할당될 수 있다.

```ts
let myVar: void;
myVar = 100;       // 불가
myVar = "This is void";   // 불가
myVar = null;      // 가능
myVar = undefined; // 가능
```



#### 9. Null과 Undefined (`null` , `undefined`)

```ts
let myUndefined: undefined = undefined;
let myNull: null = null;

//  tsconfig.json 파일에 "strictNullChecks": true로 설정한 경우
let myVar: string = "hi";
myVar = null;		//불가
myVar = undefined;	//불가
```

`null`과 `undefined`는 다른 모든 타입의 서브타입으로, 다른 모든 타입에 `null`과 `undefined`를 할당할 수 있다.
그러나 .ts 파일을 컴파일할 때 `--strictNullChecks` 플래그를 사용하게 되면,  `null`과 `undefined`는 `void`와 각각의 타입에만 할당될 수 있다.



#### 10. Never (`never`)

`never`는 절대로 발생하지 않는 데이터 타입으로 모든 타입의 서브 타입이다. 그러나 자기 자신을 제외하고는 어떤 타입도 `never`의 서브타입이 아니다. 일반적으로는 함수의 반환 타입으로 사용된다. 예컨대 함수의 반환 타입으로 `never`가 사용되면, 해당 함수는 항상 예외를 발생시키거나 절대 반환되지 않음(ex. 무한 루프에 빠짐)을 의미한다.

```ts
function error(message: string): never {
	throw new Error(message);
}
error("What the @#$%!@3!!");

function infiniteLoop(): never {
	while (true) {}
}
```



#### 11. 타입 단언(Type assertions)

컴파일러에게 "나 지금 제대로 하고 있어, 이 타입 사용이 맞아!" 라는 의미로 전달하는 것이다. type casting과 같은 의미로 사용되지만 실제로는 특별한 확인작업이나 데이터 재구조화 작업이 발생하지 않는다. TypeScript는 Type assertion을 전달받으면 프로그래머가 특정한 타입 확인을 진행했다고 가정하고(TypeScript가 따로 검증하지 않고) 컴파일을 진행한다. 

주로 `any` 타입과 함께 사용되며, 데이터 타입을 한정지어 사용할 수 있도록 도와준다.

```ts
let myVar: any = "What am I";

let myVarCount: number = (<string>myVar).length;	// angle-bracket 사용 방식
myVarCount = (myVar as string).length;				// as 사용 방식

console.log((<number>myVar).toFixed());  // runtime error
```

두 가지 방식 모두 사용가능한데, TSX에서는 `as` 스타일의 타입 단언만 허용된다.

------



### # 변수 선언

우리가 일반적으로 알고 있는 프로그래밍 언어의 변수 스코프 개념(block-scoping)과 달리, 기존  JavaScript의 `var` 변수는 function-scoping을 가진다. 즉, 함수, 모듈, 네임 스페이스 또는 전역 스코프에서 접근할 수 있는 것이다. 
이러한 스코프 규칙때문에 사용자들은 많은 실수를 하게 된다.

이를 방지하기 위해 ES6부터 등장한 변수 선언! 바로 **`let`과 `const`**이다. 

blocking-scope를 가지는 `let`은 `var`의 모호성을 해결하여 대신 사용될 수 있으며, `const`는 변수에 재할당을 금지하는 목적으로 사용되는 변수 선언이다. TypeScript에서는 `let`과 `const`를 지원하고 있다.

------



### # 비구조화 (Destructuring)

TypeScript는 비구조화 문법을 지원하는데, ES6의 비구조화 문법과 완전하게 똑같지는 않다.

#### 1. 배열 비구조화

```ts
// 1. 변수 선언과 동시에 비구조배열을 생성
let gem: string[] = ["Crystal", "Ruby", "Diamond"];

// let first: string = myArr[0];
// let second: string = myArr[1];
// let third: string = myArr[2];
let [first, second, third]: string[] = gem;	

console.log(first);     // "Crystal" 출력
console.log(second);    // "Ruby" 출력
console.log(third);     // "Diamond" 출력

// 2. 변수 swap
[first, second] = [second, first];

// 3. 함수의 매개변수로 비구조배열을 사용
function logFactory([first, second]: [number, number]) {	
    console.log(first);
    console.log(second);
}
logFactory([1, 2]);

// 4. 이렇게도 사용 가능
let [, second, , fourth] = [1, 2, 3, 4];
```



#### 2. 객체 비구조화

```ts
// 1. 객체의 프로퍼티가 비구조 객체에 쓰이는 변수의 이름과 동일하면 간소화된 형태로 이용 가능
let crystal = {
    firstName: "Sujung",
    age: 24,
    lastName: "Rim"
};
let { firstName, age } = crystal;

// 2. 선언없이 할당도 가능
({ name, birth } = { name: "ewha", birth: 1886 });

// 3. 프로퍼티 이름 변경, 여기에서 콜른은 타입을 나타내는 콜론이 아님
let { firstName:a, lastName:b } = crystal;
console.log(a);	// Sujung
console.log(b);	// Rim

// 4. 타입을 지정하고자 할 때
let { firstName, lastName }: { a: string, b: string } = crystal;

//5. 기본값 주기, ?는 해당 프로퍼티가 있을 수도 없을 수도 있음을 의미
let obj: {myName:string, myAge?:number} = {
    myName : "임수정",
};

let { myName:uNmae, myAge:uAge = 24 } = obj;
console.log(uNmae);  // 임수정
console.log(uAge);   // 24
```



#### 3. 전개 연산자 (`...`)

전개는 비구조화의 반대로, 배열을 다른 배열로 객체를 다른 객체로 전개하는 것을 허용한다.
특히 객체의 전개에는 주의가 필요하다. 나중에 전개한 객체의 프로퍼티가 이전의 프로퍼티를 덮어쓰기 때문이다. 

```ts
let first = [1, 2];
let second = [3, 4];
let bothPlus = [0, ...first, ...second, 5];	// [0, 1, 2, 3, 4, 5]

let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };	// { food: "rich", price: "$$", ambiance: "noisy" }
```

------



###  # 인터페이스(interface)

TypeScript에서 인터페이스는 *새로운 데이터 타입을 만드는* <u>추상 데이터 타입</u>으로 사용되며, **일반 변수, 함수, 클래스의 <u>타입 확인</u>**을 위해 사용된다. 인터페이스를 이용하여 타입을 선언하면, 인터페이스안에 명시된 프로퍼티의 선언과 메소드의 구현이 강제되기 때문에 프로그래밍의 일관성을 확보할 수 있다. 

#### 1. 인터페이스의 기본 사용법과 Parameter Type Check, 그리고 Duck Typing

```ts
interface Person {
	firstName: string;
	lastName: string;
}

let star: Person;

star = {
    firstName: "은우",
	lastName: "차"
}
console.log(star);

function printPersonInfo(paramPerson: Person) : void {
	console.log(paramPerson.firstName);
}

let me: Person = {
	firstName: "수정",
	lastName: "임"
};
// printPersonInfo()의 인자로 인터페이스 타입의 객체가 전달되어 사용됨
printPersonInfo(me);


let you: Person = {
	firstName: "화",
	lastName: "이"
    age: 133
};
// 아래와 같은 코드도 에러없이 컴파일이 진행된다.
printPersonInfo(you);
```

위의 코드가 에러없이 컴파일이 진행되는 이유는 TypeScript가 duck typing을 지원하기 때문이다. 클래스의 상속이나 인터페이스의 구현으로 타입을 구분하는 것이 아니라, 객체가 특정 타입에 맞는 프로퍼티와 메소드를 가지고 있으면 해당 타입으로 간주한다.



#### 2. 선택적 프로퍼티 (Optional Properties)

TypeScript에서 인터페이스의 모든 프로퍼티와 메소드는 구현하는 클래스 또는 구현 객체에서 기본적으로 모두 재정의되어야 한다. 하지만 `?`가 붙어있는 선택적 프로퍼티를 이용하면 해당 프로퍼티는 재정의하지 않아도 된다. 즉 선택적으로 구현여부를 결정할 수 있는 것이다.

```ts
interface Person {
	firstName: string;
	lastName: string;
    age? : number;			// optional property
    getFirstName(): string;
}

function printPersonInfo(paramPerson: Person) : void {
	console.log(paramPerson.firstName);
    console.log(paramPerson.lastName);
}

let me: Person = {
	firstName: "수정",
	lastName: "임",
    getFirstName: function() {
        return this.firstName;
    }
};

printPersonInfo(me);
```



#### 3. 읽기전용 프로퍼티  (Readonly Properties)

`readonly`를 사용하면 객체가 처음 생성되는 시점에만 프로퍼티들을 수정 가능하도록 설정할 수 있다. 한번 값이 정해지고나면 그 후에는 수정할 수 없는 것이다. 변수 선언에 사용되는  `const`와 비슷한 역할이나, `readonly`는 프로퍼티 지정 시 사용함을 기억하자.

또한 `ReadonlyArray<T> `형태의 Array도 지원한다. 이 역시 생성된 후에는 Array를 변경할 수 없다.

```ts
interface Location {
	readonly lat: number;
	long: number;
}

let seoul: Location = { lat: 37, long: 126 };
p1.lat = 100;	// 에러 발생

// 읽기전용 배열
let arr: number[] = [1, 2, 3, 4];

let myArray: ReadonlyArray<number> = arr;

myArray[0] = 100;   // 불가
myArray.push(100);  // 불가

arr = myArray;             // 불가
arr = myArray as number[]; // 가능, 타입 단언을 통해 오버라이드 할 수 있다.
```





#### 4. 함수 타입 (Function Types)

인터페이스는 function의 타입을 지정하는데 사용할 수 있다. 파라미터의 리스트와 리턴타입만 가지는 함수 선언의 모양이 된다.

```ts
interface myInterface {
	(myName: string, myAge: number): void;
}

let myFunc: myInterface = function(myName:string, myAge:number): void {
	console.log(`이름 : ${myName}, 나이 : ${myAge}`);
};

myFunc("임수정",24);
```



#### 5. 인덱싱 가능 타입 (Indexable Types)

실제 어플리케이션에서는 서버와 통신하여 데이터를 실행시간에 가져오는 경우가 많다. 이렇게 프로퍼티가 동적 속성을 갖는 타입은 인덱싱 가능 타입을 이용할 수 있다.

인덱싱 가능 타입을 정의하기 위해서는 인덱스에 접근할 때 사용하는 대괄호를 이용해 객체의 색인 시그니처를 명시해야 한다.
인덱싱 타입으로는 문자열 또는 숫자만 가능하다. 문자열 인덱스와 숫자 인덱스가 모두 존재한다면, 숫자로 인덱싱된 값의 타입은 문자열로 인덱싱된 값 타입의 서브타입이어야 한다.

```ts
// 인덱스 시그니처는 [idx: string]
// 즉, IObj[idx]는 string 또는 number 타입의 값이다.
interface IObj {
    [idx: string]: string | number;
    readonly [num: number]: string;	// 읽기 전용 인덱싱
}

let obj: IObj = {
    myName: '임수정',
    myAddress: '서울',
    3: 'three'
};

obj.[3] = 'four'; 				   // 읽기 전용이므로 불가

console.log(obj.myName);           // "." operator 이용

let keys = Object.keys(obj);       // 객체의 key값들에 대한 배열 획득

for(let i = 0; i< keys.length; i++) {
    console.log(obj[keys[i]]);     // 배열형식을 이용
}
```



#### 6. 클래스 타입(Class Types)

Java나 C#처럼 클래스의 구현 시 특정 조건을 충족하도록 명시적으로 강제한다.

```ts
interface TeacherInterface {
  subject: string;
  giveLesson(s: string);
}

class Crystal implements TeacherInterface {
  subject: string;
  giveLesson(s: string) {
    this.subject = s;
  }
  constructor(name: string) {}
}
```



#### 7. 인터페이스의 확장

인터페이스는 상속을 통해 확장될 수 있다. (사실 상속은 객체지향 언어의 특성이기 때문에 적절한 용어는 아니다... 쉬운 이해를 돕기 위해 사용하였다.) 자바와 다른점은 여러 인터페이스를 결합하여 확장이 가능하다는 것이다.

```ts
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = <Square>{};	// 타입 단언
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```



#### 8. 마지막으로, 인터페이스는 타입 확인을 위해 사용되므로 객체를 생성할 수 없다!!!

------



### # 클래스 (Class)

TypeScript는 기존 JavaScript의 것보다 개발자들에게 친숙한 전통적인 클래스 기반의 객체지향 개념을 도입하였다. 

#### 1. 기본 사용과 상속(Inheritance)

```ts
class Book {

    btitle: string;
    bauthor: string;

    // 상위 클래스의 생성자
    constructor(btitle:string, bauthor:string) {
        this.btitle = btitle;
        this.bauthor = bauthor;
    }

    // 상위 클래스의 method
    // 입력 인자가 있으면 사용하고 없으면 default 사용
    printInfo(input:string = 'Initial'): void {
        console.log(input);
        console.log(`제목: ${this.btitle}, 저자: ${this.bauthor}`);
    }
}

// class의 상속
class EBook extends Book {

    btype: string;

    constructor(btitle:string, bauthor:string, btype:string) {
        // 상위 class 생성자 호출
        super(btitle, bauthor);
        this.btype = btype;
    }

    // method overriding
    printInfo(): void {
        // 상위 class의 method 호출
        super.printInfo();
        console.log(`제목: ${this.btitle}, 
                     저자: ${this.bauthor},
                     타입: ${this.btype}`);
    }
}

// IS-A relationship에 의한 상위 class type 사용
let book:Book = new EBook('젊은 베르테르의 슬픔','괴테',
    'PDF');

// dynamic binding에 의한 overriding method 호출.
book.printInfo();
```

상속은 기존 클래스를 확장해서 새로운 클래스를 정의하는 방법이며, 상위 타입으로 객체를 사용하는 것이 가능하다. 메소드 오버라이딩, 동적 바인딩과 같은 개념도 존재한다. 기존에 알고 있던 객체지향의 개념이 TypeScript에 어느정도 적용되어 있는 것으로 보인다.



#### 2. 접근제어 연산자(Access Modifier)

3가지 종류의 접근제어 연산자를 제공하며, 디폴트는 public이다.

- public: 접근 제한이 없다. 클래스 외부에서 자유롭게 접근이 가능
- protected: 클래스 외부에서 접근할 수 없다. 상속받은 하위 클래스는 접근이 허용
- private: 클래스 외부에서 접근할 수 없다. 상속받은 하위 클래스도 접근 불가능

```ts
class Book {

    protected btitle: string;

	// 생성자에 인자를 명시할 때 접근제어자를 같이 명시하면 명시적으로 해당 프로퍼티가 선언되어 사용할 수 있다.
    // private 프로퍼티의 이름 앞에는 _를 관용적으로 쓴다.
    public constructor(btitle:string, private _bauthor:string) {
        this.btitle = btitle;
    }

    public printInfo(): void {
        console.log(`제목: ${this.btitle}, 저자: ${this._bauthor}`);
    }

    // private property인 _bauthor의 getter, 일반적인 getter와 다름
    get bauthor(): string {
        return this._bauthor;
    }

    // private property인 _bauthor의 setter, 일반적인 setter와 다름
    set bauthor(value: string) {
        this._bauthor = value;
    }
}

class EBook extends Book {

    private btype: string;

    public constructor(btitle:string, bauthor:string, btype:string) {
        super(btitle, bauthor);
        this.btype = btype;
    }

    public printInfo(): void {
        console.log(`제목: ${this.btitle}, 
                     저자: ${this.bauthor},
                     타입: ${this.btype}`);
    }
}

let book:Book = new EBook('젊은 베르테르의 슬픔','괴테',
    'PDF');

book.printInfo();
```



#### 3. 읽기전용 프로퍼티 (Readonly Property)

클래스의 프로퍼티를 readonly로 지정할 수 있다. readonly로 지정되면 property가 선언될 때 또는 생성자안에서 반드시 초기화를 진행해야 한다.

```ts
class Book {
    public readonly btitle: string;
    
    // 생성자의 파라미터를 readonly로 선언하면 위처럼 따로 클래스의 프로퍼티로 선언할 필요없음.
    // ex. constructor(readonly btitle: string){ this.btitle = btitle; }
    constructor(btitle: string) {
        this.btitle = btitle;
    }
}

let book:Book = new Book('젊은 베르테르의 슬픔');

book.btitle = '파우스트';   // 코드 에러
```



#### 4. 정적 프로퍼티 (Static Property)

`stati`c으로 설정된 프로퍼티는 클래스의 이름으로 직접 접근할 수 있다.

```ts
class Book {

    public btitle:string;
    static count: number;

    constructor(btitle: string) {
        this.btitle = btitle;
        Book.count++;
    }

}

let book1:Book = new Book('젊은 베르테르의 슬픔');
let book2:Book = new Book('파우스트');

console.log(Book.count);
```



#### 5. 추상 클래스 (Abstract Class)

하나 이상의 추상 메소드를 가지고 있는 클래스이다. 메소드의 선언부만 있기 때문에 직접적인 객체생성은 불가능하고 상속을 이용해 하위 클래스에서 추상 메소드를 오버라이딩해서 사용한다.

```ts
abstract class Book {

    public btitle:string;

    constructor(btitle: string) {
        this.btitle = btitle;
    }

    abstract printInfo(): void;
}

class EBook extends Book {

    printInfo(): void {
        console.log(this.btitle);
    }
}

let book:Book = new EBook('젊은 베르테르의 슬픔');
book.printInfo();
```



#### 6. 인터페이스의 의미로 클래스 사용

클래스를 확장해서 인터페이스를 정의할 수 있다.

```ts
class Book {
    btitle: string;
}

interface EBook extends Book {
    bauthor: string;
}

let book:EBook = {
    btitle: '파우스트',
    bauthor: '괴테'
};
```

------



### # 함수

#### 1. 함수의 타입

- 매개변수의 타입: 매개변수 뒤에 콜론과 타입을 적는다.
- 반환값의 타입(반환 타입): 매개변수 목록 닫는 괄호(`)`)와 함수 본문을 여는 대괄호(`{`) 사이에 콜론과 타입을 적는다.

```ts
function sum(a: number, b: number): number {
  return (a + b);	// 굿
}

function notReallyVoid(): void {
  return 1;			// 에러 발생, void이므로 null또는 undefined 반환만 가능하다.
}
```



#### 2. 함수 값의 타입 표기

함수 타입의 값에 타입 표기를 붙이기 위해서는 화살표 함수 정의 문법과 비슷한 문법을 사용한다.

```ts
// (매개변수) => 반환 타입
const yetAnotherSum: (a: number, b: number) => number = 
	sum;
const onePlusOne: () => number =
     () => 2;
const arrowSum: (a: number, b: number) => number = 
      (a, b) => (a + b);
```



#### 3. 기본 매개변수와 선택 매개변수

```ts
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

let result1 = buildName("Sujung");                  // 가능
let result2 = buildName("Sujung", "Rim", "what");  // 에러, 매개변수가 넘침
let result3 = buildName("Sujung", "Rim");         // 가능

```

일반적인 프로그래밍 언어와 달리 자바스크립트는 더 들어온 인자는 버리고, 덜 들어온 인자는 undefined가 들어온 것과 동일하게 취급하여 어떻게든 함수를 실행하려는 특성이 있다. TypeScript는 이를 포용하면서도 타입 안정성을 확보하기 위해 **선택 매개변수**를 지원한다.  이는 매개변수 이름 뒤에 `?`를 붙여 해당 매개변수가 생략될 수 있음을 명시하는 것이다. 선택 매개변수 이후에 필수 매개변수를 두는 것은 허용되지 않는다.

한편, 기본 매개변수는 이전에 사용되었던 방식과 같이 매개변수 뒤에 =와 함께 원하는 값을 붙이면 된다. 기본 매개변수가 필수 매개변수 앞에 오는 경우에는 undefined를 명시적으로 전달해야 한다.



#### 4. 함수 오버로딩(Overloading)

함수 오버로딩은 한 함수가 여러 쌍의 매개변수 - 반환 타입의 쌍을 갖는 것이다. TypeScript의 함수 오버로딩은 ...

- 함수는 *하나 이상의 타입 시그니처*를 가질 수 있다.
- 함수는 **단 하나의 구현**을 가질 수 있다.

=> 즉, 오버로딩을 통해 여러 형태의 함수 타입을 정의할 수 있으나, 실제 구현은 한번만 가능하므로 **여러 경우에 대한 분기는 함수 본문 내에서 이루어져야** 한다.

```ts
// 각 경우에 대한 함수 시그니처 작성, 본문이 생략된 형태임
function double(str: string): string;
function double(num: number): number;
function double(arr: boolean[]): boolean[];

// 함수의 본문
function double(arg) {
    if (typeof arg === 'string') {
        return `${arg}${arg}`;
    } else if (typeof arg === 'number') {
        return arg * 2;
    } else if (Array.isArray(arg)) {
        return arg.concat(arg);
    }
}

// double 함수는 호출하는 인자의 타입에 따라 반환 타입이 달라진다.
const num = double(3); // number
const str = double('ab'); // string
const arr = double([true, false]); // boolean[]
```



#### 5. This 타입

자바스크립트 함수 내부에서의 `this` 값은 함수가 정의되는 시점이 아니라 실행되는 시점에 결정된다. 때문에 함수 내부에서 `this`의 타입을 추론하는 일이 쉽지 않은데, TypeScript는 이를 해결하기 위해 함수 내에서 `this` 타입을 명시하는 수단을 제공한다.

먼저 함수의 타입 시그니처에서 매개변수 가장 앞에 `this`를 추가해야 한다. 이 때 `this` 매개변수는 **가짜 매개변수**이다. 즉, `this` 매개변수를 추가한다 해도 함수가 받는 인자수와 같은 실제 동작은 변하지 않는다.

```ts
interface HTMLElement {
  tagName: string;
  /* ... */
}
interface Handler {
  (this: HTMLElement, event: Event, callback: () => void): void;
}
let cb: any;
// 실제 함수 매개변수에는 this가 나타나지 않음
const onClick: Handler = function(event, cb) {
  // this는 HTMLElement 타입
  console.log(this.tagName);
  cb();
}
```


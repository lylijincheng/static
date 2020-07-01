高阶函数在 JavaScript 中的应用
===========================

## 定义

在数学和计算机科学中，高阶函数是至少满足下列一个条件的函数：

- 接受一个或多个函数作为输入
- 输出一个函数

函数作为参数
```js
[1, 2, 3].map(i => i * 2)
[1, 2, 3].filter(i => i / 2 === 1)
[1, 2, 3].reduce((sum, i) => sum + i)
```

函数作为返回值
```js
const replace = str => what => target => str.replace(what, target);

replace('hello world')(/\s/)('-');  // hello-world
```

🌰

```js
const f = x => x * x;
const g = f => (x, y) => Math.sqrt(f(x) + f(y));

const p = g(f);

p(3, 4)  // => 5
```

## 应用场景

**Function.prototype.bind**

🌰
```js
const mult = (a, b) => a * b;

const double = mult.bind(null, 2);
const triple = mult.bind(null, 3);

double(2)  // => 4
triple(2)  // => 6
```

**Type Of**

```js
const typeOf = type => what => Object.prototype.toString.call(what) === `[object ${type}]`;

const isNumber = typeOf('Number');
const isString = typeOf('String');

isNumber(2)  // => true
isString('hof')  // => true
```


**柯里化 (Curry)**

在函数式编程中，返回另一个函数的高阶函数被称为 柯里(Curry)化 的函数。

通俗讲，柯里化是把接受多个参数的一个函数拆分成多个函数，拆分后的这些函数只接受一个参数。

```
f(x, y) -> f'(x)(y)
```

🌰
```js
const sumA = (x, y, z) => x + y + z;
const sumB = x => y => z => x + y + z;

sumA(1, 2, 3)  // => 6
sumB(1)(2)(3)  // => 6
```

🌰
```js
import curry from 'lodash/curry';

const replaceA = (str, what, target) => str.replace(what, target);

const replaceB = curry(replaceA);

replaceA('hello_world', /_/g, '-');  // => 'hello-world'
replaceB('hello_world')(/_/g)('-');  // => 'hello-world'

const replaceC = replaceB('hello_world');
replaceC(/o/g, 'e');  // => 'helle_werld'

const replaceD = replaceC(/o/g);
replaceD('x');        // => 'hellx_wxrld'  
```

如此做有以下几个好处：
1. 减少函数调用相同参数的传递
2. 提高代码片段的可复用性，为函数传递部分参数既可得到新的函数
3. 事件处理函数 https://jsfiddle.net/lijincheng407/e0dLkc9s/



**React 高阶组件 (HOC)**

connect([mapStateToProps], [mapDispatchToProps])(PureComponent) -> ContainerComponent

```js
const PureComponent = ({
  propADefinedInComponent,
  propBDefinedInComponent,
  actionADefinedInComponent,
  actionBDefinedInComponent
}) => (
  <div>
    <button onClick={actionADefinedInComponent}>{ propADefinedInComponent }</button>
    <button onClick={actionBDefinedInComponent}>{ propBDefinedInComponent }</button>
  </div>
);

connect(
  state => ({
    propADefinedInComponent: state.propA,
    propBDefinedInComponent: state.propB
  }),
  dispatch => ({
    actionADefinedInComponent: () => dispatch(actionCreatorOfA()),
    actionBDefinedInComponent: () => dispatch(actionCreatorOfB())
  })
)(PureComponent)
```


**组合/管道 (Compose & Pipe)**

```js
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

const pipe = (...fns) => fns.reduceRight((f, g) => (...args) => f(g(...args)));
```

🌰
```
const y1 = x => x * 2;
const y2 = x => x * 3;

const y = compose(y1, y2);

y(10)  // => 60
```


## 参考链接

- https://en.wikipedia.org/wiki/Higher-order_function
- https://en.wikipedia.org/wiki/Currying
- https://hackernoon.com/currying-in-js-d9ddc64f162e
- https://hackernoon.com/ingredients-of-effective-functional-javascript-closures-partial-application-and-currying-66afe055102a
- https://hackernoon.com/effective-functional-javascript-first-class-and-higher-order-functions-713fde8df50a
- https://www.sitepoint.com/recursion-functional-javascript/
- https://www.sitepoint.com/higher-order-functions-javascript/
- https://www.sitepoint.com/currying-in-functional-javascript/
- https://www.sitepoint.com/introduction-functional-javascript/
- https://medium.com/@kbrainwave/currying-in-javascript-ce6da2d324fe


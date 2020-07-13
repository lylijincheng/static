## 什么是模块化

当我们讨论模块化的时候我们在讨论什么？

**模块的概念：**

一个模块就是一块代码，其中包括它依赖的代码以及它为其他模块提供了什么样的功能（接口）。

模块在自己的作用域内执行，而非全局作用域(global scope)中执行，意味着模块中的变量，函数，类等是在模块内部声明的，外部不可见，除非明确使用 `export` 或者 `module.exports` 输出，才可以被外部环境引用。如果要从其他模块消费一个变量，函数或者类，必须要通过 `import` 或者 `require` 把模块化引入进来。

模块的引入依赖于模块加载器。在运行时，模块加载器负责定位模块，加载模块中的依赖，然后执行模块代码。

模块之间的关系称为依赖（dependencies)，模块化开发就是将整体的代码封装成一个个模块的开发方式。


## 现有的模块化方案

**CommonJS (CMD, Common Module Defination)**

```js
// filename: cmd.js
var $ = require('jquery');
var _ = require('underscore');

// methods
function a(){}    // private
function b(){}    // public
function c(){}    // public

// public methods should be exposed
module.exports = {
  b: b,
  c: c
};
```

**AMD (Asynchronous module definition) - RequireJS**

```js
// filename: amd.js
define(['jquery', 'underscore'], function ($, _) {

  // methods
  function a(){}  // private
  function b(){}  // public
  function c(){}  // public

  // public methods should be exposed
  return {
    b: b,
    c: c
  }
});
```

**UMD (Universal Module Definition)**

```js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery', 'underscore'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory(require('jquery'), require('underscore'));
  } else {
    // Browser globals (root is window)
    root.moduleApi = factory(root.jQuery, root._);
  }
}(this, function ($, _) {
  // methods
  function a(){}  // private
  function b(){}  // public
  function c(){}  // public

  // exposed public methods
  return {
    b: b,
    c: c
  }
}));
```


## 浏览器中的模块化

**原生的模块化 (ECMAScript 6 modules)：**

```js
// ./lib.mjs
export const sqrt = Math.sqrt;
export function square(x) {
  return x * x;
}
export function diag(x, y) {
  return sqrt(square(x) + square(y));
}

// ./main.mjs
imoport jQuery from 'https://code.jquery.com/jquery.js';
import { square, diag } from './lib';
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5
```

- `<script type="module"></script>`
- `*.mjs`
- `'use strict';`
- [defer](https://cdn.rawgit.com/jakearchibald/d6808ea2665f8b3994380160dc2c0bc1/raw/c0a194aa70dda1339c960c6f05b2e16988ee66ac/), includes [inline scripts](https://cdn.rawgit.com/jakearchibald/7026f72c0675898196f7669699e3231e/raw/fc7521aabd9485f30dbd5189b407313cd350cf2b/)
- [Excute once](https://cdn.rawgit.com/jakearchibald/f7f6d37ef1b4d8a4f908f3e80d50f4fe/raw/1fcedde007a2b90049a7ea438781aebe69e22762/)
- [CORS](https://cdn.rawgit.com/jakearchibald/2b8d4bc7624ca6a2c7f3c35f6e17fe2d/raw/fe04e60b0b7021f261e79b8ef28b0ccd132c1585/)


浏览器支持覆盖率：

Safari 10.1, Chrome 61, Firefox 60, Edge 16.

大部分常用浏览器没有原生的模块支持，一般解决方案是借助工具来实现

- [webpack](https://webpack.js.org)
- [browserify](http://browserify.org)


## 静态和动态


当前ES规范中的模块是静态声明式的(static declarations)，import 接收一个静态字符串字面量作为模块的标识。

**静态模块**

- `imports`, `exports` 必须在代码顶层（不能在代码块 block `{}` 中使用）
- `imports` 会被提升(hoisted)

```js
// NOT ALLOWED: condition import/export

let mod;
if (Math.random() > 0.5) {
  mod = 'modA';
} else {
  mod = 'modB';
}

import Mod from mod;

const libA = { name: 'libA' };
const libB = { name: 'libB' };

export const Lib = Math.random() > 0.5 ? libA : libB;

// NOT ALLOWED: import and export in blocks

import libA from './libA';

(function() {

  import libB from './libB';

  export default function() {
    console.log(libA, libB);
  }

})();
```

**动态模块**

允许JavaScript 模块在运行时动态加载。使用语法为 `import(specifier)`。

- 除了在模块中外，还可以在 `<script>` 中使用
- 在模块中运行在任何地方调用，调用不会被提升(hoist)
- 调用完成返回一个 Promise， resolve 加载的模块

```
import('module/foo').then(foo => console.log(foo.default))
```

相关规范定义：[import() proposal for JavaScript](https://github.com/tc39/proposal-dynamic-import)


**imports 在 CommonJS 和 ES Modules 中的不同**

CommonJS, imports are copies of exported values

```js
// lib.js 
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter, // (A)
  incCounter: incCounter,
};

// main1.js 
var lib = require('./lib');

// The imported value is a (disconnected) copy
console.log(lib.counter); // 3
lib.incCounter();
console.log(lib.counter); // 3

// The imported value can be changed
lib.counter++;
console.log(lib.counter); // 4
```

ES6, imports are live, immutable bindings

```js
// lib.js 
export let counter = 3;
export function incCounter() {
  counter++;
}

// main1.js 
import { counter, incCounter } from './lib';

// The imported value `counter` is connected
console.log(counter); // 3
incCounter();
console.log(counter); // 4

// The imported value can’t be changed
counter++; // TypeError
```


## NPM Modules or Packages 

**什么是模块 (module)**

- 可用通过 `require()` 函数来加载
- 一个包含 `package.json` 文件的目录，这个文件中有一个 `main` 属性
- 一个包含 `index.js` 文件的目录
- 一个 JavaScript 文件

**什么是包 (package)**

a) 一个含有 package.json 文件的程序目录
b) 一个压缩包，url， git repo 包含上面的目录结构

```
npm install https://github.com/request/request.git#commit-ish
```

通常来说，大部分 npm package 都是一个 module，一个 package 里面可能有多个 module。

**Nodejs中的模块化**

Nodejs 中使用标准的 CommonJS(CMD) 模块化

https://nodejs.org/api/modules.html#modules_all_together


## Webpack 基本原理

**Webpack 是解决什么问题的？**

CMD -> ES5 code

- 管理JS文件加载顺序，依赖关系，命名空间，合并 script 文件
- `<script></script>` * N --> require/exports -> bundle.js

Source code

```
├─src
  ├─main.js
  ├─mod1.js
  └─mod2.js
```

```js
// ./main.js
var $ = require('jquery');
var m1 = require('./mod1');
var m2 = require('./mod2');
console.log(m1, m2);
```

```js
// ./mod1.js
var $ = require('jquery');
module.exports = $('.m1');
```

```js
// ./mod2.js
var $ = require('jquery');
module.exports = $('.m2');
```

```js
// jquery -> ./node_modules/jquery/dist/jquery.js
function $(selector) { return document.querySelectorAll(selector) };
module.exports = $;
```

ES5 code

```js
// IIFE wrapper to encapsulate the module scope and object references

(function(modules) {

  // loaded modules (cache)
  var installed = {};

  function _require(id) {
    if (installed[id]) {
      return installed[id].exports;
    }

    var module = installed[id] = {
      id: id,
      loaded: false,
      exports: {}
    };

    modules[id].call(module.exports, module, module.exports, _require);

    module.loaded = true;
    return module.exports;
  }

  // entry
  return _require('./main.js');

})({
  './mod1.js': function(module, exports, require) { // text content of file ./mod1.js },
  './mod2.js': function(module, exports, require) { // text content of file ./mod2.js },
  './main.js': function(module, exports, require) { // text content of file ./main.js },
  'jquery': function(module, exports, require) { // text content of ./node_modules/jquery/dist/jquery.js }
});
```



## 参考链接

- https://jakearchibald.com/2017/es-modules-in-browsers/
- https://developers.google.com/web/fundamentals/primers/modules
- https://eloquentjavascript.net/10_modules.html
- https://hackernoon.com/node-js-tc-39-and-modules-a1118aecf95e
- http://exploringjs.com/es6/ch_modules.html
- http://2ality.com/2015/07/es6-module-exports.html
- https://nodejs.org/api/modules.html#modules_modules
- https://gitlab.meiyou.com/h5/meetyou.jssdk/blob/master/lib/sdk.js#L359

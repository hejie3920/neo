let utils = {
  // 深拷贝
  deepClone(obj) {
    let res = {}
    /*your code ...*/
    for (let i in obj) {
      if (typeof obj[i] === "object") {
        res[i] = isArray(obj[i]) ? [] : {}
        deepClone(obj[i], res[i])
      }
      if (obj.hasOwnProperty(i)) {
        res[i] = obj[i]
      }
    }
    return res
  },
  // 正则解码
  decode() {
    let sindex = (eindex = -1)
    let count = -1
    let substr = ""
    for (let i = 0; i < str.length; i++) {
      if (str[i] == "[") {
        sindex = i
        if (!isNaN(parseInt(str[i - 1]))) {
          let reg = /(\d)+$/g
          // reg.test(str.slice(0,i))
          // count = RegExp.$1
          count = str.slice(0, i).match(reg)[0]
        } else {
          count = -1
        }
      }
      if (str[i] == "]") {
        eindex = i
      }
      if (![sindex, eindex].includes(-1)) {
        substr = str.slice(sindex + 1, eindex)
        if (count != -1) {
          str = str.slice(0, sindex - count.length) + substr.repeat(count) + str.slice(eindex + 1)
        }
        sindex = eindex = count = i = -1
      }
    }
    return str
  },
  // 找数组中最接近指定值得值
  findNearest(arr, target) {
    arr.push(target)
    let index = arr.sort((a, b) => a - b).indexOf(target)
    let res
    if (index === 0) res = arr[index + 1]
    else if (index === arr.length - 1) res = arr[index - 1]
    else {
      res = target - arr[index - 1] > arr[index + 1] - target ? arr[index + 1] : arr[index - 1]
    }
    console.log("res: ", res)
  },
  // 判断类型
  getType(val) {
    let tmp = {}.toString.call(val)
    tmp.match(/(object)(.*)/gi)
    return RegExp.$2.slice(1, -1).toLowerCase()
  },
  // new做了什么
  // 1.肯定要返回一个新对象的啦，所以第一步先创建个新的空对象，
  // 2.这个对象也要继承基类所有父方法的啦，所以把的原型指向基类的原型对象obj.__proto__ = Base.prototype
  // 3.好，这个对象父类指向完了，最后一步就是对Base这个构造函数进行初始化，将Base里面的this指向obj进行初始化，
  // 自然而然obj.prototype原型就是初始化后的原型，直接返回obj就可以了
  // 基本三步
  new(Base) {
    let obj = {}
    obj.__proto__ = Base.prototype
    Base.call(obj)
    return obj
  },
  // 进一步封装成函数
  _new(fun) {
    return function() {
      let obj = {
        __proto__: fun.prototype
      }
      fun.apply(obj, arguments)
      return obj
    }
  },
  // 节流
  throttle2(fn, interval) {
    let firstTime = true,
      timer,
      _fn = fn
    return function() {
      let _this = this
      if (firstTime) {
        _fn.apply(_this, arguments)
        return (firstTime = false)
      }
      if (timer) {
        return false
      }
      timer = setTimeout(() => {
        _fn.apply(_this, arguments)
        clearTimeout(timer)
        timer = null
      }, interval || 500)
    }
  },
  // 节流
  throttle(fn, interval) {
    let firstTime = true,
      timer
    return (...args) => {
      if (firstTime) {
        firstTime = false
        return fn.apply(null, args)
      }
      if (timer) {
        return false
      }
      timer = setTimeout(() => {
        clearInterval(timer)
        timer = null
        fn.apply(null, args)
      }, interval || 500)
    }
  },
  // 分时函数,把1秒渲染1000个分成每200毫秒渲染8个
  timeThunk(ary, fn, count) {
    let obj, timer
    let len = ary.length
    let start = function() {
      for (let i = 0; i < Math.min(count || 1, ary.length); i++) {
        let obj = ary.shift()
        fn(obj)
      }
    }
    return function() {
      timer = setInterval(() => {
        if (ary.length === 0) {
          return clearInterval(timer)
        }
        start()
      }, 200)
    }
  },
  // 防抖
  debounce(fn, delay = 20) {
    let timer
    return (...args) => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn.apply(null, args)
      }, delay)
    }
  }
}

/*
this指向问题

1. 普通函数
  a. 直接看有没有new或者call绑定this，没有的话下一步
  b. 直接看执行的时候前面是谁点调用的，默认就是window
2. 箭头函数
  直接向上一层找，直接找到外面有一层是 "普通函数" (如果只是单纯的对象包着就算作平级的就要继续往上找)包着的，
  没有的话就代表是window，this指向就跟上一层的这个指向是一样的
*/

// var obj = {
//   x: 22,
//   aaa() {
//     let fn = () => {
//       console.log("aa", this)
//     }
//     fn()
//   },
//   bbb: () => {
//     console.log("bb", this)
//   },
//   ccc: () => {
//     let fn = () => {
//       console.log("ccc", this)
//     }
//     fn()
//   }
// }
// obj.aaa() // this => obj
// obj.bbb() // this => window
// obj.ccc() // this => window

// var student = {
//   name: "若川",
//   doSth: function() {
//     console.log(this.name)
//     return () => {
//       console.log("arrowFn:", this.name)
//     }
//   }
// }
// var person = {
//   name: "person"
// }
// student.doSth().call(person) // '若川'  'arrowFn:' '若川'
// student.doSth.call(person)() // 'person' 'arrowFn:' 'person'

// obj.methods.say()
// obj.methods.say2()

// const shape = {
//   radius: 10,
//   normal() {
//     // console.log("this1", this)
//     return this.radius * 2
//   },
//   arrow: () => {
//     console.log("TCL: ", this)
//     return 2 * Math.PI * this.radius
//   }
// }
// // 下列语句的返回值分别是什么？
// // 正常函数下，判断this直接看函数执行前是谁点调用的，没有就是默认window

// console.log((func => func())(shape.normal)) // NaN
// console.log((s => s.normal())(shape)) // 20
// console.log((s => s.arrow())(shape)) // NaN this => window
// console.log("TCL:箭头 ", shape.arrow()) // NaN
// const c = new shape.normal() // shape.normal is not a constructor，应该吧normal改写成普通的normal：function(){}而不能用简写的normal()

// 经典foo问题
// function Foo() {
//   console.log("TCL: ", this)
//   getName = function() {
//     console.log(1)
//   }
//   return this
// }

// Foo.getName = function() {
//   console.log(2)
// }

// Foo.prototype.getName = function() {
//   console.log(3)
// }

// var getName = function() {
//   console.log(4)
// }

// function getName() {
//   console.log(5)
// }

// //输出以下的输出结果

// //函数Foo的静态方法
// console.log("TCL: Foo -> Foo", Foo)

// Foo.getName() //2

// //function getName有提前声明的规则，声明后被var getName= 。。覆盖，则getName为4
// getName() //4

// //Foo()的return this为window，window.getName 在Foo里面被覆盖，则输出1
// Foo().getName() //1

// //同上，因调用了Foo();window的getName被覆盖
// getName() //1

// //依然只是调用了Foo对象上的getName,又因为Foo.getNname，所以相当于
// /**
//  *  function a(){console.log(2)};
//  *  new a();
//  * **/
// new Foo.getName() //2

// //先执行了new Foo()；返回一个对象，这个对象的getName为prototype上的getName,相当于(new Foo()).getName();
// new Foo().getName() //3

// new new Foo().getName() //3

// 手动实现bind
// Function.prototype.bind = function(ctx) {
//   var self = this
//   return function() {
//     return self.apply(ctx, arguments)
//   }
// }

// 设计模式

// 1.单例模式
// let getSingle = function(fn) {
//   let instance
//   return function() {
//     return instance || (instance = fn.apply(this, arguments))
//   }
// }

// // 高阶函数实现AOP（面向切面编程，即各种中间件）,函数中间件
// Function.prototype.before = function(beforeFn) {
//   let _this = this
//   return function() {
//     beforeFn.apply(this, arguments)
//     return _this.apply(this, arguments)
//   }
// }
// Function.prototype.after = function(afterFn) {
//   let _this = this
//   return function() {
//     let ret = _this.apply(this, arguments)
//     afterFn.apply(this, arguments)
//     return ret
//   }
// }

// let func = function() {
//   console.log("TCL: ", 2)
// }
// func = func
//   .before(function() {
//     console.log("TCL: ", 1)
//   })
//   .after(function() {
//     console.log("TCL: ", 3)
//   })

// func()

// 柯里化，部分求值，传入的参数先存起来，到最后才一次性求
// function curry(fn) {
//   return function curried() {
//     var args = [].slice.call(arguments)
//     // arguments ==> [传入参数，length:长度]  例如：【1，2，3，length:0]
//     // 之所以写上面那句是为了把长度去掉，变成纯传入参数的数组
//     // 结果： 【1，2，3】

//     return args.length >= fn.length
//       ? fn.apply(null, args)
//       : function() {
//           var rest = [].slice.call(arguments)
//           return curried.apply(null, args.concat(rest))
//         }
//   }
// }

// let curry = fn => {
//   let curried = (...args) => {
//     if (args.length >= fn.length) {
//       return fn.apply(null, args)
//     } else {
//       return (...rest) => {
//         return curried.apply(null, args.concat(rest))
//       }
//     }
//   }
//   return curried
// }

// function foo(a, b, c, d) {
//   return a + b + c + d
// }
// let testCurry = curry(foo)
// console.log("TCL: ", testCurry(1, 2, 3, 6))
// console.log("TCL: ", testCurry(1)(2)(3, 6))
// console.log("TCL: ", testCurry(1)(2)(3)(6))

// 2.策略模式

// 3.代理模式
// a.保护代理，不直接访问
// b.虚拟代理，在真正需要的时候再加载然后代理
// 缓存代理

// let mult = (...args) => {
//   let a = 1
//   for (let i = 0; i < args.length; i++) {
//     a = a * args[i]
//   }
//   return a
// }
// let createProxyFactory = fn => {
//   let cache = {}
//   return (...args) => {
//     let nums = args.join(",")
//     if (cache[nums]) {
//       console.log("from cache ", cache[nums])
//       return cache[nums]
//     } else {
//       cache[nums] = fn.apply(this, args)
//       return cache[nums]
//     }
//   }
// }

// let proxyMult = createProxyFactory(mult)

// console.log("TCL: ", proxyMult(1, 2, 3, 4))
// console.log("TCL: ", proxyMult(1, 2, 3, 4))

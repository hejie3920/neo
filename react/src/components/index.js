import React, { Component } from "react"
import Life from "./lifeCpm"
import Hoc from "./hocCpm"
import Router from "./Router"
import Redux from "./Redux"
import Composition from "./Composition"
import Hook from "./Hook"
import "./test.scss"
import store from "../store/index"
import { Button } from "antd"
import { Provider } from "react-redux"
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom"

function Test(props) {
  console.log("TCL: Test -> match", props)
  return (
    <div>
      <h1>{props.location.query && props.location.query.log}</h1>
    </div>
  )
}

class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date(), counter: 1, a1: "nihao", arr: [] }
  }

  componentDidMount() {
    // this.timer = setInterval(() => {
    //   //   setState修改状态
    //   this.setState({ date: new Date() })
    // }, 1000)

    setTimeout(() => {
      this.setState({
        arr: [
          {
            name: "数据1"
          },
          {
            name: "数据2"
          },
          {
            name: "数据3"
          }
        ]
      })
    }, 300)

    // 批量操作：对同一个key多次操作会合并，会执行最后一次
    // this.setState({ counter: this.state.counter + 1 })
    // this.setState({ counter: this.state.counter + 1 })
    // this.setState({ counter: this.state.counter + 1 }, () => {
    //   console.log("3" + this.state.counter) // 2
    // })
    // console.log("1", this.state.counter) // 1
    // this.setState(prev => {
    //   console.log("2", prev.counter) // 2
    //   return prev.counter
    // })
    // setTimeout(() => {
    //   console.log("4", this.state.counter) // 2
    // }, 0)
    // this.setState(pre => {
    //   console.log(pre, 898989)
    // })
  }

  changeCounter = () => {
    this.setState({
      counter: this.state.counter + 2
    })
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <BrowserRouter>
        <Link to='/'>首页 / </Link>
        <Link to='/test'>测试页 / </Link>
        <Link to={{ pathname: `/nihao/${this.state.counter}`, query: { log: "666" } }}>传参</Link>
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <div className='test'>
                {/* <h2>路由</h2> */}
                {/* <Router></Router> */}
                <h2>redux</h2>
                <Provider store={store}>
                  <Redux></Redux>
                </Provider>
                <h2>hook</h2>
                <Hook></Hook>
                <h2>复合插槽</h2>
                <Composition></Composition>
                <h2>setState注意</h2>
                {this.state.date.toLocaleTimeString()}
                <h2>生命周期</h2>
                <Life title={this.state.counter} arr={this.state.arr}></Life>
                <h2>高阶组件</h2>
                <Hoc arr={this.state.arr} name={this.state.counter}></Hoc>
                <h2>antDesign</h2>
                <Button type='primary' onClick={this.changeCounter}>
                  和杰按钮
                </Button>
              </div>
            )}></Route>
          <Route path='/test' component={Router}></Route>
          <Route path='/nihao/:counter' component={Test}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Clock

import React, { Component } from "react"
import Life from "./lifeCpm"
import Hoc from "./hocCpm"
import Redux from "./Redux"
import Composition from "./Composition"
import Hook from "./Hook"
import "./index.scss"
import store from "../store/index"
import { Button } from "antd"
import { Provider } from "react-redux"
import StateCop from "./setState"
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"

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
    this.name = "haha"
  }

  componentDidMount() {
    // this.timer = setInterval(() => {
    //   //   setState修改状态
    //   this.setState({ date: new Date() })
    // }, 1000)
  }

  changeCounter = () => {
    this.setState({
      counter: this.state.counter + 2
    })
  }
  test = p => {
    console.log("TCL: ", this.name, p)
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <BrowserRouter>
        <div className='tab'>
          <Link to='/'>首页 / </Link>
          <Link to='/state'>state原理 / </Link>
          <Link to='/redux'>redux / </Link>
          <Link to='/hook'>hook / </Link>
          <Link to='/composition'>复合组件 / </Link>
          <Link to='/life'>生命周期 / </Link>
          <Link to='/hoc'>高阶组件 / </Link>
          <Link to='/antDesign'>antDesign / </Link>
          <Link to={{ pathname: `/nihao/${this.state.counter}`, query: { log: "666" } }}>传参</Link>
        </div>
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <div className='test'>
                <Button
                  type='primary'
                  onClick={e => {
                    this.test("wwii")
                  }}>
                  首页按钮
                </Button>
              </div>
            )}></Route>
          <Route path='/state' component={StateCop}></Route>
          <Route
            path='/redux'
            render={() => (
              <Provider store={store}>
                <Redux></Redux>
              </Provider>
            )}></Route>
          <Route path='/hook' component={Hook}></Route>
          <Route path='/composition' component={Composition}></Route>
          <Route
            path='/life'
            render={() => <Life title={this.state.counter} arr={this.state.arr}></Life>}></Route>
          <Route
            path='/hoc'
            render={() => <Hoc arr={this.state.arr} name={this.state.counter}></Hoc>}></Route>
          <Route
            path='/antDesign'
            render={() => (
              <Button type='primary' onClick={this.changeCounter}>
                和杰按钮
              </Button>
            )}></Route>
          <Route path='/nihao/:counter' component={Test}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Clock

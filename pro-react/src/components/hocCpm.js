import React from "react"
import { fhoc, choc, phoc } from "./hoc"

function Composition(props) {
  return (
    <div style={{ background: props.color }}>
      <h2>asfdl</h2>
      {props.children("测试")}
    </div>
  )
}

@phoc("nihao")
@fhoc
@choc
class func extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { b: "6666" }
  }
  componentDidMount() {
    console.log("func组件内部触发")
  }

  render() {
    console.log("func渲染")
    return (
      <div>
        <a href='/'>我是func组件</a>
        <h2>{this.state.b}</h2>
        <h1>{this.props.name}</h1>
        <Composition color='red'>{params => <b>{params}</b>}</Composition>
      </div>
    )
  }
}

export default func

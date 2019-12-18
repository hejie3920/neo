import React, { Component } from "react"

export const fhoc = Component => {
  console.log("fhoc")
  const NewComponent = props => {
    return <Component {...props} />
  }
  return NewComponent
}

export const choc = WrappedComponent => {
  console.log("choc")

  class NewComponent extends Component {
    render() {
      return <WrappedComponent />
    }
  }
  return NewComponent
}

export const vchoc = WrappedComponent => {
  console.log("choc")
  class NewComponent extends WrappedComponent {
    render() {
      // if (this.props.name > 3) {
      return super.render()
      // }
      // return <div></div>
    }
  }
  return NewComponent
}

export const phoc = params => {
  console.log("TCL: log -> params", params)
  return Component => {
    const NewComponent = props => {
      return <Component {...props} />
    }
    return NewComponent
  }
}

import React, { Component } from "react"
import { addUser, asyncFetch } from "../store/user"
import { connect } from "react-redux"

const mapStateToProps = state => ({
  list: state.goods.list
})
const mapDispatchToProps = {
  addUser,
  asyncFetch
}
@connect(mapStateToProps, mapDispatchToProps)
class Redux extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.asyncFetch({ name: "778787" })
    }, 2000)
  }
  render() {
    return (
      <div>
        {/* {this.props.list.map((item, index) => (
          <div key={index}>{item}</div>
        ))} */}
      </div>
    )
  }
}

export default Redux

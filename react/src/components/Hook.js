import React, { useState, useEffect, useReducer, useContext } from "react"
import { Button } from "antd"

const HejieCtx = React.createContext()

function listReducer(state, action) {
  switch (action.type) {
    case "init":
      return action.payload
    case "add":
      return [...state, action.payload]
    default:
      return state
  }
}
function Person(props) {
  const { dispatch, list } = useContext(HejieCtx)
  return list.map((item, index) => (
    <div
      key={index}
      onClick={e => {
        dispatch({
          type: "add",
          payload: Math.random()
        })
      }}>
      {item}
    </div>
  ))
}

const Hook = () => {
  const [name, setName] = useState("hejie")
  const [list, dispatch] = useReducer(listReducer, [])

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "init", payload: ["西瓜", "菠萝"] })
    }, 2000)
  }, [])

  return (
    <HejieCtx.Provider value={{ list, dispatch }}>
      <div>
        <b>{name ? name : "没名字"}</b>
        <Button
          type='primary'
          onClick={e => {
            setName("")
          }}>
          测试
        </Button>
        <Person></Person>
      </div>
    </HejieCtx.Provider>
  )
}

export default Hook

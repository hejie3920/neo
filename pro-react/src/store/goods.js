export const init = payload => ({
  type: "init",
  payload
})
export const add = payload => ({
  type: "add",
  payload
})

export const asyncFetch = payload => {
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: "init", payload })
    }, 1000)
  }
}

export default function goodsReducer(
  state = {
    list: []
  },
  action
) {
  switch (action.type) {
    case "init":
      return { ...state, list: action.payload }
    case "add":
      return { ...state, list: [...state.list, action.payload] }
    default:
      return state
  }
}

import { createStore } from 'redux'

const reducer = (state, action) => {
  console.log('reducer called')
  return state
}

const store = createStore(reducer, 0)

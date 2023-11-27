const noteReducer = (state = [], action) => {
    if (action.type === 'NEW_NOTE') {
      state.concat(action.payload)
      return state
    }
  
    return state
}

export default noteReducer
const filterReducer = (state = 'ALL', action) => {
    switch(action.type) {
      case 'SET_FILTER':
        return action.payload.filter
      default:
        return state
    }
}
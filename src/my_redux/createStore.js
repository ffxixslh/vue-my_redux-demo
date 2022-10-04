function createStore(reducer) {
  let state;
  let handlers = [];

  return {
    getState() {
      return state;
    },
    dispatch(action) {
      state = reducer(state, action);
      handlers.forEach((handler) => handler());
    },
    subscribe(handler) {
      handlers.push(handler);
    },
  };
}

export default createStore;

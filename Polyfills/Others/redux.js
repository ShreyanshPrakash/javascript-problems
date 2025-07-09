const ACTIONS = {
  API_PENDING: "[API] : Api is pending",
};

const apiReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.API_PENDING: {
      return {
        ...state,
        openLoader: payload,
      };
    }

    default: {
      return { ...state };
    }
  }
};

const combineReducer = (params) => {
  return params;
};

const rootReducer = combineReducer({
  apiStore: apiReducer,
});

const createStore = (initialState, rootReducer) => {
  let store = {};

  store.state = initialState;
  store.listeners = [];

  store.getState = () => {
    return store.state;
  }

  store.subscribe = (listener) => {
    store.listeners.push(listener);
    return function unsubscribe(){
        let newListeners = store.listeners.filter(
            handler => handler !== listener
        )
        store.listeners = newListeners;
    }
  }

  store.dispatch = (action) => {
    for (let [key, reducer] of Object.entries(rootReducer)) {
      const result = reducer(store.state, action);
      if (result) {
        store.state = result;
        break;
      }
    }
    return action;
    // so that if there are other middlewares, this action is passed on to them
  };

  return store;
};

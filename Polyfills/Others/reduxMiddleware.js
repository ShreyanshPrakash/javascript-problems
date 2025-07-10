/*
CreateStore
    initialState, reducers,
    listenerList -> internal
    Store.state = initialState
    dispatch(action)
    subscribe((state) => {})
    Return store object
    Dispatch
    State
    subscribe

*/

class InitialState {
  constructor() {}
}

const ACTIONS = {
  UI_PENDING: "UI",
};

const myReducer = (state = new InitialState(), action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.UI_PENDING: {
      return {
        ...state,
        ...payload,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

const createStore = (initialState, reducers, ...args) => {
  let store = {};

  store.state = initialState;
  let listeners = [];

  store.dispatch = (action) => {
    const newState = reducers(store.state, action);
    store.state = {
      ...store.state,
      ...newState,
    };

    runAllHandlers(store.state);
  };

  store.subscribe = (handler) => {
    listeners.push(handler);
  };

  runAllHandlers = (newState) => {
    listeners.forEach((handler) => handler(newState));
  };

  return store;
};

const initialState = {
  name: "machine coding",
};
const store = createStore(initialState, myReducer);

store.subscribe((state) => console.log("1 : ", state));

store.subscribe((state) => console.log("2 : ", state));

store.dispatch({ type: ACTIONS.UI_PENDING, payload: { name: "LLD" } });

store.subscribe((state) => console.log("3 : ", state));

store.dispatch({ type: ACTIONS.UI_PENDING, payload: { name: "HLD" } });

import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "./reducers/rootReducer";

export default (initialState = {}, options) => {
  let composeEnhancers = compose;

  if ( typeof window === "object"
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }

  const middlewares = [];
  const enhancers = [applyMiddleware(...middlewares)];

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers)
  );
}
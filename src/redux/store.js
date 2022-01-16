import { createStore, applyMiddleware } from "redux";
import rpm from "redux-promise-middleware";
import logger from "redux-logger";

import reducers from "./reducers";
const enhancers = applyMiddleware(rpm, logger);
const store = createStore(reducers, enhancers);

export default store;
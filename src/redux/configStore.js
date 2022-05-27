//configStore.js
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import Room from "./modules/room";
import Login from "./modules/login";
import Main from './modules/main';
import Post from "./modules/post";
import News from './modules/news';
import Profile from "./modules/profile";
import Detail from "./modules/detail";
import Comment from "./modules/comment";
import ProsCons from "./modules/proscons";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  room:Room,
  login:Login,
  main:Main,
  post:Post,
  news:News,
  profile:Profile,
  detail:Detail,
  comment:Comment,
  proscons:ProsCons,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history: history })];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(rootReducer, enhancer);

export default store;
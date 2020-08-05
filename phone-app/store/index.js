import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import contacts from './contacts.js';

const reducers = combineReducers({ contacts });

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
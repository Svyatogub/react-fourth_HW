import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { authorsReducer } from './authors/reducer';
import { coursesReducer } from './courses/reducer';
import { userReducer } from './users/reducer';

const rootReducer = combineReducers({
	authors: authorsReducer,
	courses: coursesReducer,
	user: userReducer,
});

// const composedElements = [composeWithDevTools(), applyMiddleware(thunk)];
export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => console.log(store.getState()));

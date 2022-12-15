import { combineReducers, createStore } from 'redux';

// import { composeWithDevTools } from '@reduxjs/toolkit';
import { authorsReducer } from './authors/reducer';
import { coursesReducer } from './courses/reducer';
import { userReducer } from './users/reducer';

const rootReducer = combineReducers({
	authors: authorsReducer,
	courses: coursesReducer,
	user: userReducer,
});

export const store = createStore(rootReducer);

store.subscribe(() => console.log(store.getState()));

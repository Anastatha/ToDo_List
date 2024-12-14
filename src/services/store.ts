import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { todosReducer } from './reducers/todosReducer';
const rootReducer = combineReducers({
	todos: todosReducer,
});
// @ts-ignore
export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

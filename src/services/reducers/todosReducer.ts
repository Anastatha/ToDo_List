import { ToDo } from '../../type/types';

type TodoState = {
	todos: ToDo[];
	isLoading: boolean;
};

const initialState: TodoState = {
	todos: [],
	isLoading: false,
};

type TodoAction =
	| { type: 'FETCH_TODOS_REQUEST' }
	| { type: 'FETCH_TODOS_SUCCESS'; payload: ToDo[] }
	| { type: 'FETCH_TODOS_FAILURE' }
	| { type: 'ADD_TODO'; payload: ToDo }
	| { type: 'UPDATE_TODO'; payload: ToDo }
	| { type: 'DELETE_TODO'; payload: number };

export const todosReducer = (state = initialState, action: TodoAction): TodoState => {
	switch (action.type) {
		case 'FETCH_TODOS_REQUEST':
			return { ...state, isLoading: true };
		case 'FETCH_TODOS_SUCCESS':
			return { ...state, todos: action.payload, isLoading: false };
		case 'FETCH_TODOS_FAILURE':
			return { ...state, isLoading: false };
		case 'ADD_TODO':
			return { ...state, todos: [...state.todos, action.payload] };
		case 'UPDATE_TODO':
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo.id === action.payload.id ? action.payload : todo,
				),
			};
		case 'DELETE_TODO':
			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== action.payload),
			};
		default:
			return state;
	}
};

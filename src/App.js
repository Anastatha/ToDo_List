import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase';
import { ref, set, get, update, remove, push } from 'firebase/database';
export const App = () => {
    const [todo, setTodo] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortAlphabetically, setSortAlphabetically] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };
    useEffect(() => {
        setLoading(true);
        const todoRef = ref(db, 'todos');
        get(todoRef)
            .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const todosArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setTodo(todosArray);
            }
        })
            .finally(() => setLoading(false));
    }, []);
    const handleAddTodo = () => {
        if (!newTitle.trim())
            return;
        const newTodo = {
            title: newTitle,
            completed: false,
        };
        const newTodoRef = ref(db, 'todos');
        const newTodoKey = push(newTodoRef).key; // уникальный ключ
        if (newTodoKey) {
            set(ref(db, `todos/${newTodoKey}`), newTodo)
                .then(() => {
                setTodo((prevTodo) => [...prevTodo, { id: newTodoKey, ...newTodo }]);
                setNewTitle('');
            })
                .catch((error) => console.error('Error adding todo: ', error));
        }
    };
    const handleUpdateTodo = (id, completed) => {
        const updates = {};
        updates[`todos/${id}/completed`] = !completed;
        update(ref(db), updates)
            .then(() => {
            setTodo((prevTodo) => prevTodo.map((todo) => todo.id === id ? { ...todo, completed: !completed } : todo));
        })
            .catch((error) => console.error('Error updating todo: ', error));
    };
    const handleDeleteTodo = (id) => {
        const todoRef = ref(db, `todos/${id}`);
        remove(todoRef)
            .then(() => {
            setTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
        })
            .catch((error) => console.error('Error deleting todo: ', error));
    };
    const handleSearch = debounce((query) => {
        setSearchQuery(query.toLowerCase());
    }, 300);
    const toggleSort = () => {
        setSortAlphabetically(!sortAlphabetically);
    };
    const filteredAndSortedTodos = todo
        .filter(({ title }) => title.toLowerCase().includes(searchQuery))
        .sort((a, b) => (sortAlphabetically ? a.title.localeCompare(b.title) : 0));
    return (_jsxs("div", { className: 'app', children: [_jsx("h1", { children: "To-Do List" }), _jsx("input", { type: 'text', placeholder: '\u041F\u043E\u0438\u0441\u043A \u0437\u0430\u0434\u0430\u0447...', onChange: (e) => handleSearch(e.target.value), className: 'search-input' }), _jsx("button", { onClick: toggleSort, children: sortAlphabetically ? 'Отключить сортировку' : 'Сортировать по алфавиту' }), _jsx("input", { type: 'text', value: newTitle, onChange: (e) => setNewTitle(e.target.value), placeholder: '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438' }), _jsx("button", { onClick: handleAddTodo, children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443" }), isLoading ? (_jsx("div", { className: 'loader', children: "Loading..." })) : (_jsx("div", { className: 'todo-list', children: filteredAndSortedTodos.map(({ id, title, completed }) => (_jsxs("div", { className: `todo-item ${completed ? 'completed' : ''}`, children: [_jsx("input", { type: 'checkbox', checked: completed, onChange: () => handleUpdateTodo(id, completed) }), _jsx("span", { className: 'todo-title', children: title }), _jsx("button", { onClick: () => handleDeleteTodo(id), children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C" })] }, id))) }))] }));
};
export default App;

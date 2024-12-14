import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/home/Home';
import { TaskPage } from './pages/task/Task';
import { ErrorPage } from './pages/error/Error';

const App: React.FC = () => {
	return (
		<div className='app'>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/task/:id' element={<TaskPage />} />
				<Route path='/404' element={<ErrorPage />} />
				<Route path='*' element={<Navigate to='/404' />} />
			</Routes>
		</div>
	);
};

export default App;

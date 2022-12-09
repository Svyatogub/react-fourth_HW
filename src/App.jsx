import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import Courses from './components/Courses/Courses';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { Registration } from './components/Registration/Registration';

import './App.css';
import { CourseInfo } from './components/CourseInfo/CourseInfo';

function App() {
	const [isLogged, setIsLogged] = useState(
		Boolean(localStorage.getItem('userToken'))
	);

	const navigate = useNavigate();

	function logInHandler(res) {
		localStorage.setItem('userToken', res.data.result);
		setIsLogged(true);
		navigate('/courses');
	}
	function logOutHandler() {
		localStorage.removeItem('userToken');
		setIsLogged(false);
		navigate('/login');
	}
	return (
		<div>
			<Header isLogedIn={isLogged} logOut={logOutHandler} logedIn={isLogged} />
			<Routes>
				<Route
					paht='/'
					element={
						isLogged ? <Navigate to='/courses' /> : <Navigate to='/login' />
					}
				/>
				<Route path='/registration' element={<Registration />} />
				<Route
					path='/login'
					element={
						isLogged ? (
							<Navigate to='/courses' />
						) : (
							<Login login={logInHandler} />
						)
					}
				/>
				<Route path='/courses'>
					<Route index element={<Courses />} />
					<Route path='add' element={<CreateCourse />} />
					<Route path=':courseId' element={<CourseInfo />} />
				</Route>
				<Route
					path='*'
					element={
						<div>
							<h1>oops, this page does not exists</h1>
						</div>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;

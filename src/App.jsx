import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import Courses from './components/Courses/Courses';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { Registration } from './components/Registration/Registration';

import './App.css';
import { CourseInfo } from './components/CourseInfo/CourseInfo';

import { LOGIN_USER } from './store/users/actionTypes';

import { store } from './store';

function App() {
	const [isLogged, setIsLogged] = useState(false);
	const user = useSelector((state) => state.user);
	const token = JSON.parse(localStorage.getItem('user'));

	const navigate = useNavigate();

	useEffect(() => {
		tryToLogIn();
		console.log(isLogged);
	}, []);
	useEffect(() => {
		if (user.isAuth) {
			logInHandler();
		} else {
			logOutHandler();
		}
	}, [user]);
	function logInHandler() {
		localStorage.setItem('user', JSON.stringify(user));
		setIsLogged(true);
		navigate('/courses');
		console.log(isLogged);
	}
	function logOutHandler() {
		localStorage.removeItem('user');
		setIsLogged(false);
		navigate('/login');
	}
	function tryToLogIn() {
		let user = localStorage.getItem('user');
		try {
			user = JSON.parse(user);
		} catch {
			user = {};
		}
		if (user && user.isAuth) {
			store.dispatch({ type: LOGIN_USER, payload: user });
		}
		// else {
		// 	// store.dispatch({ type: LOGOUT_USER });
		// }
	}
	return (
		<div>
			<Header isLogedIn={isLogged} logedIn={isLogged} />
			<Routes>
				<Route
					path='/'
					element={
						token ? <Navigate to='/courses' /> : <Navigate to='/login' />
					}
				/>
				<Route path='/registration' element={<Registration />} />
				<Route
					path='/login'
					element={
						token ? <Navigate to='/courses' /> : <Login login={logInHandler} />
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

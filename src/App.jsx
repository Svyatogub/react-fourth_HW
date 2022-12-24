import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import Courses from './components/Courses/Courses';
import { CourseForm } from './components/CourseForm/CourseForm';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { Registration } from './components/Registration/Registration';

import './App.css';
import { CourseInfo } from './components/CourseInfo/CourseInfo';

import { LOGIN_USER } from './store/users/actionTypes';

import { store } from './store';
import { getAllAuthors } from './store/authors/thunk';
import { getAllCourses } from './store/courses/thunk';
import { checkCurrentUser } from './store/users/thunk';

function App() {
	const [isLogged, setIsLogged] = useState(false);
	const user = useSelector((state) => state.user);
	const token = localStorage.getItem('user');

	const navigate = useNavigate();

	useEffect(() => {
		tryToLogIn();
		store.dispatch(getAllCourses());
		store.dispatch(getAllAuthors());
	}, []);
	useEffect(() => {
		if (user.isAuth) {
			logInHandler();
		} else {
			logOutHandler();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);
	function logInHandler() {
		localStorage.setItem('user', JSON.stringify(user));
		setIsLogged(true);
		navigate('/courses');
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
			console.log(user);
		}
		if (user && user.isAuth) {
			store.dispatch(checkCurrentUser());
		}
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
					<Route path='add' element={<CourseForm />} />
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

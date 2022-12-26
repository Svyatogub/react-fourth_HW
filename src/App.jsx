import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import Courses from './components/Courses/Courses';
import { CourseForm } from './components/CourseForm/CourseForm';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { Registration } from './components/Registration/Registration';

import './App.css';
import { CourseInfo } from './components/CourseInfo/CourseInfo';

import { store } from './store';
import { getAllAuthors } from './store/authors/thunk';
import { getAllCourses } from './store/courses/thunk';
import { checkCurrentUser } from './store/users/thunk';
import { PrivateRouter } from './components/PrivateRouter/PrivateRouter';

function App() {
	const token = localStorage.getItem('user');

	const navigate = useNavigate();

	useEffect(() => {
		if (token) {
			store.dispatch(checkCurrentUser());
		} else {
			navigate('/login');
		}
		store.dispatch(getAllCourses());
		store.dispatch(getAllAuthors());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<Header />
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
					element={token ? <Navigate to='/courses' /> : <Login />}
				/>
				<Route path='/courses'>
					<Route index element={<Courses />} />
					<Route
						path='add'
						element={
							<PrivateRouter>
								<CourseForm />
							</PrivateRouter>
						}
					/>
					<Route
						path='update/:courseId'
						element={
							<PrivateRouter>
								<CourseForm />
							</PrivateRouter>
						}
					/>
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

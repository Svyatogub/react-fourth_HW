import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import { Link, useNavigate } from 'react-router-dom';

import { store } from '../../store';
import { logInUser } from '../../store/users/thunk';

import './loginStyle.css';

export const Login = (props) => {
	const userLogged = useSelector((state) => state.user.isAuth);
	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');

	const navigate = useNavigate();

	function submitHandler(e) {
		e.preventDefault();
		store.dispatch(logInUser(emailValue, passwordValue));
	}
	useEffect(() => {
		if (userLogged) {
			navigate('/courses');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userLogged]);
	return (
		<div className='loginBox'>
			<h1>Login</h1>
			<form onSubmit={submitHandler}>
				<fieldset className='loginInput'>
					<Input
						labelText='Email'
						labelId='nameInput'
						inputId='nameInput'
						placeholderText='Enter email...'
						inputType='email'
						onChange={(e) => setEmailValue(e.target.value)}
					/>
					<Input
						labelText='Password'
						labelId='passwordInput'
						inputId='passwordInput'
						placeholderText='Enter password...'
						inputType='password'
						onChange={(e) => setPasswordValue(e.target.value)}
					/>
					<Button buttonText={'Login'} type='submit' />
				</fieldset>
			</form>
			<p>
				If you don't have an account you can{' '}
				<Link to='/registration'>Register</Link>{' '}
			</p>
		</div>
	);
};

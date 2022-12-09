import React, { useState } from 'react';
import axios from 'axios';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import { Link, useNavigate } from 'react-router-dom';

import './loginStyle.css';

export const Login = (props) => {
	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');

	const navigate = useNavigate();

	function submitHandler(e) {
		e.preventDefault();
		axios
			.post('http://localhost:4000/login', {
				email: emailValue,
				password: passwordValue,
			})
			.then((res) => {
				console.log(res);
				props.login(res);
				navigate('/courses');
			})
			.catch((err) => {
				console.log(err);
				alert('oops, invalid password or email');
			});
	}
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

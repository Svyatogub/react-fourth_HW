import React, { useState } from 'react';
// import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import './registrationStyle.css';
import { registerUser } from '../../store/users/thunk';
import { store } from '../../store';

export const Registration = () => {
	const [nameValue, setNameValue] = useState('');
	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');

	const navigate = useNavigate();
	function submitHandler(e) {
		e.preventDefault();
		const newRegisterUser = {
			name: nameValue,
			email: emailValue,
			password: passwordValue,
		};
		store.dispatch(registerUser(newRegisterUser));
		navigate('/login');
		// axios
		// 	.post('http://localhost:4000/register', newRegisterUser)
		// 	.then(() => navigate('/login'))
		// 	.catch(() =>
		// 		alert('something went wrong, make shure all fields are valid')
		// 	);
	}
	return (
		<div className='registrationBox'>
			<h1>Registration</h1>
			<form onSubmit={submitHandler} className='registrationForm'>
				<fieldset className='registrationInput'>
					<Input
						labelText='Name'
						labelId='nameInput'
						inputId='nameInput'
						placeholderText='Enter name...'
						onChange={(e) => setNameValue(e.target.value)}
						minLength={2}
					/>
					<Input
						labelText='Email'
						labelId='emailInput'
						inputId='emailInput'
						placeholderText='Enter email...'
						onChange={(e) => setEmailValue(e.target.value)}
						inputType='email'
					/>
					<Input
						labelText='Password'
						labelId='passwordInput'
						inputId='passwordInput'
						placeholderText='Enter password...'
						onChange={(e) => setPasswordValue(e.target.value)}
						inputType='password'
						minLength={6}
					/>
					<Button buttonText={'Registration'} buttonType='submit' />
				</fieldset>
			</form>
			<p>
				If you have an account you can <Link to='/login'>Login</Link>
			</p>
		</div>
	);
};

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Logo } from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import './headerStyle.css';

import { headerButtonText } from '../../contants';
// import { LOGOUT_USER } from '../../store/users/actionTypes';

import { store } from '../../store';
import { getUserName } from '../../selectors';
import { logOutUser } from '../../store/users/thunk';

export const Header = () => {
	let location = useLocation();
	let navigate = useNavigate();
	const userName = useSelector(getUserName);

	const noRender =
		location.pathname === '/register' || location.pathname === '/login';

	function toLogin() {
		navigate('/login');
	}
	function userLogout() {
		store.dispatch(logOutUser(toLogin));
	}
	return (
		<div className='header'>
			<div className='headerImg'>
				<Logo />
			</div>
			{!noRender && (
				<div className='headerRight'>
					<p>{userName}</p>
					<Button buttonText={headerButtonText} onClick={userLogout} />
				</div>
			)}
		</div>
	);
};

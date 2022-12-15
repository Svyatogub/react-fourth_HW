import React from 'react';
import { useLocation } from 'react-router-dom';

import { Logo } from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import './headerStyle.css';

import { headerButtonText } from '../../contants';
import { LOGOUT_USER } from '../../store/users/actionTypes';

import { store } from '../../store';

export const Header = (props) => {
	let location = useLocation();

	const noRender =
		location.pathname === '/register' || location.pathname === '/login';

	const username = 'Ratmir';
	function userLogout() {
		store.dispatch({ type: LOGOUT_USER });
	}
	return (
		<div className='header'>
			<div className='headerImg'>
				<Logo />
			</div>
			{!noRender && (
				<div className='headerRight'>
					<p>{username}</p>
					<Button buttonText={headerButtonText} onClick={userLogout} />
				</div>
			)}
		</div>
	);
};

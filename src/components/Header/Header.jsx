import React from 'react';
import { useLocation } from 'react-router-dom';

import { Logo } from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import './headerStyle.css';

import { headerButtonText } from '../../contants';

export const Header = (props) => {
	let location = useLocation();

	const noRender =
		location.pathname === '/register' || location.pathname === '/login';

	const username = 'Ratmir';
	return (
		<div className='header'>
			<div className='headerImg'>
				<Logo />
			</div>
			{!noRender && (
				<div className='headerRight'>
					<p>{username}</p>
					<Button buttonText={headerButtonText} onClick={props.logOut} />
				</div>
			)}
		</div>
	);
};

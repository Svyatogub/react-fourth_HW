import React from 'react';

import { Logo } from './components/Logo/Logo';
import Button from '../../common/Button/Button';

import './headerStyle.css';

import { headerButtonText } from '../../contants';

export const Header = () => {
	const username = 'Ratmir';
	return (
		<div className='header'>
			<div className='headerImg'>
				<Logo />
			</div>
			<div className='headerRight'>
				<p>{username}</p>
				<Button buttonText={headerButtonText} />
			</div>
		</div>
	);
};

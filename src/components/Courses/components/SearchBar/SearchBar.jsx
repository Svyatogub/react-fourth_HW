import React, { useState } from 'react';

import PropTypes from 'prop-types';

import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';

import './searchBarStyle.css';

import { courseCardInputText } from '../../../../contants';
import { searchBarButtonText } from '../../../../contants';

export const SearchBar = ({ findCourse, resetCourses }) => {
	const [inputValue, setInputValue] = useState('');
	const onChangeInput = (event) => {
		const value = event.target.value;
		setInputValue(value);
		!value.length && resetCourses();
	};
	const onSubmit = (event) => {
		event.preventDefault();
		findCourse(inputValue.trim());
	};

	return (
		<form className='searchBar' onSubmit={onSubmit}>
			<Input
				placeholderText={courseCardInputText}
				inputValue={inputValue}
				onChange={onChangeInput}
			/>
			<Button buttonText={searchBarButtonText} buttonType={'submit'} />
		</form>
	);
};
SearchBar.propTypes = {
	findCourse: PropTypes.func.isRequired,
	resetCourses: PropTypes.func.isRequired,
};

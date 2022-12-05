import React from 'react';

import PropTypes from 'prop-types';

import './inputStyle.css';

const Input = ({
	labelText,
	labelId,
	placeholderText,
	onChange,
	onBlur,
	inputType,
	inputId,
	inputValue,
}) => {
	return (
		<div>
			<label htmlFor={labelId}>{labelText}</label>
			<input
				type={inputType}
				id={inputId}
				placeholder={placeholderText}
				onChange={onChange}
				onBlur={onBlur}
				className='searchBarInput'
				value={inputValue}
			/>
		</div>
	);
};

Input.propTypes = {
	labelText: PropTypes.string,
	placeholderText: PropTypes.string,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
};

export default Input;

import React from 'react';
import './textAreaStyle.css';

export const TextArea = ({
	labelId,
	labelText,
	inputId,
	placeholderText,
	onChange,
	inputValue,
}) => {
	return (
		<div className='textArea'>
			<label htmlFor={labelId}>{labelText}</label>
			<textarea
				id={inputId}
				placeholder={placeholderText}
				onChange={onChange}
				value={inputValue}
			/>
		</div>
	);
};

import React from 'react';
import PropTypes from 'prop-types';

import './showCourseButtonStyle.css';

import changeBtn from '../../components/Courses/components/CourseCard/components/assets/pencil-solid.svg';
import deleteBtn from '../../components/Courses/components/CourseCard/components/assets/trash-solid.svg';

export const ShowCourseChangeButton = ({ onClick, buttonType }) => {
	return (
		<button onClick={onClick} type={buttonType} className='lilButton'>
			<img src={changeBtn} alt='cangeBtn' className='lilImage' />
		</button>
	);
};
export const ShowCourseDeleteBtn = ({ onClick, buttonType }) => {
	return (
		<button onClick={onClick} type={buttonType} className='lilButton'>
			<img src={deleteBtn} alt='deleteBtn' className='lilImage' />
		</button>
	);
};

ShowCourseChangeButton.propTypes = {
	buttonType: PropTypes.string,
	onClick: PropTypes.func,
};
ShowCourseDeleteBtn.propTypes = {
	buttonType: PropTypes.string,
	onClick: PropTypes.func,
};

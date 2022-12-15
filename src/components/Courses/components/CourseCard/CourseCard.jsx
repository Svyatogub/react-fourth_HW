import React from 'react';

import Button from '../../../../common/Button/Button';
import {
	ShowCourseChangeButton,
	ShowCourseDeleteBtn,
} from '../../../../common/Button/ShowCourseButton';

import './courseCardStyle.css';

export const CourseCard = ({
	Title,
	Duration,
	CreationDate,
	Description,
	Authors,
	Id,
	ButtonClick,
	onDelete,
}) => {
	return (
		<div className='cardBox'>
			<div className='cardText'>
				<h1>{Title}</h1>
				<p>{Description}</p>
			</div>
			<div className='cardInfo'>
				<div>
					<h4>Authors:</h4>
					<p>{Authors}</p>
				</div>
				<div>
					<h4>Duration:</h4>
					<p>{Duration}</p>
				</div>
				<div>
					<h4>Created:</h4>
					<p>{CreationDate}</p>
				</div>
				<div className='buttonsSection'>
					<Button buttonText={'Show course'} onClick={ButtonClick} />
					<ShowCourseChangeButton />
					<ShowCourseDeleteBtn onClick={onDelete} />
				</div>
			</div>
		</div>
	);
};

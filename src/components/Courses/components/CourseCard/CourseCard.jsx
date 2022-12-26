import React from 'react';
import { useSelector } from 'react-redux';

import Button from '../../../../common/Button/Button';
import {
	ShowCourseChangeButton,
	ShowCourseDeleteBtn,
} from '../../../../common/Button/ShowCourseButton';

import { getUserRole } from '../../../../selectors';

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
	toChange,
}) => {
	const role = useSelector(getUserRole);

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
					{role === 'admin' ? (
						<>
							<ShowCourseChangeButton onClick={toChange} />
							<ShowCourseDeleteBtn onClick={onDelete} />
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};

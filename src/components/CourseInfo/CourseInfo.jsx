import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { dataRefactor } from '../../helpers/dateGenerator';
import { refactorDuration } from '../../helpers/pipeDuration';

import './courseInfoStyle.css';

import { backToCoursesText } from '../../contants';

export const CourseInfo = () => {
	const { courseId } = useParams();
	const courses = useSelector((state) => state.courses);
	const authors = useSelector((state) => state.authors);
	const course = courses.find((c) => {
		return c.id === courseId;
	});
	const courseCreationDate = dataRefactor(course.creationDate);
	const courseDuration = refactorDuration(course.duration);
	const mapAuthorsFromCourse = (c) =>
		c.authors
			.map((ca) => authors.find((a) => a.id === ca))
			.filter((ca) => ca)
			.map((ca) => ca.name)
			.join(', ');

	return (
		<div className='courseInfoBox'>
			<div className='backToCoursesDiv'>
				<Link to='/courses' className='backToCoursesLink'>
					{backToCoursesText}
				</Link>
			</div>
			<div className='courseTitle'>
				<h1>{course.title}</h1>
			</div>
			<div className='courseInfomationBlock'>
				<div className='courseInfomationBlockLeft'>
					<p>{course.description}</p>
				</div>
				<div className='courseInfomationBlockRight'>
					<div>
						<p>ID:</p>
						<p>{course.id}</p>
					</div>
					<div>
						<p>Duration:</p>
						<p>{courseDuration}</p>
					</div>
					<div>
						<p>Created:</p>
						<p>{courseCreationDate}</p>
					</div>
					<div>
						<p>Authors:</p>
						<p>{mapAuthorsFromCourse(course)}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

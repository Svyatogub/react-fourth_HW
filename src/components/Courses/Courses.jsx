import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button';
import { CourseCard } from './components/CourseCard/CourseCard';
import { SearchBar } from './components/SearchBar/SearchBar';

import './coursesStyle.css';

import { coursesButtonText } from '../../contants';

import { dataRefactor } from '../../helpers/dateGenerator';
import { refactorDuration } from '../../helpers/pipeDuration';
import { getAllAuthors, getAllCourses } from '../../services';

const mapAuthorsFromCourse = (c, authors) =>
	c.authors
		.map((ca) => authors.find((a) => a.id === ca))
		.filter((ca) => ca)
		.map((ca) => ca.name)
		.join(', ');

const Courses = (props) => {
	const courses = useSelector((state) => state.courses);
	const authors = useSelector((state) => state.authors);

	const [searchedCourses, setSearchedCourses] = useState(courses);
	const navigate = useNavigate();
	function toAddCourses() {
		navigate('/courses/add');
	}
	useEffect(() => {
		getAllCourses();
		getAllAuthors();
	}, []);
	useEffect(() => {
		setSearchedCourses(courses);
	}, [courses]);

	const mapedList = () => {
		return (
			<>
				<div className='coursesTop'>
					<SearchBar findCourse={findCourse} resetCourses={resetCourses} />
					<div className='coursesAddButton'>
						<Button buttonText={coursesButtonText} onClick={toAddCourses} />
					</div>
				</div>
				{searchedCourses.map((list) => {
					return (
						<CourseCard
							key={list.id}
							Id={list.id}
							Title={list.title}
							Description={list.description}
							Authors={mapAuthorsFromCourse(list, authors)}
							Duration={refactorDuration(list.duration)}
							CreationDate={dataRefactor(list.creationDate)}
							ButtonClick={toShowCourse}
						/>
					);
					function toShowCourse() {
						navigate(`${list.id}`);
					}
				})}
			</>
		);
	};
	return <div className='courses'>{mapedList()}</div>;

	function findCourse(searchValue) {
		const searchResult = courses.filter((list) => {
			const reg = new RegExp(searchValue, 'gi');
			return list.title.match(reg) || list.id.match(reg);
		});
		searchResult.length !== 0
			? setSearchedCourses(searchResult)
			: setSearchedCourses(courses);
	}
	function resetCourses() {
		setSearchedCourses(courses);
	}
};

export default Courses;

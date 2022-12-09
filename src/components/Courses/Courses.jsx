import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button';
import { CourseCard } from './components/CourseCard/CourseCard';
import { SearchBar } from './components/SearchBar/SearchBar';

import './coursesStyle.css';

import { coursesButtonText } from '../../contants';

import { mockedAuthorsList, mockedCoursesList } from '../../helpers/mockedData';

import { dataRefactor } from '../../helpers/dateGenerator';
import { refactorDuration } from '../../helpers/pipeDuration';

const mapAuthorsFromCourse = (c) =>
	c.authors
		.map((ca) => mockedAuthorsList.find((a) => a.id === ca))
		.filter((ca) => ca)
		.map((ca) => ca.name)
		.join(', ');

const Courses = (props) => {
	const [searchedCourses, setSearchedCourses] = useState(mockedCoursesList);
	const navigate = useNavigate();
	function toAddCourses() {
		navigate('/courses/add');
	}
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
							Authors={mapAuthorsFromCourse(list)}
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
		const searchResult = mockedCoursesList.filter((list) => {
			const reg = new RegExp(searchValue, 'gi');
			return list.title.match(reg) || list.id.match(reg);
		});
		searchResult.length !== 0
			? setSearchedCourses(searchResult)
			: setSearchedCourses(mockedCoursesList);
	}
	function resetCourses() {
		setSearchedCourses(mockedCoursesList);
	}
};

export default Courses;

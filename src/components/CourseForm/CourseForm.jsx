import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { TextArea } from '../../common/Input/TextArea';

import './createCourseStyle.css';

import { refactorDuration } from '../../helpers/pipeDuration';
import { getCreationDate } from '../../helpers/dateGenerator';
import { store } from '../../store';
import { updateCourse } from '../../store/courses/thunk';

import {
	createCourseTextInput,
	createCourseTitleInputAndLabelId,
	createCourseTitleLabel,
	createCourseTitlePlaceHolder,
	createCourseButtonCreateCourse,
	createCourseTextAreaInputAndLabelId,
	createCourseDescriptionPlaceHolder,
	createCourseAddAuthprH3,
	createCourseAddAuthorLabel,
	createCourseAddAuthorLabelAndInputId,
	createCourseAddAuthorNamePlaceHolder,
	createCourseAddAuthorNameButton,
	createCourseDurationH3,
	createCourseDurationLabelAndInputId,
	createCourseDurationPlaceHolder,
	createCourseAuthorListH3,
	createCourseDescriptionLabel,
	createCourseCourseAuthorsH3,
} from '../../contants';

import { getAuthors, getCourses } from '../../selectors';
import { createNewCourse } from '../../store/courses/thunk';
import { createNewAuthor } from '../../store/authors/thunk';

export const CourseForm = (props) => {
	const location = useLocation();
	const locationObject = location.pathname.split('/');

	// const entity = locationObject[1];
	const method = locationObject[2];

	const coursesInfo = useSelector(getCourses);
	const currentCourseId = locationObject[3];
	const currentCourse = coursesInfo.find((c) => c.id === currentCourseId) || {};

	const [titleVaule, setTitleValue] = useState(currentCourse.title ?? '');
	const [descriptionValue, setDescriptionValue] = useState(
		currentCourse.description || ''
	);
	const [authorsValue, setAuthorsValue] = useState(currentCourse.authors ?? []);
	const [durationValue, setDurationValue] = useState(
		currentCourse.duration ?? 0
	);
	const [newAuthorValue, setNewAuthorValue] = useState('');

	// const courses = useSelector(getCourses);
	const authors = useSelector(getAuthors);
	const filterUnusedAuthors = () => {
		return authors.filter((a) => {
			return !authorsValue.some((av) => av === a.id);
		});
	};
	const [authorList, setAuthorList] = useState(filterUnusedAuthors());
	useEffect(() => {
		setAuthorList(filterUnusedAuthors());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authors]);
	const navigate = useNavigate();

	const mappedAuthors = authorList.map((item) => {
		if (!item) return null;
		return (
			<div key={item.id} className='createCourseRightAuthors'>
				<p>{item.name}</p>
				<Button
					buttonText={'Add author'}
					className='createCourseRightButtons'
					onClick={() => addCourseAuthor(item.id)}
				/>
			</div>
		);
	});
	const findAuthorById = (id) => {
		return authors.find((a) => a.id === id);
	};
	return (
		<div className='createCourseBlock'>
			<form onSubmit={handleSubmit}>
				<fieldset className='borderNone'>
					<div className='createCourseTitleSection'>
						<div className='createCourseTitleSectionInput'>
							<Input
								inputValue={titleVaule}
								onChange={(e) => setTitleValue(e.target.value)}
								labelText={createCourseTitleLabel}
								labelId={createCourseTitleInputAndLabelId}
								inputType={createCourseTextInput}
								inputId={createCourseTitleInputAndLabelId}
								placeholderText={createCourseTitlePlaceHolder}
							/>
						</div>
						<Button
							buttonText={createCourseButtonCreateCourse}
							buttonType={'submit'}
						/>
					</div>
					<div className='createCourseTextArea'>
						<TextArea
							labelText={createCourseDescriptionLabel}
							labelId={createCourseTextAreaInputAndLabelId}
							inputId={createCourseTextAreaInputAndLabelId}
							placeholderText={createCourseDescriptionPlaceHolder}
							inputValue={descriptionValue}
							onChange={(e) => setDescriptionValue(e.target.value)}
						/>
					</div>
				</fieldset>
				<fieldset className='createCourseBox'>
					<div className='createCourseLeft'>
						<div>
							<h3>{createCourseAddAuthprH3}</h3>
							<Input
								inputValue={newAuthorValue}
								onChange={(e) => setNewAuthorValue(e.target.value)}
								labelText={createCourseAddAuthorLabel}
								labelId={createCourseAddAuthorLabelAndInputId}
								inputType={createCourseTextInput}
								inputId={createCourseAddAuthorLabelAndInputId}
								placeholderText={createCourseAddAuthorNamePlaceHolder}
							/>
							<Button
								buttonText={createCourseAddAuthorNameButton}
								onClick={addAuthor}
							/>
						</div>
						<div>
							<h3>{createCourseDurationH3}</h3>
							<Input
								labelText={createCourseDurationH3}
								labelId={createCourseDurationLabelAndInputId}
								inputType={'string'}
								inputId={createCourseDurationLabelAndInputId}
								placeholderText={createCourseDurationPlaceHolder}
								inputValue={durationValue}
								onChange={(e) => setDurationValue(e.target.value)}
							/>
							<p>{`${createCourseDurationH3}: ${refactorDuration(
								durationValue
							)}`}</p>
						</div>
					</div>
					<div className='createCourseRight'>
						<div>
							<h3>{createCourseAuthorListH3}</h3>
							<div>{mappedAuthors}</div>
						</div>
						<div>
							<h3>{createCourseCourseAuthorsH3}</h3>
							<div>
								{authorsValue.length === 0 ? (
									<p>authors list is empty</p>
								) : (
									authorsValue.map((item) => {
										const author = findAuthorById(item);
										return (
											<div key={author.id} className='createCourseRightAuthors'>
												<p>{author.name}</p>
												<Button
													buttonText={'Delete author'}
													className='createCourseRightButtons'
													onClick={() => deleteCourseAuthor(author.id)}
												/>
											</div>
										);
									})
								)}
							</div>
						</div>
					</div>
				</fieldset>
			</form>
		</div>
	);

	function addAuthor(e) {
		e.preventDefault();
		if (newAuthorValue.length < 2) {
			alert('Input should be more than 2 char');
			return;
		} else {
			let newAuthor = { name: newAuthorValue, id: uuidv4() };
			store.dispatch(createNewAuthor(newAuthor));
		}
	}

	function createCourse() {
		let newCourse = {
			title: titleVaule,
			description: descriptionValue,
			creationDate: getCreationDate(),
			duration: Number(durationValue),
			authors: authorsValue,
			id: uuidv4(),
		};
		store.dispatch(createNewCourse(newCourse));
	}
	function updateCurrentCourse() {
		let currentCourse = {
			title: titleVaule,
			description: descriptionValue,
			duration: Number(durationValue),
			authors: authorsValue,
		};
		store.dispatch(updateCourse(currentCourse, currentCourseId));
	}
	function handleSubmit(e) {
		e.preventDefault();
		if (titleVaule === '' || durationValue === 0 || descriptionValue === '') {
			alert('Please make sure Title, Duration, Description inputs are valid');
			return;
		}
		if (method === 'add') {
			createCourse();
		} else if (method === 'update') {
			updateCurrentCourse();
		}
		navigate('/courses');
	}
	function addCourseAuthor(item) {
		let newCourseAuthor = authorList.find((i) => {
			return i.id === item;
		});
		setAuthorsValue([newCourseAuthor.id, ...authorsValue]);
		setAuthorList(
			authorList.filter((i) => {
				// debugger;
				return i.id !== newCourseAuthor.id;
			})
		);
	}
	function deleteCourseAuthor(item) {
		let delCourseAuthor = authorsValue.find((i) => {
			return i === item;
		});
		setAuthorList([findAuthorById(delCourseAuthor), ...authorList]);
		setAuthorsValue(
			authorsValue.filter((i) => {
				return item !== i;
			})
		);
	}
};

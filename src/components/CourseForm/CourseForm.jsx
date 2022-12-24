import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { TextArea } from '../../common/Input/TextArea';

import './createCourseStyle.css';

import { refactorDuration } from '../../helpers/pipeDuration';
import { getCreationDate } from '../../helpers/dateGenerator';
import { CREATE_AUTHOR } from '../../store/authors/actionTypes';
import { store } from '../../store';

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

export const CourseForm = (props) => {
	const [titleVaule, setTitleValue] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');
	const [authorsValue, setAuthorsValue] = useState([]);
	const [durationValue, setDurationValue] = useState(0);
	const [newAuthorValue, setNewAuthorValue] = useState('');

	const courses = useSelector(getCourses);
	const authors = useSelector(getAuthors);
	const [authorList, setAuthorList] = useState(authors);

	useEffect(() => {
		setAuthorList(authors);
	}, [authors]);
	const navigate = useNavigate();

	const mapedAuthors = authorList.map((item) => {
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
							value={descriptionValue}
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
							<div>{mapedAuthors}</div>
						</div>
						<div>
							<h3>{createCourseCourseAuthorsH3}</h3>
							<div>
								{authorsValue.length === 0 ? (
									<p>authors list is empty</p>
								) : (
									authorsValue.map((item) => {
										return (
											<div key={item.id} className='createCourseRightAuthors'>
												<p>{item.name}</p>
												<Button
													buttonText={'Delete author'}
													className='createCourseRightButtons'
													onClick={() => deleteCourseAuthor(item.id)}
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
			store.dispatch({ type: CREATE_AUTHOR, payload: newAuthor });
			console.log(authors);
		}
	}

	function createCourse() {
		let newCourse = {
			title: titleVaule,
			description: descriptionValue,
			creationDate: getCreationDate(),
			duration: Number(durationValue),
			authors: authorsValue.map((course) => {
				return course.id;
			}),
			id: uuidv4(),
		};
		store.dispatch(createNewCourse(newCourse));
		console.log(courses);
	}
	function handleSubmit(e) {
		e.preventDefault();
		if (titleVaule === '' || durationValue === 0 || descriptionValue === '') {
			alert('Please make sure Title, Duration, Description inputs are valid');
			return;
		}
		createCourse();
		navigate('/courses');
	}
	function addCourseAuthor(item) {
		let newCourseAuthor = authorList.find((i) => {
			return i.id === item;
		});
		setAuthorsValue([newCourseAuthor, ...authorsValue]);
		setAuthorList(
			authorList.filter((i) => {
				return i.id !== newCourseAuthor.id;
			})
		);
	}
	function deleteCourseAuthor(item) {
		let newCourseAuthor = authorsValue.find((i) => {
			return i.id === item;
		});
		setAuthorList([newCourseAuthor, ...authorList]);
		setAuthorsValue(
			authorsValue.filter((i) => {
				return item !== i.id;
			})
		);
	}
};

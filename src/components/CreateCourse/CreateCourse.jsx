import React, { useState } from 'react';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { TextArea } from '../../common/Input/TextArea';

import './createCourseStyle.css';

import { refactorDuration } from '../../helpers/pipeDuration';

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
	createCourseNumberType,
	createCourseDurationPlaceHolder,
	createCourseAuthorListH3,
	createCourseDescriptionLabel,
	createCourseCourseAuthorsH3,
} from '../../contants';

import { mockedAuthorsList, mockedCoursesList } from '../../helpers/mockedData';
import Author from '../../helpers/models/authorModel';
import Course from '../../helpers/models/courseModel';

export const CreateCourse = () => {
	const [titleVaule, setTitleValue] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');
	const [authorsValue, setAuthorsValue] = useState([]);
	const [durationValue, setDurationValue] = useState(0);
	const [newAuthorValue, setNewAuthorValue] = useState('');

	const [authorList, setAuthorList] = useState(mockedAuthorsList);
	const [coursesList, setCoursesList] = useState(mockedCoursesList);

	const availableAuthors = authorList.filter((author) => {
		return !authorsValue.some((auth) => auth === author.id);
	});
	const mapedAuthors = mockedAuthorsList.map((item) => {
		return (
			<div key={item.id} className='createCourseRightAuthors'>
				<p>{item.name}</p>
				<Button
					buttonText={'Add author'}
					className='createCourseRightButtons'
					onClick={handleSelectedAuthors}
				/>
			</div>
		);
	});
	function getAuthorsById(authorsIdList) {
		return mapedAuthors.reduce((acc, cur) => {
			authorsIdList.includes(cur.id) && acc.push(cur);
			return acc;
		}, []);
	}
	const selectedAuthors = getAuthorsById(authorsValue);

	return (
		<form onSubmit={onSubmit}>
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
							onClick={createAuthor}
						/>
					</div>
					<div>
						<h3>{createCourseDurationH3}</h3>
						<Input
							labelText={createCourseDurationH3}
							labelId={createCourseDurationLabelAndInputId}
							inputType={createCourseNumberType}
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
							{authorsValue.map((item) => {
								return (
									<div key={item.id} className='createCourseRightAuthors'>
										<p>{selectedAuthors(item.name)}</p>
										<Button
											buttonText={'Delete author'}
											className='createCourseRightButtons'
											onClick={handleAvaliableAuthors}
										/>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</fieldset>
		</form>
	);

	function handleSelectedAuthors(author) {
		setAuthorsValue(authorsValue.filter((auth) => auth !== author.id));
	}

	function handleAvaliableAuthors(author) {
		setAuthorsValue([...authorList, author.id]);
	}
	function onSubmit(e) {
		e.preventDefault();
		const courseData = [
			titleVaule,
			descriptionValue,
			durationValue,
			authorsValue,
		];
		const isDataValid = courseData.every((i) => i.length);

		if (isDataValid) {
			setCoursesList([...coursesList, new Course(...courseData)]);
		} else {
			alert('Please make shure all fields are valid');
		}
	}

	function createAuthor() {
		if (!newAuthorValue) {
			setNewAuthorValue('');
			return;
		}
		setAuthorList([...authorList, new Author(newAuthorValue)]);
		setNewAuthorValue('');
	}
};

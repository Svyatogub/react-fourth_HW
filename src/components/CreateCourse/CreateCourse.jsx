import React, { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

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
// import { dataRefactor } from '../../helpers/dateGenerator';
// import Author from '../../helpers/models/authorModel';
// import Course from '../../helpers/models/courseModel';

console.log(mockedAuthorsList);

export const CreateCourse = () => {
	const [titleVaule, setTitleValue] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');
	const [authorsValue, setAuthorsValue] = useState([]);
	const [creationDate, setCreationDate] = useState('');
	const [durationValue, setDurationValue] = useState(0);
	const [newAuthorValue, setNewAuthorValue] = useState('');

	const [authorList, setAuthorList] = useState(mockedAuthorsList);
	const [coursesList, setCoursesList] = useState(mockedCoursesList);

	// const availableAuthors = authorList.filter((author) => {
	// 	return !authorsValue.some((auth) => auth === author.id);
	// });
	const mapedAuthors = mockedAuthorsList.map((item) => {
		return (
			<div key={item.id} className='createCourseRightAuthors'>
				<p>{item.name}</p>
				<Button
					buttonText={'Add author'}
					className='createCourseRightButtons'
					onClick={addCourseAuthor}
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
	// const selectedAuthors = getAuthorsById(authorsValue);

	return (
		<form>
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
										<p>{item.name}</p>
										<Button
											buttonText={'Delete author'}
											className='createCourseRightButtons'
											onClick={deleteCourseAuthor}
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

	function addAuthor(e) {
		e.preventDefault();
		if (newAuthorValue.length < 2) {
			alert('Input should be more than 2 char');
			return;
		} else {
			let newAuthor = { id: uuidv4(), name: newAuthorValue };
			setAuthorList([newAuthor, ...authorList]);
			setNewAuthorValue('');
			mockedAuthorsList.push(newAuthor);
			console.log(mockedAuthorsList);
		}
	}
	// function handleSubmit(e) {
	//     e.preventDefault()
	//     if(titleVaule === '' || descriptionValue === '' || durationValue === 0) {
	//         alert('Please make sure all inputs are valid')
	//     }

	// }
	function createCourse(e) {
		let newCourse = {
			id: uuidv4(),
			title: titleVaule,
			description: descriptionValue,
			creatianDate: creationDate,
			duration: durationValue,
			authors: authorsValue.map((course) => {
				return course.id;
			}),
		};
		mockedCoursesList.push(newCourse);
	}
	function addCourseAuthor(newCourseAuthor, e) {
		debugger;
		e.preventDefault();
		setAuthorsValue([newCourseAuthor, ...authorsValue]);
		setAuthorList((prev) => {
			prev.filter((i) => i.id !== newCourseAuthor.id);
		});
		console.log(authorsValue);
	}
	function deleteCourseAuthor(newCourseAuthor) {
		setAuthorList([newCourseAuthor, ...authorsValue]);
		setAuthorList((prev) => {
			prev.filter((i) => i.id !== authorsValue.id);
		});
	}
	// function handleSelectedAuthors(author) {
	// 	setAuthorsValue(authorsValue.filter((auth) => auth !== author.id));
	// }

	// function handleAvaliableAuthors(author) {
	// 	setAuthorsValue([...authorList, author.id]);
	// }
	// function onSubmit() {
	// 	const courseData = [
	// 		titleVaule,
	// 		descriptionValue,
	// 		durationValue,
	// 		authorsValue,
	// 	];
	// 	const isDataValid = courseData.every((i) => i.length);

	// 	if (isDataValid) {
	// 		setCoursesList([...coursesList, new Course(...courseData)]);
	// 	} else {
	// 		alert('Please make shure all fields are valid');
	// 	}
	// }

	// function createAuthor() {
	// 	if (!newAuthorValue) {
	// 		setNewAuthorValue('');
	// 		return;
	// 	}
	// 	setAuthorList([...authorList, new Author(newAuthorValue)]);
	// 	setNewAuthorValue('');
	// }
};

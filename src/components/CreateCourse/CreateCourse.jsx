import React, { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { mockedAuthorsList, mockedCoursesList } from '../../helpers/mockedData';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { TextArea } from '../../common/Input/TextArea';

import './createCourseStyle.css';

import { refactorDuration } from '../../helpers/pipeDuration';
import { getCreationDate } from '../../helpers/dateGenerator';

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

console.log(mockedCoursesList);

export const CreateCourse = (props) => {
	const [titleVaule, setTitleValue] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');
	const [authorsValue, setAuthorsValue] = useState([]);
	const [durationValue, setDurationValue] = useState(0);
	const [newAuthorValue, setNewAuthorValue] = useState('');

	const [authorList, setAuthorList] = useState(mockedAuthorsList);
	// const [coursesList, setCoursesList] = useState(mockedCoursesList);

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
		<div>
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
			let newAuthor = { id: uuidv4(), name: newAuthorValue };
			setAuthorList([newAuthor, ...authorList]);
			setNewAuthorValue('');
			mockedAuthorsList.push(newAuthor);
			console.log(mockedAuthorsList);
		}
	}

	function createCourse() {
		let newCourse = {
			id: uuidv4(),
			title: titleVaule,
			description: descriptionValue,
			creationDate: getCreationDate(),
			duration: durationValue,
			authors: authorsValue.map((course) => {
				return course.id;
			}),
		};
		mockedCoursesList.push(newCourse);
		props.hendleDifferentRender();
	}
	function handleSubmit(e) {
		e.preventDefault();
		if (titleVaule === '' || durationValue === 0 || descriptionValue === '') {
			alert('Please make sure Title, Duration, Description inputs are valid');
			return;
		}
		createCourse();
		console.log(mockedCoursesList);
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

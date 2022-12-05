import { useState } from 'react';
import './App.css';

import Courses from './components/Courses/Courses';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
import { Header } from './components/Header/Header';

function App() {
	const [courseOrAddCourse, setCourseOrAddCourse] = useState(true);

	function differentRender() {
		setCourseOrAddCourse(!courseOrAddCourse);
	}
	return (
		<div>
			<Header />
			{courseOrAddCourse ? (
				<Courses hendleDifferentRender={differentRender} />
			) : (
				<CreateCourse hendleDifferentRender={differentRender} />
			)}
			{/* <Courses /> */}
		</div>
	);
}

export default App;

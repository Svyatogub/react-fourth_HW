import { v4 as uuidv4 } from 'uuid';

class Course {
	constructor(title, description, duration, authors) {
		this.id = uuidv4();
		this.title = title;
		this.description = description;
		this.duration = duration;
		this.authors = authors;
	}
}

export default Course;

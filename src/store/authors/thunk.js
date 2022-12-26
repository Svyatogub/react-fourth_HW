import axios from 'axios';
import { setAuthorsAction, createAuthorAction } from './actionCreators';

export const getAllAuthors = () => {
	return (dispatch) => {
		axios
			.get('http://localhost:4000/authors/all')
			.then((res) => {
				dispatch(setAuthorsAction(res.data.result));
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
};
export const createNewAuthor = (author) => {
	return (dispatch) => {
		return axios
			.post('http://localhost:4000/authors/add', author, {
				headers: {
					Authorization: `${localStorage.getItem('user')}`,
				},
			})
			.then(
				(res) =>
					res.status === 200 && dispatch(createAuthorAction(res.data.result))
			)
			.then(() => {
				dispatch(getAllAuthors());
			})
			.catch((e) => console.log(e.message));
	};
};

import axios from 'axios';
import { setAuthorsAction } from './actionCreators';

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

export const getCreationDate = () => {
	let dateNow = new Date();
	let day = dateNow.getDate();
	let month = dateNow.getMonth() + 1;
	let year = dateNow.getFullYear();
	let date = `${day}/${month}/${year}`;
	return date;
};
export const dataRefactor = (date) => {
	let parts = date.split('/');
	return new Date(
		parseInt(parts[2], 10),
		parseInt(parts[1], 10) - 1,
		parseInt(parts[0], 10)
	).toLocaleDateString();
};

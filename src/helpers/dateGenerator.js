export const creationDate = () => {
	let dateNow = new Date();
	let day = dateNow.getDate();
	let month = dateNow.getMonth() + 1;
	let year = dateNow.getFullYear();
	let date = `${day}/${month}/${year}`;
	return date;
};
export const dataRefactor = (data) => {
	return data.replaceAll('/', '.');
};

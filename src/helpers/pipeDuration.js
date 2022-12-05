export const refactorDuration = (totalMinutes) => {
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	return `${padTo2Digits(hours)}:${padTo2Digits(minutes)} hours`;
};

function padTo2Digits(num) {
	return num.toString().padStart(2, '0');
}

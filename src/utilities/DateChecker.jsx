function DateChecker({ dateToCheck }) {
	const today = new Date();
	const yesterday = new Date();
	yesterday.setDate(today.getDate() - 1);
	const day2Ago = new Date();
	day2Ago.setDate(today.getDate() - 2);
	const day3Ago = new Date();
	day3Ago.setDate(today.getDate() - 3);
	const day4Ago = new Date();
	day4Ago.setDate(today.getDate() - 4);
	const day5Ago = new Date();
	day5Ago.setDate(today.getDate() - 5);
	const day6Ago = new Date();
	day6Ago.setDate(today.getDate() - 6);
	const weekAgo = new Date();
	weekAgo.setDate(today.getDate() - 7);

	if (dateToCheck.toLocaleDateString() === today.toLocaleDateString()) {
		return 'Today';
	} else if (
		dateToCheck.toLocaleDateString() === yesterday.toLocaleDateString()
	) {
		return 'Yesterday';
	} else if (
		dateToCheck.toLocaleDateString() === day2Ago.toLocaleDateString()
	) {
		return '2 Days Ago';
	} else if (
		dateToCheck.toLocaleDateString() === day3Ago.toLocaleDateString()
	) {
		return '3 Days Ago';
	} else if (
		dateToCheck.toLocaleDateString() === day4Ago.toLocaleDateString()
	) {
		return '4 Days Ago';
	} else if (
		dateToCheck.toLocaleDateString() === day5Ago.toLocaleDateString()
	) {
		return '5 Days Ago';
	} else if (
		dateToCheck.toLocaleDateString() === day6Ago.toLocaleDateString()
	) {
		return '6 Days Ago';
	} else if (
		dateToCheck.toLocaleDateString() === weekAgo.toLocaleDateString()
	) {
		return 'A Week Ago';
	} else if (dateToCheck.toLocaleDateString() === 'Invalid Date') {
		return '';
	}
	return dateToCheck.toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
	});
}

export default DateChecker;

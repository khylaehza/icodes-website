import moment from 'moment';
import { extendMoment } from 'moment-range';

const WeekGenerator = () => {
	const momentExtend = extendMoment(moment);
	const firstDay = momentExtend(moment()).startOf('month');
	const endDay = momentExtend(moment()).endOf('month');

	const monthRange = moment.range(firstDay, endDay);
	let weeks = [];
	for (let mday of monthRange.by('days')) {
		if (weeks.indexOf(mday.week()) === -1) {
			weeks.push(mday.week());
		}
	}
	let weeklyRange = [];
	let calendar = [];
	for (let index = 0; index < weeks.length; index++) {
		let weeknumber = weeks[index];
		let firstWeekDay = moment(firstDay).week(weeknumber).day(0);
		if (firstWeekDay.isBefore(firstDay)) {
			firstWeekDay = firstDay;
		}

		let lastWeekDay = moment(endDay).week(weeknumber).day(6);
		if (lastWeekDay.isAfter(endDay)) {
			lastWeekDay = endDay;
		}

		weeklyRange.push(
			firstWeekDay.format('MMM DD') + ' - ' + lastWeekDay.format('DD')
		);
		let weekRange = moment.range(
			firstWeekDay.format('MM-DD-YYYY'),
			lastWeekDay.format('MM-DD-YYYY')
		);

		calendar.push(weekRange);
	}

	return calendar;
};

export default WeekGenerator;

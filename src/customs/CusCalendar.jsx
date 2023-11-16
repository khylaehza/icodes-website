import '../styles/CalendarStyle.css';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Box } from '@chakra-ui/react';
import { useData } from '../../DataContext';

// import 'react-calendar/dist/Calendar.css';
const CusCalendar = ({ stats }) => {
	const [value, onChange] = useState(new Date());
	const { bookings } = useData();

	// const bookedDates = bookings.map((booking) => {
	// 	return new Date(booking.Date);
	// });

	const bookedDates = bookings.map((booking) => {
		console.log(
			stats == booking.AmenityType && booking.Status == 'Confirmed'
		);
		if (stats == booking.AmenityType && booking.Status == 'Confirmed') {
			return new Date(booking.Date);
		} else {
			return new Date('02/26/1978');
		}
	});

	const tile = ({ date }) => {
		if (
			bookedDates.findIndex(
				(d) => d.toDateString() === date.toDateString()
			) !== -1
		) {
			return 'booked';
		}
	};

	const [dateClicked, setDateClicked] = useState(null);

	const onClickDay = (date) => {
		const currentDate = new Date(date);
		currentDate.setDate(currentDate.getDate());

		const year = currentDate.getFullYear();
		const month = String(currentDate.getMonth() + 1).padStart(2, '0');
		const day = String(currentDate.getDate()).padStart(2, '0');

		const formattedDate = `${year}-${month}-${day}`;
		setDateClicked(formattedDate);
	};

	const calendar = (
		<>
			<Box
				bgColor={'white.100'}
				w={'100%'}
				borderRadius={15}
			>
				<Calendar
					onChange={onChange}
					value={value}
					tileClassName={tile}
					onClickDay={onClickDay}
				/>
			</Box>
		</>
	);

	const date = dateClicked || new Date().toISOString().slice(0, 10);

	return { calendar, date };
};

export default CusCalendar;

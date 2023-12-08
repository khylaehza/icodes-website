import { useDisclosure, useToast } from '@chakra-ui/react';
import { ManningSchedForm } from '../../../forms';
import { CusEdit } from '../../../customs';

import { useFormik } from 'formik';

import { db } from '../../../../firebase-config';
import { updateDoc, serverTimestamp, doc } from 'firebase/firestore';
import moment from 'moment';
import { useData } from '../../../../DataContext';
const EditManningSched = ({
	data,
	id,
	mainCollection,
	tblDocUser,
	tblUserCol,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const { employees } = useData();

	const InputTimeFormat = (time) => {
		const timeParts = time.split(' ');
		const timeDigits = timeParts[0].split(':');
		let hours = Number(timeDigits[0]);
		const minutes = Number(timeDigits[1]);

		if (timeParts[1] === 'PM' && hours < 12) {
			hours += 12;
		} else if (timeParts[1] === 'AM' && hours === 12) {
			hours = 0;
		}

		const formattedHours = String(hours).padStart(2, '0');
		const formattedMinutes = String(minutes).padStart(2, '0');

		return `${formattedHours}:${formattedMinutes}`;
	};

	const editForm = useFormik({
		initialValues: {
			team: data.Team,
			location: data.Location,
			scheddate: data.SchedDate,
			timeStart: InputTimeFormat(data.TimeStart),
			timeEnd: InputTimeFormat(data.TimeEnd),
			task: data.Task,
		},

		enableReinitialize: true,
		onSubmit: (value, actions) => {
			const formatTime = (time) => {
				const parsedTime = moment(time, ['HH:mm', 'h:mm A']);
				return parsedTime.format('h:mm A');
			};

			const timeStart = formatTime(value.timeStart);
			const timeEnd = formatTime(value.timeEnd);

			try {
				const teams = employees
					.filter((employee) => employee.Team === value.team)
					.map(
						(employee) =>
							`${
								employee.FName.charAt(0).toUpperCase() +
								employee.FName.slice(1)
							} 
					 ${employee.MName.charAt(0).toUpperCase()} 
					 ${employee.LName.charAt(0).toUpperCase() + employee.LName.slice(1)}`
					);
				const docRef = doc(
					db,
					mainCollection,
					tblDocUser,
					tblUserCol,
					id
				);
				updateDoc(docRef, {
					EditedDate: serverTimestamp(),
					Team: value.team,
					Agent: teams,
					Location: value.location,
					SchedDate: value.scheddate,
					TimeStart: timeStart,
					TimeEnd: timeEnd,
					Task: value.task,
				});

				toast({
					title: `${value.team}'s Details Edited!`,
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error editing Team',
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
			}

			actions.resetForm();
			onClose();
		},
	});

	return (
		<CusEdit
			header={`Edit ${data.Team}'s details.`}
			isOpen={isOpen}
			onClose={onClose}
			onOpen={onOpen}
			component={
				<ManningSchedForm
					onClose={onClose}
					form={editForm}
					actionLabel={'Edit'}
				/>
			}
		/>
	);
};

export default EditManningSched;

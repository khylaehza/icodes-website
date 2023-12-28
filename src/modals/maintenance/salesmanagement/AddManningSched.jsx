import { CusModal } from '../../../customs';
import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { ManningSchedForm } from '../../../forms';
import { IdGenerator } from '../../../utilities';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { db } from '../../../../firebase-config';
import { collection, serverTimestamp, addDoc } from 'firebase/firestore';

import { useData } from '../../../../DataContext';
const AddManningSched = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { curUser, employees } = useData();
	const toast = useToast();
	const scheduleID = IdGenerator(6);
	const form = useFormik({
		initialValues: {
			team: '',
			location: '',
			scheddate: '',
			timeStart: '',
			timeEnd: '',
			task: '',
		},
		validationSchema: Yup.object({
			team: Yup.string().required('Team is required.'),
			location: Yup.string().required('Location is required.'),
			scheddate: Yup.string().required('Schedule date is required.'),
			timeStart: Yup.string().required('Time start is required.'),
			timeEnd: Yup.string().required('Time end is required.'),
		}),
		onSubmit: (value, actions) => {
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

				addDoc(
					collection(
						db,
						'maintenance',
						'salesmanagement',
						'tbl_manningSchedule'
					),
					{
						CreatedDate: serverTimestamp(),
						ScheduleID: scheduleID,
						Team: value.team,
						Agent: teams,
						Location: value.location,
						SchedDate: value.scheddate,
						TimeStart: value.timeStart,
						TimeEnd: value.timeEnd,
						Task: value.task,
						Status: 'Active',
					}
				);

				toast({
					title: 'New Schedule Added!',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error adding new Schedule',
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
				console.log(e);
			}
			actions.resetForm();
			onClose();
		},
	});

	return (
		<Flex>
			<CusModal
				header={'Fill the schedule details.'}
				component={<ManningSchedForm form={form} />}
				action={'+ Add Mannning Schedule'}
				isOpen={isOpen}
				onClose={onClose}
				onOpen={onOpen}
				form={form}
			/>
		</Flex>
	);
};

export default AddManningSched;

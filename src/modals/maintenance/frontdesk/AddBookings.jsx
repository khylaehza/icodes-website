import { CusModal } from '../../../customs';
import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { IdGenerator } from '../../../utilities';
import { useData } from '../../../../DataContext';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BookingsForm } from '../../../forms';
import { db } from '../../../../firebase-config';
import { collection, serverTimestamp, addDoc } from 'firebase/firestore';

const AddBookings = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { curUser } = useData();

	const toast = useToast();
	const bookingID = IdGenerator(6);
	const form = useFormik({
		initialValues: {
			tower: '',
			unitOwner: '',
			amenityType: '',
			date: '',
			numPerson: '',
			status: 'Approved',
			reason: '',
		},
		validationSchema: Yup.object({
			tower: Yup.string().required('Tower is required.'),
			unitOwner: Yup.string().required('Unit Owner is required. '),
			amenityType: Yup.string().required('Amenity is required. '),
			date: Yup.string().required('Date is required. '),
			numPerson: Yup.number().required('Number of Person is required. '),
		}),
		onSubmit: async (value, actions) => {
			try {
				await addDoc(
					collection(db, 'maintenance', 'frontdesk', 'tbl_bookings'),
					{
						CreatedDate: serverTimestamp(),
						BookingID: bookingID,
						TNum: value.tower,
						UnitOwner: value.unitOwner,
						AmenityType: value.amenityType,
						Date: value.date,
						NumPerson: value.numPerson,
						Status: value.status,
						Reason: value.reason,
					}
				);

				if (curUser) {
					await addDoc(
						collection(db, 'maintenance', 'admin', 'tbl_logs'),
						{
							CreatedDate: serverTimestamp(),
							Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) added a new booking.`,
							Module: 'Booking Amenities',
						}
					);
				}

				toast({
					title: 'New Booking Added!',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error adding new Booking',
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
				header={'Fill the booking details.'}
				component={<BookingsForm form={form} />}
				action={'+ Book Amenity'}
				isOpen={isOpen}
				onClose={onClose}
				onOpen={onOpen}
				justifyContent={'flex-start'}
				form={form}
			/>
		</Flex>
	);
};

export default AddBookings;

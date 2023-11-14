import CusModal from '../../../customs/CusSOAModal';
import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { IdGenerator } from '../../../utilities';
import { useData } from '../../../../DataContext';

import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { DiscountForm } from '../../../../forms';
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
			name: '',
			amenityType: '',
			date: '',
			numPerson: '',
			details: '',
			status: 'Confirmed',
		},
		validationSchema: Yup.object({
			dscName: Yup.string().required('Discount Name is required.'),
			discount: Yup.string().required(
				'Discount Amount/Percent is required. '
			),
		}),
		onSubmit: async (value, actions) => {
			try {
				await addDoc(
					collection(db, 'maintenance', 'admin', 'tbl_bookings'),
					{
						CreatedDate: serverTimestamp(),
						BookingID: bookingID,
						TNum: value.tower,
						Name: unitOwners,
						AmenityType: value.amenityType,
						Date: value.date,
						NumPerson: value.numPerson,

						Status: value.status,
					}
				);

				if (curUser) {
					await addDoc(
						collection(db, 'maintenance', 'admin', 'tbl_logs'),
						{
							CreatedDate: serverTimestamp(),
							Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) added a new discount.`,
							Module: 'Unit Amounts',
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
			}

			actions.resetForm();
			onClose();
		},
	});

	return (
		<Flex>
			{/* <CusModal
				header={'Fill the bookingd details.'}
				component={<DiscountForm form={form} />}
				action={'+ Discounts'}
				isOpen={isOpen}
				onClose={onClose}
				onOpen={onOpen}
				variant={'ghost'}
				color={'b.200'}
				justifyContent={'flex-start'}
				form={form}
			/> */}
		</Flex>
	);
};

export default AddBookings;

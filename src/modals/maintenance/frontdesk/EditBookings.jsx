import { useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { CusEdit } from '../../../customs';
import { BookingsForm } from '../../../forms';
import { useFormik } from 'formik';
import {
	updateDoc,
	serverTimestamp,
	doc,
	addDoc,
	collection,
} from 'firebase/firestore';
import { db } from '../../../../firebase-config';
import { useData } from '../../../../DataContext';

const EditBookings = ({ data, id, mainCollection, tblDocUser, tblUserCol }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const { curUser } = useData();

	const editForm = useFormik({
		initialValues: {
			tower: data.TNum,
			unitOwner: data.UnitOwner,
			amenityType: data.AmenityType,
			date: data.Date,
			numPerson: data.NumPerson,
			status: data.Status,
		},

		onSubmit: async (value, actions) => {
			const docRef = doc(db, mainCollection, tblDocUser, tblUserCol, id);
			try {
				await updateDoc(docRef, {
					EditedDate: serverTimestamp(),
					TNum: value.tower,
					UnitOwner: value.unitOwner,
					AmenityType: value.amenityType,
					Date: value.date,
					NumPerson: value.numPerson,
					Status: value.status,
				});

				if (curUser) {
					await addDoc(
						collection(db, 'maintenance', 'admin', 'tbl_logs'),
						{
							CreatedDate: serverTimestamp(),
							Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) edited Bookings details.`,
							Module: 'Booking Amenities',
						}
					);
				}

				toast({
					title: ' Booking Edited!',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error editing new Booking',
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
		<CusEdit
			header={`Edit Amenity Booking details.`}
			isOpen={isOpen}
			onClose={onClose}
			onOpen={onOpen}
			component={
				<BookingsForm
					form={editForm}
					value={data.amenityType}
				/>
			}
		/>
	);
};

export default EditBookings;

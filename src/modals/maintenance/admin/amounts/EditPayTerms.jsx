import { useDisclosure, useToast } from '@chakra-ui/react';
import { CusEdit } from '../../../../customs';
import { PaymentTermForm } from '../../../../forms';
import { useFormik } from 'formik';

import {
	updateDoc,
	serverTimestamp,
	doc,
	addDoc,
	collection,
} from 'firebase/firestore';
import { db } from '../../../../../firebase-config';
import { useData } from '../../../../../DataContext';
const EditPayTerms = ({ data, id, mainCollection, tblDocUser, tblUserCol }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const { curUser } = useData();
	const editForm = useFormik({
		initialValues: {
			paymentTypeFor: data.PaymentTypeFor,
			paymentTermName: data.PaymentTermName,
			reservationFee: data.ReservationFee,
			dpPercent: data.DPPercent,
			monthlyPercent: data.MonthlyPercent,
			noOfMonths: data.NoOfMonths,
			moveInFees: data.MoveInFees,
			otherChargePercent: data.OtherChargePercent,
		},
		enableReinitialize: true,
		onSubmit: async (value, actions) => {
			const docRef = doc(db, mainCollection, tblDocUser, tblUserCol, id);

			try {
				updateDoc(docRef, {
					EditedDate: serverTimestamp(),
					PaymentTypeFor: value.paymentTypeFor,
					PaymentTermName: value.paymentTermName,
					ReservationFee: value.reservationFee,
					DPPercent: value.dpPercent,
					MonthlyPercent: value.monthlyPercent,
					NoOfMonths: value.noOfMonths,
					MoveInFees: value.moveInFees,
					OtherChargePercent: value.otherChargePercent,
				});

				if (curUser) {
					await addDoc(
						collection(db, 'maintenance', 'admin', 'tbl_logs'),
						{
							CreatedDate: serverTimestamp(),
							Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) edited a payment term.`,
							Module: 'Unit Amounts',
						}
					);
				}

				toast({
					title: ' Payment Term Edited!',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error editing payment term',
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
			header={`Edit ${data.PaymentTermName}`}
			isOpen={isOpen}
			onClose={onClose}
			onOpen={onOpen}
			component={<PaymentTermForm form={editForm} />}
		/>
	);
};

export default EditPayTerms;

import { CusModal } from '../../../../customs';
import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { IdGenerator } from '../../../../utilities';
import { useData } from '../../../../../DataContext';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DiscountForm, PaymentTermForm } from '../../../../forms';
import { db } from '../../../../../firebase-config';
import { collection, serverTimestamp, addDoc } from 'firebase/firestore';

const AddPaymentTerms = ({
	header = 'payment term',
	action = 'Payment Term',
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { curUser } = useData();

	const toast = useToast();
	const paymentTermID = IdGenerator(6);

	const form = useFormik({
		initialValues: {
			paymentTypeFor: '',
			paymentTermName: '',
			reservationFee: '',
			dpPercent: '',
			monthlyPercent: '',
			noOfMonths: '',
			moveInFees: '',
			otherChargePercent: '',
		},
		validationSchema: Yup.object({
			paymentTypeFor: Yup.string().required(
				'Payment Term Type is required.'
			),
			paymentTermName: Yup.string().required(
				'Payment Term Name is required.'
			),
			reservationFee: Yup.string().required(
				'Reservation Amount is required.'
			),
			monthlyPercent: Yup.string().required(
				'Percent of TCP for Monthly Payment is required.'
			),
			noOfMonths: Yup.string().required('Number of months is required.'),
		}),
		onSubmit: async (value, actions) => {
			try {
				await addDoc(
					collection(db, 'maintenance', 'admin', 'tbl_payTerms'),
					{
						CreatedDate: serverTimestamp(),
						PayTermId: paymentTermID,
						PaymentTypeFor: value.paymentTypeFor,
						PaymentTermName: value.paymentTermName,
						ReservationFee: value.reservationFee,
						DPPercent: value.dpPercent,
						MonthlyPercent: value.monthlyPercent,
						NoOfMonths: value.noOfMonths,
						MoveInFees: value.moveInFees,
						OtherChargePercent: value.otherChargePercent,
					}
				);

				if (curUser) {
					await addDoc(
						collection(db, 'maintenance', 'admin', 'tbl_logs'),
						{
							CreatedDate: serverTimestamp(),
							Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) added a new payment terms.`,
							Module: 'Unit Amounts',
						}
					);
				}

				toast({
					title: 'New Payment Term Added!',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error adding new payment term',
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
			<CusModal
				header={`Fill the ${header} details.`}
				component={<PaymentTermForm form={form} />}
				action={`+ ${action}`}
				isOpen={isOpen}
				onClose={onClose}
				onOpen={onOpen}
				variant={'ghost'}
				color={'b.200'}
				justifyContent={'flex-start'}
				form={form}
			/>
		</Flex>
	);
};

export default AddPaymentTerms;

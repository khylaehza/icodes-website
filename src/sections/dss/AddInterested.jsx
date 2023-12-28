import { CusModal } from '../../customs';

import React, { useState } from 'react';
import { IdGenerator } from '../../utilities';
import { useDisclosure, Flex, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { db } from '../../../firebase-config';
import { collection, serverTimestamp, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { InterestedForm } from './index';
const AddInterested = ({ unit }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const pbID = IdGenerator(6);
	const toast = useToast();
	const navigate = useNavigate();

	const form = useFormik({
		initialValues: {
			lName: '',
			fName: '',
			mName: '',
			cNum: '',
			email: '',
			inquiry: '',
		},
		validationSchema: Yup.object({
			lName: Yup.string().required('Last Name is required.'),
			fName: Yup.string().required('First Name is required.'),
			cNum: Yup.string()
				.required('Contact Number is required.')
				.matches(/^[0-9]{9}$/, 'Invalid Contact Number.'),
			email: Yup.string()
				.required('Email is required.')
				.matches(
					/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/,
					'Invalid Email.'
				),
		}),
		onSubmit: (value, actions) => {
			addDoc(
				collection(
					db,
					'maintenance',
					'salesmanagement',
					'tbl_prosBuyers'
				),
				{
					CreatedDate: serverTimestamp(),
					BuyersID: pbID,
					LName: value.lName,
					MName: value.mName,
					FName: value.fName,
					CNum: value.cNum,
					Email: value.email,
					Inquiry: value.inquiry,
					Preference: unit,
					Type: 'From Online',
					Agent: 'N/A',
				}
			);

			toast({
				title: 'Inquiry submitted!',
				status: 'success',
				duration: 9000,
				isClosable: true,
			});

			actions.resetForm();
			onClose();
			navigate('/finder');
		},
	});

	return (
		<Flex>
			<CusModal
				header={`Inquiry for ${unit}.`}
				component={<InterestedForm form={form} />}
				action={'Interested'}
				isOpen={isOpen}
				onClose={onClose}
				onOpen={onOpen}
				variant={'primary'}
				color={'w.100'}
			/>
		</Flex>
	);
};

export default AddInterested;

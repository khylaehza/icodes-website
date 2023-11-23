import { CusModal } from '../../customs/index';

import React, { useState } from 'react';
import { IdGenerator } from '../../utilities';
import { useDisclosure, Flex, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { db } from '../../../firebase-config';
import {
	collection,
	updateDoc,
	doc,
	serverTimestamp,
	addDoc,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { InterestedForm } from './index'
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
            inquiry: ''
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
			const email = value.email;
			const lName = value.lName;
			const mName = value.mName;
			const fName = value.fName;
			const cNum = value.cNum;
            const inquiry = value.inquiry
			const docRef = addDoc(
				collection(db, 'maintenance', 'salesmanagement', 'tbl_prosBuyers'),
				{
                    CreatedDate: serverTimestamp(),
					BuyersID : pbID,
					LName: lName,
					MName: mName,
					FName: fName,
					CNum: cNum,
					Email: email,
					Inquiry: inquiry,
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
				component={
					<InterestedForm
						form={form}
						// setUnit={setUnit}
						// units={units}
					/>
				}
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

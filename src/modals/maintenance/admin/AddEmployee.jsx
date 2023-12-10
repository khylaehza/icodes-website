import { CusModal } from '../../../customs';
import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { EmployeesForm } from '../../../forms';
import { PasswordGenerator } from '../../../utilities';
import { useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { db } from '../../../../firebase-config';
import { collection, serverTimestamp, addDoc } from 'firebase/firestore';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import { useData } from '../../../../DataContext';
const AddEmployee = ({ employees }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { curUser } = useData();
	const [empPos, setEmpPos] = useState('');
	const pass = PasswordGenerator(6);
	const storage = getStorage();
	const toast = useToast();

	let posCode = '';
	switch (empPos) {
		case 'Admin':
			posCode = 'AD';
			break;
		case 'Property Management':
			posCode = 'PM';
			break;
		case 'Front Desk':
			posCode = 'FD';
			break;
		case 'Sales Management':
			posCode = 'SM';
			break;
		case 'Agent':
			posCode = 'AG';
			break;
		case 'Accounting Management':
			posCode = 'AM';
			break;
		default:
			posCode = '';
	}

	const form = useFormik({
		initialValues: {
			lName: '',
			fName: '',
			mName: '',
			cNum: '',
			email: '',
			empId: '',
			empPos: '',
			dStart: '',
			image: '',
			status: true,
		},
		validationSchema: Yup.object({
			image: Yup.mixed()
				.required("Employee's Image is required.")
				.test(
					'FILE_SIZE',
					'File size is too big.',
					(value) => value && value.size < 1024 * 1024
				)
				.test(
					'FILE_TYPE',
					'Invalid File Type.',
					(value) =>
						value &&
						['image/png', 'image/jpeg', 'image/jpg'].includes(
							value.type
						)
				),
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
			empPos: Yup.string().required('Position is required.'),
			empId: Yup.string()
				.required('Employee ID is required.'),
				// .matches(/^[0-9]{6}$/, 'Employee ID must be exactly 6 digits.'),
			dStart: Yup.string().required('Date Start is required.'),
		}),
		onSubmit: (value, actions) => {
			const empId = value.empId;
			const storageRef = ref(
				storage,
				`admin/employees/${empId}/profile.png`
			);
			const uName = posCode + '_' + empId;

			const uploadTask = uploadBytesResumable(storageRef, value.image);

			const isDuplicate =
				employees.filter((data) => {
					return data.EmpId == empId;
				}).length > 0;

			if (!isDuplicate) {
				try {
					uploadTask.on(
						'state_changed',
						(snapshot) => {
							const progress =
								(snapshot.bytesTransferred /
									snapshot.totalBytes) *
								100;
							switch (snapshot.state) {
								case 'paused':
									console.log('Upload is paused');
									break;
								case 'running':
									console.log('Upload is running');
									break;
							}
						},
						(error) => {
							console.log(error);
						},
						() => {
							getDownloadURL(uploadTask.snapshot.ref).then(
								async (downloadURL) => {
									await addDoc(
										collection(
											db,
											'maintenance',
											'admin',
											'tbl_employees'
										),
										{
											LName: value.lName,
											MName: value.mName,
											FName: value.fName,
											CNum: value.cNum,
											UName: uName,
											EmpPos: empPos,
											EmpId: empId,
											DStart: value.dStart,
											CreatedDate: serverTimestamp(),
											Image: downloadURL,
											Email: value.email,
											Password: pass,
											Status: true,
										}
									);

									if (curUser) {
										await addDoc(
											collection(
												db,
												'maintenance',
												'admin',
												'tbl_logs'
											),
											{
												CreatedDate: serverTimestamp(),
												Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) added a new employee.`,
												Module: 'Employees',
											}
										);
									}

									toast({
										title: 'New Employee Added!',
										description: `${value.fName}'s username is ${uName}. Password is ${pass}. `,
										status: 'success',
										duration: 15000,
										isClosable: true,
									});
								}
							);
						}
					);
				} catch (error) {
					toast({
						title: 'Error adding new employee',
						status: 'error',
						duration: 9000,
						isClosable: true,
					});
				}
			} else {
				toast({
					title: 'Employee ID already exist.',
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
				header={'Fill the employee details.'}
				component={
					<EmployeesForm
						form={form}
						setEmpPos={setEmpPos}
						empPos={empPos}
					/>
				}
				action={'+ Add Employee'}
				isOpen={isOpen}
				onClose={onClose}
				onOpen={onOpen}
				form={form}
			/>
		</Flex>
	);
};

export default AddEmployee;

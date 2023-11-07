import { useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { CusEdit } from '../../../customs';
import { EmployeesForm } from '../../../forms';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	updateDoc,
	serverTimestamp,
	doc,
	addDoc,
	collection,
} from 'firebase/firestore';
import { db } from '../../../../firebase-config';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
	getMetadata,
} from 'firebase/storage';
import { useData } from '../../../../DataContext';
const EditEmployee = ({ data, id, mainCollection, tblDocUser, tblUserCol }) => {
	const { curUser } = useData();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [empPos, setEmpPos] = useState('');
	const [imgFileName, setImgFileName] = useState('');
	const toast = useToast();
	const imgRef = getStorage();
	const imgName = ref(imgRef, `admin/employees/${data.EmpId}/profile.png`);
	getMetadata(imgName).then((metadata) => {
		const fileName = metadata.name;
		setImgFileName(fileName);
	});

	let posCode = '';
	const position = empPos !== '' ? empPos : data.EmpPos;

	switch (position) {
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
			break;
	}

	const editForm = useFormik({
		initialValues: {
			lName: data.LName,
			fName: data.FName,
			mName: data.MName,
			cNum: data.CNum,
			email: data.Email,
			empId: data.EmpId,
			empPos: data.EmpPos,
			dStart: data.DStart,
			image: data.Image,
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			cNum: Yup.string().matches(/^[0-9]{9}$/, 'Invalid Contact Number.'),
			email: Yup.string().matches(
				/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/,
				'Invalid Email.'
			),
		}),
		onSubmit: async (value, actions) => {
			const empId = value.empId;

			const docRef = doc(db, mainCollection, tblDocUser, tblUserCol, id);

			try {
				updateDoc(docRef, {
					EditedDate: serverTimestamp(),
					LName: value.lName,
					MName: value.mName,
					FName: value.fName,
					CNum: value.cNum,
					UName: posCode + '_' + empId,
					EmpPos: value.empPos,
					EmpId: empId,
					DStart: value.dStart,
					Email: value.email,
				});

				if (curUser) {
					await addDoc(
						collection(db, 'maintenance', 'admin', 'tbl_logs'),
						{
							CreatedDate: serverTimestamp(),
							Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) edited employee.`,
							Module: 'Employees',
						}
					);
				}

				toast({
					title: `${value.fName}'s Details Edited!`,
					status: 'success',
					duration: 3000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Edited failed!',
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
				console.log(e);
			}

			const storage = getStorage();
			const storageRef = ref(
				storage,
				`admin/employees/${empId}/profile.png`
			);

			if (data.Image !== value.image) {
				try {
					const uploadTask = uploadBytesResumable(
						storageRef,
						value.image
					);

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
								default:
									console.log('Uploaded');
							}
						},
						(error) => {
							console.log(error);
						},
						() => {
							getDownloadURL(uploadTask.snapshot.ref).then(
								(downloadURL) => {
									try {
										updateDoc(docRef, {
											Image: downloadURL,
										});
									} catch (e) {
										toast({
											title: 'Edited failed!',
											status: 'error',
											duration: 9000,
											isClosable: true,
										});
										console.log(e);
									}
								}
							);
						}
					);
				} catch (e) {
					console.log(e);
				}
			}

			actions.resetForm();
			onClose();
		},
	});
	return (
		<CusEdit
			header={`Edit ${data.FName}'s details.`}
			isOpen={isOpen}
			onClose={onClose}
			onOpen={onOpen}
			component={
				<EmployeesForm
					onClose={onClose}
					form={editForm}
					setEmpPos={setEmpPos}
					emPos={editForm.values.empPos}
					actionLabel={'Edit'}
					imgValue={imgFileName}
				/>
			}
		/>
	);
};

export default EditEmployee;

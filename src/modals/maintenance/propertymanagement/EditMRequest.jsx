import { useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { CusEdit } from '../../../customs';
import { MaintenanceForm } from '../../../forms';
import { useFormik } from 'formik';
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

const EditMRequest = ({ data, id, mainCollection, tblDocUser, tblUserCol }) => {
	const { curUser } = useData();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const storage = getStorage();
	const toast = useToast();

	const editForm = useFormik({
		initialValues: {
			units: data.Unit,
			createddate: data.CreatedDate,
			repairType: data.RepairType,
			requestImg: data.RequestImg,
			details: data.Details,
			status: data.Status,
			others: data.Others,
		},
		enableReinitialize: true,
		onSubmit: async (value, actions) => {
			const docRef = doc(db, mainCollection, tblDocUser, tblUserCol, id);
			const imgs = value.requestImg;
			const folderPath = `maintenance/propertymanagement/mrequest/${data.MRequestID}`;
			const storageRef = (imageName, ext) =>
				ref(storage, `${folderPath}/${imageName}.${ext}`);

			try {
				updateDoc(docRef, {
					EditedDate: serverTimestamp(),
					Unit: value.units,
					CreatedDate: value.createddate,
					RepairType: value.repairType,
					Details: value.details,
					Status: value.status,
				});

				if (
					data.RequestImg.toString() !== value.requestImg.toString()
				) {
					try {
						const uploadTasks = Object.keys(imgs).map(
							async (element, key) => {
								const uploadTask = uploadBytesResumable(
									storageRef(key, 'jpg'),
									imgs[element]
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
												console.log(
													'Upload is running'
												);
												break;
										}
									},
									(error) => {
										toast({
											title: 'Error during upload',
											status: 'error',
											duration: 9000,
											isClosable: true,
										});
										console.error(error);
									}
								);

								return uploadTask;
							}
						);

						const completedUploads = await Promise.all(uploadTasks);

						const downloadURLs = await Promise.all(
							completedUploads.map((uploadTask) =>
								getDownloadURL(uploadTask.ref)
							)
						);

						updateDoc(docRef, {
							RequestImg: downloadURLs,
						});
					} catch (e) {
						toast({
							title: 'Edited failed!',
							status: 'error',
							duration: 9000,
							isClosable: true,
						});
					}
				}

				toast({
					title: `${data.MRequestID}'s Details Edited!`,
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error editing Maintenance Request',
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
			}

			if (curUser) {
				await addDoc(
					collection(db, 'maintenance', 'admin', 'tbl_logs'),
					{
						CreatedDate: serverTimestamp(),
						Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) edited Maintenance Request.`,
						Module: 'Maintenance Request',
					}
				);
			}

			actions.resetForm();
			onClose();
		},
	});

	const onCloseModal = () => {
		editForm.resetForm();
		onClose();
	};

	return (
		<CusEdit
			header={`Edit Maintenance Request details.`}
			isOpen={isOpen}
			onClose={onCloseModal}
			onOpen={onOpen}
			component={
				<MaintenanceForm
					form={editForm}
					actionLabel={'Edit'}
					imageFiles={data.RequestImg.length}
				/>
			}
		/>
	);
};

export default EditMRequest;

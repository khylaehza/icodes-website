import { CusModal } from '../../../customs';
import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { AnnouncementForm } from '../../../forms';
import { IdGenerator } from '../../../utilities';
import { useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useData } from '../../../../DataContext';
import { db } from '../../../../firebase-config';
import { collection, serverTimestamp, addDoc } from 'firebase/firestore';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';

const AddAnncmnts = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const storage = getStorage();
	const toast = useToast();
	const anncmntID = IdGenerator(6);
	const { curUser } = useData();

	const ancOption = [];
	const [option, setOptions] = useState([]);
	option.map((e) => {
		ancOption.push(e.value);
	});
	const formattedOptions = ancOption.map((option) => `${option}`).join(', ');
	const form = useFormik({
		initialValues: {
			// units: '',
			towers: '',
			purpose: '',
			description: '',
			anncmntImg: '',
			author: '',
		},
		//validationSchema: Yup.object({
		// 	towers: Yup.mixed().required(
		// 		'Subject for announcement is required.'
		// 	),
		// 	purpose: Yup.string().required('Type is required.'),
		// 	description: Yup.string().required('Description is required.'),
		// 	author: Yup.string().required('Author is required.'),
		// 	anncmntImg: Yup.mixed()
		// 		.required('Image/File is required.')
		// 		.test(
		// 			'FILE_TYPE',
		// 			'Invalid File Type.',
		// 			(value) =>
		// 				value &&
		// 				[
		// 					'image/png',
		// 					'image/jpeg',
		// 					'image/jpg',
		// 					'application/pdf',
		// 				].includes(value.type)
		// 		),
		// 	status: Yup.string().required('Status is required.'),
		// }),
		onSubmit: (value, actions) => {
			const storageRef = ref(
				storage,
				`maintenance/pm/anncmnts/${anncmntID}/anncmnts.png`
			);
			const uploadTask = uploadBytesResumable(
				storageRef,
				value.anncmntImg
			);
			try {
				uploadTask.on(
					'state_changed',
					(snapshot) => {
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) *
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
								const docRef = await addDoc(
									collection(
										db,
										'maintenance',
										'propertymanagement',
										'tbl_announcements'
									),
									{
										AnncmntID: anncmntID,
										For: formattedOptions,
										CreatedDate: serverTimestamp(),
										AnncmntImg: downloadURL,
										Purpose: value.purpose,
										Description: value.description,
										Author: value.author,
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
											Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) added a new announcement.`,
											Module: 'Announcement',
										}
									);
								}

								toast({
									title: 'New Announcement Added!',
									status: 'success',
									duration: 9000,
									isClosable: true,
								});
							}
						);
					}
				);
			} catch (e) {
				toast({
					title: 'Error adding new Announcement',
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
				console.log(e);
			}
			actions.resetForm();
			setOptions([]);
			onClose();
		},
	});

	const onCloseModal = () => {
		form.resetForm();
		setOptions([]);
		onClose();
	};

	return (
		<Flex>
			<CusModal
				header={'Fill the Announcement details.'}
				component={
					<AnnouncementForm
						form={form}
						options={option}
						setOptions={setOptions}
					/>
				}
				action={'+ Add Announcement'}
				isOpen={isOpen}
				onClose={onCloseModal}
				onOpen={onOpen}
				form={form}
			/>
		</Flex>
	);
};

export default AddAnncmnts;

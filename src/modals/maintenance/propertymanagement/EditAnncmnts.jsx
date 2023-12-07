import { useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { CusEdit } from '../../../customs';
import { AnnouncementForm } from '../../../forms';
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

const EditAnncmnts = ({ data, id, mainCollection, tblDocUser, tblUserCol }) => {
	const { curUser } = useData();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [imgFileName, setImgFileName] = useState('');
	const storage = getStorage();
	const toast = useToast();
	const imgName = ref(
		storage,
		`maintenance/propertymanagement/anncmnts/${data.AnncmntID}/anncmnts.png`
	);

	const ancOption = [];
	const [option, setOptions] = useState([
		{ label: data.For.toString(), value: data.For.toString() },
	]);
	option.map((e) => {
		ancOption.push(e.value);
	});

	getMetadata(imgName).then((metadata) => {
		const fileName = metadata.name;
		setImgFileName(fileName);
	});

	const formattedOptions = ancOption.map((option) => `'${option}'`).join(',');
	const editForm = useFormik({
		initialValues: {
			for: data.For,
			anncmntImg: data.AnncmntImg,
			purpose: data.Purpose,
			description: data.Description,
			author: data.Author,
			subject: data.Subject,
		},
		enableReinitialize: true,
		onSubmit: async (value, actions) => {
			const docRef = doc(db, mainCollection, tblDocUser, tblUserCol, id);
			const image = value.anncmntImg;

			try {
				updateDoc(docRef, {
					editedDate: serverTimestamp(),
					For: formattedOptions,
					Purpose: value.purpose,
					Description: value.description,
					Author: value.author,
					Subject: value.subject,
				});

				toast({
					title: `${data.AnncmntID}'s Details Edited!`,
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error editing Announcement',
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
			}

			if (data.AnncmntImg !== image) {
				try {
					const uploadTask = uploadBytesResumable(imgName, image);

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
											AnncmntImg: downloadURL,
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
				} catch {
					toast({
						title: 'Edited failed!',
						status: 'error',
						duration: 9000,
						isClosable: true,
					});
				}
			}

			if (curUser) {
				await addDoc(
					collection(db, 'maintenance', 'admin', 'tbl_logs'),
					{
						CreatedDate: serverTimestamp(),
						Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) edited announcement.`,
						Module: 'Announcement',
					}
				);
			}

			actions.resetForm();
			onClose();
		},
	});

	const onCloseModal = () => {
		editForm.resetForm();
		setOptions([]);
		onClose();
	};

	return (
		<CusEdit
			header={`Edit ${data.AnncmntID}'s details.`}
			isOpen={isOpen}
			onClose={onCloseModal}
			onOpen={onOpen}
			component={
				<AnnouncementForm
					form={editForm}
					actionLabel={'Edit'}
					options={option}
					setOptions={setOptions}
					imgFileName={imgFileName}
				/>
			}
		/>
	);
};

export default EditAnncmnts;

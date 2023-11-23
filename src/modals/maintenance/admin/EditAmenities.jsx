import { useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { CusEdit } from '../../../customs';
import { AmenitiesForm } from '../../../forms';

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
const EditAmenities = ({
	data,
	id,
	mainCollection,
	tblDocUser,
	tblUserCol,
}) => {
	const { curUser } = useData();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [imgFileName, setImgFileName] = useState('');
	const storage = getStorage();
	const toast = useToast();
	const imgName = ref(
		storage,
		`admin/amenities/${data.AmenityID}/profile.png`
	);

	const [doSentences, setDoSentences] = useState([]);
	const [dontSentences, setDontSentences] = useState([]);

	const newDo = [];
	const newDont = [];

	doSentences.forEach((sentence) => {
		newDo.push(sentence.replace(/\n/g, ''));
	});

	dontSentences.forEach((sentence) => {
		newDont.push(sentence.replace(/\n/g, ''));
	});

	getMetadata(imgName).then((metadata) => {
		const fileName = metadata.name;
		setImgFileName(fileName);
	});

	const editForm = useFormik({
		initialValues: {
			ameImage: data.AmenityImg,
			ameName: data.AmenityName,
			capacity: data.Capacity,
			ameDesc: data.Description,
			tower: data.TNum,
			Do: data.DoPolicy,
			Dont: data.DontPolicy,
		},
		enableReinitialize: true,
		onSubmit: async (value, actions) => {
			const docRef = doc(db, mainCollection, tblDocUser, tblUserCol, id);
			const image = value.ameImage;
			const Do = newDo !== '' ? value.Do : newDo;
			const Dont = newDont !== '' ? value.Dont : newDont;
			try {
				updateDoc(docRef, {
					editedDate: serverTimestamp(),
					AmenityName: value.ameName,
					Capacity: value.capacity,
					Description: value.ameDesc,
					TNum: value.tower,
					DoPolicy: Do,
					DontPolicy: Dont,
				});

				toast({
					title: `${value.ameName}'s Details Edited!`,
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error editing amenity',
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
			}

			if (data.AmenityImg !== image) {
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
											AmenityImg: downloadURL,
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
						Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) edited amenities.`,
						Module: 'Amenities',
					}
				);
			}
			actions.resetForm();
			onClose();
		},
	});

	return (
		<CusEdit
			header={`Edit ${data.AmenityName}'s details.`}
			isOpen={isOpen}
			onClose={onClose}
			onOpen={onOpen}
			form={editForm}
			component={
				<AmenitiesForm
					onClose={onClose}
					form={editForm}
					actionLabel={'Edit'}
					imgFileName={imgFileName}
					doSentences={doSentences}
					setDoSentences={setDoSentences}
					dontSentences={dontSentences}
					setDontSentences={setDontSentences}
				/>
			}
		/>
	);
};

export default EditAmenities;

import { CusModal } from '../../../customs';
import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { AmenitiesForm } from '../../../forms';
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

const AddAmenities = () => {
	const newDo = [];
	const newDont = [];
	const { isOpen, onOpen, onClose } = useDisclosure();
	const amntyId = IdGenerator(6);
	const storage = getStorage();
	const toast = useToast();
	const { curUser } = useData();

	const [doSentences, setDoSentences] = useState([]);
	const [dontSentences, setDontSentences] = useState([]);
	doSentences.forEach((sentence) => {
		newDo.push(sentence.replace(/\n/g, ''));
	});

	dontSentences.forEach((sentence) => {
		newDont.push(sentence.replace(/\n/g, ''));
	});

	const form = useFormik({
		initialValues: {
			ameImage: '',
			ameName: '',
			capacity: '',
			ameDesc: '',
			tower: '',
			Status: '',
			Do: [],
			Dont: [],
		},
		validationSchema: Yup.object({
			ameImage: Yup.string().required('Amenity image is required.'),
			ameName: Yup.string().required('Name is required.'),
			tower: Yup.string().required('Tower number is required.'),
			capacity: Yup.string().required('Capacity is required.'),
			ameDesc: Yup.string().required('Description is required.'),
		}),
		onSubmit: (value, actions) => {
			const storageRef = ref(
				storage,
				`admin/amenities/${amntyId}/profile.png`
			);
			const uploadTask = uploadBytesResumable(storageRef, value.ameImage);

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
								await addDoc(
									collection(
										db,
										'maintenance',
										'admin',
										'tbl_amenities'
									),
									{
										CreatedDate: serverTimestamp(),
										AmenityID: amntyId,
										AmenityName: value.ameName,
										Capacity: value.capacity,
										Description: value.ameDesc,
										TNum: value.tower,
										AmenityImg: downloadURL,
										DoPolicy: newDo,
										DontPolicy: newDont,
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
											Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) added a new amenity.`,
											Module: 'Amenities',
										}
									);
								}

								toast({
									title: 'New Amenity Added!',
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
					title: 'Error adding new amenity',
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
			}

			actions.resetForm();
			onClose();
			setDoSentences([]);
			setDontSentences([]);
		},
	});

	const onCloseModal = () => {
		form.resetForm();
		setDoSentences([]);
		setDontSentences([]);
		onClose();
	};
	return (
		<Flex>
			<CusModal
				header={'Fill the employee details.'}
				component={
					<AmenitiesForm
						form={form}
						doSentences={doSentences}
						setDoSentences={setDoSentences}
						dontSentences={dontSentences}
						setDontSentences={setDontSentences}
					/>
				}
				action={'+ Add Amenities'}
				isOpen={isOpen}
				onClose={onCloseModal}
				onOpen={onOpen}
				form={form}
			/>
		</Flex>
	);
};

export default AddAmenities;

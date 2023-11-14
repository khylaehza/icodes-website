import { useState } from 'react';
import { useDisclosure, useToast, Stack, Button } from '@chakra-ui/react';
import { CusEdit } from '../../../customs';

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
import { TowerInfoForm } from '../../../forms';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
	getMetadata,
} from 'firebase/storage';
import moment from 'moment';
import { useData } from '../../../../DataContext';
const EditTower = ({ data, id, mainCollection, tblDocUser, tblUserCol }) => {
	const toast = useToast();
	const { curUser } = useData();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [tower, setTower] = useState();
	const [floorNum, setFloorNum] = useState(0);
	const [showImage, setShowImage] = useState(data.TowerImg);
	const [imgFileName, setImgFileName] = useState('');

	const storage = getStorage();
	[];
	const imgName = ref(storage, `admin/tower/${data.TowerID}/image.png`);

	getMetadata(imgName).then((metadata) => {
		const fileName = metadata.name;
		setImgFileName(fileName);
	});

	const infoForm = useFormik({
		initialValues: {
			tower: data.TowerNum,
			towerDesc: data.TowerDesc,
			parkQuan: Number(data.ParkQuan),
			floorQuan: Number(data.FloorQuan),
			towerImg: data.TowerImg,
			launchDate: data.LaunchDate,
			completeDate: data.CompleteDate,
		},
		enableReinitialize: true,
		validationSchema: Yup.object({}),
		onSubmit: async (values) => {
			const image = infoForm.values.towerImg;

			const docRef = doc(db, mainCollection, tblDocUser, tblUserCol, id);
			try {
				updateDoc(docRef, {
					EditedDate: serverTimestamp(),
					TowerName:
						'Tower ' +
						infoForm.values.tower +
						' (T' +
						infoForm.values.tower +
						')',
					Tower: '00' + infoForm.values.tower,
					TowerDesc: infoForm.values.towerDesc,
					LaunchDate: infoForm.values.launchDate,
					Status:
						moment(infoForm.values.completeDate) - moment() > 1
							? 'Pre-Selling'
							: 'Ready for Occupancy',
				});

				toast({
					title: `${data.TowerName}'s Details Edited!`,
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

			if (data.TowerImg !== image) {
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
											TowerImg: downloadURL,
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

					if (curUser) {
						await addDoc(
							collection(db, 'maintenance', 'admin', 'tbl_logs'),
							{
								CreatedDate: serverTimestamp(),
								Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) edited tower.`,
								Module: 'Towers',
							}
						);
					}
				} catch (e) {
					console.log(e);
				}
			}

			onClose();
		},
	});

	return (
		<CusEdit
			header={`Edit Tower ${infoForm.values.tower}'s details.`}
			isOpen={isOpen}
			onClose={onClose}
			onOpen={onOpen}
			component={
				<Stack>
					<TowerInfoForm
						form={infoForm}
						imgFileName={imgFileName}
						setFloorNum={setFloorNum}
						setTower={setTower}
						setShowImage={setShowImage}
						showImage={showImage}
					/>
					<Stack
						direction={['column', 'row']}
						justify={'flex-end'}
					>
						<Button
							variant={'primary'}
							onClick={infoForm.handleSubmit}
						>
							Save
						</Button>
					</Stack>
				</Stack>
			}
		/>
	);
};

export default EditTower;

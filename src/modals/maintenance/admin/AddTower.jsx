import React, { useState } from 'react';
import { CusModal } from '../../../customs';
import { TowersForm } from '../../../forms';
import { useDisclosure, Flex, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import { useData } from '../../../../DataContext';

import { db } from '../../../../firebase-config';
import { collection, serverTimestamp, addDoc } from 'firebase/firestore';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';

const AddTower = ({ towers }) => {
	const { curUser } = useData();
	const toast = useToast();
	const storage = getStorage();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [tower, setTower] = useState();
	const [floorNum, setFloorNum] = useState(0);
	const [showImage, setShowImage] = useState('');

	const newFloor = {};
	const half = Math.round(floorNum / 2) + 1;
	const infoForm = useFormik({
		initialValues: {
			towerImg: '',
			tower: '',
			towerDesc: '',
			floorQuan: '',
			parkQuan: 0,
			launchDate: '',
			completeDate: '',
			category: {},
		},
		validationSchema: Yup.object({
			floorQuan: Yup.number()
				.required('Floor Quantity is required.')

				.max(100, 'Floor is to high'),
			towerImg: Yup.mixed()
				.required('Tower Image is required.')
				.test(
					'FILE_SIZE',
					'Too Big!',
					(value) => value && value.size < 1024 * 1024
				)
				.test(
					'FILE_TYPE',
					'Invalid File Type!',
					(value) =>
						value &&
						['image/png', 'image/jpeg', 'image/jpg'].includes(
							value.type
						)
				),
			tower: Yup.string()
				.required('Tower Number is required.')
				.max(9, 'Tower must not exceed to 9.'),
			towerDesc: Yup.string().required('Tower Description is required.'),
			launchDate: Yup.string().required('Launch Date is required.'),
			completeDate: Yup.string().required('Complete Date is required.'),
		}),
		onSubmit: (values) => {
			handleNext();
		},
	});

	const unitPerFloorForm = useFormik({
		initialValues: {
			0: '',
		},

		onSubmit: (values, actions) => {
			Object.entries(values).forEach(([key]) => {
				let nx = [];

				if (key != 0 && values[key] != 0) {
					let flrNo = key.length === 1 ? `0${key}` : `${key}`;

					for (let x = 1; x <= values[key]; x++) {
						let unNo = x.toString().length === 1 ? `0${x}` : `${x}`;

						nx.push({
							name: `T${tower} - ${flrNo}${unNo}`,
							floor: flrNo,
							no: unNo,
							typeName: '------',
							typeSize: '------',
							tower: `T${tower}`,
							status: 'Pending Details',
							category:
								key < half ? { 1: 'lower' } : { 1: 'higher' },
						});
					}

					const result = nx.reduce(
						(obj, cur) => ({ ...obj, [cur.no]: cur }),
						{}
					);

					Object.assign(newFloor, {
						[flrNo]: result,
					});
				}
			});
			actions.resetForm();
			handleFormSubmit();
		},
	});

	const handleFormSubmit = (actions) => {
		const storageRef = ref(
			storage,
			`admin/tower/00${infoForm.values.tower}/image.png`
		);
		const uploadTask = uploadBytesResumable(
			storageRef,
			infoForm.values.towerImg
		);

		const isDuplicate =
			towers.filter((data) => {
				return Number(data.TowerNum) == tower;
			}).length > 0;

		if (!isDuplicate) {
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
										'tbl_towers'
									),
									{
										CreatedDate: serverTimestamp(),
										TowerName:
											'Tower ' +
											infoForm.values.tower +
											' (T' +
											infoForm.values.tower +
											')',
										TowerNum: infoForm.values.tower,
										TowerID: '00' + infoForm.values.tower,
										TowerDesc: infoForm.values.towerDesc,
										LaunchDate: infoForm.values.launchDate,
										CompleteDate:
											infoForm.values.completeDate,
										Units: newFloor,
										ParkQuan: infoForm.values.parkQuan,
										FloorQuan: infoForm.values.floorQuan,
										TowerImg: downloadURL,
										Status:
											moment(
												infoForm.values.completeDate
											) -
												moment() >
											1
												? 'Pre-Selling'
												: 'Ready for Occupancy',
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
											Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) added a new tower.`,
											Module: 'Towers',
										}
									);
								}
								toast({
									title: 'New Tower Added!',
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
					title: 'Error adding new tower',
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
			}
		} else {
			toast({
				title: 'Tower Number already exist.',
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		}
		setShowImage('');
		infoForm.resetForm();
		unitPerFloorForm.resetForm();
		setActiveStep(0);
		onClose();
	};

	const [activeStep, setActiveStep] = useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const onCloseModal = () => {
		onClose();
		infoForm.resetForm();
		unitPerFloorForm.resetForm();
		setShowImage('');
		setActiveStep(0);
	};
	return (
		<Flex>
			<CusModal
				header={'Fill the tower details.'}
				component={
					<TowersForm
						onClose={onClose}
						activeStep={activeStep}
						handleBack={handleBack}
						handleNext={handleNext}
						infoForm={infoForm}
						setTower={setTower}
						setShowImage={setShowImage}
						showImage={showImage}
						setFloorNum={setFloorNum}
						unitPerFloorForm={unitPerFloorForm}
						floorNum={floorNum}
					/>
				}
				action={'+ Add Tower'}
				isOpen={isOpen}
				onClose={onCloseModal}
				onOpen={onOpen}
				form={infoForm}
			/>
		</Flex>
	);
};

export default AddTower;

import { CusModal } from '../../../customs';
import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { UnitOwnerForm } from '../../../forms';
import { PasswordGenerator, IdGenerator } from '../../../utilities';
import { useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { db } from '../../../../firebase-config';
import {
	collection,
	serverTimestamp,
	addDoc,
	doc,
	updateDoc,
} from 'firebase/firestore';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';

import { useData } from '../../../../DataContext';
const AddUnitOwner = () => {
	const { curUser, unitTowerID, units } = useData();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const storage = getStorage();
	const fileData = '';

	const [unit, setUnit] = useState([]);
	const acqUnit = [];
	unit.map((e) => {
		acqUnit.push(e.value);
	});

	const t = [];
	function TowerIdentifier(towers) {
		const towerLength = Object.keys(unitTowerID).length;
		let id;

		for (let y = 0; y < towerLength; y++) {
			const e = unitTowerID[y];

			Object.keys(e).map(function (k) {
				const nest = e[k];

				Object.keys(nest).map((x) => {
					if (nest[x].tower === towers) {
						id = e.id;
						if (!t.includes(towers)) {
							t.push(towers);
						}
					}
				});
			});
		}
		return id;
	}

	const [showImage, setShowImage] = useState('');
	const reqForm = useFormik({
		initialValues: {
			lName: '',
			fName: '',
			mName: '',
			unOwnerImg: '',
			dp: '',
			cert: '',
			income: '',
			billing: '',
			tin: '',
			id1: '',
			id2: '',
		},
		validationSchema: Yup.object({
			unOwnerImg: Yup.mixed()
				.required("Unit Owner's Image is required.")
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

			cert: Yup.mixed().required(
				'Birth/Marriage Certificate is required.'
			),
			income: Yup.mixed().required('Income is required.'),
			billing: Yup.mixed().required('Billing is required.'),
			tin: Yup.mixed().required('TIN is required.'),
			id1: Yup.mixed().required('Valid ID is required.'),
			id2: Yup.mixed().required('Valid ID is required.'),
		}),
		onSubmit: (values, actions) => {
			handleNext();
		},
	});

	// info

	const ownerInfoForm = useFormik({
		initialValues: {
			units: '',
			email: '',
			cNum: '',
		},
		validationSchema: Yup.object({
			cNum: Yup.string()
				.required('Contact Number is required.')
				.matches(/^[0-9]{9}$/, 'Invalid Contact Number.'),
			email: Yup.string()
				.required('Email is required.')
				.matches(
					/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/,
					'Invalid Email.'
				),
			units: Yup.mixed().required('Unit is required.'),
		}),
		onSubmit: (values, actions) => {
			actions.resetForm();
			handleFormSubmit();
		},
	});

	const [activeStep, setActiveStep] = useState(0);

	const handleFormSubmit = async () => {
		onClose();
		const uid = IdGenerator();
		const pw = PasswordGenerator(6);
		const uName = `Owner_${uid}`;
		const fName = reqForm.values.fName;

		const folderPath = `admin/unitOwners/${uid}`;
		const storageRef = (imageName) =>
			ref(storage, `${folderPath}/${imageName}.png`);

		try {
			const uploadTasks = [
				uploadBytesResumable(
					storageRef('profile'),
					reqForm.values.unOwnerImg
				),

				uploadBytesResumable(storageRef('cert'), reqForm.values.cert),
				uploadBytesResumable(
					storageRef('income'),
					reqForm.values.income
				),
				uploadBytesResumable(
					storageRef('billing'),
					reqForm.values.billing
				),
				uploadBytesResumable(storageRef('tin'), reqForm.values.tin),
				uploadBytesResumable(storageRef('id1'), reqForm.values.id1),
				uploadBytesResumable(storageRef('id2'), reqForm.values.id2),
			];
			const uploadSnapshots = await Promise.all(
				uploadTasks.map(
					(task) =>
						new Promise((resolve, reject) => {
							task.on(
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
								(error) => reject(error),
								() => resolve(task.snapshot)
							);
						})
				)
			);

			const downloadURLs = await Promise.all(
				uploadSnapshots.map((snapshot) => getDownloadURL(snapshot.ref))
			);

			await addDoc(
				collection(db, 'maintenance', 'admin', 'tbl_unitOwners'),
				{
					CreatedDate: serverTimestamp(),
					UID: uid,
					Email: ownerInfoForm.values.email,
					LName: reqForm.values.lName,
					FName: reqForm.values.fName,
					MName: reqForm.values.mName,
					Password: pw,
					UName: uName,
					UnOwnerImg: downloadURLs[0],
					Cert: downloadURLs[1],
					Income: downloadURLs[2],
					Billing: downloadURLs[3],
					Tin: downloadURLs[4],
					Id1: downloadURLs[5],
					Id2: downloadURLs[6],
					CNum: ownerInfoForm.values.cNum,
					Status: 'Active',
					Units: acqUnit,
				}
			);

			unit.map((e) => {
				const tower = e.value.substring(0, 2);

				const length = Object.keys(units).length;

				for (let x = 0; x < length; x++) {
					const i = units[x];

					var sorted = Object.keys(i);

					sorted.map((item, key) => {
						const element = i[item];

						if (Object.values(element).length != 0) {
							const k = Object.values(element);

							k.map((x) => {
								if (x.name === e.value) {
									const collectionRef = doc(
										db,
										'maintenance',
										'admin',
										'tbl_towers',
										`${TowerIdentifier(tower)}`
									);
									let status = {};

									status[`Units.${x.floor}.${x.no}.status`] =
										'Occupied';

									updateDoc(collectionRef, status);
								}
							});
						}
					});
				}
			});

			if (curUser) {
				await addDoc(
					collection(db, 'maintenance', 'admin', 'tbl_logs'),
					{
						CreatedDate: serverTimestamp(),
						Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) added a new unit owner.`,
						Module: 'Unit Owner',
					}
				);
			}
			toast({
				title: 'New Unit Owner Added!',
				description: `${fName}'s username is ${uName}. Password is ${pw}. `,
				status: 'success',
				duration: 9000,
				isClosable: true,
			});
		} catch (e) {
			console.log(e);
			toast({
				title: 'Error adding new unit owner',
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		}

		setUnit([]);
		setShowImage('');
		reqForm.resetForm();
		setActiveStep(0);
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<Flex>
			<CusModal
				header={"Fill the unit owner's details."}
				component={
					<UnitOwnerForm
						onClose={onClose}
						reqForm={reqForm}
						ownerInfoForm={ownerInfoForm}
						units={unit}
						setUnit={setUnit}
						setShowImage={setShowImage}
						showImage={showImage}
						activeStep={activeStep}
						fileData={fileData}
						handleBack={handleBack}
						handleNext={handleNext}
						disable={false}
					/>
				}
				action={'+ Add Unit Owner'}
				isOpen={isOpen}
				onClose={onClose}
				onOpen={onOpen}
			/>
		</Flex>
	);
};

export default AddUnitOwner;

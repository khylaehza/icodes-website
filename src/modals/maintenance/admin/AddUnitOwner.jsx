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
	const { curUser, unitTowerID, units, buyers } = useData();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const storage = getStorage();
	const fileData = '';

	const [owner, setOwner] = useState();

	const [unit, setUnit] = useState([]);

	const filteredOwner = buyers.filter((buy) => {
		if (buy.Status == 'Reserved') {
			const name = `${buy.FName} ${buy.LName}`;
			return name == owner ? buy : '';
		}
	});

	
	let u = [];
	const length = Object.keys(units).length;

	for (let x = 0; x < length; x++) {
		const i = units[x];

		var sorted = Object.keys(i);

		sorted.map((item, key) => {
			const element = i[item];

			if (Object.values(element).length != 0) {
				const k = Object.values(element);

				if (k) {
					k.sort(function (a, b) {
						var x = a.name.toLowerCase();
						var y = b.name.toLowerCase();
						return x < y ? -1 : x > y ? 1 : 0;
					});
				}

				k.map((e) => {
					u.push(e);
				});
			}
		});
	}

	let filteredUnit = [];
	if (filteredOwner[0]) {
		filteredUnit = u.filter((i) => {
			return i.name == filteredOwner[0].Units.toString() ? i : '';
		});
	}

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
			fullName: filteredOwner[0]
				? `${filteredOwner[0].FName} ${filteredOwner[0].MName} ${filteredOwner[0].LName}`
				: '',
			unOwnerImg: '',
			dp: '',
			cert: '',
			income: '',
			billing: '',
			tin: '',
			id1: '',
			id2: '',
		},
		// enableReinitialize: true,
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
			fullName: Yup.string().required('Reserved Unit Owner is required.'),
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
			units: filteredUnit[0] ? filteredUnit[0].name : '',
			email: filteredOwner[0] ? filteredOwner[0].Email.slice(0, -4) : '',
			cNum: filteredOwner[0] ? filteredOwner[0].CNum.substring(2) : '  ',
		},
		enableReinitialize: true,
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
			units: Yup.string().required('Unit is required.'),
		}),
		onSubmit: (values, actions) => {
			actions.resetForm();
			handleFormSubmit();
		},
	});

	const [activeStep, setActiveStep] = useState(0);

	const handleFormSubmit = async () => {
		const uid = filteredOwner[0] ? filteredOwner[0].BuyersID : '';

		const pw = PasswordGenerator(6);
		const uName = `Owner_${uid}`;

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
					FullName: filteredOwner[0]
						? `${
								filteredOwner[0].FName
						  } ${filteredOwner[0].MName.charAt(0).toUpperCase()} ${
								filteredOwner[0].LName
						  }`
						: '',
					FName: filteredOwner[0] ? `${filteredOwner[0].FName}` : '',
					MName: filteredOwner[0] ? `${filteredOwner[0].MName}` : '',
					LName: filteredOwner[0] ? `${filteredOwner[0].LName}` : '',
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
					Status: true,
					Units: ownerInfoForm.values.units,
				}
			);

			if (filteredUnit[0]) {
				const tower = filteredUnit[0].name.substring(0, 2);

				const length = Object.keys(units).length;
				for (let x = 0; x < length; x++) {
					const i = units[x];

					var sorted = Object.keys(i);

					sorted.map((item) => {
						const element = i[item];

						if (Object.values(element).length != 0) {
							const k = Object.values(element);

							k.map((x) => {
								if (x.name === filteredUnit[0].name) {
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

				const docRef = doc(
					db,
					'maintenance',
					'salesmanagement',
					'tbl_prosBuyers',
					filteredOwner[0].id
				);
				updateDoc(docRef, {
					EditedDate: serverTimestamp(),
					Status: 'Occupied',
				});
			}

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
				description: `${
					filteredOwner[0] ? `${filteredOwner[0].FName}` : ''
				}'s username is ${uName}. Password is ${pw}. `,
				status: 'success',
				duration: 9000,
				isClosable: true,
			});
		} catch (e) {
		
			toast({
				title: 'Error adding new unit owner',
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		}
		onClose();
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

	const onCloseModal = () => {
		onClose();
		ownerInfoForm.resetForm();
		reqForm.resetForm();
		setShowImage('');
		setActiveStep(0);
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
						setShowImage={setShowImage}
						showImage={showImage}
						activeStep={activeStep}
						fileData={fileData}
						handleBack={handleBack}
						handleNext={handleNext}
						disable={false}
						setOwner={setOwner}
					/>
				}
				action={'+ Add Unit Owner'}
				isOpen={isOpen}
				onClose={onCloseModal}
				onOpen={onOpen}
			/>
		</Flex>
	);
};

export default AddUnitOwner;

import { CusModal } from '../../../../customs';
import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { UnitSetForm } from '../../../../forms';
import { IdGenerator } from '../../../../utilities';
import { useData } from '../../../../../DataContext';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { db } from '../../../../../firebase-config';
import {
	collection,
	updateDoc,
	serverTimestamp,
	addDoc,
	doc,
} from 'firebase/firestore';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';

const AddUnitSet = () => {
	const unTypeID = IdGenerator(6);
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [img, setImg] = useState();
	const { curUser, unitTowerID, units } = useData();
	const storage = getStorage();
	const aveUnitSize = 52.06;
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

	const form = useFormik({
		initialValues: {
			layoutImage: '',
			typeName: '',
			unitSize: '',
			units: '',
			unitImage: '',
		},
		validationSchema: Yup.object({
			units: Yup.mixed().required('Unit is required.'),
			typeName: Yup.string().required('Unit type name is required.'),
			unitSize: Yup.string().required('Unit size is required.'),
			unitImage: Yup.mixed().required("Unit's Image is required."),
			layoutImage: Yup.mixed()
				.required("Unit's Image is required.")
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
		}),
		onSubmit: async (value, actions) => {
			const imgs = value.unitImage;

			const folderPath = `admin/units/${unTypeID}`;
			const storageRef1 = ref(storage, `${folderPath}/layout.png`);
			const storageRef = (imageName, ext) =>
				ref(storage, `${folderPath}/${imageName}.${ext}`);
			const uploadTask = uploadBytesResumable(
				storageRef1,
				value.layoutImage
			);
			try {
				const uploadTasks = [];

				await Promise.all(
					Object.keys(imgs).map(async (element, key) => {
						return uploadTasks.push(
							uploadBytesResumable(
								storageRef(key, 'jpg'),
								imgs[element]
							)
						);
					})
				);

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
												console.log(
													'Upload is running'
												);
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
					uploadSnapshots.map((snapshot) =>
						getDownloadURL(snapshot.ref)
					)
				);

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
										'tbl_setUnit'
									),
									{
										CreatedDate: serverTimestamp(),
										UnitTypeID: unTypeID,
										TypeName: form.values.typeName,
										UnitSize: form.values.unitSize,
										LayoutImage: downloadURL,
										TypeImage: downloadURLs,
										Units: acqUnit,
										Tower: t,
										UnitQuan: unit.length,
									}
								);

								setImg(downloadURL);
							}
						);
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

										let type = {};
										let image = {};
										let size = {};
										let status = {};
										let category = {};

										type[
											`Units.${x.floor}.${x.no}.typeName`
										] = form.values.typeName;
										image[
											`Units.${x.floor}.${x.no}.typeImage`
										] = img;
										size[
											`Units.${x.floor}.${x.no}.typeSize`
										] = form.values.unitSize;
										status[
											`Units.${x.floor}.${x.no}.status`
										] = 'Pending Amount';

										if (
											form.values.unitSize <= aveUnitSize
										) {
											category[
												`Units.${x.floor}.${x.no}.category.2`
											] = 'smaller';
										} else if(
											form.values.unitSize <= aveUnitSize
										) {
											category[
												`Units.${x.floor}.${x.no}.category.2`
											] = 'larger';
										}

										updateDoc(collectionRef, type);
										if (img) {
											updateDoc(collectionRef, image);
										}

										updateDoc(collectionRef, size);
										updateDoc(collectionRef, status);
										updateDoc(collectionRef, category);
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
							Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) added details to units.`,
							Module: 'Unit Types',
						}
					);
				}

				toast({
					title: 'New Data Added to Unit!',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error adding new unit',
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
			}

			setUnit([]);
			actions.resetForm();
			onClose();
		},
	});

	const onCloseModal = () => {
		setUnit([]);
		form.resetForm();
		onClose();
	};
	return (
		<Flex>
			<CusModal
				header={'Fill the unit types details.'}
				component={
					<UnitSetForm
						form={form}
						units={unit}
						setUnit={setUnit}
					/>
				}
				action={'+  Unit'}
				isOpen={isOpen}
				onClose={onCloseModal}
				onOpen={onOpen}
				variant={'ghost'}
				color={'b.200'}
				justifyContent={'flex-start'}
				form={form}
			/>
		</Flex>
	);
};

export default AddUnitSet;

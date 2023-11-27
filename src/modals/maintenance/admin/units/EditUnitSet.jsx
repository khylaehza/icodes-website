import { useState, useEffect } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { CusEdit } from '../../../../customs';
import { UnitSetForm } from '../../../../forms';
import { useFormik } from 'formik';

import { useData } from '../../../../../DataContext';
import {
	updateDoc,
	serverTimestamp,
	doc,
	addDoc,
	collection,
} from 'firebase/firestore';
import { db } from '../../../../../firebase-config';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
	getMetadata,
} from 'firebase/storage';
const EditUnitSet = ({ data, id, mainCollection, tblDocUser, tblUserCol }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const storage = getStorage();
	const [unit, setUnit] = useState([
		{ label: data.Units.toString(), value: data.Units.toString() },
	]);
	let newUrl = [];
	const { curUser, unitTowerID, units } = useData();
	const acqUnit = [];
	const allUnit = [];
	const [layoutFileName, setLayoutFileName] = useState();
	const [img, setImg] = useState();
	const [actualImg, setActual] = useState([]);

	const layoutImage = ref(
		storage,
		`admin/units/${data.UnitTypeID}/layout.png`
	);
	getMetadata(layoutImage).then((metadata) => {
		const fileName = metadata.name;
		setLayoutFileName(fileName);
	});

	data.Units.map((e) => {
		//if included sa bought unit, dont push
		acqUnit.push(e);
		allUnit.push(e);
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

	const editForm = useFormik({
		initialValues: {
			layoutImage: data.LayoutImage,
			typeName: data.TypeName,
			unitSize: data.UnitSize,
			units: data.Units,
			unitImage: data.TypeImage,
		},
		enableReinitialize: true,
		onSubmit: async (value, actions) => {
			const imgs = value.unitImage;
			const docRef = doc(db, mainCollection, tblDocUser, tblUserCol, id);
			const folderPath = `admin/units/${data.UnitTypeID}`;
			const storageRef1 = ref(storage, `${folderPath}/layout.png`);

			const storageRef = (imageName, ext) =>
				ref(storage, `${folderPath}/${imageName}.${ext}`);

			const uploadTasks = [];

			try {
				await updateDoc(docRef, {
					EditedDate: serverTimestamp(),
					TypeName: value.typeName,
					UnitSize: value.unitSize,
					Units: acqUnit,
					UnitQuan: allUnit.length,
				});

				if (data.LayoutImage !== value.layoutImage) {
					try {
						const uploadTask = uploadBytesResumable(
							storageRef1,
							value.layoutImage
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
												LayoutImage: downloadURL,
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
										setImg(downloadURL);
									}
								);
							}
						);
					} catch (e) {
						console.log(e);
					}
				}

				if (data.TypeImage !== value.unitImage) {
					try {
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
														console.log(
															'Upload is paused'
														);
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
						// setActual(downloadURLs);

						await updateDoc(docRef, {
							TypeImage: downloadURLs,
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

								k.map(async (x) => {
									if (e.value.includes(x.name)) {
										const collectionRef = doc(
											db,
											'maintenance',
											'admin',
											'tbl_towers',
											`${TowerIdentifier(tower)}`
										);
										let type = {};
										// let actual = {};
										// let layout = {};
										let size = {};
										let category = {};

										type[
											`Units.${x.floor}.${x.no}.typeName`
										] = editForm.values.typeName;
										// layout[
										// 	`Units.${x.floor}.${x.no}.layoutImage`
										// ] = img;
										// actual[
										// 	`Units.${x.floor}.${x.no}.actualImage`
										// ] = actualImg;
										size[
											`Units.${x.floor}.${x.no}.typeSize`
										] = editForm.values.unitSize;

										if (editForm.values.unitSize < 52.06) {
											category[
												`Units.${x.floor}.${x.no}.category.2`
											] = 'smaller';
										} else {
											category[
												`Units.${x.floor}.${x.no}.category.2`
											] = 'larger';
										}

										updateDoc(collectionRef, type);

										// if (
										// 	data.LayoutImage !==
										// 	value.layoutImage
										// ) {
										// 	await updateDoc(
										// 		collectionRef,
										// 		layout
										// 	);
										// }

										// if (
										// 	data.TypeImage !== value.unitImage
										// ) {
										// 	await updateDoc(
										// 		collectionRef,
										// 		actual
										// 	);
										// }

										updateDoc(collectionRef, size);

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
							Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) edited unit details.`,
							Module: 'Unit Types',
						}
					);
				}

				toast({
					title: `${
						data.Units.length > 3
							? `${(data.Units[0], data.Units[1])}...'s Data`
							: `${data.Units}'s `
					} Details Edited!`,
					status: 'success',
					duration: 3000,
					isClosable: true,
				});
			} catch (e) {
				console.log(e);
				toast({
					title: 'Edited failed!',
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
			}
			actions.resetForm();
			onClose();
		},
	});

	return (
		<CusEdit
			header={`Edit ${
				data.Units.length > 3
					? `${(data.Units[0], data.Units[1])}...'s Data`
					: `${data.Units}'s Data`
			}'s details.`}
			isOpen={isOpen}
			onClose={onClose}
			onOpen={onOpen}
			component={
				<UnitSetForm
					form={editForm}
					units={unit}
					setUnit={setUnit}
					disabled={true}
					layoutFileName={layoutFileName}
					imageFiles={data.TypeImage.length}
				/>
			}
		/>
	);
};

export default EditUnitSet;

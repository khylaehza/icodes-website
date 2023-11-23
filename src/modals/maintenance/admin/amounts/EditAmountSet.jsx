import { useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { CusEdit } from '../../../../customs';
import { AmountSetForm } from '../../../../forms';
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

const EditAmountSet = ({
	data,
	id,
	mainCollection,
	tblDocUser,
	tblUserCol,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const [unit, setUnit] = useState([
		{ label: data.Units.toString(), value: data.Units.toString() },
	]);

	const { curUser, unitTowerID, units } = useData();
	const acqUnit = [];

	data.Units.map((e) => {
		acqUnit.push(e);
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
			vat: data.Vat,
			tcp: data.TCP,
			units: data.Units,
		},
		enableReinitialize: true,
		onSubmit: async (value, actions) => {
			const docRef = doc(db, mainCollection, tblDocUser, tblUserCol, id);
			try {
				updateDoc(docRef, {
					EditedDate: serverTimestamp(),
					Units: acqUnit,
					Vat: value.vat,
					TCP: value.tcp,
				});

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
										let tcp = {};
										tcp[`Units.${x.floor}.${x.no}.tcp`] =
											value.tcp;

										updateDoc(collectionRef, tcp);
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
							Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) edited unit amount.`,
							Module: 'Unit Amounts',
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
					duration: 9000,
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

			actions.resetForm();
			onClose();
		},
	});

	return (
		<CusEdit
			header={`Edit ${
				data.Units.length > 3
					? `${(data.Units[0], data.Units[1])}...'s Data`
					: `${data.Units}`
			}'s details.`}
			isOpen={isOpen}
			onClose={onClose}
			onOpen={onOpen}
			component={
				<AmountSetForm
					form={editForm}
					units={unit}
					setUnit={setUnit}
					disabled={true}
				/>
			}
		/>
	);
};

export default EditAmountSet;

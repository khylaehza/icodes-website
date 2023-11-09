import { useDisclosure, useToast } from '@chakra-ui/react';
import { CusEdit } from '../../../customs';
import { ProspectiveBuyersForm } from '../../../forms';
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
import { useData } from '../../../../DataContext';
import { useState } from 'react';
const EditProspectiveBuyer = ({
	data,
	id,
	mainCollection,
	tblDocUser,
	tblUserCol,
}) => {
	const { curUser, unitTowerID, units } = useData();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

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

	const editForm = useFormik({
		initialValues: {
			units: '',
			paymentTypeFor: '',
		},
		validationSchema: Yup.object({
			units: Yup.mixed().required('Unit is required.'),
			paymentTypeFor: Yup.mixed().required('Payment Type is required.'),
		}),
		onSubmit: async (value, actions) => {
			try {
				const docRef = doc(
					db,
					mainCollection,
					tblDocUser,
					tblUserCol,
					id
				);
				updateDoc(docRef, {
					EditedDate: serverTimestamp(),
					Units: acqUnit,
					Status: 'On Hold',
					PaymentTypeFor: paymentTypeFor,
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
										let status = {};

										status[
											`Units.${x.floor}.${x.no}.status`
										] = 'On Hold';

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
							Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) edited prospective buyer's status.`,
							Module: 'Unit Owner',
						}
					);
				}

				toast({
					title: `${data.FName}'s unit is on hold!`,
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error editing prospective buyer',
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
			header={`Confirm ${data.FName}'s unit purchase.`}
			isOpen={isOpen}
			onClose={onClose}
			onOpen={onOpen}
			component={
				<ProspectiveBuyersForm
					onClose={onClose}
					units={unit}
					setUnit={setUnit}
					form={editForm}
					disabled={false}
				/>
			}
		/>
	);
};

export default EditProspectiveBuyer;

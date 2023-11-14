import { CusModal } from '../../../../customs';
import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { IdGenerator } from '../../../../utilities';
import { useData } from '../../../../../DataContext';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AmountSetForm } from '../../../../forms';
import { db } from '../../../../../firebase-config';
import {
	collection,
	updateDoc,
	serverTimestamp,
	addDoc,
	doc,
} from 'firebase/firestore';

const AddAmountSet = () => {
	const { curUser, unitTowerID, units } = useData();
	const amountID = IdGenerator(6);
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
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
			vat: '',
			tcp: '',
			units: '',
		},
		validationSchema: Yup.object({
			units: Yup.mixed().required('Unit is required.'),
			tcp: Yup.string().required('Total Contract Price is required.'),
			vat: Yup.number().required('VAT is required.'),
		}),
		onSubmit: async (value, actions) => {
			try {
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
										let status = {};

										tcp[`Units.${x.floor}.${x.no}.tcp`] =
											form.values.tcp;
										status[
											`Units.${x.floor}.${x.no}.status`
										] = 'Available';

										updateDoc(collectionRef, status);
										updateDoc(collectionRef, tcp);
									}
								});
							}
						});
					}
				});

				await addDoc(
					collection(db, 'maintenance', 'admin', 'tbl_setAmount'),
					{
						CreatedDate: serverTimestamp(),
						AmountID: amountID,
						Units: acqUnit,
						Vat: form.values.vat,
						TCP: form.values.tcp,
						Tower: t,
					}
				);

				if (curUser) {
					await addDoc(
						collection(db, 'maintenance', 'admin', 'tbl_logs'),
						{
							CreatedDate: serverTimestamp(),
							Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) added a new unit amount.`,
							Module: 'Unit Amounts',
						}
					);
				}

				toast({
					title: 'Amount Added to Unit!',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error adding amount',
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
					<AmountSetForm
						form={form}
						units={unit}
						setUnit={setUnit}
					/>
				}
				action={'+ Amount'}
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

export default AddAmountSet;

import { useDisclosure, useToast } from '@chakra-ui/react';
import { CusEdit } from '../../../../customs';
import { UnitValueForm } from '../../../../forms';
import { useFormik } from 'formik';

import {
	updateDoc,
	serverTimestamp,
	doc,
	collection,
	addDoc,
} from 'firebase/firestore';
import { db } from '../../../../../firebase-config';
import { useData } from '../../../../../DataContext';
const EditUnitValue = ({
	data,
	id,
	mainCollection,
	tblDocUser,
	tblUserCol,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const { curUser } = useData();

	const editForm = useFormik({
		initialValues: {
			tower: data.Tower,
			remainTCP: data.RemainTCP,
			increase: data.Increase,
			years: data.Years,
		},
		enableReinitialize: true,
		onSubmit: async (value, actions) => {
			const docRef = doc(db, mainCollection, tblDocUser, tblUserCol, id);

			try {
				updateDoc(docRef, {
					EditedDate: serverTimestamp(),
					Tower: value.tower,
					Years: value.years,
					Increase: value.increase,
				});

				if (curUser) {
					await addDoc(
						collection(db, 'maintenance', 'admin', 'tbl_logs'),
						{
							CreatedDate: serverTimestamp(),
							Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) edited unit value computation.`,
							Module: 'Computations',
						}
					);
				}

				toast({
					title: 'Unit Value Edited!',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error editing unit value',
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
			header={`Edit ${data.id}`}
			isOpen={isOpen}
			onClose={onClose}
			onOpen={onOpen}
			component={<UnitValueForm form={editForm} />}
		/>
	);
};

export default EditUnitValue;

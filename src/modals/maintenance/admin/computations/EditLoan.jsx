import { useDisclosure, useToast } from '@chakra-ui/react';
import { CusEdit } from '../../../../customs';
import { LoanForm } from '../../../../forms';
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
const EditLoan = ({ data, id, mainCollection, tblDocUser, tblUserCol }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const { curUser } = useData();

	const editForm = useFormik({
		initialValues: {
			tower: data.Tower,
			remainTCP: data.RemainTCP,
		},
		enableReinitialize: true,
		onSubmit: async (value, actions) => {
			const docRef = doc(db, mainCollection, tblDocUser, tblUserCol, id);

			try {
				updateDoc(docRef, {
					EditedDate: serverTimestamp(),
					Tower: value.tower,
					RemainTCP: value.remainTCP,
				});

				if (curUser) {
					await addDoc(
						collection(db, 'maintenance', 'admin', 'tbl_logs'),
						{
							CreatedDate: serverTimestamp(),
							Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) added a new loan computation.`,
							Module: 'Computations',
						}
					);
				}

				toast({
					title: 'Loan Computation Edited!',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error editing computation',
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
			component={<LoanForm form={editForm} />}
		/>
	);
};

export default EditLoan;

import { useDisclosure, useToast } from '@chakra-ui/react';
import { CusEdit } from '../../../../customs';
import { DiscountForm } from '../../../../forms';
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

const EditDiscount = ({ data, id, mainCollection, tblDocUser, tblUserCol }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const { curUser } = useData();
	const editForm = useFormik({
		initialValues: {
			dscName: data.DscName,
			discount: data.Discount,
			dscType: data.DscType,
		},
		enableReinitialize: true,

		onSubmit: async (value, actions) => {
			const docRef = doc(db, mainCollection, tblDocUser, tblUserCol, id);
			try {
				updateDoc(docRef, {
					EditedDate: serverTimestamp(),
					DscName: value.dscName,
					Discount: value.discount,
					DscType: value.dscType,
				});
				if (curUser) {
					await addDoc(
						collection(db, 'maintenance', 'admin', 'tbl_logs'),
						{
							CreatedDate: serverTimestamp(),
							Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) edited a discount.`,
							Module: 'Unit Amounts',
						}
					);
				}

				toast({
					title: `Discount ${value.dscName} Edited!`,
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error editing',
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
			header={`Edit ${data.DscName}'s details.`}
			isOpen={isOpen}
			onClose={onClose}
			onOpen={onOpen}
			component={<DiscountForm form={editForm} />}
		/>
	);
};

export default EditDiscount;

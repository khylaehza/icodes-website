import { useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { CusEdit } from '../../../customs';
import { VisitorsForm } from '../../../forms';
import { useFormik } from 'formik';
import {
	updateDoc,
	serverTimestamp,
	doc,
	addDoc,
	collection,
} from 'firebase/firestore';
import { db } from '../../../../firebase-config';
import { useData } from '../../../../DataContext';
const EditVisitors = ({ data, id, mainCollection, tblDocUser, tblUserCol }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const { curUser, unitOwners } = useData();
	const [visitors, setVisitors] = useState([]);

	const acqUnit = [];
	const newVisitor = [];

	visitors.forEach((visitors) => {
		newVisitor.push(visitors.replace(/\n/g, ''));
	});

	const editForm = useFormik({
		initialValues: {
			units: data.Unit,
			visitors: data.Visitor,
			dateStart: data.DateStart,
			dateEnd: data.DateEnd,
			purpose: data.Purpose,
			status: data.Status,
		},
		enableReinitialize: true,
		onSubmit: async (value, actions) => {
			const visitors = newVisitor !== '' ? value.visitors : newVisitor;
			try {
				acqUnit.push(value.units);
				const filteredOwners = unitOwners.filter((owner) => {
					return acqUnit.some((unit) => owner.Units.includes(unit));
				});

				const unitOwner = filteredOwners.map((owner) => {
					const formattedFName =
						owner.FName.charAt(0).toUpperCase() +
						owner.FName.slice(1);
					const formattedMName = owner.MName.charAt(0).toUpperCase();
					const formattedLName =
						owner.LName.charAt(0).toUpperCase() +
						owner.LName.slice(1);

					return `${formattedFName} ${formattedMName} ${formattedLName}`;
				});
				const docRef = doc(
					db,
					mainCollection,
					tblDocUser,
					tblUserCol,
					id
				);
				updateDoc(docRef, {
					EditedDate: serverTimestamp(),

					Unit: value.units,
					For: unitOwner,
					Visitor: visitors,
					DateStart: value.dateStart,
					// DateEnd: value.dateEnd,
					Purpose: value.purpose,
					Status: value.status,
				});

				if (curUser) {
					await addDoc(
						collection(db, 'maintenance', 'admin', 'tbl_logs'),
						{
							CreatedDate: serverTimestamp(),
							Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) edited Visitor/s details.`,
							Module: 'Visitors',
						}
					);
				}

				toast({
					title: `${data.VisitorID}'s Details Edited!`,
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error editing Visitor',
					status: 'error',
					duration: 9000,
					isClosable: true,
				});

				console.log(e);
			}

			actions.resetForm();
			onClose();
			setVisitors([]);
		},
	});

	const onCloseModal = () => {
		editForm.resetForm();
		setVisitors([]);
		onClose();
	};

	return (
		<CusEdit
			header={`Edit Visitor/s details.`}
			isOpen={isOpen}
			onClose={onCloseModal}
			onOpen={onOpen}
			component={
				<VisitorsForm
					form={editForm}
					visitors={visitors}
					setVisitors={setVisitors}
				/>
			}
		/>
	);
};

export default EditVisitors;

import { useDisclosure, useToast } from '@chakra-ui/react';
import { CusEdit } from '../../../customs';
import { TeamsForm } from '../../../forms';
import { useFormik } from 'formik';

import { updateDoc, serverTimestamp, doc } from 'firebase/firestore';
import { db } from '../../../../firebase-config';

const EditTeam = ({ data, id, mainCollection, tblDocUser, tblUserCol }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

	const editForm = useFormik({
		initialValues: {
			team: data.team,
		},
		enableReinitialize: true,
		onSubmit: (value, actions) => {
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
					Team: value.team,
				});

				toast({
					title: `${data.FName}'s Details Edited!`,
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error editing Team',
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
			header={`Edit ${data.FName}'s details.`}
			isOpen={isOpen}
			onClose={onClose}
			onOpen={onOpen}
			component={
				<TeamsForm
					onClose={onClose}
					form={editForm}
					data={data}
					actionLabel={'Edit'}
				/>
			}
		/>
	);
};

export default EditTeam;

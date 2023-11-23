import CusAlert from './CusAlert';
import { IconButton, useDisclosure, useToast } from '@chakra-ui/react';
import { BsFillTrashFill } from 'react-icons/bs';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

const CusDelete = ({
	id,
	label,
	mainCollection,
	tblDocUser,
	tblUserCol,
	stor = '',
	hasFile = true,
	onUpdate,
}) => {
	const storage = getStorage();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const onDeleteClick = async () => {
		const storageRef = ref(storage, stor);

		try {
			await deleteDoc(
				doc(db, mainCollection, tblDocUser, tblUserCol, id)
			);
			onUpdate();
			hasFile &&
				deleteObject(storageRef)
					.then(() => {})
					.catch((error) => {
						console.log(error);
					});

			onClose();
			toast({
				title: `${label} Deleted!`,
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<CusAlert
			button={
				<IconButton
					onClick={onOpen}
					colorScheme='red'
					variant='outline'
					icon={<BsFillTrashFill />}
					aria-label='Delete'
				/>
			}
			header={`Delete ${label}?`}
			body={`Are you sure? You can't undo this action afterwards.`}
			action={onDeleteClick}
			actionLabel={'Delete'}
			isOpen={isOpen}
			onClose={onClose}
		/>
	);
};

export default CusDelete;

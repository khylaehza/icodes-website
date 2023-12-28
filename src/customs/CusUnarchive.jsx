import { RiInboxUnarchiveFill } from 'react-icons/ri';
import CusAlert from './CusAlert';
import { IconButton, useDisclosure, useToast } from '@chakra-ui/react';
import {
	doc,
	deleteDoc,
	serverTimestamp,
	addDoc,
	collection,
} from 'firebase/firestore';
import { db } from '../../firebase-config';
const CusArchive = ({
	buyer,
	data,
	id,
	mainCollection,
	tblDocUser,
	tblUserCol,
}) => {
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const onArchiveClick = async () => {
		try {
			addDoc(
				collection(
					db,
					'maintenance',
					'salesmanagement',
					'tbl_prosBuyers'
				),
				{
					CreatedDate: data.CreatedDate,
					ArchivedDate: serverTimestamp(),
					BuyersID: data.BuyersID,
					LName: data.LName,
					MName: data.MName,
					FName: data.FName,
					CNum: data.CNum,
					Email: data.Email,
					Inquiry: data.Inquiry ? data.Inquiry : 'N/A',
					Type: data.Type ? data.Type : 'N/A',
					Agent: data.Agent ? data.Agent : 'N/A',
					PBType: data.PBType ? data.PBType : 'N/A',
					AgentID: data.AgentID ? data.AgentID : 'N/A',
					Preference: data.Preference ? data.Preference : 'N/A',
				}
			);

			await deleteDoc(
				doc(db, mainCollection, tblDocUser, tblUserCol, id)
			);

			onClose();
			toast({
				title: `${buyer}'s data unarchived!`,
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
					colorScheme='blue'
					variant='outline'
					icon={<RiInboxUnarchiveFill />}
					aria-label='Archive'
				/>
			}
			header={`Archive ${buyer}'s data?`}
			body={`You can archive this data anytime.`}
			action={onArchiveClick}
			actionLabel={'Unarchive'}
			isOpen={isOpen}
			onClose={onClose}
		/>
	);
};

export default CusArchive;

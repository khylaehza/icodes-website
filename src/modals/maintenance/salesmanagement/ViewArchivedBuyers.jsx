import { CusModalClear } from '../../../customs';
import { Flex, useDisclosure, IconButton } from '@chakra-ui/react';
import { FaBoxArchive } from 'react-icons/fa6';
import { ArchivedProsTable } from '../../../tables';
const ViewArchivedBuyers = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex>
			<CusModalClear
				header={'Archived Prospective Buyers'}
				button={
					<IconButton
						onClick={onOpen}
						variant='outline'
						icon={<FaBoxArchive size={13} />}
						aria-label='Archive'
						bgColor={'w.300'}
						boxShadow='0 4px 12px 0 rgba(134,149,166,0.5)'
					/>
				}
				// action={'+ Add Manning Schedule'}

				body={<ArchivedProsTable />}
				isOpen={isOpen}
				onClose={onClose}
			/>
		</Flex>
	);
};

export default ViewArchivedBuyers;

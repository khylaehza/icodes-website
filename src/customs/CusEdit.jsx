import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	IconButton,
} from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';

function CusEdit({ header, component, isOpen, onOpen, onClose }) {
	return (
		<div>
			<IconButton
				colorScheme='green'
				icon={<AiFillEdit />}
				aria-label='Edit'
				onClick={onOpen}
			/>
			<Modal
				closeOnOverlayClick={false}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent maxW='40%'>
					<ModalHeader>{header}</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={5}>{component}</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	);
}

export default CusEdit;

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Button,
	IconButton,
	useDisclosure,
	ModalFooter,
} from '@chakra-ui/react';

function CusModalTAP({ body, header, onOpen, isOpen, onClose }) {
	return (
		<>
			<Modal
				closeOnOverlayClick={false}
				isOpen={isOpen}
				onClose={onClose}
				size={'3xl'}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalHeader fontSize={'3xl'}>{header}</ModalHeader>
					<ModalBody p={10} maxH={'550px'} overflowY={'auto'}>{body}</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}

export default CusModalTAP;

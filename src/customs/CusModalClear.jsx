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

function CusModalClear({ body, header, button, isOpen, onClose }) {
	return (
		<>
			{button}
			<Modal
				closeOnOverlayClick={false}
				isOpen={isOpen}
				onClose={onClose}
				size={'3xl'}
			>
				<ModalOverlay />
				<ModalContent
					// maxW='40%'
					id={'form'}
				>
					<ModalCloseButton />
					<ModalHeader>{header}</ModalHeader>
					<ModalBody pb={5}>{body}</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}

export default CusModalClear;

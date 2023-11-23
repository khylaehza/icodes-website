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

function CusModal({}) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Modal
				closeOnOverlayClick={false}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent
					maxW='40%'
					id={'form'}
				>
					<ModalCloseButton />
					<ModalHeader />
					<ModalBody pb={5}>
						Are you sure you want to exit?{' '}
					</ModalBody>
					<ModalFooter>
						<Button
							onClick={onClose}
							variant='ghost'
						>
							Close
						</Button>
						<Button background={'b.300'}>Exit</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default CusModal;

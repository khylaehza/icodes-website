import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Button,
} from '@chakra-ui/react';

function CusModal({
	header,
	component,
	action,
	onClose,
	onOpen,
	isOpen,
	color,
	justifyContent,
	variant = 'primary',
	form,
}) {
	return (
		<>
			<Button
				onClick={onOpen}
				variant={variant}
				boxShadow={
					variant == 'primary'
						? '0 4px 12px 0 rgba(134,149,166,0.5)'
						: 'none'
				}
				w={'100%'}
				justifyContent={justifyContent}
				color={color}
			>
				{action}
			</Button>

			<Modal
				closeOnOverlayClick={false}
				isOpen={isOpen}
				onClose={() => {
					onClose();
					form.resetForm();
				}}
			>
				<ModalOverlay />
				<ModalContent
					maxW='40%'
					id={'form'}
				>
					<ModalHeader>{header}</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={5}>{component}</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}

export default CusModal;

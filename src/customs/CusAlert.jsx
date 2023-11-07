import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Button,
} from '@chakra-ui/react';
import { useRef } from 'react';

const CusAlert = ({
	button,
	header,
	body,
	action,
	actionLabel,
	isOpen,
	onClose,
}) => {
	const cancelRef = useRef();
	return (
		<>
			{button}

			<AlertDialog
				isOpen={isOpen}
				onClose={onClose}
				isCentered
			>
				<AlertDialogOverlay bg='rgba(0, 0, 0, 0.1)'>
					<AlertDialogContent>
						<AlertDialogHeader
							fontSize='lg'
							fontWeight='bold'
						>
							{header}
						</AlertDialogHeader>

						<AlertDialogBody>{body}</AlertDialogBody>

						<AlertDialogFooter>
							<Button
								ref={cancelRef}
								onClick={onClose}
							>
								Cancel
							</Button>
							<Button
								bgColor={'r.100'}
								ml={3}
								onClick={action}
								color={'w.300'}
							>
								{actionLabel}
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};

export default CusAlert;

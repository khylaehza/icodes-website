import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	Flex,
	Heading,
	HStack,
	VStack,
	Text,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
} from '@chakra-ui/react';
import { CusReqPDF } from './index';
import { PDFDownloadLink } from '@react-pdf/renderer';

function CusReqModal({child,data}){
    const { isOpen, onOpen, onClose } = useDisclosure();

	const Print = () => {
        const firstName = data.FName.charAt(0).toUpperCase() + data.FName.slice(1);
				const middleName = data.MName.charAt(0).toUpperCase();
				const lastName = data.LName.charAt(0).toUpperCase() + data.LName.slice(1);
				const fullName =
					middleName === ''
						? `${firstName} ${middleName} ${lastName}`
						: `${firstName} ${middleName}. ${lastName}`;
			
		
				console.log(fullName);
		return(
			<PDFDownloadLink
				document={
					<CusReqPDF
						data={data}
                        unitOwner={fullName}
					/>
				}
				fileName={`UnitOwner${data.UID}.pdf`}
			>
				<Button variant={'primary'} onClick={onClose}>Print</Button>
		</PDFDownloadLink>
		)
	}
    return (
		<>
			<Button
				onClick={onOpen}
				variant={'link'}
				fontSize={'xs'}
			>
				View Requirements
			</Button>

			<Modal
				isOpen={isOpen}
				onClose={onClose}
				size={'2xl'}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader></ModalHeader>
					<ModalCloseButton />
					<ModalBody>
							{child}
					</ModalBody>

					<ModalFooter>
						<Print/>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default CusReqModal
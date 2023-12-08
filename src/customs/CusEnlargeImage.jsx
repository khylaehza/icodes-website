import React from "react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalCloseButton
} from '@chakra-ui/react';

const CusEnlargeImage = ({label, body ,isOpen ,onClose}) => {
    return(
        <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={'3xl'}
    >
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>{label}</ModalHeader>
            <ModalCloseButton />
            <ModalBody
                justifyContent={'center'}
                boxSize={'100%'}
                alignContent={'center'}
                display={'flex'}
            >
                {body}
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}
export default CusEnlargeImage
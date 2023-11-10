import { CusModal } from '../../../customs';
import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
// import { UnitSetForm } from '../../../../forms';
import { IdGenerator } from '../../../utilities';
import { useData } from '../../../../DataContext';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { db } from '../../../../firebase-config';
import {
	collection,
	updateDoc,
	serverTimestamp,
	addDoc,
	doc,
} from 'firebase/firestore';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';

const AddTransactions = () => {
	const transactId = IdGenerator(6);
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [img, setImg] = useState();
	const { curUser, soa } = useData();
	return <></>;
};

export default AddTransactions;

import { useDisclosure, Flex, useToast } from '@chakra-ui/react';
import { CusEdit } from '../../../customs';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	updateDoc,
	serverTimestamp,
	doc,
	addDoc,
	collection,
} from 'firebase/firestore';
import { db } from '../../../../firebase-config';
import { UnitOwnerForm } from '../../../forms';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
	listAll,
	getMetadata,
} from 'firebase/storage';
import moment from 'moment';
import { useData } from '../../../../DataContext';
const EditUnitOwner = ({
	data,
	id,
	mainCollection,
	tblDocUser,
	tblUserCol,
}) => {
	const { curUser } = useData();
	const [showImage, setShowImage] = useState(data.UnOwnerImg);
	const [fileData, setFileData] = useState([]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const storage = getStorage();
	const toast = useToast();

	const [unit, setUnit] = useState([
		{ label: data.Units.toString(), value: data.Units.toString() },
	]);

	const acqUnit = [];
	unit.map((e) => {
		acqUnit.push(e.value);
	});

	useEffect(() => {
		const fetchImageFileData = async () => {
			try {
				const imagesRef = ref(storage, `admin/unitOwners/${data.UID}`);
				const imageList = await listAll(imagesRef);

				const promises = imageList.items.map(async (imageItem) => {
					const metadata = await getMetadata(imageItem);
					const fileName = metadata.name;

					return { fileName };
				});

				const fileData = await Promise.all(promises);
				setFileData(fileData);
			} catch (error) {
				console.log('Error retrieving images:', error);
			}
		};

		fetchImageFileData();
	}, []);

	const editReqForm = useFormik({
		initialValues: {
			lName: data.LName,
			fName: data.FName,
			mName: data.MName,
			unOwnerImg: '',
			fullName: data.FullName,
			cert: '',
			income: '',
			billing: '',
			tin: '',
			id1: '',
			id2: '',
		},
		enableReinitialize: true,
		onSubmit: (values, actions) => {
			handleNext();
		},
	});

	const editOwnerInfoForm = useFormik({
		initialValues: {
			units: data.Units ? data.Units.toString() : '',
			email: data.Email,
			cNum: data.CNum,
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			email: Yup.string().matches(
				/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/,
				'Invalid Email.'
			),

			cNum: Yup.string().matches(/^[0-9]{9}$/, 'Invalid Contact Number.'),
		}),
		onSubmit: (values, actions) => {
			handleFormSubmit();
			actions.resetForm();
			editReqForm.resetForm();
		},
	});

	const [activeStep, setActiveStep] = useState(0);

	const handleFormSubmit = async () => {
		const folderPath = `images/unitOwners/${data.UID}`;
		const storageRef = (imageName) =>
			ref(storage, `${folderPath}/${imageName}.jpg`);

		const docRef = doc(db, mainCollection, tblDocUser, tblUserCol, id);

		const filesToUpload = [
			{ field: 'UnOwnerImg', dataValue: editReqForm.values.unOwnerImg },
			{ field: 'Cert', dataValue: editReqForm.values.cert },
			{ field: 'Billing', dataValue: editReqForm.values.billing },
			{ field: 'Income', dataValue: editReqForm.values.income },
			{ field: 'Tin', dataValue: editReqForm.values.tin },
			{ field: 'Id1', dataValue: editReqForm.values.id1 },
			{ field: 'Id2', dataValue: editReqForm.values.id2 },
		];
		
		try {
			updateDoc(docRef, {
				EditedDate: serverTimestamp(),
				Email: editOwnerInfoForm.values.email,
				LName: editReqForm.values.lName,
				FName: editReqForm.values.fName,
				MName: editReqForm.values.mName,
				UName: `Owner_${data.UID}`,
				CNum: editOwnerInfoForm.values.cNum,
				Units: acqUnit,
			});

			toast({
				title: `${editReqForm.values.fName}'s Details Edited!`,
				status: 'success',
				duration: 9000,
				isClosable: true,
			});
		} catch (e) {
			toast({
				title: 'Edit failed!',
				status: 'error',
				duration: 9000,
				isClosable: true,
			});

			console.log(e);
		}
		const storagePromises = filesToUpload.map(async (fileData) => {
			const { field, dataValue } = fileData;
			if (dataValue.toString() !== '') {
				try {
					const uploadTaskSnapshot = await uploadBytesResumable(
						storageRef(field),
						dataValue
					);

					const downloadURL = await getDownloadURL(
						uploadTaskSnapshot.ref
					);

					await updateDoc(docRef, {
						[field]: downloadURL,
					});
				} catch (e) {
					console.log(e);
				}
			}
		});

		if (curUser) {
			await addDoc(collection(db, 'maintenance', 'admin', 'tbl_logs'), {
				CreatedDate: serverTimestamp(),
				Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) edited unit owner.`,
				Module: 'Unit Owner',
			});
		}

		try {
			Promise.all(storagePromises);
		} catch (e) {
			toast({
				title: 'Edit failed!',
				status: 'error',
				duration: 9000,
				isClosable: true,
			});

			return;
		}

		setActiveStep(0);
		onClose();
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};
	return (
		<CusEdit
			header={`Edit the ${data.FName} details.`}
			isOpen={isOpen}
			onClose={onClose}
			onOpen={onOpen}
			component={
				<UnitOwnerForm
					onClose={onClose}
					reqForm={editReqForm}
					ownerInfoForm={editOwnerInfoForm}
					// units={unit}
					// setUnit={setUnit}
					setShowImage={setShowImage}
					showImage={showImage}
					activeStep={activeStep}
					fileData={fileData}
					handleBack={handleBack}
					handleNext={handleNext}
					disabled={true}
					isEdit={true}
				/>
			}
		/>
	);
};

export default EditUnitOwner;

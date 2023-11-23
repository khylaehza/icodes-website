import { CusModal } from '../../../customs';
import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { MaintenanceForm } from '../../../forms';
import { IdGenerator } from '../../../utilities';
import { useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useData } from '../../../../DataContext';
import { db } from '../../../../firebase-config';
import { collection, serverTimestamp, addDoc } from 'firebase/firestore';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';

const AddMrequest = () =>{
    const { isOpen, onOpen, onClose } = useDisclosure();
	const { curUser } = useData();
	const storage = getStorage();
	const toast = useToast();
	const mrequestID = IdGenerator(6);

    const form = useFormik({
		initialValues: {
			// for: '',
			// tower: '',
			// location: '',
			repairType: '',
			requestImg: '',
			details: '',
			status: '',
			units: '',
			//others:'',
		},
		validationSchema: Yup.object({
			requestImg: Yup.mixed()
				.required('Proof is required.')
				.test(
					'FILE_TYPE',
					'Invalid File Type.',
					(value) =>
						value &&
						[
							'image/png',
							'image/jpeg',
							'image/jpg',
							'video/*',
						].includes(value.type)
				),
			repairType: Yup.string().required('Repair type is required.'),
			details: Yup.string().required('Description is required.'),
			units: Yup.string().required('Unit location is required.'),
			status: Yup.string().required('Status is required.'),
		}),
		onSubmit: async (value, actions) => {
            const imgs = value.requestImg;
            const folderPath = `maintenance/propertymanagement/mrequest/${mrequestID}`;
            const storageRef = (imageName, ext) =>
                ref(storage, `${folderPath}/${imageName}.${ext}`);

            try {
                const uploadTasks = Object.keys(imgs).map(async (element, key) => {
                    const uploadTask = uploadBytesResumable(
                        storageRef(key, 'jpg'),
                        imgs[element]
                    );

                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            const progress =
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                            switch (snapshot.state) {
                                case 'paused':
                                    console.log('Upload is paused');
                                    break;
                                case 'running':
                                    console.log('Upload is running');
                                    break;
                            }
                        },
                        (error) => {
                            toast({
                                title: 'Error during upload',
                                status: 'error',
                                duration: 9000,
                                isClosable: true,
                            });
                            console.error(error);
                        }
                    );

                    return uploadTask;
                });

                const completedUploads = await Promise.all(uploadTasks);

                const downloadURLs = await Promise.all(
                    completedUploads.map((uploadTask) =>
                        getDownloadURL(uploadTask.ref)
                    )
                );

                await addDoc(
                    collection(db, 'maintenance', 'propertymanagement', 'tbl_maintenance'),
                    {
                        MRequestID: mrequestID,
                        Unit: value.units,
                        CreatedDate: serverTimestamp(),
                        RepairType: value.repairType,
                        RequestImg: downloadURLs,
                        Details: value.details,
                        Status: value.status,
                    }
                );

                if (curUser) {
                    await addDoc(
                        collection(db, 'maintenance', 'admin', 'tbl_logs'),
                        {
                            CreatedDate: serverTimestamp(),
                            Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) added a new maintenance.`,
                            Module: 'Maintenance Request',
                        }
                    );
                }

                toast({
                    title: 'New Request Added!',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
            } catch (error) {
                toast({
                    title: 'Error adding new request',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
                console.log(error);
            }

            actions.resetForm();
            onClose();
        },
    });

    const onCloseModal = () => {
        form.resetForm();
        onClose();
    };

    return(
        <Flex>
			<CusModal
				header={'Fill the Maintenance details.'}
				component={
					<MaintenanceForm
						form={form}
						// options={option}
						// setOptions={setOptions}
					/>
				}
				action={'+ Add Maintenance'}
				isOpen={isOpen}
				onClose={onCloseModal}
				onOpen={onOpen}
				form={form}
			/>
		</Flex>
    );
}

export default AddMrequest
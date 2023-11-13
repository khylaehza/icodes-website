import { CusModal } from '../../../customs';
import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { VisitorsForm } from '../../../forms';
import { IdGenerator } from '../../../utilities';
import { useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useData } from '../../../../DataContext';
import { db } from '../../../../firebase-config';
import { collection, serverTimestamp, addDoc } from 'firebase/firestore';


const AddVisitors = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const visitorID = IdGenerator(6);
    const { curUser, unitOwners } = useData();
    const [visitors, setVisitors] = useState([])

    const acqUnit = [];
    const newVisitor = [];


    visitors.forEach(visitors => {
		newVisitor.push(visitors.replace(/\n/g, ''));
	})

    const form = useFormik({
		initialValues: {
			units: '',
			visitors: [],
			dateStart: '',
			dateEnd: '',
			purpose: '',
		},
		// enableReinitialize: true,
		// validationSchema: Yup.object({
		// 	ameImage: Yup.string().required('360 view is required.'),
		// 	ameName: Yup.string().required('Name is required.'),
		// 	tower: Yup.string().required('Tower number is required.'),
		// 	capacity: Yup.string().required('Capacity is required.'),
		// 	ameDesc: Yup.string().required('Description is required.'),
		// }),
		onSubmit: async (value, actions) => {
			try {
            
                acqUnit.push(value.units);
            
				const filteredOwners = unitOwners.filter((owner) => {
					return acqUnit.some((unit) => owner.Units.includes(unit));
				});

				const unitOwner = filteredOwners.map((owner) => {
                    const formattedFName = owner.FName.charAt(0).toUpperCase() + owner.FName.slice(1);
                    const formattedMName = owner.MName.charAt(0).toUpperCase();
                    const formattedLName =
                        owner.LName.charAt(0).toUpperCase() + owner.LName.slice(1);

                    return `${formattedFName} ${formattedMName} ${formattedLName}`;
				});

				addDoc(
					collection(db, 'maintenance', 'frontdesk', 'tbl_visitors'),
					{
						VisitorID: visitorID,
						For: unitOwner,
						Unit: acqUnit,
						Visitor: newVisitor,
						DateStart: value.dateStart,
						DateEnd: value.dateEnd,
						Purpose: value.purpose,
						Status: value.status,
						CreatedDate: serverTimestamp(),
					}
				);

                if (curUser) {
                    await addDoc(
                        collection(db, 'maintenance', 'admin', 'tbl_logs'),
                        {
                            CreatedDate: serverTimestamp(),
                            Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) added a new visitor/s.`,
                            Module: 'Visitors',
                        }
                    );
                }
				toast({
					title: 'New Visitor/s Added!',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});

			} catch (e) {
				toast({
					title: 'Error adding new visitor/s',
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
				console.log(e);
			}
			actions.resetForm();
            setVisitors([])
			onClose();
		},
	});

    const onCloseModal = () => {
        form.resetForm();
        setVisitors([])
        onClose();
    };

    return(
        <Flex>
			<CusModal
				header={'Fill the Visitor/s details.'}
				component={
					<VisitorsForm
						form={form}
                        visitors={visitors}
                        setVisitors={setVisitors}
                        // units={units}
                        // setUnits={setUnits}
					/>
				}
				action={'+ Add Visitor'}
				isOpen={isOpen}
				onClose={onCloseModal}
				onOpen={onOpen}
				form={form}
			/>
		</Flex>

    )
    
}

export default AddVisitors
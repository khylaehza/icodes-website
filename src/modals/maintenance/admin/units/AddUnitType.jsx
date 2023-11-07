import { CusModal } from '../../../../customs';
import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { UnitTypesForm } from '../../../../forms';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { db } from '../../../../../firebase-config';
import { collection, serverTimestamp, addDoc } from 'firebase/firestore';

import { useData } from '../../../../../DataContext';
const AddUnitType = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { curUser } = useData();
	const toast = useToast();

	const form = useFormik({
		initialValues: {
			typeName: '',
			typeCode: '',
		},
		validationSchema: Yup.object({
			typeName: Yup.string().required('Unit Type is required.'),
			typeCode: Yup.string().required('Unit Code is required.'),
		}),
		onSubmit: async (value, actions) => {
			try {
				await addDoc(
					collection(db, 'maintenance', 'admin', 'tbl_unitTypes'),
					{
						CreatedDate: serverTimestamp(),
						TypeName: value.typeName,
						TypeCode: value.typeCode,
						Status: true,
					}
				);
				if (curUser) {
					await addDoc(
						collection(db, 'maintenance', 'admin', 'tbl_logs'),
						{
							CreatedDate: serverTimestamp(),
							Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) added a new type.`,
							Module: 'Unit Types',
						}
					);
				}

				toast({
					title: 'New Unit Type Added!',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error adding new unit type',
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
			}

			actions.resetForm();
			onClose();
		},
	});

	return (
		<Flex>
			<CusModal
				header={'Fill the unit type details.'}
				component={<UnitTypesForm form={form} />}
				action={'+ Unit Type'}
				form={form}
				isOpen={isOpen}
				onClose={onClose}
				onOpen={onOpen}
				variant={'ghost'}
				color={'b.200'}
				justifyContent={'flex-start'}
			/>
		</Flex>
	);
};

export default AddUnitType;

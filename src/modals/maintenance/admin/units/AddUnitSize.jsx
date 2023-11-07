import { CusModal } from '../../../../customs';
import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { UnitSizesForm } from '../../../../forms';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { db } from '../../../../../firebase-config';
import { collection, serverTimestamp, addDoc } from 'firebase/firestore';
import { useData } from '../../../../../DataContext';
const AddUnitSize = () => {
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { curUser } = useData();
	const form = useFormik({
		initialValues: {
			size: '',
		},
		validationSchema: Yup.object({
			size: Yup.string().required('Unit Size is required.'),
		}),
		onSubmit: async (value, actions) => {
			try {
				await addDoc(
					collection(db, 'maintenance', 'admin', 'tbl_unitSize'),
					{
						CreatedDate: serverTimestamp(),
						UnitSize: value.size,
						Status: true,
					}
				);

				if (curUser) {
					await addDoc(
						collection(db, 'maintenance', 'admin', 'tbl_logs'),
						{
							CreatedDate: serverTimestamp(),
							Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) added a new size.`,
							Module: 'Unit Types',
						}
					);
				}

				toast({
					title: 'New Unit Size Added!',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error adding new condo size',
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
				header={'Fill the unit size details.'}
				component={<UnitSizesForm form={form} />}
				action={'+ Unit Size'}
				isOpen={isOpen}
				onClose={onClose}
				onOpen={onOpen}
				form={form}
				variant={'ghost'}
				color={'b.200'}
				justifyContent={'flex-start'}
			/>
		</Flex>
	);
};

export default AddUnitSize;

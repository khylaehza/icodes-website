import { CusModal } from '../../../../customs';
import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { IdGenerator } from '../../../../utilities';
import { useData } from '../../../../../DataContext';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UnitValueForm } from '../../../../forms';
import { db } from '../../../../../firebase-config';
import { collection, serverTimestamp, addDoc } from 'firebase/firestore';

const AddUnitValue = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { curUser } = useData();

	const toast = useToast();
	const id = IdGenerator(6);
	const form = useFormik({
		initialValues: {
			tower: '',
			years: '',
			increase: '',
		},
		validationSchema: Yup.object({
			tower: Yup.string().required('Tower is required.'),
			increase: Yup.string().required('Increase percent is required. '),
			years: Yup.string().required('Years is required.'),
		}),
		onSubmit: async (value, actions) => {
			try {
				await addDoc(
					collection(db, 'maintenance', 'admin', 'tbl_unitValues'),
					{
						ValueID: id,
						CreatedDate: serverTimestamp(),
						Tower: value.tower,
						Years: value.years,
						Increase: value.increase,
					}
				);

				if (curUser) {
					await addDoc(
						collection(db, 'maintenance', 'admin', 'tbl_logs'),
						{
							CreatedDate: serverTimestamp(),
							Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) added a new unit value computation.`,
							Module: 'Computations',
						}
					);
				}

				toast({
					title: 'New Unit Value Added!',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error adding new value',
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
				header={'Fill the unit value details.'}
				component={<UnitValueForm form={form} />}
				action={'+ Unit Value'}
				isOpen={isOpen}
				onClose={onClose}
				onOpen={onOpen}
				variant={'ghost'}
				color={'b.200'}
				justifyContent={'flex-start'}
				form={form}
			/>
		</Flex>
	);
};

export default AddUnitValue;

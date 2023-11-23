import { CusModal } from '../../../../customs';
import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { IdGenerator } from '../../../../utilities';
import { useData } from '../../../../../DataContext';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DiscountForm } from '../../../../forms';
import { db } from '../../../../../firebase-config';
import { collection, serverTimestamp, addDoc } from 'firebase/firestore';

const AddDiscount = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { curUser } = useData();

	const toast = useToast();
	const discId = IdGenerator(6);
	const form = useFormik({
		initialValues: {
			dscName: '',
			discount: '',
			dscId: '',
			dscType: '',
		},
		validationSchema: Yup.object({
			dscName: Yup.string().required('Discount Name is required.'),
			discount: Yup.string().required(
				'Discount Amount/Percent is required. '
			),
		}),
		onSubmit: async (value, actions) => {
			try {
				await addDoc(
					collection(db, 'maintenance', 'admin', 'tbl_discounts'),
					{
						CreatedDate: serverTimestamp(),
						DscName: value.dscName,
						Discount: value.discount,
						DscId: discId,
						DscType: value.dscType,
					}
				);

				if (curUser) {
					await addDoc(
						collection(db, 'maintenance', 'admin', 'tbl_logs'),
						{
							CreatedDate: serverTimestamp(),
							Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) added a new discount.`,
							Module: 'Unit Amounts',
						}
					);
				}

				toast({
					title: 'New Discount Added!',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error adding new discount',
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
				header={'Fill the discount details.'}
				component={<DiscountForm form={form} />}
				action={'+ Discounts'}
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

export default AddDiscount;

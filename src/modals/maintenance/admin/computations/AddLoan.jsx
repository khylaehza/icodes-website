import { CusModal } from '../../../../customs';
import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { IdGenerator } from '../../../../utilities';
import { useData } from '../../../../../DataContext';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LoanForm } from '../../../../forms';
import { db } from '../../../../../firebase-config';
import { collection, serverTimestamp, addDoc } from 'firebase/firestore';

const AddLoan = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { curUser } = useData();

	const toast = useToast();
	const id = IdGenerator(6);
	const form = useFormik({
		initialValues: {
			tower: '',
			remainTCP: '',
		},
		validationSchema: Yup.object({
			tower: Yup.string().required('Tower is required.'),
			remainTCP: Yup.string().required('Remaining TCP is required. '),
		}),
		onSubmit: async (value, actions) => {
			try {
				await addDoc(
					collection(db, 'maintenance', 'admin', 'tbl_loans'),
					{
						LoanID: id,
						CreatedDate: serverTimestamp(),
						Tower: value.tower,
						RemainTCP: value.remainTCP,
					}
				);
				if (curUser) {
					await addDoc(
						collection(db, 'maintenance', 'admin', 'tbl_logs'),
						{
							CreatedDate: serverTimestamp(),
							Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) added a new loan computation.`,
							Module: 'Computations',
						}
					);
				}

				toast({
					title: 'New Loan Computation Added!',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error adding new loan computation',
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
				header={'Fill the loan details.'}
				component={<LoanForm form={form} />}
				action={'+ Loan'}
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

export default AddLoan;

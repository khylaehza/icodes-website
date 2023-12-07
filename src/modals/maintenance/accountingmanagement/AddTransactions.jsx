import { CusModal } from '../../../customs';
import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { TransactionsForm } from '../../../forms';
import { IdGenerator } from '../../../utilities';
import { useData } from '../../../../DataContext';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
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
	const storage = getStorage();
	const transactId = IdGenerator(6);
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { curUser, soa } = useData();
	const [unit, setUnit] = useState('');
	const [month, setMonth] = useState();

	const filteredOwner = soa.filter((owner) => {
		if (owner.Unit == unit) {
			return owner;
		}
	});

	const choice = filteredOwner[0] ? filteredOwner[0].SOA : '';

	const filteredMonth = () => {
		let filData = '';
		if (choice) {
			Object.values(choice).filter((data, key) => {
				if (month == data.month && data.total) {
					filData = { ...data, key };
				}
			});
		}
		return filData;
	};

	const form = useFormik({
		initialValues: {
			unitOwner: filteredOwner[0] ? filteredOwner[0].FullName : '',
			unit: unit,
			forMonth: month ? month : '',
			datePaid: '',
			amountPaid: filteredMonth()
				? filteredMonth().total.substring(1)
				: '',
			paymentMode: '',
			receiptImg: '',
			interest: '',
			receiptNo: '',
			status: '',
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			unit: Yup.string().required('Unit is required. '),
			forMonth: Yup.string().required('Payment for Month is required.'),
			datePaid: Yup.string().required('Date Paid is required.'),
			amountPaid: Yup.string().required('Paid Amount is required. '),
			receiptNo: Yup.number().required('Receipt Number is required.'),
			paymentMode: Yup.string().required('Payment mode is required. '),
			receiptImg: Yup.mixed()
				.required('Tower Image is required.')
				.test(
					'FILE_SIZE',
					'Too Big!',
					(value) => value && value.size < 1024 * 1024
				)
				.test(
					'FILE_TYPE',
					'Invalid File Type!',
					(value) =>
						value &&
						['image/png', 'image/jpeg', 'image/jpg'].includes(
							value.type
						)
				),
		}),
		onSubmit: async (value, actions) => {
			const storageRef = ref(
				storage,
				`admin/transactions/${
					filteredOwner[0] ? filteredOwner[0].BuyersId : ''
				}/${transactId}/receipt.png`
			);
			const uploadTask = uploadBytesResumable(
				storageRef,
				value.receiptImg
			);
			try {
				uploadTask.on(
					'state_changed',
					(snapshot) => {
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) *
							100;

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
						console.log(error);
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then(
							async (downloadURL) => {
								await addDoc(
									collection(
										db,
										'maintenance',
										'accountingmanagement',
										'tbl_transactions'
									),
									{
										CreatedDate: serverTimestamp(),
										TransactionID: transactId,
										Unit: value.unit,
										UnitOwner: value.unitOwner,
										ReceiptNo: value.receiptNo,
										ForMonth: value.forMonth,
										DatePaid: value.datePaid,
										AmountPaid: value.amountPaid,
										PayMode: value.paymentMode,
										Receipt: downloadURL,
										Interest: value.interest,
										Status: value.status,
									}
								);
							}
						);
					}
				);

				if (curUser) {
					await addDoc(
						collection(db, 'maintenance', 'admin', 'tbl_logs'),
						{
							CreatedDate: serverTimestamp(),
							Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) added a new transaction.`,
							Module: 'Transactions',
						}
					);
				}

				if (value.status == 'Confirmed') {
					const collectionRef = doc(
						db,
						'maintenance',
						'accountingmanagement',
						'tbl_soa',
						`${filteredOwner[0] ? filteredOwner[0].id : ''}`
					);

					let status = {};
					let amountPaid = {};
					let forMonth = {};
					let datePaid = {};
					let id = {};
					let paymentMode = {};
					let receiptNo = {};

					status[`SOA.${filteredMonth().key + 1}.status`] = 'Paid';
					amountPaid[`SOA.${filteredMonth().key + 1}.amountPaid`] =
						value.amountPaid;
					forMonth[`SOA.${filteredMonth().key + 1}.forMonth`] =
						value.forMonth;
					datePaid[`SOA.${filteredMonth().key + 1}.datePaid`] =
						value.datePaid;
					id[`SOA.${filteredMonth().key + 1}.transactId`] =
						transactId;
					paymentMode[`SOA.${filteredMonth().key + 1}.paymentMode`] =
						value.paymentMode;
					receiptNo[`SOA.${filteredMonth().key + 1}.receiptNo`] =
						value.receiptNo;
					updateDoc(collectionRef, amountPaid);
					updateDoc(collectionRef, receiptNo);
					updateDoc(collectionRef, status);
					updateDoc(collectionRef, forMonth);
					updateDoc(collectionRef, datePaid);
					updateDoc(collectionRef, id);
					updateDoc(collectionRef, paymentMode);
				}

				toast({
					title: 'New Transaction Added!',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				console.log(e);
				toast({
					title: 'Error adding new Transaction',
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
			}

			setUnit('');
			setMonth('');
			actions.resetForm();
			onClose();
		},
	});

	const onCloseModal = () => {
		onClose();
		setUnit('');
		setMonth('');
		actions.resetForm();
	};

	return (
		<Flex>
			<CusModal
				header={'Fill the transaction details.'}
				component={
					<TransactionsForm
						form={form}
						setUnit={setUnit}
						choice={Object.values(choice)}
						setMonth={setMonth}
					/>
				}
				action={'+ Transaction'}
				isOpen={isOpen}
				onClose={onCloseModal}
				onOpen={onOpen}
				justifyContent={'flex-start'}
				form={form}
			/>
		</Flex>
	);
};

export default AddTransactions;

import { useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { CusEdit } from '../../../customs';
import { EditTransactionsForm } from '../../../forms';
import { useData } from '../../../../DataContext';
import { useFormik } from 'formik';
import {
	updateDoc,
	serverTimestamp,
	doc,
	addDoc,
	collection,
} from 'firebase/firestore';
import { db } from '../../../../firebase-config';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
	getMetadata,
} from 'firebase/storage';
const EditTransactions = ({
	data,
	id,
	mainCollection,
	tblDocUser,
	tblUserCol,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const { curUser, soa } = useData();
	const storage = getStorage();
	const [imgFileName, setImgFileName] = useState('');
	const filteredOwner = soa.filter((owner) => {
		if (owner.Unit == data.Unit) {
			return owner;
		}
	});

	const choice = filteredOwner[0] ? filteredOwner[0].SOA : '';

	const filteredMonth = () => {
		let filData = '';
		if (choice) {
			Object.values(choice).filter((x, key) => {
				if (data.ForMonth == x.month && x.total) {
					filData = { ...x, key };
				}
			});
		}
		return filData;
	};

	const imgName = ref(
		storage,
		`admin/transactions/${
			filteredOwner[0] ? filteredOwner[0].BuyersId : ''
		}/${data.TransactionID}/receipt.png`
	);

	getMetadata(imgName).then((metadata) => {
		const fileName = metadata.name;
		setImgFileName(fileName);
	});

	const editForm = useFormik({
		initialValues: {
			status: data.Status,
			receiptNo: data.ReceiptNo,
			amountPaid: data.AmountPaid,
			unit: data.Unit,
			forMonth: data.ForMonth,
			datePaid: data.DatePaid,
			paymentMode: data.PayMode,
			receiptImg: data.Receipt,
		},
		enableReinitialize: true,
		onSubmit: async (value, actions) => {
			const docRef = doc(db, mainCollection, tblDocUser, tblUserCol, id);

			try {
				updateDoc(docRef, {
					EditedDate: serverTimestamp(),
					Status: value.status,
					ReceiptNo: value.receiptNo,
					AmountPaid: value.amountPaid,
					DatePaid: value.datePaid,
					PayMode: value.paymentMode,
				});

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
				let paymentMode = {};
				let receiptNo = {};
				let id = {};
				status[`SOA.${filteredMonth().key + 1}.status`] = 'Paid';
				amountPaid[`SOA.${filteredMonth().key + 1}.amountPaid`] =
					value.amountPaid;
				datePaid[`SOA.${filteredMonth().key + 1}.datePaid`] =
					value.datePaid;
				paymentMode[`SOA.${filteredMonth().key + 1}.paymentMode`] =
					value.paymentMode;
				receiptNo[`SOA.${filteredMonth().key + 1}.receiptNo`] =
					value.receiptNo;
				id[`SOA.${filteredMonth().key + 1}.transactId`] =
					data.TransactionID;

				updateDoc(collectionRef, amountPaid);
				updateDoc(collectionRef, receiptNo);
				updateDoc(collectionRef, forMonth);
				updateDoc(collectionRef, datePaid);
				updateDoc(collectionRef, paymentMode);
				updateDoc(collectionRef, status);
				updateDoc(collectionRef, id);

				if (curUser) {
					await addDoc(
						collection(db, 'maintenance', 'admin', 'tbl_logs'),
						{
							CreatedDate: serverTimestamp(),
							Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) added a new loan computation.`,
							Module: 'Transactions',
						}
					);
				}

				if (data.Receipt !== value.receiptImg) {
					const uploadTask = uploadBytesResumable(
						imgName,
						value.receiptImg
					);

					uploadTask.on(
						'state_changed',
						(snapshot) => {
							const progress =
								(snapshot.bytesTransferred /
									snapshot.totalBytes) *
								100;

							switch (snapshot.state) {
								case 'paused':
									console.log('Upload is paused');
									break;
								case 'running':
									console.log('Upload is running');
									break;
								default:
									console.log('Uploaded');
							}
						},
						(error) => {
							console.log(error);
						},
						() => {
							getDownloadURL(uploadTask.snapshot.ref).then(
								(downloadURL) => {
									try {
										updateDoc(docRef, {
											Receipt: downloadURL,
										});
									} catch (e) {
										toast({
											title: 'Edited failed!',
											status: 'error',
											duration: 9000,
											isClosable: true,
										});
										console.log(e);
									}
								}
							);
						}
					);
				}
				toast({
					title: 'Transaction Approved!',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				console.log(e);
				toast({
					title: 'Error approving transaction',
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
		<CusEdit
			header={`Edit ${data.id}`}
			isOpen={isOpen}
			onClose={onClose}
			onOpen={onOpen}
			component={
				<EditTransactionsForm
					form={editForm}
					fileName={imgFileName}
				/>
			}
		/>
	);
};

export default EditTransactions;

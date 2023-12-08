import {
	CusTitle,
	CusTD,
	CusDelete,
	CusTransactionModal,
	CusEnlargeImage,
} from '../../../customs';
import {
	Image,
	Tr,
	Td,
	ButtonGroup,
	useDisclosure,
	useToast,
	Button,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { DateChecker } from '../../../utilities';
import { db } from '../../../../firebase-config';
import { updateDoc, serverTimestamp, doc } from 'firebase/firestore';
import { EditTransactions } from '../../../modals';
import moment from 'moment';
const TransactionsTable = ({ data, search, all, soa }) => {
	const toast = useToast();
	const ret = search ? all : data;
	const [selectedImage1, setSelectedImage1] = useState(null);
	const {
		isOpen: isImage1Open,
		onOpen: onImage1Open,
		onClose: onImage1Close,
	} = useDisclosure();
	const handleImageClick1 = (src) => {
		setSelectedImage1(src);
		onImage1Open();
	};

	return ret
		.filter((item) => {
			return search.toLowerCase() === ''
				? item
				: item.ReceiptNo.toString().includes(search);
		})
		.map((data, id) => {
			if (data.CreatedDate) {
				const onUpdate = async () => {
					const matchKey = soa
						.filter((item) => item.Unit === data.Unit)
						.map((soa) => soa.SOA);

					const key = matchKey.map((obj) => {
						const keys = Object.keys(obj);
						const value = keys.find(
							(key) => obj[key].month === data.ForMonth
						);
						const keyValue = parseInt(value[0]);

						return keyValue;
					});

					soa.map((data, id) => {
						console.log(data.id);
						const collectionRef = doc(
							db,
							'maintenance',
							'accountingmanagement',
							'tbl_soa',
							`${data.id}`
						);

						try {
							let status = {};
							let amountPaid = {};
							let forMonth = {};
							let datePaid = {};
							let id = {};
							let paymentMode = {};
							let receiptNo = {};

							status[`SOA.${key[0]}.status`] = '';
							amountPaid[`SOA.${key[0]}.amountPaid`] = '';
							forMonth[`SOA.${key[0]}.forMonth`] = '';
							datePaid[`SOA.${key[0]}.datePaid`] = '';
							id[`SOA.${key[0]}.transactId`] = '';
							paymentMode[`SOA.${key[0]}.paymentMode`] = '';
							receiptNo[`SOA.${key[0]}.receiptNo`] = '';

							updateDoc(collectionRef, amountPaid);
							updateDoc(collectionRef, receiptNo);
							updateDoc(collectionRef, status);
							updateDoc(collectionRef, forMonth);
							updateDoc(collectionRef, datePaid);
							updateDoc(collectionRef, id);
							updateDoc(collectionRef, paymentMode);
						} catch (e) {
							console.log(e);
							toast({
								title: 'Deleting transaction details',
								status: 'error',
								duration: 9000,
								isClosable: true,
							});
						}
					});
				};

				return (
					<React.Fragment key={id}>
						<Tr
							key={id}
							display={{
								base: 'grid',
								xl: 'table-row',
							}}
							sx={{
								'@media print': {
									display: 'table-row',
								},
								gridTemplateColumns:
									'minmax(0px, 50%) minmax(0px, 50%)',
								gridGap: '10px',
							}}
						>
							<React.Fragment>
								<CusTitle component={'Created At'} />
								<CusTD
									component={
										<DateChecker
											dateToCheck={
												new Date(
													data.CreatedDate.seconds *
														1000
												)
											}
										/>
									}
								/>

								<CusTitle component={'Transaction ID'} />
								<CusTD component={data.TransactionID} />

								<CusTitle component={'Unit Owner'} />
								<CusTD component={data.UnitOwner} />
								<CusTitle component={'Unit Name'} />
								<CusTD component={data.Unit} />
								<CusTitle component={'Amount Paid'} />
								<CusTD
									component={`₱ ${
										data.AmountPaid.includes('.')
											? data.AmountPaid
											: `${data.AmountPaid}.00`
									}`}
								/>
								<CusTitle component={'Month Paid'} />
								<CusTD
									component={`${moment(data.DatePaid).format(
										'MM/DD/YYYY'
									)}`}
								/>
								<CusTitle component={'Mode of Payment'} />
								<CusTD component={data.PayMode} />
								<CusTitle component={'Receipt'} />
								<Td width={{ base: '', xl: '100px' }}>
									<Image
										src={data.Receipt}
										w='45px'
										onClick={() =>
											handleImageClick1(data.Receipt)
										}
									/>
								</Td>
								<CusTitle component={'Receipt No.'} />
								<CusTD component={data.ReceiptNo} />
								<CusTitle component={'Transaction'} />
								{data.Status == 'Confirmed' ? (
									<>
										<CusTD
											component={
												<CusTransactionModal
													data={data}
													all={ret}
												/>
											}
										/>
									</>
								) : (
									<CusTD component={'N/A'} />
								)}

								<CusTitle component={'Status'} />
								<CusTD component={data.Status} />
							</React.Fragment>
							<CusTitle component={'Actions'} />
							<CusTD
								component={
									<ButtonGroup
										variant='solid'
										size='sm'
										spacing={3}
									>
										{data.id && (
											<EditTransactions
												data={data}
												id={data.id}
												mainCollection='maintenance'
												tblDocUser='accountingmanagement'
												tblUserCol='tbl_transactions'
											/>
										)}

										<CusDelete
											id={data.id}
											label={` ${data.TransactionID}'s Data`}
											mainCollection='maintenance'
											tblDocUser='accountingmanagement'
											tblUserCol='tbl_transactions'
											onUpdate={onUpdate}
											hasFile={false}
										/>
									</ButtonGroup>
								}
							/>
							<CusTD
								component={
									<CusEnlargeImage
										isOpen={isImage1Open}
										onClose={onImage1Close}
										label={'Receipt Preview'}
										body={
											<Image
												src={selectedImage1}
												width={'680px'}
												height={'500px'}
											/>
										}
									/>
								}
							/>
						</Tr>
					</React.Fragment>
				);
			}
		});
};

export default TransactionsTable;

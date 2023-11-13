import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	Flex,
	Heading,
	HStack,
	VStack,
	Text,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
} from '@chakra-ui/react';
import { CusTD, CusTitle } from './CusTableItems';

import moment from 'moment';
import { OrdinalSuffix } from '../utilities';
import React, { useState } from 'react';

import { useData } from '../../DataContext';

const BoxStyle = ({
	gap = 10,
	child,
	bgColor,
	borderColor,
	border,
	flexDir,
}) => {
	return (
		<HStack
			gap={gap}
			justify={'space-between'}
			p={3}
			bgColor={bgColor}
			w={'full'}
			rounded={5}
			fontSize={12}
			border={border}
			borderColor={borderColor}
			flexDir={flexDir}
			justifyContent={'center'}
		>
			{child}
		</HStack>
	);
};

const FlexStyle = ({ child }) => {
	return (
		<Flex
			gap={2}
			p={3}
			border={'1px'}
			borderColor={'w.200'}
			w={'100%'}
			rounded={5}
			fontSize={12}
			flexDir={'column'}
		>
			{child}
		</Flex>
	);
};

const CusTransactionModal = ({ data, all }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { soa } = useData();

	let soaGroup = [];
	let details = [];

	soa.filter((soaDet) => {
		if (soaDet.FullName == data.UnitOwner) {
			soaGroup.push({
				soa: soaDet.SOA,
				name: soaDet.FullName,
				othersAmt: soaDet.PerWithOthers,
				unitAmt: soaDet.TotalPayInMon,
				unitName: soaDet.Unit,
				month: data.ForMonth,
				payMode: data.PayMode,
				receiptNo: data.ReceiptNo,
				amtPaid: data.AmountPaid,
				transId: data.TransactionID,
				datePaid: data.DatePaid,
			});
		}
	});

	const table = Object.values(soaGroup[0].soa);

	console.log(table);
	const personalDet = [
		{ Name: soaGroup[0].name },
		{ Unit: soaGroup[0].unitName },
	];
	const amountDet = [
		{ Name: soaGroup[0].unitAmt },
		{ Unit: soaGroup[0].othersAmt },
		{ Total: soaGroup[0].unitAmt + soaGroup[0].othersAmt },
	];
	soaGroup.filter((a) => {
		Object.values(a.soa).filter((item) => {
			if (item.status == 'Paid') {
				details.push({ ...item, name: a.name });
			}
		});
	});

	console.log(details);

	// console.log(soaGroup);
	// // rest of soa kapag madmaing transaction ung isang user
	// let restOfSoa = [];

	// soaGroup.filter((a) => {
	// 	all.find((s) => {
	// 		if (a.name == s.UnitOwner) {
	// 			// if (s.TransactionID != a.transId) {
	// 			console.log(s);
	// 			Object.values(a.soa).filter((item) => {
	// 				// console.log(item);
	// 				if (item.status == 'Paid') {
	// 					if (item.month == s.ForMonth) {
	// 						restOfSoa.push({
	// 							// ...item,
	// 							num: item.num,
	// 							month: s.ForMonth,

	// 							name: s.UnitOwner,
	// 							amtPaid: s.AmountPaid,
	// 							transId: s.TransactionID,
	// 							datePaid: s.DatePaid,
	// 							payMode: s.PayMode,
	// 							receiptNo: s.ReceiptNo,
	// 						});
	// 					}
	// 				}
	// 			});
	// 			// }
	// 		}
	// 	});
	// });

	// // console.log(restOfSoa);

	// let finalDetails = [];
	// let sum = 0;

	// if (details.length > 1) {
	// 	restOfSoa.filter((find) => {
	// 		soaGroup.filter((s) => {
	// 			if (find.name == s.name) {
	// 				// if (find.month != s.month) {
	// 				sum += parseFloat(s.amtPaid.replace(/,/g, ''));

	// 				finalDetails.push({
	// 					...find,
	// 					DatePaid: moment(find.datePaid).format('DD-MMM-YYYY'),
	// 					Transaction: find.transId,
	// 					PayMode: find.payMode,
	// 					ReceiptNo: find.receiptNo,
	// 					AmountPaid: find.amtPaid,
	// 					Remain: new Intl.NumberFormat('en-US', {
	// 						maximumFractionDigits: 2,
	// 						minimumFractionDigits: 2,
	// 					}).format(s.unitAmt - sum),
	// 					// Current: true,
	// 				});
	// 				// }
	// 			}
	// 		});
	// 	});
	// } else {
	// 	details.filter((find) => {
	// 		soaGroup.filter((s) => {
	// 			if (find.name == s.name) {
	// 				if (find.month == s.month) {
	// 					sum += parseFloat(s.amtPaid.replace(/,/g, ''));

	// 					finalDetails.push({
	// 						...find,
	// 						DatePaid: moment(s.datePaid).format('DD-MMM-YYYY'),
	// 						Transaction: s.transId,
	// 						PayMode: s.payMode,
	// 						ReceiptNo: s.receiptNo,
	// 						AmountPaid: s.amtPaid,
	// 						Remain: new Intl.NumberFormat('en-US', {
	// 							maximumFractionDigits: 2,
	// 							minimumFractionDigits: 2,
	// 						}).format(s.unitAmt - sum),
	// 						// Current: true,
	// 					});
	// 				}
	// 			}
	// 		});
	// 	});
	// }

	// console.log(finalDetails);
	console.log(amountDet[2].Total);

	let deduct = 0;

	return (
		<>
			<Button
				onClick={onOpen}
				variant={'link'}
				fontSize={'xs'}
			>
				View Transactions
			</Button>

			<Modal
				isOpen={isOpen}
				onClose={onClose}
				size={'6xl'}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader></ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex justify={'center'}>
							<VStack
								flexDir={'column'}
								gap={2}
								justify={'space-between'}
							>
								<Heading size={'md'}>Transactions List</Heading>
								<BoxStyle
									gap={20}
									bgColor={'b.100'}
									justifyContent={'center'}
									alignItems={'center'}
									justifyItems={'center'}
									alignContent={'center'}
									child={
										<Flex
											flexDir={'row'}
											gap={70}
										>
											{personalDet.map((item, key) => (
												<Flex key={key}>
													<Text fontWeight={'bold'}>
														{Object.keys(item)
															.toString()
															.toUpperCase()}
													</Text>
													:{' '}
													{Object.values(
														item
													).toString()}
												</Flex>
											))}
											{amountDet.map((item, key) => (
												<Flex key={key}>
													<Text fontWeight={'bold'}>
														{Object.keys(item)
															.toString()
															.toUpperCase()}
													</Text>
													: ₱ {''}
													{new Intl.NumberFormat(
														'en-US',
														{
															maximumFractionDigits: 2,
															minimumFractionDigits: 2,
														}
													).format(
														Object.values(item)
													)}
												</Flex>
											))}
										</Flex>
									}
								/>

								{/* <BoxStyle
									bgColor={'b.100'}
									child={
										<>
											{unitDet.map((item, key) => (
												<Flex
													flexDir={'row'}
													key={key}
												>
													<Text fontWeight={'bold'}>
														{Object.keys(item)
															.toString()
															.toUpperCase()}
													</Text>
													:{' '}
													{Object.values(
														item
													).toString()}
												</Flex>
											))}
										</>
									}
								/> */}

								{/* <VStack
									p={3}
									bgColor={'w.100'}
									w={'100%'}
									rounded={5}
									fontSize={12}
								>
									
									<BoxStyle
										bgColor={'w.200'}
										border={'1px'}
										borderColor={'w.200'}
										child={
											<>
												<Text fontWeight={'bold'}>
													TOTAL CONTRACT PRICE:
												</Text>
												<Text>
													₱ {''}
													{new Intl.NumberFormat(
														'en-US',
														{
															maximumFractionDigits: 2,
															minimumFractionDigits: 2,
														}
													).format(data.TotalTCP)}
												</Text>
											</>
										}
									/>

									<BoxStyle
										bgColor={'w.200'}
										border={'1px'}
										borderColor={'w.200'}
										child={
											<>
												<Text fontWeight={'bold'}>
													TOTAL OTHER CHARGES:
												</Text>
												<Text>
													₱ {''}
													{new Intl.NumberFormat(
														'en-US',
														{
															maximumFractionDigits: 2,
															minimumFractionDigits: 2,
														}
													).format(data.TotalCharge)}
												</Text>
											</>
										}
									/>
								</VStack> */}

								<Flex
									border={'1px'}
									borderColor={'w.100'}
									bgColor={'w.100'}
									rounded={5}
									p={3}
									w={'100%'}
								>
									<Table
										variant='simple'
										fontSize={12}
									>
										<Thead alignSelf='center'>
											<Tr>
												<Th textAlign={'center'}>
													No.
												</Th>
												<Th textAlign={'center'}>
													Transaction No.
												</Th>

												<Th textAlign={'center'}>
													Due Date
												</Th>
												<Th textAlign={'center'}>
													Date Paid
												</Th>
												<Th textAlign={'center'}>
													Mode of Payment
												</Th>
												<Th textAlign={'center'}>
													Amount
												</Th>
												<Th textAlign={'center'}>
													Receipt No.
												</Th>
												<Th textAlign={'center'}>
													Remaining Balance
												</Th>
											</Tr>
										</Thead>
										<Tbody>
											{table.map((item, key) => {
												if (item.status == 'Paid') {
													deduct += parseFloat(
														item.amountPaid.replace(
															/,/g,
															''
														)
													);

													return (
														<Tr
															key={key}
															bgColor={
																data.TransactionID ==
																	item.transactId &&
																'w.200'
															}
														>
															<CusTD
																component={
																	item.num
																}
															/>
															<CusTD
																component={
																	item.transactId
																}
															/>
															<CusTD
																component={
																	item.month
																}
															/>
															<CusTD
																component={moment(
																	item.datePaid
																).format(
																	'DD-MMM-YYYY'
																)}
															/>
															<CusTD
																component={
																	item.paymentMode
																}
															/>
															<CusTD
																component={
																	'₱ ' +
																	item.amountPaid
																}
															/>
															<CusTD
																component={
																	item.receiptNo
																}
															/>
															<CusTD
																component={`₱ ${new Intl.NumberFormat(
																	'en-US',
																	{
																		maximumFractionDigits: 2,
																		minimumFractionDigits: 2,
																	}
																).format(
																	amountDet[2]
																		.Total -
																		deduct
																)}`}
															/>
														</Tr>
													);
												}
											})}
										</Tbody>
									</Table>
								</Flex>
							</VStack>
						</Flex>
					</ModalBody>

					<ModalFooter>
						<Button
							variant={'primary'}
							onClick={onClose}
						>
							Print
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CusTransactionModal;

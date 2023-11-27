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
import { CusTransactionPDF } from './index'
import moment from 'moment';
import { OrdinalSuffix } from '../utilities';
import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
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

const CusTransactionModal = ({ data }) => {
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

	let deduct = 0;
	const header = [
		'No.',
		'Transaction No.',
		'Due Date',
		'Date Paid',
		'Mode of Payment',
		'Amount',
		'Receipt No.',
		'Remaining Balance',
	];

	const Transactions = () =>{
		return(
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
								{header.map((head, key) => (
									<Th
										textAlign={'center'}
										key={key}
									>
										{head}
									</Th>
								))}
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
		)
	}
	const Print = () => {
		return(
			<PDFDownloadLink
				document={
					<CusTransactionPDF
						personalDet={personalDet}
						amountDet={amountDet}
						table={table}
						deduct={deduct}
					/>
				}
				fileName={`Transaction${data.TransactionID}.pdf`}
			>
				<Button variant={'primary'} onClick={onClose}>Print</Button>
		</PDFDownloadLink>
		)
	}

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
						<Transactions/>
					</ModalBody>

					<ModalFooter>
						<Print/>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CusTransactionModal;

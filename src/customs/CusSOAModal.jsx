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
import React from 'react';

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
function CusModal({ data }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const personalDet = [
		{ Name: data.FullName },
		{ ID: data.BuyersId },
		{
			'Reserved Date': moment(data.CreatedDate.seconds * 1000).format(
				'DD-MMM-YYYY'
			),
		},
	];

	const unitDet = [
		{ Tower: OrdinalSuffix(data.Tower) },
		{ Floor: `${OrdinalSuffix(parseInt(data.Floor))} Floor` },
		{ 'Unit Number': data.UnitNo },
		{ Unit: data.Unit },
	];

	const compVat = new Intl.NumberFormat('en-US').format(data.ComputedVat);

	const compDeduct = new Intl.NumberFormat('en-US').format(
		data.TotalDiscount
	);

	const remainPer = 100 - data.MonthlyPercent;
	const remainUnit = new Intl.NumberFormat('en-US', {
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
	}).format((parseFloat(remainPer) / 100) * data.TotalTCP);
	const remainOthers = new Intl.NumberFormat('en-US', {
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
	}).format((parseFloat(remainPer) / 100) * data.TotalCharge);

	const totalRemain = new Intl.NumberFormat('en-US', {
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
	}).format(
		(parseFloat(remainPer) / 100) * data.TotalTCP +
			(parseFloat(remainPer) / 100) * data.TotalCharge
	);

	const table = Object.values(data.SOA);

	return (
		<>
			<Button
				onClick={onOpen}
				variant={'link'}
				fontSize={'xs'}
			>
				View SOA
			</Button>

			<Modal
				isOpen={isOpen}
				onClose={onClose}
				size={'2xl'}
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
								<Heading size={'md'}>
									Statement of Account
								</Heading>
								<BoxStyle
									gap={20}
									bgColor={'b.100'}
									child={
										<>
											{personalDet.map((item, key) => (
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
								/>

								<BoxStyle
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
								/>

								<VStack
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
													CONTRACT PRICE:
												</Text>
												<Text>
													{`₱ ${
														data.Amount.includes(
															'.'
														)
															? data.Amount
															: `${data.Amount}.00`
													}`}
												</Text>
											</>
										}
									/>

									<FlexStyle
										child={
											<>
												<Text fontWeight={'bold'}>
													DEDUCTION/S:
												</Text>
												{data.Discounts.map(
													(item, key) => {
														return (
															<React.Fragment
																key={key}
															>
																<HStack
																	ml={3}
																	justifyContent={
																		'space-between'
																	}
																	align={
																		'flex-start'
																	}
																>
																	<Text
																		fontWeight={
																			'bold'
																		}
																	>
																		{
																			item.name
																		}
																	</Text>
																	<Text>
																		- ₱
																		{new Intl.NumberFormat(
																			'en-US',
																			{
																				maximumFractionDigits: 2,
																				minimumFractionDigits: 2,
																			}
																		).format(
																			item.amount
																		)}
																	</Text>
																</HStack>
															</React.Fragment>
														);
													}
												)}
												<HStack
													justifyContent={
														'space-between'
													}
													align={'flex-start'}
												>
													<Text fontWeight={'bold'}>
														TOTAL DEDUCTION/S:
													</Text>
													<Text>
														{`₱ ${
															compDeduct.includes(
																'.'
															)
																? compDeduct
																: `${compDeduct}.00`
														}`}
													</Text>
												</HStack>
											</>
										}
									/>

									<FlexStyle
										child={
											<>
												<Text fontWeight={'bold'}>
													ADDITION/S:
												</Text>
												<HStack
													ml={3}
													justifyContent={
														'space-between'
													}
													align={'flex-start'}
												>
													<Text fontWeight={'bold'}>
														VAT ({data.Vat}%):
													</Text>
													<Text>
														+{' '}
														{`₱ ${
															compVat.includes(
																'.'
															)
																? compVat
																: `${compVat}.00`
														}`}
													</Text>
												</HStack>

												<HStack
													justifyContent={
														'space-between'
													}
													align={'flex-start'}
												>
													<Text fontWeight={'bold'}>
														TOTAL ADDITION/S:
													</Text>
													<Text>
														{' '}
														{`₱ ${
															compVat.includes(
																'.'
															)
																? compVat
																: `${compVat}.00`
														}`}
													</Text>
												</HStack>
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
										bgColor={'w.100'}
										border={'1px'}
										borderColor={'w.200'}
										child={
											<>
												<Text fontWeight={'bold'}>
													OTHER CHARGES (
													{data.OtherChargePercent}%
													of CP):
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
								</VStack>

								<VStack
									p={3}
									bgColor={'w.100'}
									w={'100%'}
									rounded={5}
									fontSize={12}
								>
									<FlexStyle
										child={
											<>
												<HStack
													justifyContent={
														'space-between'
													}
													align={'flex-start'}
												>
													<Text fontWeight={'bold'}>
														PAYMENT OF UNIT (
														{data.MonthlyPercent}%
														of TCP):
													</Text>
													<Text>
														₱ {''}
														{new Intl.NumberFormat(
															'en-US',
															{
																maximumFractionDigits: 2,
																minimumFractionDigits: 2,
															}
														).format(
															data.PerWithTCP
														)}
													</Text>
												</HStack>
												<HStack
													justifyContent={
														'space-between'
													}
													align={'flex-start'}
												>
													<Text fontWeight={'bold'}>
														RESERVATION FEE:
													</Text>
													<Text>
														- {}
														{`₱ ${
															data.ReservationFee.toString().includes(
																'.'
															)
																? data.ReservationFee
																: `${data.ReservationFee}.00`
														}`}
													</Text>
												</HStack>
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
													TOTAL PAYMENT OF UNIT IN{' '}
													{data.NoOfMonths} MONTHS:
												</Text>
												<Text>
													₱ {''}
													{new Intl.NumberFormat(
														'en-US',
														{
															maximumFractionDigits: 2,
															minimumFractionDigits: 2,
														}
													).format(
														data.TotalPayInMon
													)}
												</Text>
											</>
										}
									/>

									<BoxStyle
										bgColor={'w.100'}
										border={'1px'}
										borderColor={'w.200'}
										child={
											<>
												<Text fontWeight={'bold'}>
													PAYMENT OF OTHER CHARGES
													(20% of OC):
												</Text>
												<Text>
													₱ {''}
													{new Intl.NumberFormat(
														'en-US',
														{
															maximumFractionDigits: 2,
															minimumFractionDigits: 2,
														}
													).format(
														data.PerWithOthers
													)}
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
													TOTAL PAYMENT OF OTHER
													CHARGES IN 60 MONTHS:
												</Text>
												<Text>
													₱ {''}
													{new Intl.NumberFormat(
														'en-US',
														{
															maximumFractionDigits: 2,
															minimumFractionDigits: 2,
														}
													).format(
														data.PerWithOthers
													)}
												</Text>
											</>
										}
									/>
								</VStack>
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
													Date
												</Th>
												<Th textAlign={'center'}>
													Amount
												</Th>
												<Th textAlign={'center'}>
													Other
												</Th>
												<Th textAlign={'center'}>
													Total
												</Th>
											</Tr>
										</Thead>
										<Tbody>
											{table.map((data, key) => (
												<Tr key={key}>
													<CusTD
														component={data.num}
													/>
													<CusTD
														component={data.month}
													/>
													<CusTD
														component={data.unit}
													/>
													<CusTD
														component={data.others}
													/>
													<CusTD
														component={data.total}
													/>
												</Tr>
											))}
										</Tbody>
									</Table>
								</Flex>
								<VStack
									p={3}
									bgColor={'w.100'}
									w={'100%'}
									rounded={5}
									fontSize={12}
								>
									<BoxStyle
										bgColor={'w.100'}
										border={'1px'}
										borderColor={'w.200'}
										child={
											<>
												<Text fontWeight={'bold'}>
													REMAINING UNIT BALANCE (
													{remainPer}% of TCP):
												</Text>
												<Text>₱ {remainUnit}</Text>
											</>
										}
									/>
									<BoxStyle
										bgColor={'w.100'}
										border={'1px'}
										borderColor={'w.200'}
										child={
											<>
												<Text fontWeight={'bold'}>
													REMAINING OTHER BALANCE (
													{remainPer}% of OC):
												</Text>
												<Text>₱ {remainOthers}</Text>
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
													TOTAL REMAINING BALANCE:
												</Text>
												<Text>₱ {totalRemain}</Text>
											</>
										}
									/>
								</VStack>
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
}

export default CusModal;

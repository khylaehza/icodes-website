import React, { useState } from 'react';
import {
	Flex,
	Text,
	Heading,
	Menu,
	MenuList,
	MenuButton,
	Button,
	Divider,
	ScaleFade,
} from '@chakra-ui/react';

import { Body } from '../../../sections/maintenance';
import { CusTable } from '../../../customs';
import { useData } from '../../../../DataContext';
import moment from 'moment';
import { RiArrowDownSFill } from 'react-icons/ri';
import { AddUnitValue, AddLoan, AddPaymentTerms } from '../../../modals';
import { UnitValueTable, LoanTable, PayTermTable } from '../../../tables';

const Computations = () => {
	return (
		<Flex
			w='full'
			minH='100vh'
			alignItems='stretch'
			bg={'#EFF3F6'}
		>
			<Body children={<Item />} />
		</Flex>
	);
};

const Item = () => {
	const { curUser, amounts, unitValues, payterm, loans } = useData();

	const [search, setSearch] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const valueHeader = [
		'Created At',
		'ID',
		'Tower',
		'Years',
		'Increase Percent',
		'Actions',
	];

	const loanHeader = [
		'Created At',
		'ID',
		'Tower',
		'Remaining TCP',
		'Actions',
	];

	const rentToOwnHeader = [
		'Created At',
		'Payment Term ID',
		'Payment Type',
		'Name',
		'Reservation Fee',
		'Monthly %',
		'No. of Months',
		'Move in Fees',
		'DP %',
		'Action',
	];

	const recordsPerPage = 4;
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;

	const [sortType, setSortType] = useState('asc');

	const records = amounts.slice(firstIndex, lastIndex);
	const numPage = Math.ceil(amounts.length / recordsPerPage);
	const pages = [...Array(numPage + 1).keys()].slice(1);

	if (amounts) {
		amounts.sort((a, b) => {
			if (a.CreatedDate && b.CreatedDate) {
				return (
					moment(
						new Date(
							sortType == 'desc'
								? a.CreatedDate.seconds * 1000
								: b.CreatedDate.seconds * 1000
						)
					) -
					moment(
						new Date(
							sortType == 'asc'
								? a.CreatedDate.seconds * 1000
								: b.CreatedDate.seconds * 1000
						)
					)
				);
			}
		});
		return (
			<Flex
				flexDir='column'
				p={'45px'}
				h={'100%'}
				justifyContent={{
					base: 'space-between',
					xl: 'flex-start',
				}}
				bg={'#EFF3F6'}
			>
				<ScaleFade
					initialScale={0.9}
					in='true'
				>
					<Flex flexDir='column'>
						<Heading
							fontSize='md'
							color={'b.300'}
						>
							Hi, {curUser.FName}!
						</Heading>
						<Text color={'b.300'}>
							Manage the computations here.
						</Text>

						<Flex
							display='flex'
							justifyContent='flex-end'
							mb={5}
							gap={5}
							flexDir={{
								base: 'column',
								md: 'row',
							}}
						>
							<Flex gap={5}>
								{/* <CusSearch
									placeholder={'Search by Unit Name'}
									onChange={(e) => setSearch(e.target.value)}
								/>
								<CusFilter setSortType={setSortType} /> */}
							</Flex>
							<Menu>
								<MenuButton
									as={Button}
									rightIcon={<RiArrowDownSFill />}
									variant={'primary'}
								>
									+ Add
								</MenuButton>
								<MenuList>
									<AddUnitValue />
									<Divider />

									<AddLoan />
									<Divider />

									<AddPaymentTerms
										header={'rent to own'}
										action={'Rent-To-Own'}
									/>
								</MenuList>
							</Menu>
						</Flex>
					</Flex>
				</ScaleFade>

				{/* <CusPagination
					page={pages}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					lastIndex={lastIndex}
					firstIndex={firstIndex}
					numPage={numPage}
				/> */}

				<ScaleFade
					initialScale={0.9}
					in='true'
				>
					<Flex
						gap={10}
						flexDir={'column'}
					>
						<Flex
							justifyContent={'space-between'}
							flexDir={'column'}
							gap={3}
						>
							<Heading
								fontSize='sm'
								color={'b.300'}
							>
								Unit Values
							</Heading>
							<CusTable
								header={valueHeader}
								children={<UnitValueTable all={unitValues} />}
							/>
						</Flex>
						<Flex
							justifyContent={'space-between'}
							flexDir={'column'}
							w={'100%'}
							gap={2}
						>
							<Heading
								fontSize='sm'
								color={'b.300'}
							>
								Loans
							</Heading>
							<CusTable
								header={loanHeader}
								children={<LoanTable all={loans} />}
							/>
						</Flex>

						<Flex
							justifyContent={'space-between'}
							flexDir={'column'}
							gap={2}
							w={'100%'}
						>
							<Heading
								fontSize='sm'
								color={'b.300'}
							>
								Rent-To-Own
							</Heading>
							<CusTable
								header={rentToOwnHeader}
								children={<PayTermTable all={payterm} />}
							/>
						</Flex>
					</Flex>
				</ScaleFade>
			</Flex>
		);
	}
};

export default Computations;

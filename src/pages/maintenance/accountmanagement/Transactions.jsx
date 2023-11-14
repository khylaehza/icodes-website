import React, { useState } from 'react';
import { Flex, Text, Heading, ScaleFade } from '@chakra-ui/react';
import { Body } from '../../../sections/maintenance';
import { TransactionsTable } from '../../../tables';
import {
	CusTable,
	CusSearch,
	CusFilter,
	CusPagination,
} from '../../../customs';
import { AddTransactions } from '../../../modals';
import { useData } from '../../../../DataContext';
import moment from 'moment';

const Transactions = () => {
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
	const { curUser, transactions, soa } = useData();

	const [currentPage, setCurrentPage] = useState(1);

	const recordsPerPage = 4;
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;

	const [search, setSearch] = useState('');

	const header = [
		'Created At',
		'Transaction ID',
		'Name',
		'Unit Name',
		'Amount Paid',
		'Date Paid',
		'Mode of Payment',
		'Receipt',
		'Receipt No.',
		'Transactions',
		'Actions',
	];
	const filter = ['Cash', 'Cash Deposit', 'Check', 'Others'];
	const [filterOnChange, setFilterOnChange] = useState(false);
	const filterPos = [];
	const [fil, setFilter] = useState([filter]);

	fil.forEach((element) => {
		transactions.filter((data) => {
			if (element == data.PayMode) {
				filterPos.push(data);
			}
		});
	});

	const list = filterOnChange ? filterPos : transactions;
	const records = list.slice(firstIndex, lastIndex);
	const numPage = Math.ceil(list.length / recordsPerPage);
	const pages = [...Array(numPage + 1).keys()].slice(1);

	const [sortType, setSortType] = useState('asc');

	if (transactions) {
		list.sort((a, b) => {
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
				bg={'#EFF3F6'}
				justifyContent={'space-between'}
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
							Manage the statement of accounts here.
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
								<CusSearch
									placeholder={'Search by Receipt No.'}
									onChange={(e) => setSearch(e.target.value)}
								/>
								<CusFilter
									filter={filter}
									setFilter={setFilter}
									setFilterOnChange={setFilterOnChange}
									setSortType={setSortType}
								/>
							</Flex>

							<AddTransactions />
						</Flex>

						<Flex
							justifyContent={'space-between'}
							flexDir={'column'}
						>
							<CusTable
								header={header}
								children={
									<TransactionsTable
										data={records}
										search={search}
										all={transactions}
										soa={soa}
									/>
								}
							/>
						</Flex>
					</Flex>
				</ScaleFade>
				<CusPagination
					page={pages}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					lastIndex={lastIndex}
					firstIndex={firstIndex}
					numPage={numPage}
				/>
			</Flex>
		);
	}
};

export default Transactions;

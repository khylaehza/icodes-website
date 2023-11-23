import React, { useState } from 'react';
import { Flex, Text, Heading, ScaleFade } from '@chakra-ui/react';
import { Body } from '../../../sections/maintenance';

import {
	CusTable,
	CusSearch,
	CusFilter,
	CusPagination,
} from '../../../customs';
import { AuditLogsTable } from '../../../tables';
import { useData } from '../../../../DataContext';
import moment from 'moment';
const AuditLogs = () => {
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
	const { curUser, logs } = useData();

	const [currentPage, setCurrentPage] = useState(1);

	const recordsPerPage = 4;
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;

	const [search, setSearch] = useState('');

	const header = ['Created At', 'Activity', 'Module'];

	const filter = [
		'Employees',
		'Towers',
		'Unit Types',
		'Unit Amounts',
		'Unit Owners',
		'Amenities',
		'Computations',
	];
	const [filterOnChange, setFilterOnChange] = useState(false);
	const filterPos = [];
	const [fil, setFilter] = useState(filter);

	if (logs) {
		fil.forEach((element) => {
			logs.filter((data) => {
				if (data.Module) {
					if (data.Module.includes(element)) {
						filterPos.push(data);
					}
				}
			});
		});

		const [sortType, setSortType] = useState('asc');

		const list = filterOnChange ? filterPos : logs;
		const records = list.slice(firstIndex, lastIndex);
		const numPage = Math.ceil(list.length / recordsPerPage);
		const pages = [...Array(numPage + 1).keys()].slice(1);

		records.sort((a, b) => {
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
						<Text color={'b.300'}>View the logs here.</Text>
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
									placeholder={'Search by Activity'}
									onChange={(e) => setSearch(e.target.value)}
								/>
								<CusFilter
									filter={filter}
									setFilter={setFilter}
									setFilterOnChange={setFilterOnChange}
									setSortType={setSortType}
									titleLbl='Modules'
								/>
							</Flex>
						</Flex>

						<Flex
							justifyContent={'space-between'}
							flexDir={'column'}
						>
							<CusTable
								header={header}
								children={
									<AuditLogsTable
										data={records}
										search={search}
										all={logs}
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

export default AuditLogs;

import React, { useState } from 'react';
import { Flex, Text, Heading, ScaleFade } from '@chakra-ui/react';
import { Body } from '../../../sections/maintenance';
import { ManningSchedTable } from '../../../tables';
import { AddManningSched } from '../../../modals';
import {
	CusTable,
	CusSearch,
	CusFilter,
	CusPagination,
} from '../../../customs';

import { useData } from '../../../../DataContext';
import moment from 'moment';

const ManningSchedule = () => {
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
	const { manningSched, curUser } = useData();

	const [currentPage, setCurrentPage] = useState(1);

	const recordsPerPage = 4;
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;

	const [search, setSearch] = useState('');

	const header = [
		'Created At',
		'Schedule ID',
		'Team',
		"Agent's name",
		'Location',
		'Date',
		'Time',
		'Task',
		'Status',
		'Modify',
	];

	const filter = ['Eagles', 'Soaring', 'Blazing'];

	const [filterOnChange, setFilterOnChange] = useState(false);
	const filterPos = [];
	const [fil, setFilter] = useState([filter]);

	fil.forEach((element) => {
		manningSched.filter((data) => {
			if (element == data.Team) {
				filterPos.push(data);
			}
		});
	});

	const list = filterOnChange ? filterPos : manningSched;
	const records = list.slice(firstIndex, lastIndex);
	const numPage = Math.ceil(list.length / recordsPerPage);
	const pages = [...Array(numPage + 1).keys()].slice(1);

	const [sortType, setSortType] = useState('asc');

	if (manningSched) {
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
							Manage the Manning Schedule here.
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
									placeholder={"Search by Schedule's ID"}
									onChange={(e) => setSearch(e.target.value)}
								/>
								<CusFilter
									filter={filter}
									setFilter={setFilter}
									setFilterOnChange={setFilterOnChange}
									setSortType={setSortType}
								/>
							</Flex>

							<AddManningSched manningSched={manningSched} />
						</Flex>

						<Flex
							justifyContent={'space-between'}
							flexDir={'column'}
						>
							<CusTable
								header={header}
								children={
									<ManningSchedTable
										data={records}
										search={search}
										all={manningSched}
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

export default ManningSchedule;
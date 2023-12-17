import React, { useState } from 'react';
import { Flex, Text, Heading, ScaleFade, Image } from '@chakra-ui/react';
import { Body } from '../../../sections/maintenance';
import {
	CusTable,
	CusSearch,
	CusFilter,
	CusPagination,
} from '../../../customs';
import { AddUnitOwner } from '../../../modals';
import { useData } from '../../../../DataContext';
import moment from 'moment';
import { UnitOwnersTable } from '../../../tables';
const UnitOwners = () => {
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
	const { curUser, unitOwners, units, unitTowerID, towers } = useData();

	const [currentPage, setCurrentPage] = useState(1);

	const recordsPerPage = 4;
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;

	const [search, setSearch] = useState('');

	const header = [
		'Created At',
		'Image',
		'Unit Owner ID',
		'Name',
		'Contact Number',
		'Email',
		'Unit/s',
		'Requirements',
		'Status',
		'Modify',
	];

	const filter = ['T1', 'T2', 'T3'];

	const [filterOnChange, setFilterOnChange] = useState(false);
	const filterPos = [];
	const [fil, setFilter] = useState(filter);

	if (unitOwners) {
		fil.forEach((element) => {
			unitOwners.filter((data) => {
				if (data.Units) {
					if (data.Units.toString().includes(element)) {
						filterPos.push(data);
					}
				}
			});
		});

		const [sortType, setSortType] = useState('asc');

		const list = filterOnChange ? filterPos : unitOwners;
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
						<Text color={'b.300'}>
							Manage the unit owners here.
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
									placeholder={'Search by ID'}
									onChange={(e) => setSearch(e.target.value)}
								/>
								<CusFilter
									filter={filter}
									setFilter={setFilter}
									setFilterOnChange={setFilterOnChange}
									setSortType={setSortType}
									titleLbl='Tower'
								/>
							</Flex>

							<AddUnitOwner />
						</Flex>

						<Flex
							justifyContent={'space-between'}
							flexDir={'column'}
						>
							{records.length >= 1 ? (
								<CusTable
									header={header}
									children={
										<UnitOwnersTable
											data={records}
											search={search}
											all={unitOwners}
											units={units}
											unitTowerID={unitTowerID}
										/>
									}
								/>
							) : (
								<Flex
									flexDir='column'
									h={'100%'}
									bg={'#EFF3F6'}
									justifyContent={'center'}
									align={'center'}
									gap={2}
								>
									<Image
										src={'https://i.imgur.com/KOOp170.gif'}
										size={'xl'}
										objectFit={'contain'}
									/>

									<Text fontWeight={'bold'}>
										No data available.
									</Text>
								</Flex>
							)}
						</Flex>
					</Flex>
				</ScaleFade>
				{records.length >= 1 && (
					<CusPagination
						page={pages}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						lastIndex={lastIndex}
						firstIndex={firstIndex}
						numPage={numPage}
					/>
				)}
			</Flex>
		);
	}
};

export default UnitOwners;

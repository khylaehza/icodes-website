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
	Image,
} from '@chakra-ui/react';
import { Body } from '../../../sections/maintenance';
import {
	CusTable,
	CusSearch,
	CusFilter,
	CusPagination,
} from '../../../customs';
import { useData } from '../../../../DataContext';
import moment from 'moment';
import { RiArrowDownSFill } from 'react-icons/ri';
import {
	UnitsSetTable,
	UnitTypesTable,
	UnitSizesTable,
	UnitsTable,
} from '../../../tables';
import { AddUnitType, AddUnitSize, AddUnitSet } from '../../../modals';

const UnitTypes = () => {
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
	const { curUser, unitTypes, unitSize, unitData, units, unitTowerID } =
		useData();

	const [currentPage, setCurrentPage] = useState(1);
	const [currentPageList, setCurrentPageList] = useState(1);

	const recordsPerPage = 4;
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;

	const recordsPerPageList = 10;
	const lastIndexList = currentPageList * recordsPerPageList;
	const firstIndexList = lastIndexList - recordsPerPageList;

	const [search, setSearch] = useState('');
	const [searchList, setSearchList] = useState('');
	const header = [
		'Created At',
		'Floor Layout',
		'Unit Image',
		'Type Name',
		'Size',
		'Tower/s',
		'Unit/s',
		'Quantity',
		'Actions',
	];

	const typeHeader = [
		'Created At',
		'Type Code',
		'Type Name',
		'No. of Bathroom',
		'No. of Bed',
		'Status',
		'Actions',
	];

	const sizeHeader = ['Created At', 'Size', 'Status', 'Actions'];

	const unitsHeader = [
		'Unit Name',
		'Tower',
		'Floor',
		'Unit No.',
		'Type',
		'Size',
		'Status',
	];

	const records = unitData.slice(firstIndex, lastIndex);
	const numPage = Math.ceil(unitData.length / recordsPerPage);
	const pages = [...Array(numPage + 1).keys()].slice(1);

	let u = [];
	const length = Object.keys(units).length;

	for (let x = 0; x < length; x++) {
		const i = units[x];

		var sorted = Object.keys(i);

		sorted.map((item, key) => {
			const element = i[item];

			if (Object.values(element).length != 0) {
				const k = Object.values(element);

				if (k) {
					k.sort(function (a, b) {
						var x = a.name.toLowerCase();
						var y = b.name.toLowerCase();
						return x < y ? -1 : x > y ? 1 : 0;
					});
				}

				k.map((e) => {
					u.push(e);
				});
			}
		});
	}

	const [sortType, setSortType] = useState('asc');
	const filter = [
		'Pending Details',
		'Pending Amount',
		'Available',
		'Occupied',
	];

	const [filterOnChange, setFilterOnChange] = useState(false);
	const filterPos = [];
	const [fil, setFilter] = useState([filter]);

	fil.forEach((element) => {
		u.filter((data) => {
			if (element == data.status) {
				filterPos.push(data);
			}
		});
	});

	const list = filterOnChange ? filterPos : u;
	const recordsList = list.slice(firstIndexList, lastIndexList);
	const numPageList = Math.ceil(list.length / recordsPerPageList);
	const pagesList = [...Array(numPageList + 1).keys()].slice(1);

	if (unitData && unitTypes && unitSize && units) {
		unitData.sort((a, b) => {
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
						<Text color={'b.300'}>Manage the unit types here.</Text>

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
									placeholder={'Search by Type or Size'}
									onChange={(e) => setSearch(e.target.value)}
								/>
								<CusFilter setSortType={setSortType} />
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
									<AddUnitSet />
									<Divider />

									<AddUnitType />
									<Divider />

									<AddUnitSize />
								</MenuList>
							</Menu>
						</Flex>
						<Flex
							justifyContent={'space-between'}
							flexDir={'column'}
							gap={3}
						>
							{records.length >= 1 ? (
								<CusTable
									header={header}
									children={
										<UnitsSetTable
											data={records}
											search={search}
											all={unitData}
											units={units}
											unitTowerID={unitTowerID}
										/>
									}
								/>
							) : (
								<Flex
									flexDir='column'
									h={'30%'}
									bg={'#EFF3F6'}
									justifyContent={'center'}
									align={'center'}
									gap={2}
								>
									<Image
										src={
											'./../../../../public/gifs/maintenance/document.gif'
										}
										size={'md'}
										objectFit={'contain'}
										h={150}
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

				<ScaleFade
					initialScale={0.9}
					in='true'
				>
					<Flex
						flexDir='column'
						gap={5}
					>
						<Flex
							display='flex'
							flexDir={{
								base: 'column',
								md: 'row',
							}}
							justifyContent='space-between'
							alignItems={'center'}
						>
							<Heading
								fontSize='sm'
								color={'b.300'}
								justifyContent='flex-start'
								mt={5}
							>
								Units
							</Heading>
							<Flex
								gap={5}
								justifyContent='flex-end'
							>
								<CusSearch
									placeholder={'Search by Unit Name'}
									onChange={(e) =>
										setSearchList(e.target.value)
									}
								/>
								<CusFilter
									filter={filter}
									setFilter={setFilter}
									setFilterOnChange={setFilterOnChange}
								/>
							</Flex>
						</Flex>
						<Flex
							justifyContent={'space-between'}
							flexDir={'column'}
						>
							{recordsList.length >= 1 ? (
								<>
									<CusTable
										header={unitsHeader}
										children={
											<UnitsTable
												data={recordsList}
												searchList={searchList}
												all={u}
											/>
										}
									/>
									<CusPagination
										page={pagesList}
										currentPage={currentPageList}
										setCurrentPage={setCurrentPageList}
										lastIndex={lastIndexList}
										firstIndex={firstIndexList}
										numPage={numPageList}
									/>
								</>
							) : (
								<Flex
									flexDir='column'
									justifyContent={'center'}
									align={'center'}
									bgColor={'b.300'}
									p={2}
									color={'w.300'}
								>
									<Text fontWeight={'medium'}>
										No data available.
									</Text>
								</Flex>
							)}
						</Flex>

						<Flex
							justifyContent={{
								base: 'center',
								sm: 'space-between',
							}}
							flexDir={{ base: 'column', sm: 'row' }}
							gap={5}
							w={'100%'}
							alignItems={{ base: 'center', sm: 'flex-start' }}
						>
							<Flex
								justifyContent={'space-between'}
								flexDir={'column'}
								// w={{ base: '100%', sm: '30%' }}
								gap={2}
							>
								<Heading
									fontSize='sm'
									color={'b.300'}
								>
									Types
								</Heading>
								{unitTypes.length > 0 ? (
									<CusTable
										header={typeHeader}
										children={
											<UnitTypesTable all={unitTypes} />
										}
									/>
								) : (
									<Flex
										flexDir='column'
										justifyContent={'center'}
										align={'center'}
										bgColor={'b.300'}
										p={2}
										color={'w.300'}
									>
										<Text fontWeight={'medium'}>
											No data available.
										</Text>
									</Flex>
								)}
							</Flex>
							<Flex
								justifyContent={'space-between'}
								flexDir={'column'}
								gap={2}
								// w={{ base: '100%', sm: '50%' }}
							>
								<Heading
									fontSize='sm'
									color={'b.300'}
								>
									Size
								</Heading>
								{unitSize.length > 0 ? (
									<CusTable
										header={sizeHeader}
										children={
											<UnitSizesTable all={unitSize} />
										}
									/>
								) : (
									<Flex
										flexDir='column'
										justifyContent={'center'}
										align={'center'}
										bgColor={'b.300'}
										p={2}
										color={'w.300'}
									>
										<Text fontWeight={'medium'}>
											No data available.
										</Text>
									</Flex>
								)}
							</Flex>
						</Flex>
					</Flex>
				</ScaleFade>
			</Flex>
		);
	}
};

export default UnitTypes;

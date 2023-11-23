import React, { useState } from 'react';
import { Flex, Text, Heading, ScaleFade } from '@chakra-ui/react';
import { Body } from '../../../sections/maintenance';
import { AmenitiesTable } from '../../../tables';
import {
	CusTable,
	CusSearch,
	CusFilter,
	CusPagination,
} from '../../../customs';
import { AddAmenities } from '../../../modals';
import { useData } from '../../../../DataContext';
import moment from 'moment';
const Amenities = () => {
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
	const { curUser, amenities } = useData();

	const [currentPage, setCurrentPage] = useState(1);

	const recordsPerPage = 4;
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;

	const [search, setSearch] = useState('');

	const header = [
		'Created At',
		'Image',
		'Amenity ID',
		'Amenity Name',
		'Tower Location',
		'Capacity',
		'Description',
		'Policies',
		'Status',
		'Actions',
	];

	const filter = ['T1', 'T2', 'T3'];
	const [filterOnChange, setFilterOnChange] = useState(false);
	const filterPos = [];
	const [fil, setFilter] = useState(filter);

	if (amenities) {
		fil.forEach((element) => {
			amenities.filter((data) => {
				if (data.TNum) {
					if (data.TNum.includes(element)) {
						filterPos.push(data);
					}
				}
			});
		});

		const [sortType, setSortType] = useState('asc');

		const list = filterOnChange ? filterPos : amenities;
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
						<Text color={'b.300'}>Manage the amenities here.</Text>
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
									placeholder={'Search by Name'}
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

							<AddAmenities />
						</Flex>

						<Flex
							justifyContent={'space-between'}
							flexDir={'column'}
						>
							<CusTable
								header={header}
								children={
									<AmenitiesTable
										data={records}
										search={search}
										all={amenities}
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

export default Amenities;

import React, { useState } from 'react';
import { Flex, Text, Heading, ScaleFade, Image } from '@chakra-ui/react';
import { Body } from '../../../sections/maintenance';
import {
	CusTable,
	CusSearch,
	CusFilter,
	CusPagination,
} from '../../../customs';
import { useData } from '../../../../DataContext';
import moment from 'moment';
import { AddTower } from '../../../modals';
import { TowersTable } from '../../../tables';

const Towers = () => {
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
	const { towers, curUser, unitData, amounts } = useData();

	const [currentPage, setCurrentPage] = useState(1);

	const recordsPerPage = 4;
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;

	const [search, setSearch] = useState('');

	const header = [
		'Created At',
		'Image',
		'Tower ID',
		'Tower No.',
		'Details',
		'Units Quan.',
		'Parking Quan.',
		'Launch Date',
		'Complete Date',
		'Status',
		'Actions',
	];

	const records = towers.slice(firstIndex, lastIndex);
	const numPage = Math.ceil(towers.length / recordsPerPage);
	const pages = [...Array(numPage + 1).keys()].slice(1);

	const [sortType, setSortType] = useState('asc');

	if (towers) {
		towers.sort((a, b) => {
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
						<Text color={'b.300'}>Manage the towers here.</Text>
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
								<CusFilter setSortType={setSortType} />
							</Flex>

							<AddTower towers={towers} />
						</Flex>

						<Flex
							justifyContent={'space-between'}
							flexDir={'column'}
						>
							{records.length >= 1 ? (
								<CusTable
									header={header}
									children={
										<>
											<TowersTable
												data={records}
												search={search}
												all={towers}
												unitData={unitData}
												amounts={amounts}
											/>
										</>
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
										src={
											'./../../../../public/gifs/maintenance/document.gif'
										}
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

export default Towers;

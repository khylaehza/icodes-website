import moment from 'moment';
import { useData } from '../../../../DataContext';
import { CusTable, CusSearch, CusPagination } from '../../../customs';
import { Flex, Image, Text, Tr, ButtonGroup } from '@chakra-ui/react';
import React, { useState } from 'react';
import { DateChecker } from '../../../utilities';
import { CusTitle, CusTD } from '../../../customs';
import { NameFormat } from '../../../utilities';
import { CusUnarchive } from '../../../customs';
const ArcTable = ({ data, search, all }) => {
	const ret = search ? all : data;

	return ret
		.filter((item) => {
			if (item.BuyersID) {
				return search.toLowerCase() === ''
					? item
					: item.FName.toString().includes(search);
			}
		})
		.map((data, id) => {
			if (data.CreatedDate) {
				return (
					<React.Fragment key={id}>
						<Tr
							key={id}
							display={{
								base: 'grid',
								xl: 'table-row',
							}}
							sx={{
								'@media print': {
									display: 'table-row',
								},
								gridTemplateColumns:
									'minmax(0px, 50%) minmax(0px, 50%)',
								gridGap: '10px',
							}}
						>
							<CusTitle component={'Created At'} />
							<CusTD
								component={
									<DateChecker
										dateToCheck={
											new Date(
												data.CreatedDate.seconds * 1000
											)
										}
									/>
								}
							/>
							<CusTitle component={'Prospective Buyers ID'} />
							<CusTD component={data.BuyersID} />
							<CusTitle component={'Name'} />
							<CusTD
								component={
									<NameFormat
										fName={data.FName}
										mName={data.MName}
										lName={data.LName}
									/>
								}
							/>
							<CusTitle component={'Actions'} />
							<CusTD
								component={
									<ButtonGroup
										variant='solid'
										size='sm'
										spacing={3}
									>
										<CusUnarchive
											data={data}
											id={data.id}
											buyer={`${data.FName} ${data.LName}`}
											mainCollection='maintenance'
											tblDocUser='salesmanagement'
											tblUserCol='tbl_archivedPros'
										/>
									</ButtonGroup>
								}
							/>
						</Tr>
					</React.Fragment>
				);
			}
		});
};

const ArchivedProsTable = () => {
	const { archivedBuyers } = useData();

	const [currentPage, setCurrentPage] = useState(1);

	const recordsPerPage = 4;
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;

	const [search, setSearch] = useState('');

	const header = ['Created At', "PB's ID", 'Name', 'Actions'];

	const records = archivedBuyers.slice(firstIndex, lastIndex);
	const numPage = Math.ceil(archivedBuyers.length / recordsPerPage);
	const pages = [...Array(numPage + 1).keys()].slice(1);

	const [sortType, setSortType] = useState('asc');

	return (
		<>
			<Flex
				justifyContent={'space-between'}
				flexDir={'column'}
				gap={4}
			>
				<Flex
					gap={5}
					justifyContent={'flex-end'}
				>
					<CusSearch
						placeholder={'Search by Name'}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</Flex>

				{records.length > 0 ? (
					<CusTable
						header={header}
						children={
							<ArcTable
								data={records}
								search={search}
								all={archivedBuyers}
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
						<Text fontWeight={'bold'}>No data available.</Text>
					</Flex>
				)}
				{records.length > 0 && (
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
		</>
	);
};

export default ArchivedProsTable;

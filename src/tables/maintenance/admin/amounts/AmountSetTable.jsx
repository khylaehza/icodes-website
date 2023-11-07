import { CusTitle, CusTD, CusDelete } from '../../../../customs';
import { DateChecker } from '../../../../utilities';
import { Tr, ButtonGroup } from '@chakra-ui/react';
import React from 'react';
import { EditAmountSet } from '../../../../modals';
const AmountSetTable = ({ data, search, all }) => {
	const ret = search ? all : data;

	return ret
		.filter((item) => {
			return search.toLowerCase() === ''
				? item
				: item.Units.toString()
						.toLowerCase()
						.includes(search.toLowerCase());
		})
		.map((data, id) => {
			if (data.CreatedDate) {
				return (
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
						<React.Fragment>
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

							<CusTitle component={'Amount ID'} />
							<CusTD component={data.AmountID} />
							<CusTitle component={'Unit/s'} />
							<CusTD component={data.Units.join(', ')} />
							<CusTitle component={'Total Contract Price'} />
							<CusTD
								component={`₱ ${
									data.TCP.includes('.')
										? data.TCP
										: `${data.TCP}.00`
								}`}
							/>
							<CusTitle component={'Vat'} />
							<CusTD component={`${data.Vat}%`} />

							<CusTitle component={'Actions'} />
							<CusTD
								component={
									<ButtonGroup
										variant='solid'
										size='sm'
										spacing={3}
									>
										{data.id && (
											<EditAmountSet
												data={data}
												id={data.id}
												mainCollection='maintenance'
												tblDocUser='admin'
												tblUserCol='tbl_setAmount'
											/>
										)}

										<CusDelete
											id={data.id}
											label={
												data.Units.length > 3
													? `${
															(data.Units[0],
															data.Units[1])
													  }...'s Data`
													: `${data.Units}'s Amount`
											}
											mainCollection='maintenance'
											tblDocUser='admin'
											tblUserCol='tbl_setAmount'
											hasFile={false}
											onUpdate={() => {}}
										/>
									</ButtonGroup>
								}
							></CusTD>
						</React.Fragment>
					</Tr>
				);
			}
		});
};

export default AmountSetTable;

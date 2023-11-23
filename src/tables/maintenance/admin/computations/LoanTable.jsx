import { CusTitle, CusTD, CusDelete } from '../../../../customs';
import { DateChecker } from '../../../../utilities';
import { Tr, ButtonGroup } from '@chakra-ui/react';
import React from 'react';
import { EditLoan } from '../../../../modals';
const LoanTable = ({ all }) => {
	return all.map((data, id) => {
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

						<CusTitle component={'ID'} />
						<CusTD component={data.LoanID} />
						<CusTitle component={'Tower'} />
						<CusTD component={data.Tower} />

						<CusTitle component={'Remain TCP %'} />
						<CusTD component={`${data.RemainTCP}%`} />
						<CusTitle component={'Actions'} />
						<CusTD
							component={
								<ButtonGroup
									variant='solid'
									size='sm'
									spacing={3}
								>
									{data.id && (
										<EditLoan
											data={data}
											id={data.id}
											mainCollection='maintenance'
											tblDocUser='admin'
											tblUserCol='tbl_loans'
										/>
									)}

									<CusDelete
										id={data.id}
										label={`${data.LoanID}`}
										mainCollection='maintenance'
										tblDocUser='admin'
										tblUserCol='tbl_loans'
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

export default LoanTable;

import { CusTitle, CusTD, CusDelete } from '../../../../customs';
import { DateChecker } from '../../../../utilities';
import { Tr, ButtonGroup } from '@chakra-ui/react';
import React from 'react';
import { EditPayTerms } from '../../../../modals';
const PayTermTable = ({ all }) => {
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

						<CusTitle component={'Payment Term ID'} />
						<CusTD component={data.PayTermId} />
						{/* <CusTitle component={'Type'} /> */}
						{/* <CusTD component={data.PaymentTypeFor} />
						<CusTitle component={'Payment Term Name'} /> */}
						<CusTD component={data.PaymentTermName} />

						<CusTitle component={'Reservation Fee'} />
						<CusTD
							component={`₱${
								data.ReservationFee.includes('.')
									? data.ReservationFee
									: `${data.ReservationFee}.00`
							}`}
						/>
						<CusTitle component={'Monthly %'} />
						<CusTD component={`${data.MonthlyPercent}%`} />
						<CusTitle component={'No. of Months'} />
						<CusTD component={data.NoOfMonths} />
						<CusTitle component={'Move in Fees'} />
						<CusTD
							component={
								data.MoveInFees ? `${data.MoveInFees}%` : 'N/A'
							}
						/>
						<CusTitle component={'DP %'} />
						<CusTD
							component={
								data.DPPercent ? `${data.DPPercent}%` : 'N/A'
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
									{data.id && (
										<EditPayTerms
											data={data}
											id={data.id}
											mainCollection='maintenance'
											tblDocUser='admin'
											tblUserCol='tbl_payTerms'
										/>
									)}

									<CusDelete
										id={data.id}
										label={`${data.Dsc}`}
										mainCollection='maintenance'
										tblDocUser='admin'
										tblUserCol='tbl_payTerms'
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

export default PayTermTable;

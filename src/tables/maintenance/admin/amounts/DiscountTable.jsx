import { CusTitle, CusTD, CusDelete } from '../../../../customs';
import { DateChecker } from '../../../../utilities';
import { Tr, ButtonGroup } from '@chakra-ui/react';
import React from 'react';
import { EditDiscount } from '../../../../modals';
const DiscountTable = ({ all }) => {
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

						<CusTitle component={'Amount ID'} />
						<CusTD component={data.DscId} />
						<CusTitle component={'Discount Name'} />
						<CusTD component={data.DscName} />
						<CusTitle component={'Discount'} />
						<CusTD
							component={
								data.DscType == 'Percent'
									? `${data.Discount}%`
									: `₱${
											data.Discount.includes('.')
												? data.Discount
												: `${data.Discount}.00`
									  }`
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
										<EditDiscount
											data={data}
											id={data.id}
											mainCollection='maintenance'
											tblDocUser='admin'
											tblUserCol='tbl_discounts'
										/>
									)}

									<CusDelete
										id={data.id}
										label={'data.Dsc'}
										mainCollection='maintenance'
										tblDocUser='admin'
										tblUserCol='tbl_discounts'
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

export default DiscountTable;

import { CusTitle, CusTD } from '../../../customs';
import { NameFormat, DateChecker } from '../../../utilities';
import { Image, Tr, Td, ButtonGroup, Text } from '@chakra-ui/react';
import React from 'react';
import moment from 'moment';
import { EditProspectiveBuyer } from '../../../modals';
const ProspectiveBuyersTable = ({ data, search, all }) => {
	const ret = search ? all : data;

	return ret
		.filter((item) => {
			if (item.BuyersID) {
				return search.toLowerCase() === ''
					? item
					: item.BuyersID.toString().includes(search);
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
							<CusTitle component={'Contact Number'} />
							<CusTD component={data.CNum} />
							<CusTitle component={'Email'} />
							<CusTD component={data.Email} />
							<CusTitle component={'Inquiry'} />
							<CusTD
								component={data.Inquiry ? data.Inquiry : 'N/A'}
							/>
							<CusTitle component={'Preference'} />
							<CusTD
								component={
									data.Preference ? data.Preference : 'N/A'
								}
							/>
							<CusTitle component={'Type'} />
							<CusTD component={data.Type ? data.Type : 'N/A'} />
							<CusTitle component={'Agent'} />
							<CusTD
								component={data.Agent ? data.Agent : 'N/A'}
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
											<EditProspectiveBuyer
												data={data}
												id={data.id}
												mainCollection='maintenance'
												tblDocUser='salesmanagement'
												tblUserCol='tbl_prosBuyers'
											/>
										)}
									</ButtonGroup>
								}
							/>
						</Tr>
					</React.Fragment>
				);
			}
		});
};
export default ProspectiveBuyersTable;

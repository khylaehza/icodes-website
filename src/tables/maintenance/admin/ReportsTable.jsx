import { CusTitle, CusTD } from '../../../customs';
import { DateChecker } from '../../../utilities';
import { Tr } from '@chakra-ui/react';
import React from 'react';

const ReportsTable = ({ data, search, all }) => {
	const ret = search ? all : data;
	return ret
		.filter((item) => {
			return search.toLowerCase() === ''
				? item
				: item.UserID.toString().includes(search);
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
							<CusTitle component={'Report ID'} />
							<CusTD component={data.ReportID} />
							<CusTitle component={'Report'} />
							<CusTD component={data.Report} />
							<CusTitle component={'Reported By'} />
							<CusTD component={data.Name} />
							<CusTitle component={"Unit owner's ID"} />
							<CusTD component={data.UserID} />
						</React.Fragment>
					</Tr>
				);
			}
		});
};

export default ReportsTable;

import { CusTitle, CusTD } from '../../../customs';
import { DateChecker } from '../../../utilities';
import { Tr } from '@chakra-ui/react';
import React from 'react';
const AuditLogsTable = ({ data, search, all }) => {
	const ret = search ? all : data;
	return ret
		.filter((item) => {
			return search.toLowerCase() === ''
				? item
				: item.Msg.includes(search);
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
							<CusTitle component={'Activity'} />
							<CusTD component={data.Msg} />
							<CusTitle component={'Module'} />
							<CusTD component={data.Module} />
						</React.Fragment>
					</Tr>
				);
			}
		});
};

export default AuditLogsTable;

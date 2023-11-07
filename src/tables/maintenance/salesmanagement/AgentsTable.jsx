import { CusTitle, CusTD } from '../../../customs';
import { DateChecker, NameFormat } from '../../../utilities';
import { Image, Tr, Td, ButtonGroup, useToast } from '@chakra-ui/react';
import React from 'react';
import moment from 'moment';
// import { EditEmployee } from '../../../modals';

const AgentsTable = ({ data, search, all }) => {
	const toast = useToast();
	const ret = search ? all : data;

	return ret
		.filter((item) => {
			return search.toLowerCase() === ''
				? item
				: item.EmpId.includes(search);
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
							<React.Fragment>
								<CusTitle component={'Created At'} />
								<CusTD
									component={
										<DateChecker
											dateToCheck={
												new Date(
													data.CreatedDate.seconds *
														1000
												)
											}
										/>
									}
								/>

								<CusTitle component={'Image'} />
								<Td width={{ base: '', xl: '100px' }}>
									<Image
										src={data.Image}
										width={{
											base: '100px',
											xl: '100px',
										}}
									/>
								</Td>
								<CusTitle component={'Employee ID'} />
								<CusTD component={data.EmpId} />
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
								<CusTD component={'09' + data.CNum} />
								<CusTitle component={'Email'} />
								<CusTD component={data.Email + '.com'} />

								<CusTitle component={'Employment Start'} />
								<CusTD
									component={moment(data.DStart).format(
										'MM/DD/YYYY'
									)}
								/>
								<CusTitle component={'Status'} />
							</React.Fragment>
							<CusTitle component={'Actions'} />
							<CusTD
								component={
									<ButtonGroup
										variant='solid'
										size='sm'
										spacing={3}
									>
										{/* {data.id && (
											<EditEmployee
												data={data}
												id={data.id}
												mainCollection='maintenance'
												tblDocUser='admin'
												tblUserCol='tbl_employees'
											/>
										)} */}
									</ButtonGroup>
								}
							/>
						</Tr>
					</React.Fragment>
				);
			}
		});
};

export default AgentsTable;

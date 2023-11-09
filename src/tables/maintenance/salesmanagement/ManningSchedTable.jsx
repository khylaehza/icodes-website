import { CusTitle, CusTD, CusDelete, CusAlert } from '../../../customs';
import { DateChecker, NameFormat } from '../../../utilities';
import {
	Image,
	Tr,
	Td,
	ButtonGroup,
	Switch,
	useDisclosure,
	Text,
	useToast,
	Flex,
	UnorderedList,
	ListItem,
} from '@chakra-ui/react';
import React from 'react';
import moment from 'moment';
import { EditManningSched } from '../../../modals';
import { boolean } from 'yup';
import { useState } from 'react';

import { db } from '../../../../firebase-config';
import { updateDoc, serverTimestamp, doc } from 'firebase/firestore';

const ManningSchedTable = ({ data, search, all }) => {
	const ret = search ? all : data;

	return ret
		.filter((item) => {
			return search.toLowerCase() === ''
				? item
				: item.ScheduleID.toString().includes(search);
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

								<CusTitle component={'Schedule ID'} />
								<CusTD component={data.ScheduleID} />
								<CusTitle component={'Team'} />
								<CusTD component={data.Team} />
								<CusTitle component={"Agent's name"} />
								<CusTD
									component={
										<UnorderedList
											ml={'5'}
											mr={'5'}
										>
											{data.Agent.map((agent, index) => (
												<ListItem
													key={index}
													textAlign={'center'}
												>
													{agent}
												</ListItem>
											))}
										</UnorderedList>
									}
								/>
								<CusTitle component={'Location'} />
								<CusTD component={data.Location} />
								<CusTitle component={'Date'} />
								<CusTD component={data.SchedDate} />
								<CusTitle component={'Time'} />
								<CusTD
									component={`${data.TimeStart} - ${data.TimeEnd}`}
								/>
								<CusTitle component={'Task'} />
								<CusTD component={data.Task} />
								<CusTitle component={'Status'} />
								<CusTD component={data.Status} />
							</React.Fragment>
							<CusTitle component={'Actions'} />
							<CusTD
								component={
									<ButtonGroup
										variant='solid'
										size='sm'
										spacing={3}
									>
										{data.id && (
											<EditManningSched
												data={data}
												id={data.id}
												mainCollection='maintenance'
												tblDocUser='salesmanagement'
												tblUserCol='tbl_manningSchedule'
											/>
										)}

										<CusDelete
											id={data.id}
											label={` ${data.ScheduleID}'s Data`}
											mainCollection='maintenance'
											tblDocUser='salesmanagement'
											tblUserCol='tbl_manningSchedule'
											onUpdate={() => {}}
											hasFile={false}
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

export default ManningSchedTable;

import { CusTitle, CusTD, CusDelete, CusAlert } from '../../../customs';
import { DateChecker } from '../../../utilities';
import { Tr, Td, ButtonGroup, UnorderedList, ListItem } from '@chakra-ui/react';
import React from 'react';
import { EditBookings } from '../../../modals';
import moment from 'moment';
const BookingsTable = ({ data, search, all }) => {
	const ret = search ? all : data;
	return ret
		.filter((item) => {
			return search.toLowerCase() === ''
				? item
				: item.BookingID.toString().toLowerCase().includes(search);
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

								<CusTitle component={'Booking ID'} />
								<CusTD component={data.BookingID} />
								<CusTitle component={'Name'} />
								<CusTD component={data.UnitOwner} />
								<CusTitle component={'Tower'} />
								<CusTD component={data.TNum} />
								<CusTitle component={'Amenity'} />
								<CusTD component={data.AmenityType} />
								<CusTitle component={'Date'} />
								<CusTD
									component={moment(data.Date).format(
										'MM/DD/YYYY'
									)}
								/>
								<CusTitle component={'No. of Persons'} />
								<CusTD component={data.NumPerson} />
								<CusTitle component={'Status'} />
								<CusTD component={data.Status} />
								<CusTitle component={'Actions'} />
								<CusTD
									component={
										<ButtonGroup
											variant='solid'
											size='sm'
											spacing={3}
										>
											{data.id && (
												<EditBookings
													data={data}
													id={data.id}
													mainCollection='maintenance'
													tblDocUser='frontdesk'
													tblUserCol='tbl_bookings'
												/>
											)}

											<CusDelete
												id={data.id}
												label={` ${data.BookingID}'s Data`}
												mainCollection='maintenance'
												tblDocUser='frontdesk'
												tblUserCol='tbl_bookings'
												hasFile={false}
												onUpdate={() => {}}
											/>
										</ButtonGroup>
									}
								/>
							</React.Fragment>
						</Tr>
					</React.Fragment>
				);
			}
		});
};
export default BookingsTable;

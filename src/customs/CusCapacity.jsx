import React, { useState } from 'react';
import {
	Progress,
	Stack,
	Text,
	VStack,
	Box,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Table,
	Tbody,
	Tr,
	Td,
	Card,
	Step,
	Stepper,
	StepIndicator,
	StepStatus,
	StepNumber,
	Flex,
	Divider,
} from '@chakra-ui/react';
import { useData } from '../../DataContext';

function CusCapacity({ date, stats }) {
	const { amenities, bookings } = useData();
	const [selectedAmenity, setSelectedAmenity] = useState(null);

	const filteredBookings = bookings.filter((booking) => {
		if (stats == booking.AmenityType && booking.Status == 'Confirmed') {
			return booking.Date === date;
		}
	});

	if (filteredBookings.length === 0) {
		return <Text>No amenity bookings on this day.</Text>;
	}

	return (
		<Stack>
			<Text as={'b'}>{date}</Text>
			{amenities.map((amenity) => {
				const amenityBookings = filteredBookings.filter(
					(booking) => booking.AmenityType === amenity.AmenityName
				);

				const totalBookings = amenityBookings.reduce(
					(acc, booking) => acc + parseInt(booking.NumPerson),
					0
				);

				if (amenityBookings.length > 0) {
					const percentage =
						(totalBookings / parseInt(amenity.Capacity)) * 100;

					let bgColor = 'green';
					if (percentage >= 75) {
						bgColor = 'red';
					} else if (percentage >= 50) {
						bgColor = 'yellow';
					}

					return (
						<React.Fragment key={amenity.AmenityID}>
							{/* <Accordion allowMultiple>
								<AccordionItem>
									<h2>
										<AccordionButton
											onClick={() =>
												setSelectedAmenity(amenity)
											}
											style={{ height: 'auto' }}
										> */}
							<VStack
								align='center'
								w={'100%'}
							>
								<Box textAlign='center'>
									{/* <Text as='b'>{amenity.AmenityName}</Text> */}
									<Text>
										Total bookings: {totalBookings} /{' '}
										{amenity.Capacity}
									</Text>
								</Box>
								<Box>
									<Progress
										colorScheme={bgColor}
										size='sm'
										value={percentage}
										width='250px'
									/>
								</Box>
							</VStack>
							{/* <AccordionIcon />
										</AccordionButton> */}
							{/* </h2> */}
							{/* <AccordionPanel pb={4}> */}
							{/* {selectedAmenity === amenity && ( */}
							<>
								{/* <Text as='b'>Booking Details</Text> */}
								{amenityBookings.map((booking) => (
									<Card
										key={booking.BookingID}
										boxShadow='lg'
										p='4'
										dir={'row'}
									>
										<Flex
											dir={'row'}
											justifyContent={'space-between'}
											textAlign={'left'}
											alignItems={'center'}
										>
											<Stepper
												orientation='vertical'
												gap={'3'}
											>
												<Step>
													<StepIndicator>
														<StepStatus
															active={
																<StepNumber />
															}
														/>
													</StepIndicator>
												</Step>
											</Stepper>

											{/* <Text
												fontWeight={'bold'}
												mr={-2}
											>
												Unit Owner:
											</Text> */}
											<Text
												alignItems={'center'}
												textAlign={'center'}
											>
												{booking.UnitOwner}
											</Text>

											<Divider orientation='vertical' />

											<Text
												alignItems={'center'}
												textAlign={'center'}
											>
												{booking.NumPerson} Persons
											</Text>
										</Flex>
									</Card>
								))}
							</>
							{/* )  */}
							{/* } */}
							{/* </AccordionPanel>
								</AccordionItem>
							</Accordion> */}
						</React.Fragment>
					);
				}

				return null;
			})}
		</Stack>
	);
}

export default CusCapacity;

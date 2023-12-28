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
import moment from 'moment';
import { useData } from '../../DataContext';

function CusCapacity({ date, stats }) {
	const { amenities, bookings } = useData();
	const [selectedAmenity, setSelectedAmenity] = useState(null);

	let capacity = [];
	const cap = amenities.map((ame) => {
		if (stats == ame.AmenityName) {
			capacity.push(Number(ame.Capacity));
		}
	});

	const filteredBookings = bookings.filter((booking) => {
		if (stats == booking.AmenityType && booking.Status == 'Confirmed') {
			return (
				moment(booking.Date).format('MM/DD/YYYY') ===
				moment(date).format('MM/DD/YYYY')
			);
		}
	});

	if (filteredBookings.length === 0) {
		return <Text>No amenity bookings on this day.</Text>;
	}

	const totalBookings = filteredBookings.reduce(
		(acc, booking) => acc + parseInt(booking.NumPerson),
		0
	);

	const percentage = (totalBookings / capacity[0]) * 100;
	let bgColor = 'green';
	if (percentage >= 75) {
		bgColor = 'red';
	} else if (percentage >= 50) {
		bgColor = 'yellow';
	}
	return (
		<Stack>
			<Text as={'b'}>{date}</Text>

			<VStack
				align='center'
				w={'100%'}
			>
				<Box textAlign='center'>
					{/* <Text as='b'>{amenity.AmenityName}</Text> */}
					<Text>
						Total bookings: {totalBookings} / {capacity[0]}
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

			{filteredBookings.map((booking, key) => (
				<Card
					key={key}
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
									<StepStatus active={<StepNumber />} />
								</StepIndicator>
							</Step>
						</Stepper>

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
		</Stack>
	);
}

export default CusCapacity;

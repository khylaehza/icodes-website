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

	const cap = amenities.map((ame) => {
		if (stats == ame.AmenityName) {
			return Number(ame.Capacity);
		}
	});

	const filteredBookings = bookings.filter((booking) => {
		if (stats == booking.AmenityType && booking.Status == 'Confirmed') {
			return booking.Date === date;
		}
	});

	if (filteredBookings.length === 0) {
		return <Text>No amenity bookings on this day.</Text>;
	}

	const totalBookings = filteredBookings.reduce(
		(acc, booking) => acc + parseInt(booking.NumPerson),
		0
	);

	console.log(filteredBookings, totalBookings);

	const percentage = (totalBookings / cap[0]) * 100;
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
						Total bookings: {totalBookings} / {cap[0]}
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

import {
	Flex,
	Box,
	Heading,
	Text,
	SimpleGrid,
	Image,
	Grid,
	GridItem,
	Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const UnitChoices = () => {
	const navigate = useNavigate();

	const units = [
		{
			name: 'Studio (ST)',
			size: '20 sq. meters',
			layout: 'https://i.imgur.com/HBF8Opw.jpg',
		},
		{
			name: '1 Bedroom (1BR)',
			size: '30 sq. meters',
			layout: 'https://i.imgur.com/Erd4T0x.jpg',
		},
		{
			name: '2 Bedrooms (2BR)',
			size: '52 sq. meters',
			layout: 'https://i.imgur.com/xwU22bs.jpg',
		},
		{
			name: '2 Bedrooms Bigcut (2BR)',
			size: '70 sq. meters',
			layout: 'https://i.imgur.com/E5J3zmi.jpg',
		},
		{
			name: '3 Bedrooms (3BR)',
			size: '79 sq. meters',
			layout: 'https://i.imgur.com/oqE08wS.jpg',
		},
	];

	const [proceed, setProceed] = useState('');
	const [size, setSize] = useState('');

	return (
		<Flex
			bgColor={'w.200'}
			w={'100%'}
			flexDir={'column'}
			p={10}
			gap={2}
			h={{ base: '', xl: '100%' }}
			alignItems={'center'}
		>
			<Heading
				fontSize={{
					base: '2xl',
					sm: '3xl',
					md: '4xl',
					lg: '5xl',
				}}
			>
				Congressional Town Center{' '}
				<Text
					as={'span'}
					bgGradient='linear(to-r, blue.700,b.300)'
					bgClip='text'
				>
					Interactive
				</Text>{' '}
				Units.
			</Heading>
			<Text>
				Engage yourself in a 3d condo unit experience where you can
				view, interact, and design your desired living space.{' '}
			</Text>
			<Flex
				p={10}
				bgColor={'b.300'}
				mt={5}
				mb={5}
				rounded={20}
				boxShadow='0px 0px 5px 3px rgba(134,149,166,0.2)'
				flexDir={'column'}
				gap={2}
				alignItems={'center'}
				justifyContent={'center'}
			>
				<Grid
					w={'100%'}
					templateRows={{
						base: 'repeat(5, 1fr)',
						xl: 'repeat(1, 1fr)',
					}}
					templateColumns={{
						base: 'repeat(1, 1fr)',
						xl: 'repeat(5, 1fr)',
					}}
					gap={3}
					textAlign={'center'}
				>
					{units.map((unit, key) => (
						<Button
							boxShadow='0px 0px 5px 3px rgba(134,149,166,0.2)'
							h={'100%'}
							w={'100%'}
							rounded={20}
							bgColor={proceed == unit.name ? 'b.200' : 'w.300'}
							variant={'ghost'}
							_hover={{
								bgColor:
									proceed == unit.name ? 'b.200' : '#EEE',
							}}
							p={2}
							onClick={() => {
								setSize(unit.size);
								setProceed(unit.name);
							}}
							key={key}
						>
							<GridItem
								bgColor={'w.300'}
								colSpan={1}
								rounded={20}
								p={2}
								gap={5}
								h={'100%'}
								w={'100%'}
							>
								<Image
									objectFit={'contain'}
									w={'100%'}
									h={{ base: '250px', lg: '220px' }}
									src={unit.layout}
									rounded={5}
								/>

								<Flex
									flexDir={'column'}
									alignItems={'center'}
									rounded={10}
									w={'100%'}
									variant={'solid'}
								>
									<Text>{unit.name.toUpperCase()}</Text>
									<Text>{unit.size}</Text>
								</Flex>
							</GridItem>
						</Button>
					))}
				</Grid>
			</Flex>
			{proceed && (
				<Button
					bgColor={'b.300'}
					color={'w.300'}
					_hover={{ bgColor: 'b.400', color: 'w.300' }}
					onClick={() => {
						navigate('/unitcanvas', {
							state: { unit: proceed, size: size },
						});
					}}
				>
					Proceed
				</Button>
			)}
		</Flex>
	);
};

export default UnitChoices;

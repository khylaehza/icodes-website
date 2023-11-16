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
const Guide = () => {
	const units = [
		{
			name: 'Studio',
			size: '20 sq. meters',
			layout: '/imgs/units/studio-layout.jpg',
		},
		{
			name: '1 Bedroom',
			size: '30 sq. meters',
			layout: '/imgs/units/1br-layout.jpg',
		},
		{
			name: '2 Bedroom',
			size: '52 sq. meters',
			layout: '/imgs/units/2br-layout.jpg',
		},
		{
			name: '2 Bedroom Bigcut',
			size: '70 sq. meters',
			layout: '/imgs/units/2br-big-layout.jpg',
		},
		{
			name: '3 Bedroom',
			size: '79 sq. meters',
			layout: '/imgs/units/studio-layout.jpg',
		},
	];

	const [proceed, setProceed] = useState('');
	return (
		<Flex
			// h={'100%'}
			bgColor={'w.200'}
			w={'100%'}
			flexDir={'column'}
			p={10}
			gap={2}
			h={{ base: '', xl: '100%' }}
			alignItems={'center'}
		>
			<Heading
				// lineHeight={3}
				fontSize={{
					base: '2xl',
					sm: '3xl',
					md: '4xl',
					lg: '5xl',
				}}
				// mt={'45px'}
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
				// h={'100%'}
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
					// h={{ base: '100%', xl: '300px' }}
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
							onClick={() => setProceed(unit.name)}
						>
							<GridItem
								bgColor={'w.300'}
								colSpan={1}
								key={key}
								rounded={20}
								p={2}
								gap={5}
								h={'100%'}
								w={'100%'}
							>
								{/* <Flex
									rounded={20}
									bgColor={'w.100'}
									// h={'100%'}
									p={2}
								> */}
								<Image
									objectFit={'contain'}
									w={'100%'}
									h={{ base: '250px', lg: '220px' }}
									src={unit.layout}
									rounded={5}
								/>
								{/* </Flex> */}

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
					w={'10%'}
					color={'w.300'}
					_hover={{ bgColor: '#FFF', color: '#000' }}
				>
					Proceed
				</Button>
			)}
		</Flex>
	);
};

export default Guide;

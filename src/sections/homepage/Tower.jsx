import {
	Box,
	Flex,
	Text,
	Image,
	chakra,
	shouldForwardProp,
	HStack,
	ScaleFade,
} from '@chakra-ui/react';

import {
	motion,
	useScroll,
	useTransform,
	MotionValue,
	isValidMotionProp,
} from 'framer-motion';
import { useRef } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

const ChakraBox = chakra(motion.div, {
	shouldForwardProp: (prop) =>
		isValidMotionProp(prop) || shouldForwardProp(prop),
});

function useParallax(value = MotionValue(), distance) {
	return useTransform(value, [0, 1], [-distance, distance]);
}

function Components({ data, index }) {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({ target: ref });

	const y = useParallax(scrollYProgress, 100);

	return (
		<VisibilitySensor partialVisibility={true}>
			{({ isVisible }) => {
				return (
					<Box
						w={'100%'}
						alignItems={'center'}
						display={'flex'}
						flexDir={['column', 'row']}
						justifyContent={'center'}
						p={10}
						ref={ref}
					>
						<HStack
							gap={20}
							ref={ref}
						>
							{index % 2 == 0 ? (
								<>
									<Box
										w={'50%'}
										alignItems={'flex-start'}
										display={'flex'}
										flexDir={'column'}
										color={'black'}
										ref={ref}
									>
										<ChakraBox style={{ y }}>
											<Text
												fontSize={'7xl'}
												fontWeight={'bold'}
											>
												{data.towerName.slice(0, -4)}
											</Text>
											<Text
												fontSize={'md'}
												fontWeight={'medium'}
												textAlign={'justify'}
											>
												{data.towerLoc}
											</Text>
										</ChakraBox>
									</Box>

									<Box
										w={'40%'}
										flexDir={'column'}
										ref={ref}
									>
										<Box
											shadow={'dark-lg'}
											padding={2}
											rounded={'lg'}
										>
											<ScaleFade
												in={isVisible}
												initialScale={1.2}
											>
												<Image
													src={data.towerImg}
													objectFit={'cover'}
													position={'relative'}
													rounded={'lg'}
												/>
											</ScaleFade>
										</Box>
									</Box>
								</>
							) : (
								<>
									<Box
										w={'40%'}
										flexDir={'column'}
										ref={ref}
									>
										<Box
											shadow={'dark-lg'}
											padding={2}
											rounded={'lg'}
										>
											<ScaleFade
												in={isVisible}
												initialScale={1.2}
											>
												<Image
													src={data.towerImg}
													objectFit={'cover'}
													position={'relative'}
													rounded={'lg'}
												/>
											</ScaleFade>
										</Box>
									</Box>
									<Box
										w={'50%'}
										alignItems={'flex-start'}
										display={'flex'}
										flexDir={'column'}
										color={'black'}
										ref={ref}
									>
										<ChakraBox style={{ y }}>
											<Text
												fontSize={'7xl'}
												fontWeight={'bold'}
											>
												{data.towerName.slice(0, -4)}
											</Text>
											<Text
												fontSize={'md'}
												fontWeight={'medium'}
												textAlign={'justify'}
											>
												{data.towerLoc}
											</Text>
										</ChakraBox>
									</Box>
								</>
							)}
						</HStack>
					</Box>
				);
			}}
		</VisibilitySensor>
	);
}

const TowerLayout = () => {
	const text = [
		{
			towerName: 'Tower 1 (T1)',
			towerLoc:
				'Congressional Town Center Tower 1 is the first new high-rise tower in this project. The 37-story tower is designed for the discerning and those who want to leave a lasting impression for friends and family. The tower’s spacious one-bedroom and studio unit entrance flow from its foyer into the unit’s living room and kitchen, providing residents entertainment and relaxation.',
			towerImg:
				'https://i.pinimg.com/736x/34/62/2d/34622d463634cfd4ed0bb3b7223043d9.jpg',
			color: '#f5f5f5',
		},
		{
			towerName: 'Tower 2  (T2)',
			towerLoc:
				'Congressional Town Center Tower 1 is the first new high-rise tower in this project. The 37-story tower is designed for the discerning and those who want to leave a lasting impression for friends and family. The tower’s spacious one-bedroom and studio unit entrance flow from its foyer into the unit’s living room and kitchen, providing residents entertainment and relaxation.',
			towerImg:
				'https://i.pinimg.com/736x/68/01/7f/68017ff302490318ccbf5a85802d7c56.jpg',
			color: '#FFFFFF',
		},
		{
			towerName: 'Tower 3  (T3)',
			towerLoc:
				'Congressional Town Center Tower 1 is the first new high-rise tower in this project. The 37-story tower is designed for the discerning and those who want to leave a lasting impression for friends and family. The tower’s spacious one-bedroom and studio unit entrance flow from its foyer into the unit’s living room and kitchen, providing residents entertainment and relaxation.',
			towerImg:
				'https://i.pinimg.com/736x/69/18/6c/69186c081d8ede3b867bc4ab2fed71af.jpg',
			color: '#f5f5f5',
		},
	];

	return (
		<Flex flexDir={'column'}>
			{text.map((data, index) => (
				<Flex
					alignContent={'center'}
					justifyContent={'center'}
					mb={10}
					bg={data.color}
					key={index}
				>
					<Flex
						w={'50%'}
						flexDir={'column'}
						bgColor={data.color}
					>
						<Components
							data={data}
							index={index}
						/>
					</Flex>
				</Flex>
			))}
		</Flex>
	);
};

export default TowerLayout;

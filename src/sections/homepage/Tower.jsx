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
						// ref={ref}
					>
						<HStack gap={20}>
							{index % 2 == 0 ? (
								<>
									<Box
										w={'50%'}
										alignItems={'flex-start'}
										display={'flex'}
										flexDir={'column'}
										color={'black'}
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
										// ref={ref}
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
										// ref={ref}
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
				'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Ftowers%2F1.jpg?alt=media&token=33e2a3d2-367c-445c-92bd-9afcc4ff2ae6',
			color: '#f5f5f5',
		},
		{
			towerName: 'Tower 2  (T2)',
			towerLoc:
				'Congressional Town Center Tower 1 is the first new high-rise tower in this project. The 37-story tower is designed for the discerning and those who want to leave a lasting impression for friends and family. The tower’s spacious one-bedroom and studio unit entrance flow from its foyer into the unit’s living room and kitchen, providing residents entertainment and relaxation.',
			towerImg:
				'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Ftowers%2F2.jpg?alt=media&token=b868c38d-9058-479b-901d-131e776bbf06',
			color: '#FFFFFF',
		},
		{
			towerName: 'Tower 3  (T3)',
			towerLoc:
				'Congressional Town Center Tower 1 is the first new high-rise tower in this project. The 37-story tower is designed for the discerning and those who want to leave a lasting impression for friends and family. The tower’s spacious one-bedroom and studio unit entrance flow from its foyer into the unit’s living room and kitchen, providing residents entertainment and relaxation.',
			towerImg:
				'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Ftowers%2F3.jpg?alt=media&token=09c12349-191f-48ef-a9b8-f8228c034484',
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

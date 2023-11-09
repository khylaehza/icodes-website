import React, { useState } from 'react';
import {
	Flex,
	Text,
	Heading,
	ScaleFade,
	Grid,
	GridItem,
	Divider,
	Stack,
	Menu,
	MenuButton,
	MenuList,
	MenuOptionGroup,
	MenuItemOption,
	IconButton,
	Image,
	Box,
} from '@chakra-ui/react';
import { Body } from '../../../sections/maintenance';
import { RiArrowDownSFill } from 'react-icons/ri';
import { useData } from '../../../../DataContext';
import { LineGraph, StackBarGraph } from '../../../utilities';
const SmHome = () => {
	return (
		<Flex
			w='full'
			minH='100vh'
			alignItems='stretch'
			bg={'#EFF3F6'}
		>
			<Body children={<Item />} />
		</Flex>
	);
};

const Item = () => {
	const { curUser, employees, buyers } = useData();
	const agents = employees.filter((item) => item.EmpPos === 'Agent');

	const data = ['October 19'];
	const values = [
		{ name: 'Zoom', values: [0] },
		{ name: 'Tripping', values: [1] },
		{ name: 'Walk-Ins', values: [0] },
		{ name: 'Pull-Ins', values: [0] },
	];

	const values2 = [1];
	const data2 = ['October 15 - 21'];
	// if (item) {

	return (
		<Flex
			flexDir='column'
			p={'45px'}
			h={'100%'}
			bg={'#EFF3F6'}
			justifyContent={'flex-start'}
			gap={3}
		>
			<ScaleFade
				initialScale={0.9}
				in='true'
			>
				<Grid
					templateRows={{
						base: 'repeat(6, 1fr)',
						xl: 'repeat(2, 1fr)',
					}}
					templateColumns={{
						base: 'repeat(2, 1fr)',
						xl: 'repeat(5, 1fr)',
					}}
					gap={3}
					textAlign={'center'}
				>
					<GridItem
						colSpan={2}
						rowSpan={{ base: 30, xl: 2 }}
						bgColor={'w.300'}
						boxShadow='0 4px 10px 0 rgba(134,149,166,0.3)'
						borderRadius={15}
						p={5}
						pt={7}
						w={'100%'}
					>
						<Heading size={'md'}>Activities Report</Heading>
						<Divider
							w='100%'
							mt={3}
							mb={3}
						/>
						<StackBarGraph
							data={data}
							values={values}
						/>
					</GridItem>
					<GridItem
						colSpan={{ base: 2, xl: 1 }}
						rowSpan={1}
						bgColor={'w.300'}
						boxShadow='0 4px 10px 0 rgba(134,149,166,0.3)'
						borderRadius={15}
						p={10}
					>
						<Heading size={'md'}>Unit Owners</Heading>
						<Divider
							w='100%'
							mt={3}
							mb={3}
						/>

						<Heading
							fontSize={'105px'}
							alignItems={'center'}
							textAlign={'center'}
						>
							{agents.length}
						</Heading>
					</GridItem>

					<GridItem
						bgColor={'w.300'}
						boxShadow='0 4px 10px 0 rgba(134,149,166,0.3)'
						borderRadius={15}
						p={5}
						rowSpan={{ base: 5, xl: 2 }}
						colSpan={2}
					>
						<Heading size={'md'}>Activities Report</Heading>
						<Divider
							w='100%'
							mt={3}
							mb={3}
						/>
						<LineGraph
							data={data2}
							orientation={'horizontal'}
							values={values2}
						/>
					</GridItem>
					<GridItem
						colSpan={{ base: 2, xl: 1 }}
						bgColor={'w.300'}
						boxShadow='0 4px 10px 0 rgba(134,149,166,0.3)'
						borderRadius={15}
						p={10}
						rowSpan={1}
					>
						<Heading size={'md'}>Prospective Buyers</Heading>
						<Divider
							w='100%'
							mt={3}
							mb={3}
						/>

						<Heading
							fontSize={'105px'}
							alignItems={'center'}
							textAlign={'center'}
						>
							{agents.length}
						</Heading>
					</GridItem>
				</Grid>
			</ScaleFade>
		</Flex>
	);
	// }
	// } else {
	// 	return (
	// 		<Flex
	// 			flexDir='column'
	// 			h={'100%'}
	// 			bg={'#EFF3F6'}
	// 			justifyContent={'center'}
	// 			align={'center'}
	// 			gap={2}
	// 		>
	// 			<Image
	// 				src={'./gifs/maintenance/document.gif'}
	// 				size={'lg'}
	// 				objectFit={'contain'}
	// 			/>
	// 			<Heading>Welcome {curUser.FName}!</Heading>
	// 			<Text fontWeight={'bold'}>
	// 				Input data to show in your dashboard.
	// 			</Text>
	// 		</Flex>
	// 	);
	// }
	// }
};

export default SmHome;

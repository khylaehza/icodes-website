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
} from '@chakra-ui/react';
import { Body } from '../../../sections/maintenance';
import { RiArrowDownSFill } from 'react-icons/ri';
import { useData } from '../../../../DataContext';
const FdHome = () => {
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
	const { curUser, amenities, towers, units, unitOwners } = useData();

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
			<Flex
				flexDirection={'row'}
				justifyContent={'flex-end'}
			>
				<Menu closeOnSelect={false}>
					<MenuButton
						as={IconButton}
						aria-label='Options'
						rightIcon={<RiArrowDownSFill />}
						variant={'primary'}
						bgColor={'b.300'}
						boxShadow='0 4px 12px 0 rgba(134,149,166,0.5)'
						pr={3}
						pl={5}
						w={{ base: '100%', xl: '10%' }}
					>
						{/* Tower {fil ? fil : item.TowerNum} */}
					</MenuButton>

					<MenuList w='110px'>
						{/* <MenuOptionGroup
										defaultValue='Tower 1'
										type='radio'
										onChange={(e) => {
											setFilter(e);
											setFilterOnChange(true);
										}}
									>
										{towerOption.map((tower, key) => (
											<MenuItemOption
												value={tower}
												fontSize={'sm'}
												key={key}
											>
												Tower {tower}
											</MenuItemOption>
										))}
									</MenuOptionGroup> */}
					</MenuList>
				</Menu>
			</Flex>
			<ScaleFade
				initialScale={0.9}
				in='true'
			></ScaleFade>
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
	// 				size={'xl'}
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

export default FdHome;

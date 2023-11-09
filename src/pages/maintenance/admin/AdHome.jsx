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
import { useData } from '../../../../DataContext';
import { PieGraph } from '../../../utilities';
import { RiArrowDownSFill } from 'react-icons/ri';
import {
	FaBed,
	FaParking,
	FaSwimmingPool,
	FaCalendarDay,
} from 'react-icons/fa';
const AdHome = () => {
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

	const towerOption = [];
	if (towers && towers[0]) {
		towers.forEach((element) => {
			towers.sort(function (a, b) {
				if (a.TowerNum && b.TowerNum) {
					var x = a.TowerNum.toLowerCase();
					var y = b.TowerNum.toLowerCase();
					return x < y ? -1 : x > y ? 1 : 0;
				}
			});

			towerOption.push(element.TowerNum);
		});

		const [filterOnChange, setFilterOnChange] = useState(false);
		const filterTower = [];
		const [fil, setFilter] = useState(towers[0].TowerNum);

		towers.filter((data) => {
			if (fil == data.TowerNum) {
				filterTower.push(data);
			}
		});
		const list = filterOnChange ? filterTower : towers;

		const item = list[0];

		if (item) {
			if (units) {
				let u = [];
				const length = Object.keys(units).length;

				for (let x = 0; x < length; x++) {
					const i = units[x];

					var sorted = Object.keys(i);

					sorted.map((x, key) => {
						const element = i[x];

						if (Object.values(element).length != 0) {
							const k = Object.values(element);

							if (k) {
								k.sort(function (a, b) {
									var x = a.name.toLowerCase();
									var y = b.name.toLowerCase();
									return x < y ? -1 : x > y ? 1 : 0;
								});
							}

							k.map((e) => {
								if (item) {
									if (e.tower == `T${item.TowerNum}`) {
										u.push(e);
									}
								}
							});
						}
					});
				}

				const avail = u.filter((info) => {
					return info.status == 'Available' ? info : '';
				});

				const occu = u.filter((info) => {
					return info.status == 'Occupied' ? info : '';
				});

				const penDetails = u.filter((info) => {
					return info.status == 'Pending Details' ? info : '';
				});

				const penAmount = u.filter((info) => {
					return info.status == 'Pending Amount' ? info : '';
				});

				const data = [
					'Pending Details',
					'Occupied',
					'Available',
					'Pending Amount',
				];
				const values = [
					{ value: avail.length, name: 'Available' },
					{ value: occu.length, name: 'Occupied' },
					{ value: penDetails.length, name: 'Pending Details' },
					{ value: penAmount.length, name: 'Pending Amount' },
				];

				let unitQuan = 0;
				let unitPerFloor = 0;

				if (item.Units) {
					Object.values(item.Units).map((x) => {
						unitQuan += unitPerFloor;
						Object.values(x).map((y) => {
							unitPerFloor += 1;
						});
					});
				}
				const ame = amenities.map((ame1, key) => {
					return ame1.TNum ==
						`Tower ${item.TowerNum} (T${item.TowerNum})`
						? ame1
						: '';
				});

				const unitOwn = unitOwners.filter((u, key) => {
					if (u.Units) {
						return u.Units.toString().slice(0, 2) ==
							`T${item.TowerNum}`
							? u
							: '';
					}
				});

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
									Tower {fil ? fil : item.TowerNum}
								</MenuButton>

								<MenuList w='110px'>
									<MenuOptionGroup
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
									</MenuOptionGroup>
								</MenuList>
							</Menu>
						</Flex>
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
									<Heading size={'md'}>
										Unit Statistics
									</Heading>
									<Divider
										w='100%'
										mt={3}
										mb={3}
									/>
									<PieGraph
										orientation={'horizontal'}
										values={values}
										data={data}
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
										{unitOwn.length}
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
									<Image
										objectFit={'cover'}
										w={'100%'}
										h={{ base: '50%', lg: '80%' }}
										src={item.TowerImg}
										rounded={5}
									/>
									<Stack
										p={5}
										w={'100%'}
										h={'20%'}
										alignItems={'center'}
										flexDir={{ base: 'column', lg: 'row' }}
									>
										<Stack w={{ base: '100%', xl: '50%' }}>
											<Flex
												flexDir={'row'}
												gap={2}
											>
												<FaBed size={25} />
												<Text fontWeight={'bold'}>
													{unitOwn == ''
														? 0
														: unitOwn.length}{' '}
													UNITS
												</Text>
											</Flex>
											<Flex
												flexDir={'row'}
												gap={2}
											>
												<FaParking size={25} />
												<Text fontWeight={'bold'}>
													{item.ParkQuan} PARKINGS
												</Text>
											</Flex>
										</Stack>
										<Stack w={{ base: '100%', xl: '50%' }}>
											<Flex
												flexDir={'row'}
												gap={2}
											>
												<FaSwimmingPool size={25} />
												<Text fontWeight={'bold'}>
													{ame == '' ? 0 : ame.length}{' '}
													AMENITIES
												</Text>
											</Flex>
											<Flex
												flexDir={'row'}
												gap={3}
											>
												<FaCalendarDay size={22} />
												<Text fontWeight={'bold'}>
													{item.CompleteDate}
												</Text>
											</Flex>
										</Stack>
									</Stack>
								</GridItem>
								<GridItem
									colSpan={{ base: 2, xl: 1 }}
									bgColor={'w.300'}
									boxShadow='0 4px 10px 0 rgba(134,149,166,0.3)'
									borderRadius={15}
									p={10}
									rowSpan={1}
								>
									<Heading size={'md'}>Feedbacks</Heading>
									<Divider
										w='100%'
										mt={3}
									/>

									<Heading
										fontSize={'105px'}
										alignItems={'center'}
										textAlign={'center'}
									>
										{unitOwn.length}
									</Heading>
								</GridItem>
							</Grid>
						</ScaleFade>
					</Flex>
				);
			}
		} else {
			return (
				<Flex>
					<Text>Welcome Admin</Text>
				</Flex>
			);
		}
		// }
	} else {
		return (
			<Flex
				flexDir='column'
				h={'100%'}
				bg={'#EFF3F6'}
				justifyContent={'center'}
				align={'center'}
				gap={2}
			>
				<Image
					src={'./gifs/maintenance/document.gif'}
					size={'xl'}
					objectFit={'contain'}
				/>
				<Heading>Welcome {curUser.FName}!</Heading>
				<Text fontWeight={'bold'}>
					Input data to show in your dashboard.
				</Text>
			</Flex>
		);
	}
};

export default AdHome;

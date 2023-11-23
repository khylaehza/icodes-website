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
import { LineGraph, StackBarGraph, WeekGenerator } from '../../../utilities';
import moment from 'moment';
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
	const { curUser, employees, buyers, soa } = useData();
	const agents = employees.filter((item) => item.EmpPos === 'Agent');

	// console.log(moment(soa[0].CreatedDate.seconds * 1000).format('MM DD YYYY'));

	const tripping = buyers.filter((buyer) => {
		return buyer.PBType == 'Tripping' ? buyer : '';
	});

	console.log(tripping.length);
	let weekly = 0; // if weekly
	let monthly = 0; //
	let yearly = 0; //

	let weeklyDates = [];
	let monthObject = [];
	let weekObject = [];
	let yearObject = [];
	var weekDays = 0;

	let weeklyTripping = 0;
	let monthlyTripping = 0;
	let yearlyTripping = 0;

	let trippingWeekObject = [];
	let trippingMonthObject = [];
	WeekGenerator().filter((week, key) => {
		const weekStart = moment(week.start, 'YYYY-MM-DD');
		const weekEnd = moment(week.end, 'YYYY-MM-DD');
		weeklyDates.push(
			`${moment(weekStart).format('MMM DD')} - ${moment(weekEnd).format(
				'DD'
			)}`
		);
		buyers.filter((buyer) => {
			if (buyer.CreatedDate) {
				if (
					moment(buyer.CreatedDate.seconds * 1000).isBetween(
						weekStart,
						weekEnd
					) ||
					moment(buyer.CreatedDate.seconds * 1000).isSame(
						weekStart
					) ||
					moment(buyer.CreatedDate.seconds * 1000).isSame(weekEnd)
				) {
					if (buyers.PBType == 'Tripping') {
						trippingWeekObject.push({
							buyer: buyer,
							weekNo: key,
						});
					}

					weekDays++;
				}
			}
		});
	});

	const monthlyRange = moment.monthsShort();

	monthlyRange.filter((month, key) => {
		buyers.filter((buyer) => {
			if (buyer.CreatedDate) {
				if (
					moment(buyer.CreatedDate.seconds * 1000).format('MMM') ==
					month
				) {
					if (buyer.PBType == 'Tripping') {
						trippingMonthObject.push({
							buyer: buyer,
							weekNo: key,
						});
					}
				}
			}
		});
	});

	console.log(trippingMonthObject);
	WeekGenerator().filter((week, key) => {
		const weekStart = moment(week.start, 'YYYY-MM-DD');
		const weekEnd = moment(week.end, 'YYYY-MM-DD');
		weeklyDates.push(
			`${moment(weekStart).format('MMM DD')} - ${moment(weekEnd).format(
				'DD'
			)}`
		);
		soa.filter((amt) => {
			if (amt.Amount && moment(amt.CreatedDate.seconds * 1000)) {
				if (
					moment(amt.CreatedDate.seconds * 1000).isBetween(
						weekStart,
						weekEnd
					) ||
					moment(amt.CreatedDate.seconds * 1000).isSame(weekStart) ||
					moment(amt.CreatedDate.seconds * 1000).isSame(weekEnd)
				) {
					weekly += parseFloat(amt.Amount.replace(/,/g, ''));

					weekObject.push({
						amount: parseFloat(amt.Amount.replace(/,/g, '')),
						date: moment(amt.CreatedDate.seconds * 1000).format(
							'YYYY-MM-DD'
						),
						weekNo: key,
					});

					weekDays++;
				}
			}
		});
	});

	let weeklyData = Array(WeekGenerator().length).fill(0);

	weekObject.map((day) => {
		weeklyData.filter((item, keyD) => {
			if (keyD == day.weekNo) {
				weeklyData[keyD] += Number(day.amount);
			}
		});
	});

	monthlyRange.filter((month, key) => {
		soa.filter((amt) => {
			if (amt.Amount && moment(amt.CreatedDate.seconds * 1000)) {
				if (
					moment(amt.CreatedDate.seconds * 1000).format('MMM') ==
					month
				) {
					monthly += parseFloat(amt.Amount.replace(/,/g, ''));

					monthObject.push({
						amount: parseFloat(amt.Amount.replace(/,/g, '')),
						date: moment(amt.CreatedDate.seconds * 1000).format(
							'YYYY-MM-DD'
						),
						monthNo: key,
					});
				}
			}
		});
	});

	let monthlyData = Array(monthlyRange.length).fill(0);

	monthObject.map((day) => {
		monthlyData.filter((item, keyD) => {
			if (keyD == day.monthNo) {
				monthlyData[keyD] += Number(day.amount);
			}
		});
	});

	const yearlyRange = [
		'2023',
		'2024',
		'2025',
		'2026',
		'2027',
		'2028',
		'2029',
		'2030',
	];

	yearlyRange.filter((year, key) => {
		soa.filter((amt) => {
			if (amt.Amount && moment(amt.CreatedDate.seconds * 1000)) {
				if (
					moment(amt.CreatedDate.seconds * 1000).format('YYYY') ==
					year
				) {
					yearly += parseFloat(amt.Amount.replace(/,/g, ''));

					yearObject.push({
						amount: parseFloat(amt.Amount.replace(/,/g, '')),
						date: moment(amt.CreatedDate.seconds * 1000).format(
							'YYYY-MM-DD'
						),
						yearNo: key,
					});
				}
			}
		});
	});

	let yearData = Array(yearlyRange.length).fill(0);

	yearObject.map((day) => {
		yearData.filter((item, keyD) => {
			if (keyD == day.yearNo) {
				yearData[keyD] += Number(day.amount);
			}
		});
	});

	const filterOption = ['Weekly', 'Monthly', 'Yearly'];

	const label = [];
	const value = [];
	const [fil, setFilter] = useState(filterOption[0]);

	if (fil == 'Weekly') {
		value.push(weeklyData);
		label.push(weeklyDates);
	} else if (fil == 'Monthly') {
		value.push(monthlyData);
		label.push(monthlyRange);
	} else if (fil == 'Yearly') {
		value.push(yearData);
		label.push(yearlyRange);
	}

	const data = ['October 19', 'October 20', 'October 21'];
	const values = [
		{ name: 'Zoom', values: [1, 3, 2] },
		{ name: 'Tripping', values: [4] },
		{ name: 'Walk-Ins', values: [2, 2, 1] },
		{ name: 'Pull-Ins', values: [7, 3, 9] },
	];

	const values2 = [2, 4, 8, 1, 5];
	const data2 = [
		'October 15 - 21',
		'October 22 - 28',
		'October 28 - November 6',
		'November 7 - November 14',
	];
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
						xl: 'repeat(6, 1fr)',
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
						<Flex
							justifyContent={'space-between'}
							textAlign={'center'}
							alignItems={'flex-end'}
						>
							<Heading
								size={'md'}
								textAlign={'center'}
								pl={5}
							>
								Activities Report
							</Heading>
							<Menu
								closeOnSe
								lect={false}
							>
								<MenuButton
									as={IconButton}
									aria-label='Options'
									rightIcon={<RiArrowDownSFill />}
									variant={'primary'}
									bgColor={'b.300'}
									boxShadow='0 4px 12px 0 rgba(134,149,166,0.5)'
									pr={3}
									pl={5}
									size={'sm'}
									// w={{ base: '100%', xl: '10%' }}
								>
									{fil}
								</MenuButton>

								<MenuList>
									<MenuOptionGroup
										defaultValue='Tower 1'
										type='radio'
										onChange={(e) => {
											setFilter(e);
										}}
									>
										{filterOption.map((type, key) => (
											<MenuItemOption
												value={type}
												fontSize={'sm'}
												key={key}
											>
												{type}
											</MenuItemOption>
										))}
									</MenuOptionGroup>
								</MenuList>
							</Menu>
						</Flex>
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
						<Heading size={'md'}>Agents</Heading>
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
						colSpan={3}
					>
						<Flex
							justifyContent={'space-between'}
							textAlign={'center'}
							alignItems={'flex-end'}
						>
							<Heading
								size={'md'}
								textAlign={'center'}
								pl={5}
							>
								Sales Report
							</Heading>
							<Menu
								closeOnSe
								lect={false}
							>
								<MenuButton
									as={IconButton}
									aria-label='Options'
									rightIcon={<RiArrowDownSFill />}
									variant={'primary'}
									bgColor={'b.300'}
									boxShadow='0 4px 12px 0 rgba(134,149,166,0.5)'
									pr={3}
									pl={5}
									size={'sm'}
									// w={{ base: '100%', xl: '10%' }}
								>
									{fil}
								</MenuButton>

								<MenuList>
									<MenuOptionGroup
										defaultValue='Tower 1'
										type='radio'
										onChange={(e) => {
											setFilter(e);
										}}
									>
										{filterOption.map((type, key) => (
											<MenuItemOption
												value={type}
												fontSize={'sm'}
												key={key}
											>
												{type}
											</MenuItemOption>
										))}
									</MenuOptionGroup>
								</MenuList>
							</Menu>
						</Flex>
						<Divider
							w='100%'
							mt={3}
							mb={3}
						/>

						<LineGraph
							data={label[0]}
							orientation={'horizontal'}
							values={value[0]}
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
							{buyers.length}
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

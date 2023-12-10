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
import { TeamsTable } from '../index';
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

	// sales
	let weekly = 0; // if weekly
	let monthly = 0; //
	let yearly = 0; //

	let weeklyDates = [];
	let monthObject = [];
	let weekObject = [];
	let yearObject = [];
	var weekDays = 0;

	// tripping
	let weeklyTripping = 0;
	let monthlyTripping = 0;
	let yearlyTripping = 0;

	let trippingWeekObject = [];
	let pullinsWeekObject = [];
	let walkinWeekObject = [];
	let zoomWeekObject = [];

	let trippingMonthObject = [];
	let pullinsMonthObject = [];
	let walkinMonthObject = [];
	let zoomMonthObject = [];

	let trippingYearObject = [];
	let pullinsYearObject = [];
	let walkinYearObject = [];
	let zoomYearObject = [];

	const monthlyRange = moment.monthsShort();

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

	WeekGenerator().filter((week, key) => {
		const weekStart = moment(week.start, 'YYYY-MM-DD');
		const weekEnd = moment(week.end, 'YYYY-MM-DD');

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
					if (buyer.PBType == 'Tripping') {
						trippingWeekObject.push({
							buyer: buyer,
							weekNo: key,
						});
					} else if (buyer.PBType == 'Pull-ins') {
						pullinsWeekObject.push({
							buyer: buyer,
							weekNo: key,
						});
					} else if (buyer.PBType == 'Walk-in') {
						walkinWeekObject.push({
							buyer: buyer,
							weekNo: key,
						});
					} else if (buyer.PBType == 'Zoom') {
						zoomWeekObject.push({
							buyer: buyer,
							weekNo: key,
						});
					}

					weekDays++;
				}
			}
		});
	});

	let weeklyTrippingData = Array(WeekGenerator().length).fill(0);

	trippingWeekObject.map((day, key) => {
		weeklyTrippingData.filter((item, keyD) => {
			if (keyD == day.weekNo) {
				weeklyTrippingData[keyD] += 1;
			}
		});
	});

	let weeklyPullData = Array(WeekGenerator().length).fill(0);

	pullinsWeekObject.map((day, key) => {
		weeklyPullData.filter((item, keyD) => {
			if (keyD == day.weekNo) {
				weeklyPullData[keyD] += 1;
			}
		});
	});

	let weeklyWalkData = Array(WeekGenerator().length).fill(0);

	walkinWeekObject.map((day, key) => {
		weeklyWalkData.filter((item, keyD) => {
			if (keyD == day.weekNo) {
				weeklyWalkData[keyD] += 1;
			}
		});
	});

	let weeklyZoomData = Array(WeekGenerator().length).fill(0);

	zoomWeekObject.map((day, key) => {
		weeklyZoomData.filter((item, keyD) => {
			if (keyD == day.weekNo) {
				weeklyZoomData[keyD] += 1;
			}
		});
	});

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
							monthNo: key,
						});
					} else if (buyer.PBType == 'Pull-ins') {
						pullinsMonthObject.push({
							buyer: buyer,
							monthNo: key,
						});
					} else if (buyer.PBType == 'Walk-in') {
						walkinMonthObject.push({
							buyer: buyer,
							monthNo: key,
						});
					} else if (buyer.PBType == 'Zoom') {
						zoomMonthObject.push({
							buyer: buyer,
							monthNo: key,
						});
					}
				}
			}
		});
	});

	let trippingMonthlyData = Array(monthlyRange.length).fill(0);
	trippingMonthObject.map((day) => {
		trippingMonthlyData.filter((item, keyD) => {
			if (keyD == day.monthNo) {
				trippingMonthlyData[keyD] += 1;
			}
		});
	});

	let pullinsMonthlyData = Array(monthlyRange.length).fill(0);
	pullinsMonthObject.map((day) => {
		pullinsMonthlyData.filter((item, keyD) => {
			if (keyD == day.monthNo) {
				pullinsMonthlyData[keyD] += 1;
			}
		});
	});

	let walkinMonthlyData = Array(monthlyRange.length).fill(0);
	walkinMonthObject.map((day) => {
		walkinMonthlyData.filter((item, keyD) => {
			if (keyD == day.monthNo) {
				walkinMonthlyData[keyD] += 1;
			}
		});
	});

	let zoomMonthlyData = Array(monthlyRange.length).fill(0);
	zoomMonthObject.map((day) => {
		zoomMonthlyData.filter((item, keyD) => {
			if (keyD == day.monthNo) {
				zoomMonthlyData[keyD] += 1;
			}
		});
	});

	yearlyRange.filter((year, key) => {
		buyers.filter((buyer) => {
			if (buyer.CreatedDate) {
				if (
					moment(buyer.CreatedDate.seconds * 1000).format('YYYY') ==
					year
				) {
					if (buyer.PBType == 'Tripping') {
						trippingYearObject.push({
							buyer: buyer,
							yearNo: key,
						});
					} else if (buyer.PBType == 'Pull-ins') {
						pullinsYearObject.push({
							buyer: buyer,
							yearNo: key,
						});
					} else if (buyer.PBType == 'Walk-in') {
						walkinYearObject.push({
							buyer: buyer,
							yearNo: key,
						});
					} else if (buyer.PBType == 'Zoom') {
						zoomYearObject.push({
							buyer: buyer,
							yearNo: key,
						});
					}
				}
			}
		});
	});

	let trippingYearData = Array(monthlyRange.length).fill(0);
	trippingYearObject.map((day) => {
		trippingYearData.filter((item, keyD) => {
			if (keyD == day.yearNo) {
				trippingYearData[keyD] += 1;
			}
		});
	});

	let pullinsYearData = Array(monthlyRange.length).fill(0);
	pullinsYearObject.map((day) => {
		pullinsYearData.filter((item, keyD) => {
			if (keyD == day.yearNo) {
				pullinsYearData[keyD] += 1;
			}
		});
	});

	let walkinYearData = Array(monthlyRange.length).fill(0);
	walkinYearObject.map((day) => {
		walkinYearData.filter((item, keyD) => {
			if (keyD == day.yearNo) {
				walkinYearData[keyD] += 1;
			}
		});
	});

	let zoomYearData = Array(monthlyRange.length).fill(0);
	zoomYearObject.map((day) => {
		zoomYearData.filter((item, keyD) => {
			if (keyD == day.yearNo) {
				zoomYearData[keyD] += 1;
			}
		});
	});

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
	const [fil, setFilter] = useState(filterOption[2]);

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

	const actWeekValues = [
		{ name: 'Zoom', values: weeklyZoomData },
		{ name: 'Tripping', values: weeklyTrippingData },
		{ name: 'Walk-Ins', values: weeklyWalkData },
		{ name: 'Pull-Ins', values: weeklyPullData },
	];

	const actMonthValues = [
		{ name: 'Zoom', values: zoomMonthlyData },
		{ name: 'Tripping', values: trippingMonthlyData },
		{ name: 'Walk-Ins', values: walkinMonthlyData },
		{ name: 'Pull-Ins', values: pullinsMonthlyData },
	];

	const actYearValues = [
		{ name: 'Zoom', values: zoomYearData },
		{ name: 'Tripping', values: trippingYearData },
		{ name: 'Walk-Ins', values: walkinYearData },
		{ name: 'Pull-Ins', values: pullinsYearData },
	];

	const label1 = [];
	const value1 = [];
	const [fil1, setFilter1] = useState(filterOption[2]);

	if (fil1 == 'Weekly') {
		value1.push(actWeekValues);
		label1.push(weeklyDates);
	} else if (fil1 == 'Monthly') {
		value1.push(actMonthValues);
		label1.push(monthlyRange);
	} else if (fil1 == 'Yearly') {
		value1.push(actYearValues);
		label1.push(yearlyRange);
	}

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
						w={'95%'}
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
								Agent's Report
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
									{fil1}
								</MenuButton>

								<MenuList>
									<MenuOptionGroup
										defaultValue='Tower 1'
										type='radio'
										onChange={(e) => {
											setFilter1(e);
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
							data={label1[0]}
							values={value1[0]}
						/>
					</GridItem>
					<GridItem
						colSpan={{ base: 2, xl: 1 }}
						rowSpan={1}
						bgColor={'w.300'}
						boxShadow='0 4px 10px 0 rgba(134,149,166,0.3)'
						borderRadius={15}
						p={10}
						ml={-5}
						w={'100%'}
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
						pt={5}
						pb={5}
						rowSpan={{ base: 5, xl: 2 }}
						colSpan={3}
						ml={-5}
						pl={4}
						pr={5}
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

						<Box w={'110%'}>
							<LineGraph
								data={label[0]}
								orientation={'horizontal'}
								values={value[0]}
							/>
						</Box>
					</GridItem>
					<GridItem
						colSpan={{ base: 2, xl: 1 }}
						bgColor={'w.300'}
						boxShadow='0 4px 10px 0 rgba(134,149,166,0.3)'
						borderRadius={15}
						p={5}
						rowSpan={1}
						ml={-5}
						w={'100%'}
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
					<GridItem
						//colSpan={6}
						colSpan={{ xl: 6, sm: 2 }}
						bgColor={'w.300'}
						boxShadow='0 4px 10px 0 rgba(134,149,166,0.3)'
						borderRadius={15}
						p={5}
					>
						<Heading size={'md'}>Sales Teams</Heading>
						<Divider
							w='100%'
							mb={3}
						/>
						<TeamsTable data={employees} />
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

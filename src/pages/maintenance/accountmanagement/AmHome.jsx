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
	Card,
	Stepper,
	Step,
	StepIndicator,
	StepStatus,
	StepNumber,
} from '@chakra-ui/react';
import moment from 'moment';
import { extendMoment } from 'moment-range';

import { useData } from '../../../../DataContext';
import { Body } from '../../../sections/maintenance';
import { LineGraph, WeekGenerator } from '../../../utilities';
import { RiArrowDownSFill } from 'react-icons/ri';

const AmHome = () => {
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
	const { curUser, soa, transactions } = useData();

	let weekly = 0; // if weekly
	let monthly = 0; //
	let yearly = 0; //

	let weeklyDates = [];
	let monthObject = [];
	let weekObject = [];
	let yearObject = [];
	var weekDays = 0;

	// 5 weeks (1 month)
	WeekGenerator().filter((week, key) => {
		const weekStart = moment(week.start, 'YYYY-MM-DD');
		const weekEnd = moment(week.end, 'YYYY-MM-DD');
		weeklyDates.push(
			`${moment(weekStart).format('MMM DD')} - ${moment(weekEnd).format(
				'DD'
			)}`
		);
		transactions.filter((amt) => {
			if (amt.AmountPaid) {
				if (
					moment(amt.DatePaid).isBetween(weekStart, weekEnd) ||
					moment(amt.DatePaid).isSame(weekStart) ||
					moment(amt.DatePaid).isSame(weekEnd)
				) {
					weekly += parseFloat(amt.AmountPaid.replace(/,/g, ''));

					weekObject.push({
						amount: parseFloat(amt.AmountPaid.replace(/,/g, '')),
						date: moment(amt.DatePaid).format('YYYY-MM-DD'),
						weekNo: key,
					});

					weekDays++;
				}
			}
		});
	});

	console.log(weeklyDates);
	let weeklyData = Array(WeekGenerator().length).fill(0);

	weekObject.map((day) => {
		weeklyData.filter((item, keyD) => {
			if (keyD == day.weekNo) {
				weeklyData[keyD] += Number(day.amount);
			}
		});
	});

	const monthlyRange = moment.monthsShort();

	monthlyRange.filter((month, key) => {
		transactions.filter((amt) => {
			if (amt.AmountPaid) {
				if (moment(amt.DatePaid).format('MMM') == month) {
					monthly += parseFloat(amt.AmountPaid.replace(/,/g, ''));

					monthObject.push({
						amount: parseFloat(amt.AmountPaid.replace(/,/g, '')),
						date: moment(amt.DatePaid).format('YYYY-MM-DD'),
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
		transactions.filter((amt) => {
			if (amt.AmountPaid) {
				if (moment(amt.DatePaid).format('YYYY') == year) {
					yearly += parseFloat(amt.AmountPaid.replace(/,/g, ''));

					yearObject.push({
						amount: parseFloat(amt.AmountPaid.replace(/,/g, '')),
						date: moment(amt.DatePaid).format('YYYY-MM-DD'),
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

	let todayDue = [];
	soa.map((soa) => {
		if (soa.SOA) {
			Object.values(soa.SOA).map((s) => {
				if (
					s.month == moment().format('DD-MMM-YYYY') &&
					s.status != 'Paid' &&
					s.total
				) {
					todayDue.push({
						name: soa.FullName,
						unit: soa.Unit,
						amount: s.total,
					});
				}
			});
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
			<ScaleFade
				initialScale={0.9}
				in='true'
			>
				<Grid
					templateRows={{
						base: 'repeat(4, 1fr)',
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
						<LineGraph
							data={label[0]}
							orientation={'horizontal'}
							values={value[0]}
							name={'Transaction Sales'}
						/>
					</GridItem>
					<GridItem
						colSpan={{ base: 2, xl: 3 }}
						bgColor={'w.300'}
						boxShadow='0 4px 10px 0 rgba(134,149,166,0.3)'
						borderRadius={15}
						p={10}
						rowSpan={2}
						textAlign={'left'}
					>
						<Heading size={'md'}>Today's Due Dates</Heading>
						<Divider
							w='100%'
							mt={3}
							mb={3}
						/>
						{todayDue == '' && (
							<Text>No due transactions for today.</Text>
						)}
						{todayDue.map((due, key) => (
							<Card
								key={key}
								flexDir={{ base: 'column', xl: 'row' }}
								gap={4}
								borderRadius={15}
								// size={'100%'}
								p={5}
								alignItems={'center'}
								fontSize={'sm'}
							>
								<Stepper
									orientation='vertical'
									gap={'3'}
								>
									<Step>
										<StepIndicator>
											<StepStatus
												active={<StepNumber />}
											/>
										</StepIndicator>
									</Step>
								</Stepper>
								<Text
									fontWeight={'bold'}
									mr={-2}
								>
									Name:
								</Text>
								<Text>{due.name}</Text>
								<Text
									fontWeight={'bold'}
									mr={-2}
								>
									Unit:
								</Text>
								<Text
									alignItems={'center'}
									textAlign={'center'}
								>
									{due.unit}
								</Text>
								<Text
									fontWeight={'bold'}
									mr={-2}
								>
									Amount:
								</Text>
								<Text
									alignItems={'center'}
									textAlign={'center'}
								>
									{due.amount}
								</Text>
							</Card>
						))}
					</GridItem>
				</Grid>
			</ScaleFade>
		</Flex>
	);
};
export default AmHome;

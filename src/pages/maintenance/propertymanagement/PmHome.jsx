import React, { useState } from 'react';
import {
	Flex,
	Text,
	Heading,
	ScaleFade,
	Grid,
	GridItem,
	Divider,
	Menu,
	MenuButton,
	MenuList,
	MenuOptionGroup,
	MenuItemOption,
	IconButton,
	HStack,
	Box,
	VStack,
	Card,
	Stepper,
	Step,
	StepIndicator,
	StepStatus,
	StepNumber
} from '@chakra-ui/react';
import { Body } from '../../../sections/maintenance';
import { RiArrowDownSFill } from 'react-icons/ri';
import { useData } from '../../../../DataContext';
import{GiAcousticMegaphone} from 'react-icons/gi'
import {RiToolsFill} from 'react-icons/ri'
import { DateChecker } from '../../../utilities';
import moment from 'moment'

const PmHome = () => {
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
	const { anncmnts , mrequest, towers } = useData();

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
		
		if( mrequest && anncmnts){

			const [sortType, setSortType] = useState('asc');

			const totalActiveAnncmnts = anncmnts.filter((items)=>(items.Status == true && items.For.includes(item.TowerName)))
			const totalActiveMaintenance = mrequest.filter((items)=>(items.Status == 'Active' && items.Unit.includes(item.TowerNum)))

			
			if (totalActiveAnncmnts && totalActiveMaintenance){
				totalActiveAnncmnts.sort((a)=>{

					return(
						moment(
							new Date(
								sortType == 'asc'
									? a.CreatedDate.seconds * 1000
									: b.CreatedDate.seconds * 1000
							)
						)
					)
				})


				totalActiveMaintenance.sort((a)=>{

					return(
						moment(
							new Date(
								sortType == 'asc'
									? a.CreatedDate.seconds * 1000
									: b.CreatedDate.seconds * 1000
							)
						)
					)
				})


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
								rowSpan={{ base: 30, xl: 1 }}
								bgColor={'g.200'}
								boxShadow='0 4px 10px 0 rgba(134,149,166,0.3)'
								borderRadius={15}
								p={5}
								pt={7}
								w={'100%'}
							>
								<HStack alignContent={'center'}>
									<Flex boxSize={'50%'} justifyContent={'center'}>
										<GiAcousticMegaphone
											size={"70%"}
											color={'green'}
										/>
									</Flex>
									<Box boxSize={'60%'} justifyContent={'center'}>
										<Heading
											fontSize={'105px'}
											alignItems={'center'}
											textAlign={'center'}
											p={3}
										>
										
										{totalActiveAnncmnts.length}
										
										</Heading>
										<Heading size={'md'}>Active Announcement</Heading>
									</Box>
								</HStack>							
								
							</GridItem>
							<GridItem
								bgColor={'w.300'}
								boxShadow='0 4px 10px 0 rgba(134,149,166,0.3)'
								borderRadius={15}
								p={5}
								rowSpan={{ base: 5, xl: 2 }}
								colSpan={3}
								
							>
								<VStack boxSize={'100%'} p={3}>
									<Box w={'100%'}>
										<Heading size={'md'}>Latest Announcements</Heading>
										<Divider
											w='100%'
											mt={3}
											mb={3}
										/>	

										<Card size={'100%'} p={5} borderRadius={15}>
											
											<Stepper orientation='vertical'  gap='3'>
												{totalActiveAnncmnts.slice(0,2).map((item, index) => (
													<Step key={index}>
														<StepIndicator>
															<StepStatus
																active={<StepNumber />}
															/>
														</StepIndicator>

														<Text>
															{item.Description} ( <DateChecker dateToCheck={ new Date(
																item.CreatedDate.seconds *1000
															)}/> )
														</Text>
														
													</Step>
												))}
											</Stepper>
											{totalActiveAnncmnts.length == 0 
												? 'No Bookings for today': 
												totalActiveAnncmnts.length > 2 
												? `${
													totalActiveAnncmnts.length -
														2
												  }  more`
												: null
											}
										</Card>
									</Box>
									<Box w={'100%'}>
									<Heading size={'md'}>Latest Maintenance Request</Heading>
										<Divider
											w='100%'
											mt={3}
											mb={3}
										/>	

										<Card size={'100%'} p={5} borderRadius={15}>
											
											<Stepper orientation='vertical'  gap='3'>
												{totalActiveMaintenance.slice(0,2).map((item, index) => (
													<Step key={index}>
														<StepIndicator>
															<StepStatus
																active={<StepNumber />}
															/>
														</StepIndicator>

														<Text>{item.RepairType} ( {item.Unit} )</Text>														
													</Step>
												))}
											</Stepper>
											{totalActiveMaintenance.length == 0 
												? 'No Bookings for today': 
												totalActiveMaintenance.length > 2 
												? `${
													totalActiveMaintenance.length -
														2
												  }  more`
												: null
											}
										</Card>
									</Box>
								</VStack>
							</GridItem>
							<GridItem
								colSpan={2}
								rowSpan={{ base: 30, xl: 1 }}
								bgColor={'b.200'}
								boxShadow='0 4px 10px 0 rgba(134,149,166,0.3)'
								borderRadius={15}
								p={5}
								pt={7}
								w={'100%'}
							>
								<HStack>
									<Flex boxSize={'50%'} justifyContent={'center'}>
										<RiToolsFill
											size={'65%'}
											color={'0D2B4D'}
										/>
									</Flex>
									<Box boxSize={'60%'} justifyContent={'center'}>
										<Heading
											fontSize={'105px'}
											alignItems={'center'}
											textAlign={'center'}
											p={3}
										>
											{totalActiveMaintenance.length}
										</Heading>
										<Heading size={'md'}>Active Maintenance</Heading>	
									</Box>
								</HStack>			
							</GridItem>
						</Grid>
					</ScaleFade>
				</Flex>
			);
		}



		

	}

	// if (item) {

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

export default PmHome;

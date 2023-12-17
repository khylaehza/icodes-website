import React, { useState } from 'react';
import {
	Flex,
	Text,
	Heading,
	ScaleFade,
	MenuList,
	MenuOptionGroup,
	MenuItemOption,
	Menu,
	MenuButton,
	IconButton,
	Image,
	useDisclosure,
	Box,
} from '@chakra-ui/react';
import { RiArrowDownSFill } from 'react-icons/ri';
import { Body } from '../../../sections/maintenance';
import {
	CusTable,
	CusSearch,
	CusFilter,
	CusPagination,
	CusCalendar,
	CusEnlargeImage,
	CusCapacity,
} from '../../../customs';
import { AddBookings } from '../../../modals';
import { useData } from '../../../../DataContext';
import moment from 'moment';
import { BookingsTable } from '../../../tables';

const BookAmenities = () => {
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
	const {
		isOpen: isImageModalOpen,
		onOpen: onImageModalOpen,
		onClose: onImageModalClose,
	} = useDisclosure();

	const { curUser, bookings, amenities } = useData();
	const [currentPage, setCurrentPage] = useState(1);

	const recordsPerPage = 4;
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;
	const [selectedImage, setSelectedImage] = useState(null);
	const [nameLabel, setNameLabel] = useState('');
	const [search, setSearch] = useState('');

	const header = [
		'Created At',
		'Booking ID	',
		'Unit Owner',
		'Tower',
		'Amenity Name',
		'Date',
		'No. Of Persons',
		'Status',
		'Actions',
	];

	const ameOption = [];
	if (amenities && amenities[0]) {
		amenities.forEach((element) => {
			ameOption.push(element.AmenityName);
		});

		const [filterOnChange, setFilterOnChange] = useState(false);
		const filterAmenity = [];
		const [fil, setFilter] = useState(amenities[0].AmenityName);

		const list = filterOnChange ? filterAmenity : amenities;
		const item = list[0];

		const [sortType, setSortType] = useState('asc');

		const records = bookings.slice(firstIndex, lastIndex);
		const numPage = Math.ceil(bookings.length / recordsPerPage);
		const pages = [...Array(numPage + 1).keys()].slice(1);

		if (bookings && item) {
			amenities.filter((data) => {
				if (fil == data.AmenityName) {
					filterAmenity.push(data);
				}
			});

			bookings.sort((a, b) => {
				if (a.CreatedDate && b.CreatedDate) {
					return (
						moment(
							new Date(
								sortType == 'desc'
									? a.CreatedDate.seconds * 1000
									: b.CreatedDate.seconds * 1000
							)
						) -
						moment(
							new Date(
								sortType == 'asc'
									? a.CreatedDate.seconds * 1000
									: b.CreatedDate.seconds * 1000
							)
						)
					);
				}
			});

			const stats = fil ? fil : item.AmenityName;
			const customCalendarResult = CusCalendar({ stats: stats });
			const Calendar = customCalendarResult.calendar;
			const date = customCalendarResult.date;

			const handleImageClick = (data) => {
				setSelectedImage(data.AmenityImg);
				setNameLabel(data.AmenityName);
				onImageModalOpen();
			};

			return (
				<Flex
					flexDir='column'
					p={'45px'}
					h={'100%'}
					bg={'#EFF3F6'}
					justifyContent={'space-between'}
				>
					<ScaleFade
						initialScale={0.9}
						in='true'
					>
						<Flex flexDir='column'>
							<Heading
								fontSize='md'
								color={'b.300'}
							>
								Hi, {curUser.FName}!
							</Heading>
							<Text color={'b.300'}>
								Manage the amenity bookings here.
							</Text>
							<Flex
								justifyContent={'space-between'}
								flexDir={'column'}
								boxShadow='0 4px 10px 0 rgba(134,149,166,0.4)'
								w='100%'
								bg='w.100'
								p={5}
								mt={5}
								mb={5}
								rounded={5}
								textAlign={'center'}
								gap={3}
							>
								<Flex
									justifyContent={'space-between'}
									alignItems={'center'}
								>
									<Heading
										fontSize='sm'
										color={'b.300'}
									>
										CONFIRMED BOOKINGS
									</Heading>
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
											w={{ base: '100%', xl: '14%' }}
											size={'sm'}
										>
											{fil ? fil : item.AmenityName}
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
												{ameOption.map((val, key) => (
													<MenuItemOption
														value={val}
														fontSize={'sm'}
														key={key}
													>
														{val}
													</MenuItemOption>
												))}
											</MenuOptionGroup>
										</MenuList>
									</Menu>
								</Flex>

								<Flex
									w='100%'
									gap={5}
									flexDirection={'row'}
								>
									<Flex
										w={'40%	'}
										boxShadow='0 4px 10px 0 rgba(134,149,166,0.4)'
										bg='w.200'
										rounded={15}
									>
										<Image
											objectFit={'cover'}
											w={'100%'}
											h={{ base: '250px', lg: '380px' }}
											src={item.AmenityImg}
											rounded={15}
											onClick={() =>
												handleImageClick(item)
											}
										/>
									</Flex>
									<Flex
										bgColor={'#FFF'}
										w={'30%'}
										boxShadow='0 4px 10px 0 rgba(134,149,166,0.4)'
										rounded={15}
										p={1}
									>
										<Box
											fontSize='sm'
											color={'b.300'}
										>
											{Calendar}
										</Box>
									</Flex>
									<Flex
										bgColor={'#FFF'}
										w={'30%'}
										boxShadow='0 4px 10px 0 rgba(134,149,166,0.4)'
										rounded={15}
										p={15}
										flexDir={'column'}
									>
										<CusCapacity
											date={date}
											stats={stats}
										/>
									</Flex>
								</Flex>
							</Flex>
							<Flex
								display='flex'
								justifyContent='flex-end'
								mb={5}
								gap={5}
								flexDir={{
									base: 'column',
									md: 'row',
								}}
							>
								<Flex gap={5}>
									<CusSearch
										placeholder={'Search by ID'}
										onChange={(e) =>
											setSearch(e.target.value)
										}
									/>
									<CusFilter setSortType={setSortType} />
								</Flex>

								<AddBookings />
							</Flex>

							<Flex
								justifyContent={'space-between'}
								flexDir={'column'}
							>
								{records.length >= 1 ? (
									<CusTable
										header={header}
										children={
											<BookingsTable
												data={records}
												search={search}
												all={bookings}
											/>
										}
									/>
								) : (
									<Flex
										flexDir='column'
										h={'100%'}
										bg={'#EFF3F6'}
										justifyContent={'center'}
										align={'center'}
										gap={2}
									>
										<Image
											src={
												'https://i.imgur.com/KOOp170.gif'
											}
											size={'xl'}
											objectFit={'contain'}
										/>

										<Text fontWeight={'bold'}>
											No data available.
										</Text>
									</Flex>
								)}
							</Flex>
						</Flex>
					</ScaleFade>
					{records.length >= 1 && (
						<CusPagination
							page={pages}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
							lastIndex={lastIndex}
							firstIndex={firstIndex}
							numPage={numPage}
						/>
					)}
					<CusEnlargeImage
						isOpen={isImageModalOpen}
						onClose={onImageModalClose}
						label={nameLabel}
						body={
							<Image
								src={selectedImage}
								width={'680px'}
								height={'500px'}
							/>
						}
					/>
				</Flex>
			);
		}
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
					src={'https://i.imgur.com/KOOp170.gif'}
					size={'xl'}
					objectFit={'contain'}
				/>
				<Heading>Welcome {curUser.FName}!</Heading>
				<Text fontWeight={'bold'}>
					Wait for admin to input amenities to show in your dashboard.
				</Text>
			</Flex>
		);
	}
};

export default BookAmenities;

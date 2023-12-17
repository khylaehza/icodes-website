import {
	Flex,
	Stack,
	Box,
	Text,
	Image,
	Button,
	Center,
	Heading,
	useColorModeValue,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { Carousel } from 'react-responsive-carousel';
import { useState } from 'react';
import { BiBath } from 'react-icons/bi';
import { RxRulerSquare } from 'react-icons/rx';
import { IoBedOutline } from 'react-icons/io5';
import Slider from './Slider';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../../DataContext';
import AddInterested from '../dss/AddInterested';
export default function Units() {
	const { unitData, unitTypes } = useData();

	if (unitTypes && unitData) {
		const cards = [];

		const unique = [
			...new Map(unitData.map((m) => [m.TypeName, m])).values(),
		];

		unique.map((card, index) => {
			let bath = [];
			let bed = [];

			unitTypes.map((type) => {
				if (
					`${card.TypeName}` == `${type.TypeName} (${type.TypeCode})`
				) {
					bath.push(type.NumOfBath);
					bed.push(type.NumOfBed);
				}
			});

			if (card.Tower) {
				cards.push({
					key: `card-${index}`,
					content: (
						<Cards
							images={card.TypeImage}
							name={card.TypeName}
							tower={`Tower ${card.Tower.toString().charAt(1)} (${
								card.Tower
							})`}
							size={`${card.UnitSize} sq. m`}
							bath={bath.toString()}
							bed={bed.toString()}
						/>
					),
				});
			}
		});

		if (cards.length > 0) {
			return (
				<Flex
					flexDir={'row'}
					w={'100%'}
					justify={'center'}
					align={'center'}
					h={'100%'}
				>
					<Slider
						cards={cards}
						offset={2}
						showArrows={false}
					/>
				</Flex>
			);
		} else {
			const br1 = [
				'https://i.pinimg.com/736x/a5/7e/93/a57e93e0926e5c3708799eb11ce0e1d7.jpg',
				'https://i.pinimg.com/736x/f7/cb/b7/f7cbb7f616ca7674ecdaff3209d31319.jpg',
				'https://i.pinimg.com/736x/30/ac/1d/30ac1d7f49e57326d769a72ec8a9f9a2.jpg',
				'https://i.pinimg.com/736x/93/b4/51/93b451308f11dafd76060bc037d6f736.jpg',
			];

			const br2 = [
				'https://i.pinimg.com/736x/e7/a5/1b/e7a51bf0fecc06551b19c7ca644bf4b4.jpg',
				'https://i.pinimg.com/736x/6d/1d/a3/6d1da379c733cde63324adb9b4156325.jpg',
				'https://i.pinimg.com/736x/ef/e0/c4/efe0c4725dfc223e9289255ed6d4a4b3.jpg',
				'https://i.pinimg.com/736x/b3/2b/5c/b32b5c5f04816e5b34311863361dc657.jpg',
			];

			const studio = [
				'https://i.pinimg.com/736x/00/ea/01/00ea012785e201a1c829223cc302a472.jpg',
				'https://i.pinimg.com/736x/30/0c/4d/300c4db0b8933864e624b23262ce2243.jpg',
				'https://i.pinimg.com/736x/e0/a6/aa/e0a6aa86184af964d016027834b830d7.jpg',
				'https://i.pinimg.com/736x/95/cf/c9/95cfc96f059a85228cc5281eedc35a23.jpg',
			];

			const br2Big = [
				'https://i.pinimg.com/736x/8b/f7/6d/8bf76dac483c0da0ea3a3084a57a199f.jpg',
				'https://i.pinimg.com/736x/c5/35/1a/c5351a3b9df20ebc9060cb9cc80514c5.jpg',
				'https://i.pinimg.com/736x/ba/85/2f/ba852fd5326030c1d5bf5cfdda5ac44f.jpg',
				'https://i.pinimg.com/736x/7d/7a/2e/7d7a2e8852fa8d5d9506d7b817afb244.jpg',
			];

			const br3 = [
				'https://i.pinimg.com/736x/93/b4/51/93b451308f11dafd76060bc037d6f736.jpg',
				'https://i.pinimg.com/736x/93/b4/51/93b451308f11dafd76060bc037d6f736.jpg',
				'https://i.pinimg.com/736x/dc/97/bd/dc97bd06e7c61a0b8abe132982318102.jpg',
				'https://i.pinimg.com/736x/df/c9/fd/dfc9fd41fd60097615911daab466486f.jpg',
			];
			let cards = [
				{
					key: uuidv4(),
					content: (
						<Cards
							images={br1}
							name={'1 Bedroom'}
							tower={'Tower 2'}
							size={'30 sq. m'}
							bath={1}
							bed={1}
						/>
					),
				},
				{
					key: uuidv4(),
					content: (
						<Cards
							images={br2}
							name={'2 Bedrooms'}
							tower={'Tower 2'}
							size={'52 sq. m'}
							bath={1}
							bed={1}
						/>
					),
				},
				{
					key: uuidv4(),
					content: (
						<Cards
							images={studio}
							name={'Studio'}
							tower={'Tower 2'}
							size={'20 sq. m'}
							bath={1}
							bed={0}
						/>
					),
				},
				{
					key: uuidv4(),
					content: (
						<Cards
							images={br2Big}
							name={'2 Bedrooms Bigcut'}
							tower={'Tower 2'}
							size={'70 sq. m'}
							bath={2}
							bed={2}
						/>
					),
				},
				{
					key: uuidv4(),
					content: (
						<Cards
							images={br3}
							name={'3 Bedrooms'}
							tower={'Tower 2'}
							size={'79 sq. m'}
							bath={2}
							bed={3}
						/>
					),
				},
			];
			return (
				<Flex
					flexDir={'row'}
					w={'100%'}
					justify={'center'}
					align={'center'}
					h={'100%'}
				>
					<Slider
						cards={cards}
						offset={2}
						showArrows={false}
					/>
				</Flex>
			);
		}
	}
}

const Cards = ({ images, name, tower, size, bath, bed }) => {
	const [isVisible, setIsVisible] = useState(false);

	function over() {
		setIsVisible(true);
	}
	function out() {
		setIsVisible(false);
	}

	const navigate = useNavigate();
	if (images) {
		return (
			<Center py={6}>
				<Box
					maxW={'320px'}
					w={'270px'}
					bg={useColorModeValue('white', 'gray.900')}
					boxShadow={'2xl'}
					rounded={'lg'}
					p={6}
					textAlign={'center'}
					_hover={{ w: '275px', h: '353px' }}
					cursor={'pointer'}
				>
					<Carousel
						infiniteLoop
						showThumbs={false}
						showArrows={false}
						showStatus={false}
						autoPlay={isVisible}
						interval={1000}
					>
						{images.map((slide, key) => (
							<Box
								rounded={'lg'}
								key={key}
								mt={-12}
								mb={-12}
								pos={'relative'}
								height={'230px'}
								onMouseEnter={over}
								onMouseLeave={out}
								cursor={'pointer'}
								_after={{
									transition: 'all .3s ease',
									content: '""',
									w: 'full',
									h: 'full	',
									pos: 'absolute',
									top: 5,
									left: 0,
									backgroundImage: slide,
									filter: 'blur(15px)',
									zIndex: -1,
								}}
								_groupHover={{
									_after: {
										filter: 'blur(20px)',
									},
								}}
							>
								<Image
									rounded={'lg'}
									height={'230px'}
									width={282}
									objectFit={'cover'}
									src={slide}
									alt='#'
								/>
							</Box>
						))}
					</Carousel>
					<Heading
						fontSize={'lg'}
						fontFamily={'body'}
					>
						{name}
					</Heading>
					<Text
						fontWeight={600}
						color={'gray.500'}
						mb={4}
					>
						{tower}
					</Text>

					<Stack
						align={'center'}
						justify={'center'}
						direction={'row'}
						mt={6}
						fontSize={'xs'}
					>
						<Stack
							px={2}
							py={1}
							align={'center'}
							justify={'center'}
							direction={'row'}
							bg={useColorModeValue('gray.50', 'gray.800')}
						>
							<IoBedOutline />
							<Text fontWeight={'400'}>{bed}</Text>
						</Stack>

						<Stack
							px={2}
							py={1}
							align={'center'}
							justify={'center'}
							direction={'row'}
							bg={useColorModeValue('gray.50', 'gray.800')}
						>
							<BiBath />
							<Text fontWeight={'400'}>{bath}</Text>
						</Stack>
						<Stack
							px={2}
							py={1}
							align={'center'}
							justify={'center'}
							direction={'row'}
							bg={useColorModeValue('gray.50', 'gray.800')}
						>
							<RxRulerSquare />
							<Text fontWeight={'400'}>{size}</Text>
						</Stack>
					</Stack>

					<Stack
						mt={8}
						direction={'row'}
						spacing={4}
					>
						<Button
							flex={1}
							fontSize={'sm'}
							_focus={{
								bg: 'gray.200',
							}}
							onClick={() => {
								navigate('/unitcanvas', {
									state: { unit: name },
								});
							}}
						>
							Explore
						</Button>
						<AddInterested unit={name} />
					</Stack>
				</Box>
			</Center>
		);
	}
};

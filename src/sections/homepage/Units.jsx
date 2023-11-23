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

export default function Units() {
	const br1 = [
		'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Funits%2F1br%2F1.jpg?alt=media&token=147d63da-34a6-4b3f-8b6c-e18e09915ca8',
		'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Funits%2F1br%2F2.jpg?alt=media&token=bfcd599d-4cc0-4fc9-99c6-a34b27276e3c',
		'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Funits%2F1br%2F3.jpg?alt=media&token=4f7c1b4e-168b-403b-b836-8a64eaef04c1',
		'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Funits%2F1br%2F4.jpg?alt=media&token=e7e7a15c-4acf-4637-8172-e00478a26e41',
	];

	const br2 = [
		'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Funits%2F2br%2F1.jpg?alt=media&token=b13fea11-cce2-450a-bfb6-f0894c456cd4',
		'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Funits%2F2br%2F2.jpg?alt=media&token=88f14499-822c-4d5f-aa4a-ffbc6384dfc6',
		'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Funits%2F2br%2F3.jpg?alt=media&token=bbecd5c5-7c40-44c6-957e-5d050c67dddc',
		'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Funits%2F2br%2F4.jpg?alt=media&token=17cbb851-4cc4-4542-b968-4ead6071218a',
	];

	const studio = [
		'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Funits%2Fstudio%2F1.jpg?alt=media&token=0b6f5099-4ff7-4031-bf74-8ec404078975',
		'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Funits%2Fstudio%2F2.jpg?alt=media&token=6c420723-24db-4c7f-b6b3-3f0a349e57b6',
		'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Funits%2Fstudio%2F3.jpg?alt=media&token=d93eccb4-81e7-41ef-800c-846b4c7a709f',
		'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Funits%2Fstudio%2F4.jpg?alt=media&token=f6a44842-401d-483d-85b6-5f012d8b3e19',
	];

	const br2Big = [
		'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Funits%2F2brBig%2F1.jpg?alt=media&token=f8ca0af1-d4e3-4109-94f4-8c1f2426361a',
		'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Funits%2F2brBig%2F2.jpg?alt=media&token=4e374b26-c698-4ee7-a8a8-988f5332b4d7',
		'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Funits%2F2brBig%2F3.jpg?alt=media&token=d5476603-49c7-432e-bf88-47e21da37962',
		'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Funits%2F2brBig%2F4.jpg?alt=media&token=c7ae0eb1-0af4-4b72-b076-87d28a323350',
	];

	const br3 = [
		'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Funits%2F3br%2F1.jpg?alt=media&token=5fe16032-49f1-4ebf-9acd-13f0526ba8f7',
		'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Funits%2F3br%2F2.jpg?alt=media&token=097fe4d1-c7b0-444c-b901-c47e13c22f23',
		'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Funits%2F3br%2F3.jpg?alt=media&token=e42e4388-0c34-4399-bbae-9e31df3f6aae',
		'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Funits%2F3br%2F4.jpg?alt=media&token=98a5e649-f426-4f3e-b86f-d9107a19ee1b',
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

const Cards = ({ images, name, tower, size, bath, bed }) => {
	const [isVisible, setIsVisible] = useState(false);

	function over() {
		setIsVisible(true);
	}
	function out() {
		setIsVisible(false);
	}

	const navigate = useNavigate();
	return (
		<Center py={6}>
			<Box
				maxW={'320px'}
				w={'250px'}
				bg={useColorModeValue('white', 'gray.900')}
				boxShadow={'2xl'}
				rounded={'lg'}
				p={6}
				textAlign={'center'}
				_hover={{ w: '255px', h: '353px' }}
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
						rounded={'full'}
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
					<Button
						flex={1}
						fontSize={'sm'}
						rounded={'full'}
						bg={'b.300'}
						color={'white'}
						boxShadow={
							'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
						}
						_hover={{
							bg: 'blue.900',
						}}
						_focus={{
							bg: 'blue.900',
						}}
					>
						Interested
					</Button>
				</Stack>
			</Box>
		</Center>
	);
};

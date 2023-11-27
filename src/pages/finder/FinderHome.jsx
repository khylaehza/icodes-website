import React, { useState } from 'react';
import {
	Box,
	Stack,
	Heading,
	Text,
	Container,
	SimpleGrid,
	Button,
	Image,
	Flex,
} from '@chakra-ui/react';
import FinderForm from './FinderForm';
import { useFormik } from 'formik';
import { useProcessData } from './scripts/useProcessData';
import styled from '@emotion/styled';

const FormBody = styled.div`
	position: relative;

	&::before {
		content: '';
		background: linear-gradient(
				145.7deg,
				#eff4f7 7.61%,
				rgba(10, 37, 66, 0) 79.73%
			),
			linear-gradient(
				229.74deg,
				#e7eef4 9.39%,
				rgba(13, 43, 77, 0) 93.29%
			),
			linear-gradient(81.06deg, #000 1.35%, #000 30.92%);
		-webkit-backdrop-filter: blur(5px);
		backdrop-filter: blur(5px);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	height: 100%;
	scroll-snap-type: y mandatory;
	scroll-behavior: smooth;
	scrollbar-width: none;
	padding: 45px;
	color: white;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const Blur = (props) => {
	return (
		<Image
			zIndex={-4}
			alt={'Finder Image'}
			objectFit={'cover'}
			w={'100%'}
			h={'100%'}
			src={'/imgs/dss/finder-bg.jpg'}
			{...props}
		></Image>
	);
};
const FinderHome = () => {
	const { process_Data } = useProcessData();
	const [results, setResult] = useState();
	const [points, setPoints] = useState();
	const [text, setText] = useState();

	const form = useFormik({
		initialValues: {
			floorLevel: '',
			familySize: '',
			selectedAmenity: [],
			minimumPrice: '',
			maximumPrice: '',
			questions: [],
		},
		onSubmit: (values, actions) => {
			console.log(values);
			const pd = process_Data(values);
			setResult(pd.processedResults);
			setPoints(pd.processedPoints);
			setText(pd.processedText);
		},
	});

	console.log();
	const [isStart, setStart] = useState(false);
	const handleClick = () => {
		setStart(true);
	};

	return (
		<>
			<Box
				position={'relative'}
				justifyItems={'center'}
				maxH={'100%'}
			>
				<Blur
					position={'absolute'}
					top={'-0px'}
					style={{ filter: 'brightness(32%) blur(13px)' }}
				/>

				<Container
					as={SimpleGrid}
					maxW={'7xl'}
					spacing={{ base: 10, lg: 32 }}
					py={{ base: 10, sm: 20, lg: 32 }}
					//height={'40%'}
				>
					<Stack
						spacing={{ base: 5, md: 10 }}
						justifyContent={'center'}
						position={'relative'}
					>
						<Heading
							lineHeight={1.1}
							fontSize={{
								base: '2xl',
								sm: '3xl',
								md: '4xl',
								lg: '5xl',
							}}
							textAlign={'center'}
							color={'w.100'}
							_hover={{
								transform: 'scale(1.05)',
								transition: 'transform 0.5s ease-in',
							}}
							css={{
								animation: 'fadeInUp 3s ease-in',
								'@keyframes fadeInUp': {
									'0%': { opacity: 0 },
									'100%': { opacity: 1 },
								},
							}}
						>
							Let's find the{' '}
							<Text
								as={'span'}
								color={'b.300'}
							>
								unit
							</Text>{' '}
							that's best for you.
						</Heading>
					</Stack>
				</Container>
			</Box>
			<FormBody>
				<Heading
					color={'b.300'}
					pl={8}
				>
					Preferences
				</Heading>
				<Text
					fontSize={'xl'}
					color={'b.400'}
					py={3}
					px={3}
					pl={10}
				>
					For less that 5 minutes you can get a condo description that
					can guide your decision in acquiring suitable units
					{/* Set your desired floor level, unit face direction, unit types, amenities family size and price. */}
				</Text>
				{isStart ? (
					<FinderForm
						setStart={setStart}
						form={form}
						results={results}
						points={points}
						text={text}
					/>
				) : (
					<Flex
						justifyContent={'center'}
						p={3}
					>
						<Button onClick={handleClick}>
							Start Taking Unit Assesment
						</Button>
					</Flex>
				)}
			</FormBody>
			{/* </Body> */}
		</>
	);
};
export default FinderHome;

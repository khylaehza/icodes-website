import {
	Flex,
	IconButton,
	Text,
	Box,
	Grid,
	Button,
	Spacer,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	PopoverArrow,
	useDisclosure,
} from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { Stage, OrbitControls } from '@react-three/drei';
import {
	AiOutlineDelete,
	AiOutlineRotateRight,
	AiOutlineFormatPainter,
} from 'react-icons/ai';
import { IoDuplicateOutline } from 'react-icons/io5';
import { useCustomization } from '../../../FurnitureContext';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import '../../App.css';
const FurnitureInfo = ({
	model,
	name,
	dim,
	cm,
	setRotate,
	rotate,
	activeKey,
	color,
}) => {
	const { activeFurn, setActiveFurn } = useCustomization();
	const { onOpen, onClose, isOpen } = useDisclosure();
	const clonedElement = React.cloneElement(model, {
		color: color,
	});
	const [showButton, setShowButton] = useState(false);
	const [activeButton, setActiveButton] = useState();
	const [newColor, setColor] = useState();
	const handleClick = (id) => {
		const newState = activeFurn.map((furn, index) => {
			if (index === id) {
				return { ...furn, isShown: false, isActive: false };
			}
			return furn;
		});

		setActiveFurn(newState);
	};

	const handleRClick = (id) => {
		const newState = activeFurn.map((furn, index) => {
			if (index === id) {
				return {
					...furn,
					rotation: rotate,
					xMin: furn.xMin,
					xMax: furn.xMax,
					zMin: furn.zMin,
					zMax: furn.zMax,
				};
			}
			return furn;
		});

		setActiveFurn(newState);
	};

	const handleDupliClick = (id) => {
		activeFurn.map((furn, index) => {
			if (index === id) {
				const obj = {
					model: furn.model,
					name: furn.name,
					l: furn.l,
					w: furn.w,
					key: furn.key,
					rotation: furn.rotation,
					isActive: false,
					isShown: true,
					color: furn.color,
					xMin: furn.xMin,
					xMax: furn.xMax,
					zMin: furn.zMin,
					zMax: furn.zMax,
				};

				setActiveFurn((cur) => [...cur, obj]);
			}
		});
	};

	const handleStyleClick = (id) => {
		setShowButton(!showButton);
	};

	const findPart = (id, partName) => {
		const newState = activeFurn.map((furn, index) => {
			if (index === id) {
				return {
					...furn,
					color: { ...color, [partName]: newColor },
				};
			}
			return furn;
		});

		setActiveFurn(newState);
	};

	return (
		<Flex
			flexDirection={'column'}
			justifyItems={'center'}
			position={'absolute'}
			top={'13%'}
			right={5}
			zIndex={10}
			mt={20}
		>
			<Flex
				bgColor={'#FFFAF0'}
				borderRadius={5}
				boxShadow={'xl'}
				w={'100%'}
			>
				<Box p={15}>
					<Box
						w={'200px'}
						h={'150px'}
						borderRadius={4}
					>
						<Canvas
							camera={{
								zoom: 0.5,
							}}
						>
							<Stage scale={0.01}>{clonedElement}</Stage>
							<OrbitControls
								makeDefault
								autoRotate={false}
								enableDamping={false}
								minPolarAngle={-Math.PI / 2}
								maxPolarAngle={Math.PI / 2}
							/>
						</Canvas>
					</Box>
					<Box>
						<Text
							fontSize={'lg'}
							fontWeight={'bold'}
						>
							{name}
						</Text>
						<Text fontSize={'xs'}>{dim}</Text>
						<Text fontSize={'xs'}>{cm}</Text>
					</Box>
					<Grid
						templateColumns='repeat(2, 1fr)'
						templateRows='repeat(2, 1fr)'
						columnGap={0}
						rowGap={5}
						justifyItems={'center'}
						alignItems={'center'}
						p={5}
						// mt={-3}
					>
						<IconButton
							isRound={true}
							variant='solid'
							icon={<AiOutlineDelete />}
							w={'20%'}
							onClick={() => {
								handleClick(activeKey);
							}}
							shadow={'lg'}
							bgColor={'#EFDEC7'}
							color={'#79443B'}
							border={'1px'}
							borderColor={'#F9EEDA'}
						/>
						<IconButton
							isRound={true}
							variant='solid'
							icon={<AiOutlineRotateRight />}
							w={'20%'}
							onClick={() => {
								setRotate((rotate -= Math.PI / 2));
								handleRClick(activeKey);
							}}
							shadow={'lg'}
							bgColor={'#EFDEC7'}
							color={'#79443B'}
							border={'1px'}
							borderColor={'#F9EEDA'}
						/>
						<IconButton
							isRound={true}
							variant='solid'
							icon={<IoDuplicateOutline />}
							w={'20%'}
							onClick={() => {
								handleDupliClick(activeKey);
							}}
							shadow={'lg'}
							bgColor={'#EFDEC7'}
							color={'#79443B'}
							border={'1px'}
							borderColor={'#F9EEDA'}
						/>
						<IconButton
							isRound={true}
							variant='solid'
							icon={<AiOutlineFormatPainter />}
							w={'20%'}
							onClick={() => {
								handleStyleClick(activeKey);
							}}
							shadow={'lg'}
							bgColor={'#EFDEC7'}
							color={'#79443B'}
							border={'1px'}
							borderColor={'#F9EEDA'}
						/>
					</Grid>

					{showButton
						? activeFurn.map((prop, i) => {
								if (activeKey == i) {
									return Object.entries(prop.color).map(
										(x, y) => {
											return (
												<Box
													flexDir={'row'}
													display={'flex'}
													p={1}
													m={1}
													justifyItems={'center'}
													shadow={'xl'}
													key={y}
													boxShadow={'2xl'}
												>
													<Text>{x[0]}</Text>
													<Spacer />
													<Popover
														onOpen={onOpen}
														onClose={onClose}
													>
														<PopoverTrigger>
															<Button
																onClick={() => {
																	setActiveButton(
																		x[0]
																	);
																}}
																bgColor={
																	activeButton ==
																	x[0]
																		? newColor
																		: x[1]
																		? x[1]
																		: '#fff'
																}
																border={'1px'}
																borderColor={
																	'#F9EEDA'
																}
																size={'xs'}
															></Button>
														</PopoverTrigger>
														<PopoverContent
															w={'100px'}
															h={'100px'}
														>
															<PopoverArrow />

															<PopoverBody>
																<Flex
																	className={
																		'colorPicker custom-pointers example'
																	}
																>
																	<HexColorPicker
																		color={
																			x[1]
																				? x[1]
																				: '#fff'
																		}
																		onChange={
																			setColor
																		}
																		onClick={() =>
																			findPart(
																				activeKey,
																				x[0],
																				newColor
																			)
																		}
																		className='react-colorful'
																	/>
																</Flex>
															</PopoverBody>
														</PopoverContent>
													</Popover>
												</Box>
											);
										}
									);
								}
						  })
						: null}
				</Box>
			</Flex>
		</Flex>
	);
};

export default FurnitureInfo;

import '../../App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stage, OrbitControls, MeshReflectorMaterial } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import { IoExitOutline } from 'react-icons/io5';
import { CusPDF, CusAlert } from '../../customs';
import {
	Grid,
	Models,
	FurnitureChoices,
	FurnitureInfo,
	Guide,
} from '../../sections/interactive';
import { useCustomization } from '../../../FurnitureContext';
import { TopNav } from '../../sections/navigation';
import React from 'react';
import { useThree } from '@react-three/fiber';
import {
	UnitStudio,
	Unit3br,
	Unit1br,
	Unit2br,
	Unit2brBig,
} from '../../assets';
import { useControls, LevaPanel, useCreateStore, button } from 'leva';
import * as THREE from 'three';
import { useLocation, useNavigate } from 'react-router-dom';

import { PDFDownloadLink } from '@react-pdf/renderer';

const UnitCanvasPage = () => {
	const { activeFurn, setActiveFurn } = useCustomization();
	const [open, setOpen] = useState(false);
	const [key, setKey] = useState();
	const [rotate, setRotate] = useState(0);

	const location = useLocation();
	const navigate = useNavigate();

	const unit = location.state?.unit;
	const size = location.state?.size;

	const [img, setImage] = useState();
	const handleClick = (event, id) => {
		if (event.detail == 2) {
			setOpen(true);

			const newState = activeFurn.map((furn, index) => {
				if (index === id) {
					return { ...furn, isActive: true, key: index };
				} else {
					return { ...furn, isActive: false, key: index };
				}
			});

			setActiveFurn(newState);
		}
	};

	const store = useCreateStore();
	const theme = {
		colors: {
			elevation2: '#F9EEDA', //panel
			accent2: '#808080', //range
			accent3: '#373C4B', //scroller
			highlight2: '#F9EEDA', //text
		},
	};
	function Zoom() {
		const { zoom } = useControls(
			{
				zoom: { value: 0.3, min: 0.2, max: 1, step: 0.01 },
			},
			{ store: store }
		);
		return useFrame((state) => {
			state.camera.zoom = THREE.MathUtils.lerp(
				state.camera.zoom,
				zoom * 4,
				0.1
			);
			state.camera.updateProjectionMatrix();
		});
	}

	const screenStore = useCreateStore();
	const screenTheme = {
		colors: {
			elevation2: '#373C4B', //panel
			accent2: '#373C4B', // bg
			accent3: '#373C4B', // borderline
			highlight3: '#FFFFFF', //text
			accent1: '#373C4B', //text
		},
		fontSizes: {
			root: '15px',
		},
	};
	function Save() {
		const gl = useThree((state) => state.gl);
		useControls(
			{
				Save: button(() => {
					const link = document.createElement('a');
					link.setAttribute('download', 'canvas.png');
					link.setAttribute(
						'href',
						gl.domElement
							.toDataURL('image/png')
							.replace('image/png', 'image/octet-stream')
					);
					setImage(gl.domElement.toDataURL('image/png'));
				}),
			},
			{ store: screenStore }
		);
	}

	const UnitType = () => {
		switch (unit) {
			case 'Studio (ST)':
				return <UnitStudio />;
			case '1 Bedroom (1BR)':
				return <Unit1br />;
			case '2 Bedrooms (2BR)':
				return <Unit2br />;
			case '3 Bedrooms (3BR)':
				return <Unit3br />;
			case '2 Bedrooms Bigcut (2BR)':
				return <Unit2brBig />;
		}
	};

	const { isOpen, onOpen, onClose } = useDisclosure();

	const onExit = () => {
		onClose();
		setActiveFurn([]);
		navigate('/');
	};

	return (
		<Flex
			className='App'
			w={'100vw'}
			flexDir={'column'}
		>
			<TopNav />
			<FurnitureChoices />
			<div
				style={{
					position: 'absolute',
					top: 100,
					right: 40,
				}}
			>
				<LevaPanel
					fill
					flat
					titleBar={false}
					hideTitleBar
					theme={theme}
					store={store}
				/>
			</div>

			<div
				style={{
					position: 'absolute',
					top: 120,
					left: 20,
					width: 75,
					fontFamily: 'monospace',
					overflow: 'auto',
					background: '#FFFAF0',
					zIndex: 5,
					alignContent: 'center',
					alignItems: 'center',
					justifyContent: 'center',
					justifyItems: 'center',
					boxShadow: '1px 1px 12px 1px #FFFFFF',
					borderColor: '#F9EEDA',
					borderRadius: 5,
				}}
			>
				<PDFDownloadLink
					document={
						<CusPDF
							img={img}
							data={activeFurn}
							unit={unit}
							size={size}
						/>
					}
					fileName='CTC_UnitDesign.pdf'
				>
					<LevaPanel
						fill
						flat
						titleBar={false}
						hideTitleBar
						theme={screenTheme}
						store={screenStore}
					/>
				</PDFDownloadLink>
			</div>
			<Canvas
				camera={{
					fov: 75,
					position: [10, 190, 50],
					near: 0.1,
					far: 1000,
				}}
				gl={{ preserveDrawingBuffer: true }}
			>
				<Zoom />
				<Save />

				<color
					attach='background'
					args={['#F9EEDA']}
				/>

				<fog
					attach='fog'
					args={['#F9EEDA', 5, 70]}
				/>

				<Suspense>
					<Stage>
						<UnitType />
					</Stage>

					<group position={[0, 0, 0]}>
						<Grid>
							{activeFurn.map((furn, activeKey) => {
								if (furn.isShown) {
									return (
										<Models
											child={furn.model}
											key={activeKey}
											activeKey={activeKey}
											action={(e) => {
												setKey(activeKey);
												handleClick(e, activeKey);
											}}
											rotate={
												activeKey == key
													? furn.rotation
													: furn.rotation
											}
											color={
												furn.changedColor
													? furn.color
													: furn.color
											}
											xMin={furn.xMin}
											xMax={furn.xMax}
											zMin={furn.zMin}
											zMax={furn.zMax}
										/>
									);
								}
							})}
						</Grid>
					</group>

					<mesh
						rotation={[-Math.PI / 2, 0, 0]}
						position-y={-2}
					>
						<planeGeometry args={[150, 150]} />
						<MeshReflectorMaterial
							blur={[300, 100]}
							resolution={2048}
							mixBlur={1}
							mixStrength={5}
							roughness={1}
							depthScale={1.2}
							minDepthThreshold={0.4}
							maxDepthThreshold={1.4}
							color='#C19A6B'
							metalness={0.1}
						/>
					</mesh>
				</Suspense>
				<OrbitControls
					makeDefault
					autoRotate={false}
					enableDamping={false}
					minPolarAngle={-Math.PI / 2}
					maxPolarAngle={Math.PI / 2}
					enableZoom={true}
				/>
			</Canvas>
			{activeFurn.map((active, index) => {
				if (active.isActive && open) {
					return (
						<FurnitureInfo
							model={active.model}
							name={active.name}
							dim={`${active.l} in × ${active.w} in`}
							cm={`(${(active.l * 2.54).toFixed(2)} cm × ${(
								active.w * 2.54
							).toFixed(2)} cm)`}
							setRotate={setRotate}
							rotate={rotate}
							key={index}
							activeKey={key}
							color={active.color}
						/>
					);
				}
			})}

			<Guide />
			<CusAlert
				button={
					<IconButton
						bgColor={'#373C4B'}
						color={'#FFFFFF'}
						icon={<IoExitOutline />}
						position={'absolute'}
						bottom={20}
						left={5}
						w={75}
						h={50}
						boxShadow={'1px 1px 12px 1px #FFFFFF'}
						_hover={{ background: '#373C4B' }}
						onClick={onOpen}
					/>
				}
				body={'Are you sure you want to exit?'}
				actionLabel={'Exit'}
				isOpen={isOpen}
				onClose={onClose}
				action={onExit}
			/>
		</Flex>
	);
};

export default UnitCanvasPage;

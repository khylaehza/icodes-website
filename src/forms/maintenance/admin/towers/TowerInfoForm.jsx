import React, { useState } from 'react';
import { Stack, IconButton, Center, Box, Image } from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';
import { CusUpload, CusInputRegular, CusNumInput } from '../../../../customs';
import moment from 'moment';
const TowerInfoForm = ({
	form,
	imgFileName,
	setFloorNum,
	setTower,
	setShowImage,
	showImage,
}) => {
	const [img, setImg] = useState('');

	return (
		<Stack w={'100%'}>
			<form id='formDiv'>
				<Stack>
					<Stack
						direction={['column', 'row']}
						spacing={2}
					>
						<Center>
							<Box
								w='100px'
								height='100px'
								style={{
									display: showImage ? 'none' : 'block',
								}}
								border={'2px'}
								borderColor={'b.100'}
							></Box>
							{showImage && (
								<Box>
									<IconButton
										borderRadius={100}
										size={'xs'}
										border={'2px'}
										borderColor={'w.300'}
										colorScheme='red'
										aria-label='Remove Image'
										icon={<MdClose />}
										position={'absolute'}
										onClick={(e) => {
											e.preventDefault();
											setShowImage(null);
											document.getElementById(
												'towerImg'
											).value = '';
										}}
										left={180}
										mt={'-10px'}
										zIndex={2}
									/>
									<Image
										w='250px'
										height='100px'
										src={showImage}
										border={'2px'}
										borderColor={'b.100'}
									/>
								</Box>
							)}
						</Center>
						<Center w='full'>
							<CusUpload
								name='towerImg'
								id='towerImg'
								isRequired
								onChange={(e) => {
									const file = e.target.files[0];
									form.setFieldValue('towerImg', file);
									setShowImage(URL.createObjectURL(file));
									setImg(file);
								}}
								fileName={
									showImage && img.name
										? `Image Chosen: ${img.name}`
										: (imgFileName &&
												`Image: ${imgFileName}`) ||
										  "Upload Tower's Image"
								}
								onBlur={form.handleBlur}
								error={form.errors.towerImg}
								touch={form.touched.towerImg}
								showImage={showImage}
							/>
						</Center>
					</Stack>
					<Stack
						direction={['column', 'row']}
						spacing={6}
					>
						<CusNumInput
							isRequired
							label={'Tower Number'}
							name='tower'
							id={'tower'}
							value={form.values.tower}
							onChange={(e) => {
								form.setFieldValue('tower', e);
								setTower(e);
							}}
							onBlur={form.handleBlur}
							error={form.errors.tower}
							touch={form.touched.tower}
							type={'number'}
						/>

						<CusInputRegular
							isRequired
							label={'Tower Details'}
							name='towerDesc'
							id={'towerDesc'}
							placeholder={'Add information about the tower.'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.towerDesc}
							error={form.errors.towerDesc}
							touch={form.touched.towerDesc}
						/>
					</Stack>
					<Stack
						direction={['column', 'row']}
						spacing={6}
					>
						<CusNumInput
							isRequired
							label={'Enter Number of Floors with Unit'}
							name='floorQuan'
							id={'floorQuan'}
							onChange={(e) => {
								form.setFieldValue('floorQuan', e);
								setFloorNum(e);
							}}
							onBlur={form.handleBlur}
							value={form.values.floorQuan}
							error={form.errors.floorQuan}
							touch={form.touched.floorQuan}
							placeholder={'Lobby is not included. '}
						/>

						<CusNumInput
							label={'Quantity of Parkings'}
							id={'parkQuan'}
							name='parkQuan'
							onChange={(e) => {
								form.setFieldValue('parkQuan', e);
							}}
							error={form.errors.parkQuan}
							touch={form.touched.parkQuan}
							value={form.values.parkQuan}
						/>
					</Stack>

					<Stack
						direction={['column', 'row']}
						spacing={6}
					>
						<CusInputRegular
							isRequired
							label={'Launch Date'}
							type={'date'}
							name='launchDate'
							id='launchDate'
							onChange={form.handleChange}
							value={form.values.launchDate}
							error={form.errors.launchDate}
							onBlur={form.handleBlur}
							touch={form.touched.launchDate}
						/>

						<CusInputRegular
							isRequired
							label={'Completion Date'}
							type={'date'}
							name='completeDate'
							id='completeDate'
							onChange={form.handleChange}
							value={form.values.completeDate}
							error={form.errors.completeDate}
							onBlur={form.handleBlur}
							touch={form.touched.completeDate}
						/>
					</Stack>
				</Stack>
			</form>
		</Stack>
	);
};

export default TowerInfoForm;

import React, { useState } from 'react';
import { Stack, Button, Heading, HStack, Box } from '@chakra-ui/react';
import {
	CusInputRegular,
	CusTextArea,
	CusNumInput,
	CusSelectAllTower,
	CusUpload,
} from '../../../customs';

const AmenitiesForm = ({
	form,
	imgFileName,
	doSentences,
	setDoSentences,
	dontSentences,
	setDontSentences,
}) => {
	const [ameImg, setAmeImg] = useState('');
	const [showImage, setShowImage] = useState(form.values.ameImage);
	return (
		<Stack w={'100%'}>
			<form id='formDiv'>
				<Stack>
					<Stack
						direction={['column', 'row']}
						spacing={6}
					>
						<CusSelectAllTower
							label={'Tower'}
							name='tower'
							id='tower'
							placeholder={'Select Tower'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.tower}
							error={form.errors.tower}
							touch={form.touched.tower}
							isRequired
						/>

						<CusInputRegular
							label={'Name'}
							name='ameName'
							id={'ameName'}
							placeholder={'e.g. Swimming Pool'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.ameName}
							error={form.errors.ameName}
							touch={form.touched.ameName}
							isRequired
						/>

						<CusNumInput
							label={'Capacity'}
							name='capacity'
							id={'capacity'}
							value={form.values.capacity}
							onChange={(e) => {
								form.setFieldValue('capacity', e);
							}}
							onBlur={form.handleBlur}
							error={form.errors.capacity}
							touch={form.touched.capacity}
							isRequired
						/>
					</Stack>
					<Stack
						direction={['column', 'row']}
						spacing={6}
					>
						<CusTextArea
							label={'Description'}
							name='ameDesc'
							id={'ameDesc'}
							placeholder={'e.g. To '}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.ameDesc}
							error={form.errors.ameDesc}
							touch={form.touched.ameDesc}
							isRequired
						/>
						<Stack>
							<CusUpload
								name='ameImage'
								id='ameImage'
								onChange={(e) => {
									const file = e.target.files[0];
									form.setFieldValue('ameImage', file);
									setAmeImg(file);
									setShowImage(URL.createObjectURL(file));
								}}
								fileName={
									ameImg.name && showImage
										? `Image Chosen: ${ameImg.name}`
										: (imgFileName &&
												`Image: ${imgFileName}`) ||
										  'Add Image of Amenity'
								}
								onBlur={form.handleBlur}
								error={form.errors.ameImage}
								touch={form.touched.ameImage}
								showImage={showImage}
								isRequired
							/>
						</Stack>
					</Stack>
					<Stack>
						<Box w={'100%'}>
							<HStack>
								<CusTextArea
									label={
										"Do's Policy (Press ';' to add new line)"
									}
									name='Do'
									id={'Do'}
									placeholder={'e.g. Do wear proper attire.'}
									onChange={(e) => {
										const value = e.target.value;
										const modified = value.replace(
											/;/g,
											',\n'
										);
										const doArray = modified.split(',');
										form.setFieldValue('Do', doArray);
										setDoSentences(doArray);
									}}
									onBlur={form.handleBlur}
									value={
										doSentences.join(',') || form.values.Do
									}
									error={form.errors.Do}
									touch={form.touched.Do}
								/>
								<CusTextArea
									label={
										"Dont's Policy (Press ';' to add new line)"
									}
									name='Dont'
									id={"Don't"}
									placeholder={"e.g. Don't dive. "}
									onChange={(e) => {
										const value = e.target.value;
										const modified = value.replace(
											/;/g,
											',\n'
										);
										const dontArray = modified.split(',');
										form.setFieldValue('Dont', dontArray);
										setDontSentences(dontArray);
									}}
									onBlur={form.handleBlur}
									value={
										dontSentences.join(',') ||
										form.values.Dont
									}
									error={form.errors.Dont}
									touch={form.touched.Dont}
								/>
							</HStack>
						</Box>
					</Stack>
					<Stack
						direction={['column', 'row']}
						justify={'flex-end'}
					>
						<Button
							variant={'primary'}
							onClick={form.handleSubmit}
						>
							Save
						</Button>
					</Stack>
				</Stack>
			</form>
		</Stack>
	);
};
export default AmenitiesForm;

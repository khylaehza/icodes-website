import React, { useState } from 'react';
import { Stack, Button, Heading, HStack, Box } from '@chakra-ui/react';
import {
	CusMultiSelectTower,
	CusSelectAnnouncement,
	CusInputRegular,
	CusUpload,
	CusTextArea,
} from '../../../customs';

const AnnouncementForm = ({ form, options, setOptions, imgFileName }) => {
	const [anncmntImg, setanncmntImg] = useState('');
	return (
		<Stack w={'100%'}>
			<form id='formDiv'>
				<Stack>
					<Stack
						direction={['column', 'row']}
						spacing={6}
						mb={3}
					>
						<CusMultiSelectTower
							label={'For'}
							name='towers'
							id={'towers'}
							placeholder={'For'}
							value={options}
							onChange={(e) => {
								form.setFieldValue('towers', e);
								setOptions(e);
								//setTower(e);
							}}
							onBlur={form.handleBlur}
							error={form.errors.towers}
							touch={form.touched.towers}
						/>
						<CusSelectAnnouncement
							label={'Type'}
							name='purpose'
							id='purpose'
							placeholder={'Enter purpose'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.purpose}
							error={form.errors.purpose}
							touch={form.touched.purpose}
						/>

						{/* <CusAnncmntSubject
                            label={'For'}
                            name='for'
                            id={'for'}
                            placeholder={'Select Announcement subject'}
                            value={subject}
                            onChange={(e) => {
                                form.setFieldValue('for', e);
                                setOptions(e);
                                setSubject(e)
                                setShowSecondMultiSelect(e.some((option) => option.value === 'Unit Owners'));
                            }}
                            onBlur={form.handleBlur}
                        /> */}
						{/* <CusInputRegular
							label={'Purpose'}
							name='purpose'
							id='purpose'
							placeholder={'Enter purpose'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.purpose}
							error={form.errors.purpose}
							touch={form.touched.purpose}
						/> */}

						{/* <CusSelectStatus
							label={'Status'}
							name='status'
							id='status'
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.status}
							error={form.errors.status}
							touch={form.touched.status}
						/> */}
					</Stack>
					<Stack
						direction={['column', 'row']}
						spacing={6}
						mb={3}
					>
						<CusInputRegular
							label={'Subject'}
							name='subject'
							id='subject'
							placeholder={'Enter Subject'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.subject}
							error={form.errors.subject}
							touch={form.touched.subject}
						/>
						<CusInputRegular
							label={'Author'}
							name='author'
							id='author'
							placeholder={'Enter author'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.author}
							error={form.errors.author}
							touch={form.touched.author}
						/>
					</Stack>
					{/* {showSecondMultiSelect && (
                            <CusMultiSelectUnit
                            label={'Unit'}
                            name='units'
                            id={'units'}
                            placeholder={'Select Condo Name'}
                            value={unit}
                            onChange={(e) => {
                                form.setFieldValue('units', e);
                                setOptions(e)
                                setUnit(e);
                            }}
                            onBlur={form.handleBlur}
                        />
                        )} */}

					{/* <Stack
						direction={['column', 'row']}
						spacing={6}
					> */}

					<Stack
						direction={['column', 'row']}
						spacing={6}
						alignItems={'flex-end'}
					>
						<CusTextArea
							label={'Description'}
							name='description'
							id={'description'}
							placeholder={
								'Detailed information about the announcement...'
							}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.description}
							error={form.errors.description}
							touch={form.touched.description}
						/>

						<CusUpload
							name='anncmntImg'
							id='anncmntImg'
							onChange={(e) => {
								const file = e.target.files[0];
								form.setFieldValue('anncmntImg', file);
								setanncmntImg(file);
							}}
							fileName={
								anncmntImg
									? `Image Chosen: ${anncmntImg.name}`
									: (imgFileName &&
											`Image: ${imgFileName}`) ||
									  'Click to Upload Photo/File for Announcement'
							}
							onBlur={form.handleBlur}
							error={form.errors.anncmntImg}
							touched={form.touched.anncmntImg}
						/>
					</Stack>
					{/* </Stack> */}
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

export default AnnouncementForm;

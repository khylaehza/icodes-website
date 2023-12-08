import React, { useState } from 'react';
import { Stack, Button, Box } from '@chakra-ui/react';
import {
	CusMaintenanceStatus,
	CusMaintenanceItem,
	CusSelectOccupiedUnit,
	CusInputRegular,
	CusUpload,
} from '../../../customs';

const MaintenanceForm = ({ form, imageFiles }) => {
	const [requestImg, setRequestImg] = useState(form.values.requestImg);

	const imageNames = [];

	Object.keys(requestImg).map((s) => {
		imageNames.push(requestImg[s].name);
	});
	return (
		<Stack w={'100%'}>
			<form
				id='formDiv'
				encType='multipart/form-data'
			>
				<Stack>
					<Stack
						spacing={6}
						pt={2}
						direction={['column', 'row']}
						mb={2}
					>
						<CusSelectOccupiedUnit
							label={'Location'}
							name='units'
							id={'units'}
							placeholder={'Select Location'}
							value={form.values.units}
							onBlur={form.handleBlur}
							onChange={form.handleChange}
							error={form.errors.units}
							touch={form.touched.units}
							isRequired
						/>

						<CusMaintenanceItem
							label={'Type of Repair'}
							name='repairType'
							id='repairType'
							onChange={(e) => {
								const value = e.target.value;
								form.setFieldValue('repairType', value);
							}}
							onBlur={form.handleBlur}
							value={form.values.repairType}
							error={form.errors.repairType}
							touch={form.touched.repairType}
							isRequired
						/>
					</Stack>
					{/* {
						open &&(
							<Box w={'100%'}>
								<CusTextArea
									label={"Others (be specific)"}
									name='others'
									id={'others'}
									placeholder={'e.g. To '}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									value={form.values.others}
									error={form.errors.others}
									touch={form.touched.others}
								/>
							</Box>
						)
					} */}

					<Stack
						direction={['column', 'row']}
						spacing={6}
					>
						{/* <CusInputRegular
							label={'Date request'}
							name='dateRequested'
							id='dateRequested'
							type={'date'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.dateRequested}
							error={form.errors.dateRequested}
							touch={form.touched.dateRequested}
						/> */}
						<CusInputRegular
							label={'Request Description (Please be specific)'}
							name='details'
							id='details'
							placeholder={
								'Enter specific problem needed to fix.'
							}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.details}
							error={form.errors.details}
							touch={form.touched.details}
							isRequired
						/>
						<CusMaintenanceStatus
							label={'Status'}
							name='status'
							id='status'
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.status}
							error={form.errors.status}
							touch={form.touched.status}
						/>
					</Stack>
					<Box>
						<CusUpload
							name='requestImg'
							id='requestImg'
							onChange={(e) => {
								const file = e.target.files;
								form.setFieldValue('requestImg', file);
								setRequestImg(file);
							}}
							fileName={
								requestImg && imageNames.length != imageFiles
									? `Image Chosen: ${imageNames.join(', ')}`
									: (imageFiles && `Image : ${imageFiles}`) ||
									  'Click to Upload Photo/s for Maintenance'
							}
							onBlur={form.handleBlur}
							error={form.errors.requestImg}
							touched={form.touched.requestImg}
							multiple={true}
							isRequired={true}
							showImage={requestImg}
						/>
					</Box>
					{/* <Stack
						direction={['column', 'row']}
						spacing={6}
						mb={3}
					> */}
					{/* <CusInputRegular
							label={'Request Description'}
							name='purpose'
							id='purpose'
							placeholder={'Enter purpose'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.purpose}
							error={form.errors.purpose}
							touch={form.touched.purpose}
						/>
						<CusInputRegular
							label={'Other Details'}
							name='details'
							id='details'
							placeholder={'Enter other details'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.details}
							error={form.errors.details}
							touch={form.touched.details}
						/>
					</Stack> */}

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

export default MaintenanceForm;

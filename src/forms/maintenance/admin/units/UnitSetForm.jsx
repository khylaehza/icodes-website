import { useEffect, useState } from 'react';
import { Stack, Button } from '@chakra-ui/react';
import {
	CusMultiSelectUnit,
	CusSelectSize,
	CusSelectUnTypes,
	CusUpload,
} from '../../../../customs';

const UnitSetForm = ({
	form,
	units,
	setUnit,
	disabled,
	layoutFileName,
	imageFiles,
}) => {
	const [showFloorImage, setShowFloorImage] = useState(
		form.values.layoutImage
	);
	const [showUnitImage, setShowUnitImage] = useState(form.values.unitImage);
	const [layoutImg, setLayoutImg] = useState('');

	const imageNames = [];

	Object.keys(showUnitImage).map((s) => {
		imageNames.push(showUnitImage[s].name);
	});

	return (
		<Stack w={'100%'}>
			<form
				id='formDiv'
				encType='multipart/form-data'
			>
				<Stack>
					<Stack>
						<CusMultiSelectUnit
							isRequired
							label={'Unit'}
							name='units'
							id={'units'}
							placeholder={'Select Unit Name'}
							value={units}
							onChange={(e) => {
								form.setFieldValue('units', e);
								setUnit(e);
							}}
							onBlur={form.handleBlur}
							error={form.errors.units}
							touch={form.touched.units}
							disabled={disabled}
						/>
					</Stack>
					<Stack
						direction={['column', 'row']}
						spacing={6}
					>
						<CusSelectUnTypes
							isRequired
							name='typeName'
							label='Select Unit Type'
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							placeholder='Select'
							error={form.errors.typeName}
							touch={form.touched.typeName}
							value={form.values.typeName}
						/>

						<CusSelectSize
							isRequired
							placeholder='Select'
							name='unitSize'
							label='Select Unit Size'
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.unitSize}
							error={form.errors.unitSize}
							touch={form.touched.unitSize}
						/>
					</Stack>
					<Stack
						direction={['column', 'row']}
						spacing={6}
					>
						<CusUpload
							name='layoutImage'
							id='layoutImage'
							onChange={(e) => {
								const file = e.target.files[0];
								form.setFieldValue('layoutImage', file);
								setShowFloorImage(URL.createObjectURL(file));
								setLayoutImg(file);
							}}
							fileName={
								showFloorImage && layoutImg.name
									? `Layout Image Chosen: ${layoutImg.name}`
									: (layoutFileName &&
											`Layout Image: ${layoutFileName}`) ||
									  "Click to add unit's floor layout"
							}
							onBlur={form.handleBlur}
							error={form.errors.layoutImage}
							touch={form.touched.layoutImage}
							showImage={showFloorImage}
							isRequired={true}
						/>
						<CusUpload
							name='unitImage'
							id='unitImage'
							onChange={(e) => {
								const file = e.target.files;
								form.setFieldValue('unitImage', file);
								setShowUnitImage(file);
							}}
							fileName={
								showUnitImage && imageNames.length != imageFiles
									? `Unit Image: ${imageNames.join(', ')}`
									: (imageFiles &&
											`${imageFiles} Unit Image/s`) ||
									  "Click to add unit's image/s"
							}
							onBlur={form.handleBlur}
							error={form.errors.unitImage}
							touch={form.touched.unitImage}
							multiple={true}
							isRequired={true}
							showImage={showUnitImage}
						/>
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

export default UnitSetForm;

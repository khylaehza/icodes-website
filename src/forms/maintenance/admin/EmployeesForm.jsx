import {
	CusInputFloat,
	CusInputRegular,
	CusInputLeftAdd,
	CusInputRightAdd,
	CusSelectEmployees,
	CusUpload,
	CusAvatarBadge,
} from '../../../customs';
import { Stack, Avatar, Center, Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
const EmployeesForm = ({ form, setEmpPos, imgValue }) => {
	const [showImage, setShowImage] = useState(form.values.image);
	const [img, setImg] = useState('');

	return (
		<Stack w={'100%'}>
			<form id='formDiv'>
				<Stack>
					<Stack
						direction={['column', 'row']}
						spacing={6}
					>
						<Center>
							<Flex
								flexDir={'column'}
								alignContent={'center'}
							>
								<Avatar
									size='xl'
									style={{
										display: showImage ? 'none' : 'block',
									}}
								/>

								{showImage && (
									<CusAvatarBadge
										src={showImage}
										action={(e) => {
											e.preventDefault();
											setShowImage(null);
											document.getElementById(
												'image'
											).value = '';
										}}
									/>
								)}

								<Text
									color={'black'}
									fontSize={'small'}
									alignSelf={'center'}
								>
									Image
								</Text>
							</Flex>
						</Center>
						<Center w='full'>
							<CusUpload
								name='image'
								id='image'
								isRequired
								onChange={(e) => {
									const file = e.target.files[0];
									form.setFieldValue('image', file);
									setShowImage(URL.createObjectURL(file));
									setImg(file);
								}}
								fileName={
									showImage && img.name
										? `Image Chosen: ${img.name}`
										: (imgValue && `Image: ${imgValue}`) ||
										  "Click to Upload Employee's Image"
								}
								onBlur={form.handleBlur}
								error={form.errors.image}
								touch={form.touched.image}
								showImage={showImage}
							/>
						</Center>
					</Stack>

					<Stack
						spacing={6}
						pt={4}
						direction={['column', 'row']}
					>
						<CusInputFloat
							name='lName'
							variant='floating'
							label={'Last Name'}
							id={'lName'}
							isRequired
							value={form.values.lName}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.lName}
							touch={form.touched.lName}
						/>
						<CusInputFloat
							name='fName'
							variant='floating'
							label={'First Name'}
							id={'fName'}
							isRequired
							value={form.values.fName}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.fName}
							touch={form.touched.fName}
						/>
						<CusInputFloat
							name='mName'
							variant='floating'
							label={'Middle Name'}
							id={'mName'}
							value={form.values.mName}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
						/>
					</Stack>

					<Stack
						direction={['column', 'row']}
						spacing={6}
					>
						<CusInputLeftAdd
							name='cNum'
							label={'Contact Number'}
							id={'cNum'}
							type={'number'}
							add={'+639'}
							placeholder={'XXXXXXXXX'}
							isRequired
							value={form.values.cNum}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.cNum}
							touch={form.touched.cNum}
							maxLength={9}
						/>

						<CusInputRightAdd
							name='email'
							label={'Email'}
							id={'email'}
							type={'email'}
							add={'.com'}
							placeholder={'XXXXXXXXXX@XXXXX'}
							isRequired
							value={form.values.email}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.email}
							touch={form.touched.email}
						/>
					</Stack>

					<Stack
						direction={['column', 'row']}
						spacing={6}
						pb={6}
					>
						<CusSelectEmployees
							name='empPos'
							isRequired
							id={'empPos'}
							label={'Position'}
							onChange={(e) => {
								form.setFieldValue('empPos', e.target.value);
								setEmpPos(e.target.value);
							}}
							onBlur={form.handleBlur}
							error={form.errors.empPos}
							touch={form.touched.empPos}
							value={form.values.empPos}
						/>
						<CusInputRegular
							name='empId'
							label={'Employee ID'}
							id={'empId'}
							type={'number'}
							placeholder={'XXXXXX'}
							isRequired
							value={form.values.empId}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.empId}
							touch={form.touched.empId}
						/>
						<CusInputRegular
							name='dStart'
							label={'Start Date'}
							id={'dStart'}
							type={'date'}
							isRequired
							value={form.values.dStart}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.dStart}
							touch={form.touched.dStart}
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

export default EmployeesForm;

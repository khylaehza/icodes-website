import React, { useState } from 'react';
import {
	Stack,
	Avatar,
	AvatarBadge,
	IconButton,
	Center,
	Text,
	Flex,
} from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';
import { CusSelectReservedOwner, CusInputRegular } from '../../../../customs';
import { CusUpload } from '../../../../customs';

function RequirementForm({
	form,
	setShowImage,
	showImage,
	fileData,
	setOwner,
	disabled,
	isEdit,
}) {
	const [img, setImg] = useState('');
	const [cert, setCert] = useState('');
	const [income, setIncome] = useState('');
	const [billing, setBilling] = useState('');
	const [tin, setTin] = useState('');
	const [id1, setId1] = useState('');
	const [id2, setId2] = useState('');

	const [showCert, setShowCert] = useState(form.values.Cert);
	const [showIncome, setShowIncome] = useState(form.values.Income);
	const [showBilling, setShowBilling] = useState(form.values.Billing);
	const [showTin, setShowTin] = useState(form.values.Tin);
	const [showID1, setShowID1] = useState(form.values.Id1);
	const [showID2, setShowID2] = useState(form.values.Id2);
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
								></Avatar>
								{showImage && (
									<Avatar
										size='xl'
										src={showImage}
										border={'2px'}
										borderColor={'Highlight'}
									>
										<AvatarBadge
											as={IconButton}
											size='sm'
											rounded='full'
											top='-10px'
											colorScheme='red'
											aria-label='remove Image'
											icon={<MdClose />}
											onClick={(e) => {
												e.preventDefault();
												setShowImage(null);
												document.getElementById(
													'unOwnerImg'
												).value = '';
											}}
										/>
									</Avatar>
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
								name='unOwnerImg'
								id='unOwnerImg'
								isRequired
								onChange={(e) => {
									const file = e.target.files[0];
									form.setFieldValue('unOwnerImg', file);
									setShowImage(URL.createObjectURL(file));
									setImg(file);
								}}
								fileName={
									showImage && img.name
										? `Image Chosen: ${img.name}`
										: (fileData[5] &&
												`Image: ${fileData[5].fileName}`) ||
										  "Click to Upload Unit Owner's Image"
								}
								onBlur={form.handleBlur}
								error={form.errors.unOwnerImg}
								touch={form.touched.unOwnerImg}
								showImage={showImage}
							/>
						</Center>
					</Stack>
					<Stack
						spacing={6}
						pt={4}
						direction={['column', 'row']}
					>
						{!isEdit && (
							<CusSelectReservedOwner
								label={'Reserved Owner'}
								name='fullName'
								id='fullName'
								placeholder={'Select Reserved Owner'}
								onChange={(e) => {
									form.setFieldValue(
										'fullName',
										e.target.value
									);
									setOwner(e.target.value);
								}}
								onBlur={form.handleBlur}
								value={form.values.fullName}
								error={form.errors.fullName}
								touch={form.touched.fullName}
								isRequired
							/>
						)}
						{isEdit && (
							<>
								<CusInputRegular
									isRequired
									name='fullName'
									label='Full Name'
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									placeholder='Select'
									error={form.errors.fullName}
									touch={form.touched.fullName}
									value={form.values.fullName}
									disabled={disabled}
								/>
							</>
						)}
					</Stack>
					<Stack
						direction={['column', 'row']}
						spacing={6}
					>
						<CusUpload
							name='cert'
							id='cert'
							onChange={(e) => {
								const file = e.target.files[0];
								form.setFieldValue('cert', file);
								console.log(form.values.cert);
								setCert(file);
								setShowCert(URL.createObjectURL(file));
							}}
							fileName={
								cert && cert.name
									? `File Chosen: ${cert.name}`
									: (fileData[1] &&
											`File: ${fileData[1].fileName}`) ||
									  'Upload Birth/Marriage Certificate'
							}
							onBlur={form.handleBlur}
							isRequired
							error={form.errors.cert}
							touch={form.touched.cert}
							showImage={showCert}
						/>
						<CusUpload
							name='id1'
							id='id1'
							onChange={(e) => {
								const file = e.target.files[0];
								form.setFieldValue('id1', file);
								setId1(file);
								setShowID1(URL.createObjectURL(file));
							}}
							fileName={
								id1 && id1.name
									? `File Chosen: ${id1.name}`
									: (fileData[2] &&
											`File: ${fileData[2].fileName}`) ||
									  'Upload First Valid Identification (ID)'
							}
							onBlur={form.handleBlur}
							isRequired
							error={form.errors.id1}
							touch={form.touched.id1}
							showImage={showID1}
						/>
						<CusUpload
							name='id2'
							id='id2'
							onChange={(e) => {
								const file = e.target.files[0];
								form.setFieldValue('id2', file);
								setId2(file);
								setShowID2(URL.createObjectURL(file));
							}}
							fileName={
								id2 && id2.name
									? `File Chosen: ${id2.name}`
									: (fileData[3] &&
											`File: ${fileData[3].fileName}`) ||
									  'Upload Second Valid Identification (ID)'
							}
							onBlur={form.handleBlur}
							isRequired
							error={form.errors.id2}
							touch={form.touched.id2}
							showImage={showID2}
						/>
					</Stack>
					<Stack
						direction={['column', 'row']}
						spacing={6}
					>
						<CusUpload
							name='tin'
							id='tin'
							onChange={(e) => {
								const file = e.target.files[0];
								form.setFieldValue('tin', file);
								setTin(file);
								setShowTin(URL.createObjectURL(file));
							}}
							fileName={
								tin && tin.name
									? `File Chosen: ${tin.name}`
									: (fileData[2] &&
											`File: ${fileData[6].fileName}`) ||
									  'Upload Tax Identification Number (TIN)'
							}
							onBlur={form.handleBlur}
							isRequired
							error={form.errors.tin}
							touch={form.touched.tin}
							showImage={showTin}
						/>
						<CusUpload
							name='income'
							id='income'
							onChange={(e) => {
								const file = e.target.files[0];
								form.setFieldValue('income', file);
								setIncome(file);
								setShowIncome(URL.createObjectURL(file));
							}}
							fileName={
								income && income.name
									? `File Chosen: ${income.name}`
									: (fileData[4] &&
											`File: ${fileData[4].fileName}`) ||
									  'Upload Proof of Income (COEC, Payslip, ITR)'
							}
							onBlur={form.handleBlur}
							isRequired
							error={form.errors.income}
							touch={form.touched.income}
							showImage={showIncome}
						/>
						<CusUpload
							name='billing'
							id='billing'
							onChange={(e) => {
								const file = e.target.files[0];
								form.setFieldValue('billing', file);
								setBilling(file);
								setShowBilling(URL.createObjectURL(file));
							}}
							fileName={
								billing && billing.name
									? `File Chosen: ${billing.name}`
									: (fileData[6] &&
											`File: ${fileData[0].fileName}`) ||
									  'Upload Proof of Billing (Electricity)'
							}
							onBlur={form.handleBlur}
							isRequired
							error={form.errors.billing}
							touch={form.touched.billing}
							showImage={showBilling}
						/>
					</Stack>
				</Stack>
			</form>
		</Stack>
	);
}

export default RequirementForm;

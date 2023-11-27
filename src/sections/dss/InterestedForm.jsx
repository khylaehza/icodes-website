import React from 'react';
import { Stack, Button } from '@chakra-ui/react';
import { CusTextArea } from '../../customs/CusInput';
import {
	CusInputFloat,
	CusInputLeftAdd,
	CusInputRightAdd,
} from '../../customs/CusInput';

const InterestedForm = ({ form }) => {
	return (
		<Stack w={'100%'}>
			<form id='formDiv'>
				<Stack>
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
							type={'tel'}
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
					>
						<CusTextArea
							label={'Inquiry'}
							name='inquiry'
							id={'inquiry'}
							placeholder={
								'Send us your interests or questions about this unit here...'
							}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.inquiry}
							error={form.errors.inquiry}
							touch={form.touched.inquiry}
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

export default InterestedForm;

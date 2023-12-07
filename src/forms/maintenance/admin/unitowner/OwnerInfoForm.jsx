import React from 'react';
import { Stack } from '@chakra-ui/react';

import {
	CusInputRightAdd,
	CusInputLeftAdd,
	CusSelectUnit,
	CusInputRegular,
} from '../../../../customs';
const OwnerInfoForm = ({ form }) => {
	console.log(form.values);
	return (
		<Stack w={'100%'}>
			<form id='formDiv'>
				<Stack>
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
						<CusInputRegular
							isRequired
							name='units'
							label='Unit'
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							placeholder='Select'
							error={form.errors.units}
							touch={form.touched.units}
							value={form.values.units}
							disabled={true}
						/>
					</Stack>
				</Stack>
			</form>
		</Stack>
	);
};

export default OwnerInfoForm;

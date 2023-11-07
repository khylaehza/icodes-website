import React from 'react';
import { Stack } from '@chakra-ui/react';

import {
	CusInputRightAdd,
	CusInputLeftAdd,
	CusMultiSelectUnitAvail,
} from '../../../../customs';
const OwnerInfoForm = ({ form, units, setUnit, disabled }) => {
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
						<CusMultiSelectUnitAvail
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
				</Stack>
			</form>
		</Stack>
	);
};

export default OwnerInfoForm;

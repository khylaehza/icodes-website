import React from 'react';
import { Stack, Button } from '@chakra-ui/react';

import { CusMultiSelectUnitAvail, CusSelectPayTerm } from '../../../customs';
const ProspectiveBuyersForm = ({ form, units, setUnit, disabled }) => {
	return (
		<>
			<Stack w={'100%'}>
				<form id='formDiv'>
					<Stack>
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
						<Stack
							direction={['column', 'row']}
							spacing={6}
							mb={3}
						>
							<CusSelectPayTerm
								name='paymentTypeFor'
								isRequired
								id={'paymentTypeFor'}
								label={'Payment Term Type'}
								onChange={(e) => {
									form.setFieldValue(
										'paymentTypeFor',
										e.target.value
									);
									setShowType(e.target.value);
								}}
								onBlur={form.handleBlur}
								error={form.errors.paymentTypeFor}
								touch={form.touched.paymentTypeFor}
								value={form.values.paymentTypeFor}
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
		</>
	);
};

export default ProspectiveBuyersForm;

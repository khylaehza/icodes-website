import React from 'react';

import { Stack, Button } from '@chakra-ui/react';
import {
	CusMultiSelectUnitAmt,
	CusNumInputLeftAdd,
	CusInputLeftAdd,
} from '../../../../customs';
const AmountSetForm = ({ form, units, setUnit, disabled }) => {
	return (
		<Stack w={'100%'}>
			<form id='formDiv'>
				<Stack>
					<Stack>
						<Stack>
							<CusMultiSelectUnitAmt
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
							<CusInputLeftAdd
								name='tcp'
								label={'Total Contract Price'}
								id={'tcp'}
								add={'₱'}
								placeholder={'0'}
								// type={'number'}
								isRequired
								value={form.values.tcp}
								onChange={(e) => {
									let parts = e.target.value.split('.');
									let v = parts[0].replace(/\D/g, '');
									let dec = parts[1];
									Number(
										dec !== undefined ? v + '.' + dec : v
									);
									let n = new Intl.NumberFormat(
										'en-US'
									).format(v);
									n = dec !== undefined ? n + '.' + dec : n;
									form.setFieldValue('tcp', n);
								}}
								onBlur={form.handleBlur}
								error={form.errors.tcp}
								touch={form.touched.tcp}
							/>
							<CusNumInputLeftAdd
								name='vat'
								label={'Value Added Tax (VAT)'}
								id={'vat'}
								add={'%'}
								placeholder={'0'}
								isRequired
								value={form.values.vat}
								onChange={(e) => {
									form.setFieldValue('vat', e);
								}}
								onBlur={form.handleBlur}
								error={form.errors.vat}
								touch={form.touched.vat}
							/>
						</Stack>
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

export default AmountSetForm;

import { useState } from 'react';
import {
	CusInputLeftAdd,
	CusInputRegular,
	CusSelectPayTerm,
	CusNumInputLeftAdd,
	CusNumInput,
} from '../../../../customs';
import { Stack, Button } from '@chakra-ui/react';
const PaymentTermForm = ({ form }) => {
	const [showType, setShowType] = useState('');

	return (
		<Stack w={'100%'}>
			<form id='formDiv'>
				<Stack>
					<Stack>
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
						<CusInputRegular
							name='paymentTermName'
							label={'Payment Term Name'}
							id={'paymentTermName'}
							placeholder={'E.g. '}
							isRequired
							value={form.values.paymentTermName}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.paymentTermName}
							touch={form.touched.paymentTermName}
						/>
						<CusInputLeftAdd
							name='reservationFee'
							label={'Reservation Fee Amount'}
							id={'reservationFee'}
							add={'₱'}
							placeholder={'0'}
							isRequired
							value={form.values.reservationFee}
							onChange={(e) => {
								let parts = e.target.value.split('.');
								let v = parts[0].replace(/\D/g, '');
								let dec = parts[1];
								Number(dec !== undefined ? v + '.' + dec : v);
								let n = new Intl.NumberFormat('en-US').format(
									v
								);
								n = dec !== undefined ? n + '.' + dec : n;
								form.setFieldValue('reservationFee', n);
							}}
							onBlur={form.handleBlur}
							error={form.errors.reservationFee}
							touch={form.touched.reservationFee}
						/>
						<CusNumInputLeftAdd
							name='monthlyPercent'
							label={'Percent of TCP for Monthly Payment'}
							id={'monthlyPercent'}
							add={'%'}
							placeholder={'0'}
							isRequired
							value={form.values.monthlyPercent}
							onChange={(e) => {
								form.setFieldValue('monthlyPercent', e);
							}}
							onBlur={form.handleBlur}
							error={form.errors.monthlyPercent}
							touch={form.touched.monthlyPercent}
							type={'number'}
						/>

						<CusNumInput
							isRequired
							label={'No. of Months'}
							name='noOfMonths'
							id={'noOfMonths'}
							value={form.values.noOfMonths}
							onChange={(e) => {
								form.setFieldValue('noOfMonths', e);
							}}
							onBlur={form.handleBlur}
							error={form.errors.noOfMonths}
							touch={form.touched.noOfMonths}
							type={'number'}
						/>

						<CusNumInputLeftAdd
							name='otherChargePercent'
							label={'Percent of Other Charges'}
							id={'otherChargePercent'}
							add={'%'}
							placeholder={'0'}
							value={form.values.otherChargePercent}
							onChange={(e) => {
								form.setFieldValue('otherChargePercent', e);
							}}
							onBlur={form.handleBlur}
							error={form.errors.otherChargePercent}
							touch={form.touched.otherChargePercent}
							type={'number'}
						/>

						{/* {showType == 'Ready for Occupancy (RFO)' && (
							<>
								<CusNumInputLeftAdd
									name='dpPercent'
									label={'Percent of TCP for Downpayment'}
									id={'dpPercent'}
									add={'%'}
									placeholder={'0'}
									value={form.values.dpPercent}
									onChange={(e) => {
										form.setFieldValue('dpPercent', e);
									}}
									onBlur={form.handleBlur}
									error={form.errors.dpPercent}
									touch={form.touched.dpPercent}
									type={'number'}
								/>

								<CusInputLeftAdd
									name='moveInFees'
									label={'Move In Fees'}
									id={'moveInFees'}
									add={'₱'}
									placeholder={'0'}
									value={form.values.moveInFees}
									onChange={(e) => {
										let parts = e.target.value.split('.');
										let v = parts[0].replace(/\D/g, '');
										let dec = parts[1];
										Number(
											dec !== undefined
												? v + '.' + dec
												: v
										);
										let n = new Intl.NumberFormat(
											'en-US'
										).format(v);
										n =
											dec !== undefined
												? n + '.' + dec
												: n;
										form.setFieldValue('moveInFees', n);
									}}
									onBlur={form.handleBlur}
									error={form.errors.moveInFees}
									touch={form.touched.moveInFees}
								/>
							</>
						)} */}
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

export default PaymentTermForm;

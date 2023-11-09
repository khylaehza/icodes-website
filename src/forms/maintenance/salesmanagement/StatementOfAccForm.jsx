import {
	CusSelectPBuyers,
	CusSelectUnit,
	CusSelectUnTypes,
	CusSelectSize,
	CusInputLeftAdd,
	CusSelectPayTerm,
	CusSelectPreSellTerm,
	CusNumInputLeftAdd,
	CusNumInput,
	CusMultiSelectDiscount,
} from '../../../customs';
import { Stack, Button } from '@chakra-ui/react';
import { useState } from 'react';
const StatementOfAccForm = ({
	form,
	setBuyer,
	disabled,
	setPayTermName,
	discounts,
	setDiscounts,
}) => {
	const [showUnit, setShowUnit] = useState(false);
	const [showTerm, setShowTerm] = useState(form.values.payterm);
	const [showFields, setShowFields] = useState(false);
	if (showTerm != form.values.payterm) {
		setShowTerm(form.values.payterm);
	}

	return (
		<Stack w={'100%'}>
			<form id='formDiv'>
				<Stack>
					<Stack
						direction={['column', 'row']}
						spacing={6}
					>
						<CusSelectPBuyers
							label={'Prospective Buyer'}
							name='pbName'
							id='pbName'
							placeholder={'Select Prospective Buyers'}
							onChange={(e) => {
								form.setFieldValue('pbName', e.target.value);
								setBuyer(e.target.value);
								setShowUnit(true);
								setShowTerm(form.values.payterm.toString());
							}}
							onBlur={form.handleBlur}
							value={form.values.pbName}
							error={form.errors.pbName}
							touch={form.touched.pbName}
							isRequired
						/>
					</Stack>
					{showUnit && (
						<>
							<Stack
								direction={['column', 'row']}
								spacing={6}
							>
								<CusSelectUnit
									isRequired
									name='unit'
									label='Unit'
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									placeholder='Select'
									error={form.errors.unit}
									touch={form.touched.unit}
									value={form.values.unit}
									disabled={disabled}
								/>
								<CusSelectUnTypes
									isRequired
									name='typeName'
									label='Unit Type'
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									placeholder='Select'
									error={form.errors.typeName}
									touch={form.touched.typeName}
									value={form.values.typeName}
									disabled={disabled}
								/>
							</Stack>
							<Stack
								direction={['column', 'row']}
								spacing={6}
							>
								<CusSelectSize
									isRequired
									placeholder='Select'
									name='unitSize'
									label='Unit Size'
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									value={form.values.unitSize}
									error={form.errors.unitSize}
									touch={form.touched.unitSize}
									disabled={disabled}
								/>
								<CusInputLeftAdd
									name='tcp'
									label={'Amount'}
									id={'tcp'}
									add={'₱'}
									placeholder={'0'}
									isRequired
									value={form.values.tcp}
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
										form.setFieldValue('tcp', n);
									}}
									onBlur={form.handleBlur}
									error={form.errors.tcp}
									touch={form.touched.tcp}
									disabled={disabled}
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
									disabled={disabled}
								/>
							</Stack>
							<Stack
								direction={['column', 'row']}
								spacing={6}
							>
								<CusSelectPayTerm
									name='payterm'
									isRequired
									id={'payterm'}
									label={'Payment Term Type'}
									onChange={(e) => {
										form.setFieldValue(
											'payterm',
											e.target.value
										);
									}}
									onBlur={form.handleBlur}
									error={form.errors.payterm}
									touch={form.touched.payterm}
									value={form.values.payterm}
									disabled={disabled}
								/>
							</Stack>
							{showTerm && (
								<>
									<CusSelectPreSellTerm
										label={'Payment Term Name'}
										name='paytermName'
										id='paytermName'
										placeholder={'Select Payment Term Name'}
										onChange={(e) => {
											form.setFieldValue(
												'paytermName',
												e.target.value
											);
											setPayTermName(e.target.value);
											setShowFields(true);
										}}
										onBlur={form.handleBlur}
										value={form.values.paytermName}
										error={form.errors.paytermName}
										touch={form.touched.paytermName}
										isRequired
									/>
									{showFields && (
										<>
											<Stack
												direction={['column', 'row']}
												spacing={6}
											>
												<CusNumInputLeftAdd
													name='monthlyPercent'
													label={
														'Percent of TCP for Monthly Payment'
													}
													id={'monthlyPercent'}
													add={'%'}
													placeholder={'0'}
													isRequired
													value={
														form.values
															.monthlyPercent
													}
													onChange={(e) => {
														form.setFieldValue(
															'monthlyPercent',
															e
														);
													}}
													onBlur={form.handleBlur}
													error={
														form.errors
															.monthlyPercent
													}
													touch={
														form.touched
															.monthlyPercent
													}
													type={'number'}
													disabled={disabled}
												/>

												<CusNumInput
													isRequired
													label={'No. of Months'}
													name='noOfMonths'
													id={'noOfMonths'}
													value={
														form.values.noOfMonths
													}
													onChange={(e) => {
														form.setFieldValue(
															'noOfMonths',
															e
														);
													}}
													onBlur={form.handleBlur}
													error={
														form.errors.noOfMonths
													}
													touch={
														form.touched.noOfMonths
													}
													type={'number'}
													disabled={disabled}
												/>
											</Stack>
											<Stack
												direction={['column', 'row']}
												spacing={6}
											>
												<CusInputLeftAdd
													name='reservationFee'
													label={
														'Reservation Fee Amount'
													}
													id={'reservationFee'}
													add={'₱'}
													placeholder={'0'}
													isRequired
													value={
														form.values
															.reservationFee
													}
													onChange={(e) => {
														let parts =
															e.target.value.split(
																'.'
															);
														let v =
															parts[0].replace(
																/\D/g,
																''
															);
														let dec = parts[1];
														Number(
															dec !== undefined
																? v + '.' + dec
																: v
														);
														let n =
															new Intl.NumberFormat(
																'en-US'
															).format(v);
														n =
															dec !== undefined
																? n + '.' + dec
																: n;
														form.setFieldValue(
															'reservationFee',
															n
														);
													}}
													onBlur={form.handleBlur}
													error={
														form.errors
															.reservationFee
													}
													touch={
														form.touched
															.reservationFee
													}
													disabled={disabled}
												/>

												<CusNumInputLeftAdd
													name='otherChargePercent'
													label={
														'Percent of Other Charges'
													}
													id={'otherChargePercent'}
													add={'%'}
													placeholder={'0'}
													value={
														form.values
															.otherChargePercent
													}
													onChange={(e) => {
														form.setFieldValue(
															'otherChargePercent',
															e
														);
													}}
													onBlur={form.handleBlur}
													error={
														form.errors
															.otherChargePercent
													}
													touch={
														form.touched
															.otherChargePercent
													}
													type={'number'}
													disabled={disabled}
												/>
											</Stack>
										</>
									)}
								</>
							)}

							<CusMultiSelectDiscount
								isRequired
								label={'Discount'}
								name='discount'
								id={'discount'}
								placeholder={'Select Discounts'}
								value={discounts}
								onChange={(e) => {
									form.setFieldValue('discount', e);
									setDiscounts(e);
								}}
								onBlur={form.handleBlur}
								error={form.errors.discount}
								touch={form.touched.discount}
							/>
						</>
					)}

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

export default StatementOfAccForm;

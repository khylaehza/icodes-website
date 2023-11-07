import { useState } from 'react';
import {
	CusInputLeftAdd,
	CusInputRegular,
	CusSelectDscType,
	CusNumInputLeftAdd,
} from '../../../../customs';
import { Stack, Button } from '@chakra-ui/react';
const DiscountForm = ({ form }) => {
	const [showType, setShowType] = useState('');

	return (
		<Stack w={'100%'}>
			<form id='formDiv'>
				<Stack>
					<Stack>
						<CusSelectDscType
							name='dscType'
							isRequired
							id={'dscType'}
							label={'Discount Type'}
							onChange={(e) => {
								form.setFieldValue('dscType', e.target.value);
								setShowType(e.target.value);
							}}
							onBlur={form.handleBlur}
							error={form.errors.dscType}
							touch={form.touched.dscType}
							value={form.values.dscType}
						/>
						<CusInputRegular
							name='dscName'
							label={'Discount Name'}
							id={'dscName'}
							placeholder={'E.g. '}
							isRequired
							value={form.values.dscName}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.dscName}
							touch={form.touched.dscName}
						/>
						{showType == 'Percent' && (
							<CusNumInputLeftAdd
								name='discount'
								label={'Discount Percent'}
								id={'discount'}
								add={'%'}
								placeholder={'0'}
								isRequired
								value={form.values.discount}
								onChange={(e) => {
									form.setFieldValue('discount', e);
								}}
								onBlur={form.handleBlur}
								error={form.errors.discount}
								touch={form.touched.discount}
								type={'number'}
							/>
						)}

						{showType == 'Amount' && (
							<CusInputLeftAdd
								name='discount'
								label={'Discount Price'}
								id={'discount'}
								add={'₱'}
								placeholder={'0'}
								isRequired
								value={form.values.discount}
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
									form.setFieldValue('discount', n);
								}}
								onBlur={form.handleBlur}
								error={form.errors.discount}
								touch={form.touched.discount}
							/>
						)}
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

export default DiscountForm;

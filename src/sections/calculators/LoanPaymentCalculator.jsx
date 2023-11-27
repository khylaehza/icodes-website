import React, { useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { useData } from '../../../DataContext';
import {
	CusSelectTowerLoan,
	CusNumInput,
	CusSelectYearsToCal,
	CusNumInputLeftAdd,
	CusNumInputRightAdd,
} from '../../customs';
import { useFormik } from 'formik';

const LoanPaymentCalculator = () => {
	const [tcp, setTcp] = useState(0);
	const [tower, setTower] = useState('');
	const [displayresult, setDisplayResult] = useState({
		value: '',
		months: '',
	});

	const { loans } = useData();

	const formattedTotalTCP = parseFloat(tcp).toFixed(2);
	const total_tcp = Number(formattedTotalTCP);

	const RemainTCP = loans
		.filter((item) => item.Tower === tower)
		.map((itm) => itm.RemainTCP);
	const rTCP = RemainTCP / 100;
	let Loanable = total_tcp * rTCP;

	const formattedResult = Loanable.toLocaleString('en-US', {
		style: 'currency',
		currency: 'PHP',
	});

	console.log(formattedResult);

	const form = useFormik({
		initialValues: {
			tower: '',
			totaltcp: '',
			loanable: '',
			interest: '',
			months: '',
		},
		onSubmit: (value, action) => {
			const interest = value.interest / 100;
			const months = value.months;
			const result = Loanable * interest;
			const finalResult = (Loanable + result) / months;

			const Result = finalResult.toLocaleString('en-US', {
				style: 'currency',
				currency: 'PHP',
			});

			setDisplayResult({
				...displayresult,
				value: Result,
				months: months,
			});
		},
	});

	return (
		<>
			<Box
				display={'flex'}
				flexDir={'column'}
				bgColor={'w.300'}
				boxShadow='0 4px 10px 0 rgba(134,149,166,0.3)'
				borderRadius={15}
				alignItems={'center'}
				w={'100%'}
				p={5}
				gap={3}
			>
				<Box
					display={'flex'}
					flexDir={{ xl: 'column', sm: 'column' }}
					w={tower ? '80%' : '30%'}
					gap={3}
				>
					<CusSelectTowerLoan
						label={'Tower'}
						name='tower'
						id='tower'
						placeholder={'Select Tower'}
						onChange={(e) => {
							const value = e.target.value;
							form.setFieldValue('tower', value);
							setTower(value);
						}}
						onBlur={form.handleBlur}
						value={form.values.tower}
						error={form.errors.tower}
						touch={form.touched.tower}
					/>

					{tower ? (
						<>
							<CusNumInputLeftAdd
								name='totaltcp'
								id={'totaltcp'}
								label={'Total TCP'}
								add={'₱'}
								placeholder={'0'}
								value={form.values.totaltcp}
								onChange={(e) => {
									let parts = e.split('.');
									let v = parts[0].replace(/\D/g, '');
									let dec = parts[1];
									Number(
										dec !== undefined ? v + '.' + dec : v
									);
									let n = new Intl.NumberFormat(
										'en-US'
									).format(v);
									n = dec !== undefined ? n + '.' + dec : n;
									form.setFieldValue('totaltcp', n);
									setTcp(e);
								}}
								onBlur={form.handleBlur}
								error={form.errors.totaltcp}
								touch={form.touched.totaltcp}
							/>

							<CusNumInputRightAdd
								name={'loanable'}
								id={'loanable'}
								label={'Loanable Payment'}
								add={`${RemainTCP}%`}
								placeholder={'0'}
								value={formattedResult}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								disabled={true}
							/>
						</>
					) : (
						''
					)}
				</Box>
				<Box
					display={'flex'}
					flexDir={{ xl: 'column', sm: 'column' }}
					w={{ xl: '80%', sm: '80%' }}
					gap={3}
				>
					<CusNumInputRightAdd
						name='interest'
						id={'interest'}
						label={'Interest rate'}
						add={'%'}
						placeholder={'0'}
						value={form.values.interest}
						onChange={(e) => {
							form.setFieldValue('interest', e);
						}}
						onBlur={form.handleBlur}
						disabled={false}
					/>
					<CusNumInput
						isRequired
						label={'Number of months'}
						name='months'
						id={'months'}
						value={form.values.months}
						onChange={(e) => {
							form.setFieldValue('months', e);
						}}
						onBlur={form.handleBlur}
						error={form.errors.months}
						touch={form.touched.months}
						type={'number'}
					/>
				</Box>
				<Button
					onClick={form.handleSubmit}
					bgColor={'b.300'}
					color={'w.300'}
					_hover={{ bgColor: 'b.200' }}
				>
					Calculate
				</Button>
			</Box>
			{displayresult.value ? (
				<Text
					color={'w.300'}
					alignSelf={'center'}
				>
					Your estimated loan payment is{' '}
					<span style={{ color: '#F6B82D' }}>
						{displayresult.value}
					</span>{' '}
					for {displayresult.months} months.
				</Text>
			) : (
				''
			)}
		</>
	);
};
export default LoanPaymentCalculator;

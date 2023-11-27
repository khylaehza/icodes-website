import React, { useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { useData } from '../../../DataContext';
import {
	CusSelectTowerToCal,
	CusSelectYearsToCal,
	CusNumInputLeftAdd,
} from '../../customs';
import { useFormik } from 'formik';

const UnitValueCalculator = () => {
	const [tower, setTower] = useState('');
	const [displayresult, setDisplayResult] = useState({
		value: '',
		year: '',
	});

	const { unitValues } = useData();
	console.log(unitValues);
	const form = useFormik({
		initialValues: {
			tower: '',
			years: '',
			totaltcp: '',
		},
		onSubmit: (value, actions) => {
			const get_increase = unitValues
				.filter((item) => item.Years === value.years)
				.map((itm) => itm.Increase);

			const formattedTotalTCP = parseFloat(value.totaltcp).toFixed(2);
			// const updatedValues = { ...value, totaltcp: formattedTotalTCP };
			const total_tcp = Number(value.totaltcp.replace(/,/g, ''));

			const increase = get_increase / 100;
			const result = total_tcp * increase;
			const finalRes = result + total_tcp;
			const formattedResult = finalRes.toLocaleString('en-US', {
				style: 'currency',
				currency: 'PHP',
			});

			const currentDate = new Date();
			const currentYear = currentDate.getFullYear();
			const yearsAsInt = parseInt(value.years);
			const year = currentYear + yearsAsInt;

			setDisplayResult({
				...displayresult,
				value: formattedResult,
				year: year,
				increase: get_increase,
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
				h={'100%'}
			>
				<Box
					display={'flex'}
					flexDir={{ xl: 'column', sm: 'column' }}
					w={tower ? '80%' : '50%'}
					gap={3}
				>
					<CusSelectTowerToCal
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
						<CusSelectYearsToCal
							label={'No. of Years'}
							name='years'
							id={'years'}
							value={form.values.years}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.years}
							touch={form.touched.years}
							tower={tower}
						/>
					) : (
						''
					)}

					<CusNumInputLeftAdd
						name='totaltcp'
						id={'totaltcp'}
						label={'Contract Price (Exclusive of VAT)'}
						add={'₱'}
						placeholder={'0'}
						value={form.values.totaltcp}
						onChange={(e) => {
							let parts = e.split('.');
							let v = parts[0].replace(/\D/g, '');
							let dec = parts[1];
							Number(dec !== undefined ? v + '.' + dec : v);
							let n = new Intl.NumberFormat('en-US').format(v);
							n = dec !== undefined ? n + '.' + dec : n;
							form.setFieldValue('totaltcp', n);
						}}
						onBlur={form.handleBlur}
						error={form.errors.totaltcp}
						touch={form.touched.totaltcp}
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
					Your estimated unit value on {displayresult.year} is{' '}
					<span style={{ color: '#F6B82D' }}>
						{displayresult.value}
					</span>
					. It has increased by {displayresult.increase}% based on
					admin's data.
				</Text>
			) : (
				''
			)}
		</>
	);
};
export default UnitValueCalculator;

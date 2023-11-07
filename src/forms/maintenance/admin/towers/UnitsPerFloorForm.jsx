import { Stack } from '@chakra-ui/react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { CusNumInput } from '../../../../customs';
const UnitsPerFloorForm = ({ floorNum, form }) => {
	const level = floorNum;
	const floorFields = [];
	const floors = [];

	for (let i = 1; i <= level; i++) {
		floorFields.push('Enter unit quantity in floor ' + (i + 1) + ':');
		floors.push(i);
	}
	return (
		<Stack>
			{floorFields.map((str, key) => {
				return (
					<Formik
						key={key}
						validationSchema={{
							[key]: Yup.string().required(
								'Quantity is required.'
							),
						}}
					>
						<CusNumInput
							label={str}
							name='units'
							id={'units'}
							value={form.values[`${key + 2}`]}
							onChange={(e) => {
								form.setFieldValue(`${key + 2}`, e);
							}}
							onBlur={form.handleBlur}
						/>
					</Formik>
				);
			})}
		</Stack>
	);
};

export default UnitsPerFloorForm;

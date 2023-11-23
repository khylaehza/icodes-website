import { Stack, Button } from '@chakra-ui/react';
import {
	CusSelectTower,
	CusNumInputLeftAdd,
	CusNumInput,
} from '../../../../customs';
const UnitValueForm = ({ form }) => {
	return (
		<Stack w={'100%'}>
			<form id='formDiv'>
				<Stack>
					<Stack>
						<CusSelectTower
							label={'Tower'}
							name='tower'
							id='tower'
							placeholder={'Select Tower'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.tower}
							error={form.errors.tower}
							touch={form.touched.tower}
							isRequired
						/>
						<Stack />
					</Stack>
					<Stack
						direction={['column', 'row']}
						spacing={6}
					>
						<CusNumInputLeftAdd
							name='increase'
							label={'Increase Percent'}
							id={'increase'}
							add={'%'}
							placeholder={'0'}
							isRequired
							value={form.values.increase}
							onChange={(e) => {
								form.setFieldValue('increase', e);
							}}
							onBlur={form.handleBlur}
							error={form.errors.increase}
							touch={form.touched.increase}
							type={'number'}
						/>
						<CusNumInput
							isRequired
							label={'No. of Years'}
							name='years'
							id={'years'}
							value={form.values.years}
							onChange={(e) => {
								form.setFieldValue('years', e);
							}}
							onBlur={form.handleBlur}
							error={form.errors.years}
							touch={form.touched.years}
							type={'number'}
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
	);
};

export default UnitValueForm;

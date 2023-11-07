import { Stack, Button } from '@chakra-ui/react';
import { CusSelectTower, CusNumInputLeftAdd } from '../../../../customs';
const LoanForm = ({ form }) => {
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
							name='remainTCP'
							label={'Remaining TCP'}
							id={'remainTCP'}
							add={'%'}
							placeholder={'0'}
							isRequired
							value={form.values.remainTCP}
							onChange={(e) => {
								form.setFieldValue('remainTCP', e);
							}}
							onBlur={form.handleBlur}
							error={form.errors.remainTCP}
							touch={form.touched.remainTCP}
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

export default LoanForm;

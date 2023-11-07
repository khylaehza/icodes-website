import { Stack, Button } from '@chakra-ui/react';
import { CusInputRightAdd } from '../../../../customs';

const UnitSizesForm = ({ form }) => {
	return (
		<Stack w={'100%'}>
			<form id='formDiv'>
				<Stack>
					<Stack>
						<CusInputRightAdd
							name='size'
							label={'Unit Size'}
							id={'size'}
							add={'sq. m'}
							isRequired
							type={'number'}
							value={form.values.size}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.errors.size}
							touch={form.touched.size}
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

export default UnitSizesForm;

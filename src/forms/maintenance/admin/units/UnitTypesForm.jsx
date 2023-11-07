import { Stack, Button } from '@chakra-ui/react';
import { CusInputRegular } from '../../../../customs';

const UnitTypesForm = ({ form }) => {
	return (
		<Stack w={'100%'}>
			<form id='formDiv'>
				<Stack>
					<Stack>
						<CusInputRegular
							label={'Unit Type'}
							name='typeName'
							id={'typeName'}
							placeholder={'e.g. 1-Bedroom'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.typeName}
							error={form.errors.typeName}
							touch={form.touched.typeName}
							isRequired
						/>
						<CusInputRegular
							label={'Unit Type Code'}
							name='typeCode'
							id={'typeCode'}
							placeholder={'e.g. 1BR'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.typeCode}
							error={form.errors.typeCode}
							touch={form.touched.typeCode}
							isRequired
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

export default UnitTypesForm;

import { Stack, Button, HStack } from '@chakra-ui/react';
import { CusInputRegular, CusNumInput } from '../../../../customs';

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
						{/* <CusNumInput
							label={'Maximum Capacity'}
							name='maxPeople'
							id={'maxPeople'}
							value={form.values.maxPeople}
							onChange={(e) => {
								form.setFieldValue('maxPeople', e);
							}}
							onBlur={form.handleBlur}
							error={form.errors.maxPeople}
							touch={form.touched.maxPeople}
							isRequired
						/> */}
					</Stack>
					<HStack spacing={3}>
						<CusNumInput
							label={'Maximum Capacity'}
							name='maxPeople'
							id={'maxPeople'}
							value={form.values.maxPeople}
							onChange={(e) => {
								form.setFieldValue('maxPeople', e);
							}}
							onBlur={form.handleBlur}
							error={form.errors.maxPeople}
							touch={form.touched.maxPeople}
							isRequired
						/>

						<CusNumInput
							label={'No. of Bathroom'}
							name='noBath'
							id={'noBath'}
							value={form.values.noBath}
							onChange={(e) => {
								form.setFieldValue('noBath', e);
							}}
							onBlur={form.handleBlur}
							error={form.errors.noBath}
							touch={form.touched.noBath}
							isRequired
						/>

						<CusNumInput
							label={'No. of Bed'}
							name='noBed'
							id={'noBed'}
							value={form.values.noBed}
							onChange={(e) => {
								form.setFieldValue('noBed', e);
							}}
							onBlur={form.handleBlur}
							error={form.errors.noBed}
							touch={form.touched.noBed}
							isRequired
						/>
					</HStack>
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

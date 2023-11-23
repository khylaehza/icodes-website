import { Stack, Button } from '@chakra-ui/react';

import {
	CusSelectTeams,
	CusSelectLocation,
	CusInputRegular,
	CusTextArea,
} from '../../../customs';
const ManningSchedForm = ({ form }) => {
	return (
		<Stack w={'100%'}>
			<form id='formDiv'>
				<Stack>
					<Stack
						direction={['column', 'row']}
						spacing={6}
						mb={3}
					>
						<CusSelectTeams
							label={'Team'}
							name='team'
							id='team'
							placeholder={'Select team'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.team}
							error={form.errors.team}
							touch={form.touched.team}
							isRequired={true}
						/>
					</Stack>
					<Stack
						direction={['column', 'row']}
						spacing={6}
						mb={3}
					>
						<CusSelectLocation
							label={'Location (Specify location)'}
							name='location'
							id='location'
							placeholder={'ex. SM Grand Central Caloocan City'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.location}
							error={form.errors.location}
							touch={form.touched.location}
							isRequired={true}
						/>

						<CusInputRegular
							label={'Date'}
							name='scheddate'
							id='scheddate'
							type={'date'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.scheddate}
							error={form.errors.scheddate}
							touch={form.touched.scheddate}
							isRequired={true}
						/>
					</Stack>
					<Stack
						direction={['column', 'row']}
						spacing={6}
						mb={3}
					>
						<CusInputRegular
							label={'Time Start'}
							name='timeStart'
							id='timeStart'
							type={'time'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.timeStart}
							error={form.errors.timeStart}
							touch={form.touched.timeStart}
						/>

						<CusInputRegular
							label={'Time End'}
							name='timeEnd'
							id='timeEnd'
							type={'time'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.timeEnd}
							error={form.errors.timeEnd}
							touch={form.touched.timeEnd}
						/>
					</Stack>
					<CusTextArea
						label={'Task'}
						name='task'
						id={'task'}
						placeholder={'e.g. To '}
						onChange={form.handleChange}
						onBlur={form.handleBlur}
						value={form.values.task}
						error={form.errors.task}
						touch={form.touched.task}
					/>
					<Stack
						direction={['column', 'row']}
						justify={'flex-end'}
					>
						<Button
							variant={'primary'}
							onClick={form.handleSubmit}
						>
							Add
						</Button>
					</Stack>
				</Stack>
			</form>
		</Stack>
	);
};

export default ManningSchedForm;

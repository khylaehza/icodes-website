import { CusSelectTeams } from '../../../customs';
import { Stack, Button, Text } from '@chakra-ui/react';

const TeamsForm = ({ form, data }) => {
	return (
		<>
			<Stack w={'100%'}>
				<form id='formDiv'>
					<Stack>
						<Stack
							direction={['column', 'row']}
							spacing={6}
							mb={3}
						>
							<CusSelectTeams
								isRequired={true}
								label={'Team'}
								name='team'
								id='team'
								placeholder={'Select team'}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								value={form.values.team}
								error={form.errors.team}
								touch={form.touched.team}
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
		</>
	);
};

export default TeamsForm;

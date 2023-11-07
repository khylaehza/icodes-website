import { Box, Stack, Heading, Text, Button, VStack } from '@chakra-ui/react';
import LoginBackground from '../../layouts/LoginBackground';
import { CusInputFloat } from '../../customs';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../../DataContext';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const Form = () => {
	const navigate = useNavigate();
	const { setLoading, login } = useData();
	const toForgotPass = () => {
		try {
			navigate('/forgotpass');
		} catch (error) {
			console.log(error);
		}
	};

	const form = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		validationSchema: Yup.object({
			username: Yup.string().required('Username is required.'),
			password: Yup.string().required('Password is required.'),
		}),
		onSubmit: (values, actions) => {
			actions.resetForm();

			try {
				setLoading(true);
				login(values.username, values.password);
			} catch (error) {
				console.log(error);
			}

			setLoading(false);
			actions.resetForm();
		},
	});

	return (
		<>
			<Box>
				<Heading
					color={'gray.800'}
					lineHeight={1.5}
					fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
				>
					Login to your account
					<Text
						as={'span'}
						bgGradient='linear(to-r, b.200,b.300)'
						bgClip='text'
					>
						.
					</Text>
				</Heading>
				<Text
					color={'gray.500'}
					fontSize={{ base: 'sm', sm: 'md' }}
				>
					Access, supervise, and manage your day-to-day condominium
					activities.
				</Text>
			</Box>
			<form onSubmit={form.handleSubmit}>
				<VStack
					mt={5}
					spacing={7}
				>
					<CusInputFloat
						variant='floating'
						label={'Enter Username'}
						id={'username'}
						isRequired
						name={'username'}
						onChange={form.handleChange}
						onBlur={form.handleBlur}
						value={form.values.username}
						error={form.errors.username}
						touch={form.touched.username}
					/>

					<CusInputFloat
						name={'password'}
						variant='floating'
						label={'Enter Password'}
						id={'password'}
						type={'password'}
						isRequired
						onChange={form.handleChange}
						onBlur={form.handleBlur}
						error={form.errors.password}
						touch={form.touched.password}
						value={form.values.password}
					/>
				</VStack>

				<Stack spacing={3}>
					<Button
						onClick={toForgotPass}
						variant={'tertiary'}
						size={'xs'}
						w={'100%'}
						mt={3}
					>
						Forgot Password?
					</Button>

					<Button
						fontFamily={'heading'}
						w={'100%'}
						variant={'primary'}
						type='submit'
					>
						Submit
					</Button>
				</Stack>
			</form>
		</>
	);
};

const LogForm = () => {
	return <LoginBackground children={<Form />} />;
};

export default LogForm;

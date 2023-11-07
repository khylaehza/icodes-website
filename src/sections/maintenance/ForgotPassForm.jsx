import { Box, Stack, Heading, Text, Button, VStack } from '@chakra-ui/react';
import LoginBackground from '../../layouts/LoginBackground';
import { CusInputRightAdd } from '../../customs';

const Form = () => {
	const toForgotPass = () => {
		// try {
		// 	navigate('/forgotpass');
		// } catch (error) {
		// 	console.log(error);
		// }
	};

	return (
		<>
			<Box>
				<Heading
					color={'gray.800'}
					lineHeight={1.5}
					fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
				>
					Forgot Password
					<Text
						as={'span'}
						bgGradient='linear(to-r, b.200,b.300)'
						bgClip='text'
					>
						?
					</Text>
				</Heading>
				<Text
					color={'gray.500'}
					fontSize={{ base: 'sm', sm: 'md' }}
				>
					Don't worry, just enter your email address.
				</Text>
			</Box>
			<form
				// onSubmit={form.handleSubmit}
				style={{ marginTop: 10 }}
			>
				<VStack gap={5}>
					<CusInputRightAdd
						name='email'
						label={'Enter your email'}
						id={'email'}
						type={'email'}
						add={'.com'}
						placeholder={'eg. juan@gmail'}
						isRequired
						// value={form.values.email}
						// onChange={form.handleChange}
						// onBlur={form.handleBlur}
						// error={form.errors.email}
						// touch={form.touched.email}
					/>
				</VStack>
				<Stack pt={3}>
					<Button
						fontFamily={'heading'}
						w={'100%'}
						variant={'primary'}
						type='submit'
					>
						Continue
					</Button>
				</Stack>
			</form>
		</>
	);
};

const ForgotPassForm = () => {
	return <LoginBackground children={<Form />} />;
};

export default ForgotPassForm;

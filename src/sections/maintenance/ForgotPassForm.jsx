import {
	Box,
	Stack,
	Heading,
	Text,
	Button,
	VStack,
	useToast,
	Avatar,
} from '@chakra-ui/react';
import LoginBackground from '../../layouts/LoginBackground';
import { useFormik } from 'formik';
import { useData } from '../../../DataContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase-config';
import * as Yup from 'yup';
import { updateDoc, doc } from 'firebase/firestore';
import { CusInputRightAdd, CusInputFloat } from '../../customs';

const Form = () => {
	const { curUser, employees } = useData();
	const toast = useToast();
	const [emailExists, setEmailExists] = useState(
		curUser.Email ? true : false
	);
	const [employeeProfile, setEmployeeProfile] = useState(
		curUser.Image ? curUser.Image : null
	);
	const [employeeName, setEmployeeName] = useState(
		curUser.Email
			? `${
					curUser.FName.charAt(0).toUpperCase() +
					curUser.FName.slice(1)
			  } 
			${curUser.MName.charAt(0).toUpperCase()} 
			${curUser.LName.charAt(0).toUpperCase() + curUser.LName.slice(1)}`
			: null
	);
	const navigate = useNavigate();
	const emailRef = employees.map((employee) => employee.Email);

	const handleCancel = () => {
		window.history.back();
	};

	const form = useFormik({
		initialValues: {
			email: '',
		},
		onSubmit: (values, action) => {
			const email = values.email;
			const emailExists = emailRef.includes(email);
			console.log(emailExists);

			if (emailExists) {
				const emp = employees.filter(
					(employee) => employee.Email === email
				);
				const img = emp.map((employee) => employee.Image);
				const fullName = emp.map(
					(employee) =>
						`${
							employee.FName.charAt(0).toUpperCase() +
							employee.FName.slice(1)
						} 
                 ${employee.MName.charAt(0).toUpperCase()} 
                 ${
						employee.LName.charAt(0).toUpperCase() +
						employee.LName.slice(1)
					}`
				);
				setEmployeeName(fullName);
				setEmployeeProfile(img);
				setEmailExists(true);
			} else {
				toast({
					title: 'This email does not exist',
					status: 'error',
					isClosable: true,
					position: 'top',
					duration: 3000,
				});
			}
		},
	});

	const passform = useFormik({
		initialValues: {
			newPassword: '',
			confirmPassword: '',
		},
		validationSchema: Yup.object({
			newPassword: Yup.string().required('New password is required'),
			confirmPassword: Yup.string()
				.required('Confirm password is required')
				.oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
		}),
		onSubmit: (values, action) => {
			const npass = values.newPassword;
			const cpass = values.confirmPassword;

			if (npass === cpass) {
				const email =
					form.values.email == '' ? curUser.Email : form.values.email;
				const emp = employees
					.filter((employee) => employee.Email === email)
					.map((employee) => employee.id);
				const docRef = doc(
					db,
					'maintenance',
					'admin',
					'tbl_employees',
					emp.toString()
				);
				try {
					updateDoc(docRef, {
						Password: cpass,
					});
					toast({
						title: `New password updated`,
						status: 'success',
						duration: 3000,
						isClosable: true,
					});
					navigate('/login');
				} catch (e) {
					console.log(e);
				}
			}
		},
	});

	return (
		<>
			{!emailExists ? (
				<>
					<Box>
						<Button
							color={'gray.500'}
							as={'u'}
							fontSize={'sm'}
							onClick={handleCancel}
							alignSelf={'end'}
						>
							Cancel
						</Button>
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
						onSubmit={form.handleSubmit}
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
								value={form.values.email}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								error={form.errors.email}
								touch={form.touched.email}
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
			) : (
				<>
					<Button
						color={'gray.500'}
						as={'u'}
						fontSize={'sm'}
						onClick={handleCancel}
					>
						Cancel
					</Button>
					<Stack spacing={3}>
						<Avatar
							size='xl'
							src={employeeProfile}
							alignSelf={'center'}
						/>
						<Text
							fontSize='sm'
							textAlign={'center'}
						>
							{employeeName}
						</Text>
						<Text
							color={'gray.500'}
							fontSize={{ base: 'sm', sm: 'sm' }}
							textAlign={'center'}
						>
							Set your new password
						</Text>
					</Stack>
					<form
						onSubmit={passform.handleSubmit}
						style={{ marginTop: 3 }}
					>
						<Stack spacing={5}>
							<CusInputFloat
								variant='floating'
								label={'Create new Password'}
								id={'newPassword'}
								type={'password'}
								isRequired
								name={'newPassword'}
								value={passform.values.newPassword}
								onChange={passform.handleChange}
								onBlur={passform.handleBlur}
								error={passform.errors.newPassword}
								touch={passform.touched.newPassword}
							/>
							<CusInputFloat
								variant='floating'
								label={'Confirm Password'}
								id={'confirmPassword'}
								type={'password'}
								isRequired
								name={'confirmPassword'}
								value={passform.values.confirmPassword}
								onChange={passform.handleChange}
								onBlur={passform.handleBlur}
								error={passform.errors.confirmPassword}
								touch={passform.touched.confirmPassword}
							/>
						</Stack>
						<Stack pt={3}>
							<Button
								fontFamily={'heading'}
								w={'100%'}
								variant={'primary'}
								type='submit'
							>
								Set New Password
							</Button>
						</Stack>
					</form>
				</>
			)}
		</>
	);
};

const ForgotPassForm = () => {
	return <LoginBackground children={<Form />} />;
};

export default ForgotPassForm;

import {
	Container,
	Stack,
	Flex,
	Box,
	Heading,
	Text,
	Button,
	Image,
	Icon,
	IconButton,
	createIcon,
	useColorModeValue,
	Divider,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Textarea,
	VStack,
	AspectRatio,
	useToast,
} from '@chakra-ui/react';

import { Fragment } from 'react';

import { GoLocation } from 'react-icons/go';
import { BsPhone } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import { useFormik } from 'formik';
import { db } from '../../../firebase-config';
import { collection, addDoc, serverTimestamp } from '@firebase/firestore';
import { IdGenerator } from '../../utilities';

export default function Contact() {
	return (
		<Flex
			width={'100vw'}
			bg={'b.300'}
			align={'center'}
			justify={'center'}
			flexDir={'column'}
			p={10}
			color={'white'}
		>
			<Flex
				align='center'
				justify='center'
				direction='column'
			>
				<Heading
					fontSize='4xl'
					mb={2}
				>
					Contact Us
				</Heading>
				<Text
					fontSize='md'
					textAlign='center'
				>
					Interested in purchasing a condo unit? Send us a message so
					we can assist you.
				</Text>
				<Stack
					direction={{ base: 'column', md: 'row' }}
					justify='space-between'
					p={10}
				>
					{contactOptions.map((option, index) => (
						<Fragment key={index}>
							<Stack
								direction='column'
								justify='center'
								alignItems='center'
							>
								<Icon
									as={option.icon}
									w={5}
									h={5}
									color='green.400'
								/>
								<Text
									fontSize='sm'
									fontWeight='semibold'
								>
									{option.label}
								</Text>
								<Text
									fontSize='md'
									textAlign='center'
								>
									{option.value}
								</Text>
							</Stack>
							{contactOptions.length - 1 !== index && (
								<Flex d={{ base: 'none', md: 'flex' }}>
									<Divider orientation='vertical' />
								</Flex>
							)}
						</Fragment>
					))}
				</Stack>
			</Flex>

			<Stack
				align={'center'}
				direction={{ base: 'column', md: 'row' }}
				justifyContent={'center'}
				w={'100%'}
			>
				<Stack align={'center'}>
					<ContactForm />
				</Stack>
				<Flex
					flex={1}
					justify={'center'}
					align={'center'}
					position={'relative'}
					w={'full'}
				>
					<Box
						position={'relative'}
						height={'440px'}
						rounded={'lg'}
						boxShadow={'2xl'}
						width={'full'}
						overflow={'hidden'}
					>
						<Image
							fit={'cover'}
							align={'center'}
							w={'100%'}
							h={'100%'}
							src={
								'https://firebasestorage.googleapis.com/v0/b/icodes-ctc-db1.appspot.com/o/homepage%2Fctc-map.gif?alt=media&token=b2761220-706a-45e5-aa53-71f135f57154'
							}
						/>
					</Box>
				</Flex>
			</Stack>
		</Flex>
	);
}

const contactOptions = [
	{
		label: 'Address',
		value: '28 Congressional Ave., Brgy Bahay Toro, Quezon City 1106, Metro Manila',
		icon: GoLocation,
	},
	{
		label: 'Telephone',
		value: '0998 512 7056',
		icon: BsPhone,
	},
	{
		label: 'Email',
		value: 'info@congressionaltowncenter.com',
		icon: HiOutlineMail,
	},
];

const ContactForm = () => {
	const toast = useToast();
	const pbID = IdGenerator(6);
	const form = useFormik({
		initialValues: {
			name: '',
			email: '',
			subject: '',
			message: '',
			contact: '',
		},
		onSubmit: (value, action) => {
			try {
				addDoc(
					collection(
						db,
						'maintenance',
						'salesmanagement',
						'tbl_prosBuyers'
					),
					{
						CreatedDate: serverTimestamp(),
						BuyersID: pbID,
						FName: value.name,
						Email: value.email,
						Subject: value.subject,
						Inquiry: value.message,
						CNum: value.contact,
						Preference: 'N/A',
						Type: 'From Online',
						Agent: 'N/A',
					}
				);
				toast({
					title: 'Inquiry submited',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error submitting inquiry',
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
				console.log(e);
			}
			action.resetForm();
		},
	});
	return (
		<Box w={'100%'}>
			<Stack spacing={10}>
				<VStack
					as='form'
					spacing={8}
					w='100%'
					bg={useColorModeValue('white', 'gray.700')}
					rounded='lg'
					boxShadow='lg'
					p={{ base: 5, sm: 10 }}
					color={'#000000'}
				>
					<VStack
						spacing={4}
						w='100%'
					>
						<Stack
							w='100%'
							spacing={3}
							direction={{ base: 'column', md: 'row' }}
						>
							<FormControl
								id='name'
								isInvalid={
									form.errors.name && form.touched.name
								}
							>
								<FormLabel fontSize={'sm'}>Name</FormLabel>
								<Input
									type='text'
									placeholder='Full Name'
									rounded='md'
									name='name'
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									value={form.values.name}
									fontSize={'sm'}
								/>
								<FormErrorMessage fontSize={'xs'}>
									{form.errors.name}
								</FormErrorMessage>
							</FormControl>
							<FormControl
								id='email'
								isInvalid={
									form.errors.email && form.touched.email
								}
							>
								<FormLabel fontSize={'sm'}>Email</FormLabel>
								<Input
									type='email'
									placeholder='test@test.com'
									rounded='md'
									name='email'
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									value={form.values.email}
									fontSize={'sm'}
								/>
								<FormErrorMessage fontSize={'xs'}>
									{form.errors.email}
								</FormErrorMessage>
							</FormControl>
							<FormControl
								id='contact'
								isInvalid={
									form.errors.contact && form.touched.contact
								}
							>
								<FormLabel fontSize={'sm'}>
									Contact Number
								</FormLabel>
								<Input
									type='text'
									placeholder='09123456789'
									rounded='md'
									name='contact'
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									value={form.values.contact}
									fontSize={'sm'}
								/>
								<FormErrorMessage fontSize={'xs'}>
									{form.errors.contact}
								</FormErrorMessage>
							</FormControl>
						</Stack>
						<FormControl
							id='subject'
							isInvalid={
								form.errors.subject && form.touched.subject
							}
						>
							<FormLabel fontSize={'sm'}>Subject</FormLabel>
							<Input
								type='text'
								placeholder='E.g Purchase Unit'
								rounded='md'
								name='subject'
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								value={form.values.subject}
								fontSize={'sm'}
							/>
							<FormErrorMessage fontSize={'xs'}>
								{form.errors.subject}
							</FormErrorMessage>
						</FormControl>
						<FormControl
							id='message'
							isInvalid={
								form.errors.message && form.touched.message
							}
						>
							<FormLabel fontSize={'sm'}>Message</FormLabel>
							<Textarea
								placeholder='Enter your message.'
								rounded='md'
								name='message'
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								value={form.values.message}
								fontSize={'sm'}
							/>
							<FormErrorMessage fontSize={'xs'}>
								{form.errors.message}
							</FormErrorMessage>
						</FormControl>
					</VStack>
					<VStack w='100%'>
						<Button
							bg='green.300'
							color='white'
							_hover={{
								bg: 'green.500',
							}}
							rounded='md'
							w={{ base: '100%', md: 'max-content' }}
							onClick={form.handleSubmit}
						>
							Inquire Now
						</Button>
					</VStack>
				</VStack>
			</Stack>
		</Box>
	);
};

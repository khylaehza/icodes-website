import {
	Box,
	Stack,
	Heading,
	Text,
	SimpleGrid,
	Button,
	Image,
	Flex,
	VStack,
} from '@chakra-ui/react';

const LoginBackground = ({ children }) => {
	return (
		<Flex
			justifyContent={'center'}
			h={'100%'}
			alignItems={'center'}
		>
			<Box>
				<Box
					as={SimpleGrid}
					maxW={'7xl'}
					columns={{ base: 1, md: 2 }}
					spacing={{ base: 10, lg: 32 }}
					p={15}
					py={{ base: 10, sm: 20, lg: 32 }}
				>
					<Heading
						lineHeight={1.1}
						fontSize={{
							base: '3xl',
							sm: '4xl',
							md: '5xl',
							lg: '6xl',
						}}
						mt={'45px'}
					>
						Congressional Town Center Admin{' '}
						<Text
							as={'span'}
							bgGradient='linear(to-r, blue.700,b.300)'
							bgClip='text'
						>
							&
						</Text>{' '}
						Staffs.
					</Heading>
					<Box
						bg={'gray.50'}
						rounded={'xl'}
						p={{ base: 4, sm: 6, md: 8 }}
						spacing={{ base: 8 }}
						maxW={{ lg: 'lg' }}
					>
						{children}
					</Box>
				</Box>
			</Box>
			<Blur
				position={'absolute'}
				top={'-0px'}
				style={{ filter: 'blur(6px) ' }}
			/>
		</Flex>
	);
};

const Blur = (props) => {
	return (
		<Image
			zIndex={-25}
			alt={'Login Image'}
			objectFit={'cover'}
			w={'100vw'}
			h={'100vh'}
			// src={'/imgs/bg/login-bg.jpg'}
			src={'https://i.imgur.com/1FZbaqg.jpg'}
			{...props}
		></Image>
	);
};

export default LoginBackground;

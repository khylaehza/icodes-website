import {
	Button,
	Flex,
	HStack,
	useColorModeValue,
	useDisclosure,
	VisuallyHidden,
	IconButton,
	Box,
	VStack,
	chakra,
} from '@chakra-ui/react';
import { React } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { VscThreeBars } from 'react-icons/vsc';
import { RiCloseFill } from 'react-icons/ri';
import { Logo } from '../../styles';
const TopNav = () => {
	const bg = useColorModeValue('w.100', 'b.400');
	const mobNav = useDisclosure();
	const location = useLocation();
	const navigate = useNavigate();

	const toLogin = () => {
		try {
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Flex w='100%'>
			<chakra.header
				bg={bg}
				w='100%'
				px={{
					base: 2,
					sm: 4,
				}}
				py={4}
				shadow='md'
			>
				<Flex
					alignItems='center'
					justifyContent='space-between'
					mx='auto'
				>
					<Flex>
						<chakra.a
							href='/'
							title='ICODES'
							display='flex'
							alignItems='center'
						>
							<Logo />
							<VisuallyHidden>ICODES</VisuallyHidden>
						</chakra.a>
					</Flex>
					<HStack
						display='flex'
						alignItems='center'
						spacing={1}
					>
						<HStack
							spacing={1}
							mr={1}
							color='brand.500'
							display={{
								base: 'none',
								md: 'inline-flex',
							}}
						>
							<Button
								variant={'tertiary'}
								size='sm'
								//	onClick={toHome}
								color={
									location.pathname === '/'
										? 'black'
										: '#8695A6'
								}
								backgroundColor={
									location.pathname === '/' ? 'w.200' : 'none'
								}
							>
								Home
							</Button>
							<Button
								variant={'tertiary'}
								size='sm'
								//	onClick={toFinder}
								color={
									location.pathname === '/finder'
										? 'black'
										: '#8695A6'
								}
								backgroundColor={
									location.pathname === '/finder'
										? 'w.200'
										: 'none'
								}
							>
								Finder
							</Button>
							<Button
								variant={'tertiary'}
								size='sm'
								//	onClick={toDesigner}
								color={
									location.pathname === '/designer'
										? 'black'
										: '#8695A6'
								}
								backgroundColor={
									location.pathname === '/designer'
										? 'w.200'
										: 'none'
								}
							>
								Designer
							</Button>
							<Button
								variant={'tertiary'}
								size='sm'
								color={
									location.pathname === '/calculator'
										? 'black'
										: '#8695A6'
								}
								backgroundColor={
									location.pathname === '/calculator'
										? 'w.200'
										: 'none'
								}
							>
								Calculator
							</Button>
						</HStack>
						<Button
							variant={'primary'}
							size='sm'
							onClick={toLogin}
						>
							Login
						</Button>
						<Box
							display={{
								base: 'inline-flex',
								md: 'none',
							}}
						>
							<IconButton
								display={{
									base: 'flex',
									md: 'none',
								}}
								aria-label='Open menu'
								fontSize='20px'
								color='b.300'
								variant='none'
								onClick={mobNav.onOpen}
								icon={<VscThreeBars />}
							/>

							<VStack
								pos='absolute'
								top={0}
								left={0}
								right={0}
								display={mobNav.isOpen ? 'flex' : 'none'}
								flexDirection='column'
								p={2}
								pb={4}
								m={2}
								bg={bg}
								spacing={3}
								rounded='sm'
								shadow='sm'
							>
								<RiCloseFill
									aria-label='Close menu'
									onClick={mobNav.onClose}
									variant='none'
									icon={<RiCloseFill />}
								/>
								<Button
									variant={'tertiary'}
									size='sm'
								>
									Home
								</Button>
								<Button
									variant={'tertiary'}
									size='sm'
								>
									Finder
								</Button>
								<Button
									variant={'tertiary'}
									size='sm'
								>
									Designer
								</Button>
								<Button
									variant={'tertiary'}
									size='sm'
								>
									Calculator
								</Button>

								<Button
									variant={'tertiary'}
									size='sm'
								>
									Login
								</Button>
							</VStack>
						</Box>
					</HStack>
				</Flex>
			</chakra.header>
		</Flex>
	);
};

export default TopNav;
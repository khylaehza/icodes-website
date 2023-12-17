import { Flex, Fade, AbsoluteCenter, Spinner, Box } from '@chakra-ui/react';
import { TopNav } from '../../sections/navigation';
import { LogForm } from '../../sections/maintenance';
import { useData } from '../../../DataContext';
import { json, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
const LoginPage = () => {
	const { loading } = useData();
	const location = useLocation();

	const storedData = localStorage.getItem('user');
	const jsonData = JSON.parse(storedData);

	if (loading) {
		return (
			<Box
				position='relative'
				h='100vh'
			>
				<AbsoluteCenter
					axis='both'
					alignItems={'center'}
					justifyItems={'center'}
				>
					<Spinner
						thickness='4px'
						speed='0.65s'
						emptyColor='gray.200'
						color='blue.400'
						size='xl'
						display={'flex'}
					/>
				</AbsoluteCenter>
			</Box>
		);
	} else {
		if (jsonData == null) {
			return (
				<Fade
					initialScale={0.9}
					in='true'
				>
					<Flex
						flexDir={'column'}
						height={'100vh'}
					>
						<TopNav />
						<LogForm />
					</Flex>
				</Fade>
			);
		} else {
			if (jsonData.length == 0) {
				return (
					<Fade
						initialScale={0.9}
						in='true'
					>
						<Flex
							flexDir={'column'}
							height={'100vh'}
						>
							<TopNav />
							<LogForm />
						</Flex>
					</Fade>
				);
			} else if (location.pathname === '/login' && jsonData.length > 0) {
				switch (jsonData.EmpPos) {
					case 'Admin':
						return <Navigate to={'/ad'} />;
					case 'Front Desk':
						return <Navigate to={'/fd'} />;
					case 'Property Management':
						return <Navigate to={'/pm'} />;
					case 'Accounting Management':
						return <Navigate to={'/am'} />;
					case 'Sales Management':
						return <Navigate to={'/sm'} />;
					default:
						localStorage.clear();
				}
			}
		}
	}
};

export default LoginPage;

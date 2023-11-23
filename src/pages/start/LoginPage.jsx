import { Flex, Fade } from '@chakra-ui/react';
import { TopNav } from '../../sections/navigation';
import { LogForm } from '../../sections/maintenance';
import { useData } from '../../../DataContext';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
const LoginPage = () => {
	const { curUser } = useData();
	const location = useLocation();
	console.log(curUser);
	const storedData = localStorage.getItem('user');

	if (location.pathname === '/login' && storedData) {
		const jsonData = JSON.parse(storedData);
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
	} else {
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
	}
};

export default LoginPage;

import { Flex, Fade } from '@chakra-ui/react';
import { TopNav } from '../../sections/navigation';
import { LogForm } from '../../sections/maintenance';
import { useData } from '../../../DataContext';
import { useLocation } from 'react-router-dom';
const LoginPage = () => {
	const { curUser } = useData();
	const location = useLocation();

	if (location.pathname === '/login' && curUser.length !== 0) {
		return window.history.back();
	} else {
		localStorage.clear();
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

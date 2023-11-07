import { Flex } from '@chakra-ui/react';
import { TopNav } from '../../sections/navigation';
import { LogForm } from '../../sections/maintenance';
const LoginPage = () => {
	return (
		<Flex
			flexDir={'column'}
			height={'100vh'}
		>
			<TopNav />
			<LogForm />
		</Flex>
	);
};

export default LoginPage;

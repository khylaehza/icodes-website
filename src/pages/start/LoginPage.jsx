import { Flex } from '@chakra-ui/react';
import { TopNav } from '../../sections/navigation';
import { LogForm } from '../../sections/maintenance';
import { useData } from '../../../DataContext';
const LoginPage = () => {

	const { curUser } = useData()
	console.log(curUser)
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

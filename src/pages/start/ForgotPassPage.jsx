import { Flex } from '@chakra-ui/react';
import TopNav from '../../sections/navigation/TopNav';
import { ForgotPassForm } from '../../sections/maintenance';
const ForgotPassPage = () => {
	return (
		<Flex
			flexDir={'column'}
			height={'100vh'}
		>
			<TopNav />
			<ForgotPassForm />
		</Flex>
	);
};

export default ForgotPassPage;

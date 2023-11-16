import { Flex } from '@chakra-ui/react';
import { TopNav } from '../../sections/navigation';
import { Guide } from '../../sections/interactive';
const InteractiveGuide = () => {
	return (
		<Flex
			flexDir={'column'}
			height={'100vh'}
		>
			<TopNav />

			<Guide />
		</Flex>
	);
};

export default InteractiveGuide;

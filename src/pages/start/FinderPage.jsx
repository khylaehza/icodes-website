import { Flex, Fade } from '@chakra-ui/react';
import { TopNav } from '../../sections/navigation';
import { FinderStart } from '../../sections/dss';
const FinderPage = () => {
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
				<FinderStart />
			</Flex>
		</Fade>
	);
};

export default FinderPage;

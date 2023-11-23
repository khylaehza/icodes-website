import { Flex, Fade } from '@chakra-ui/react';
import { TopNav } from '../../sections/navigation';
import { UnitChoices } from '../../sections/interactive';

const DesignerPage = () => {
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
				<UnitChoices />
			</Flex>
		</Fade>
	);
};

export default DesignerPage;

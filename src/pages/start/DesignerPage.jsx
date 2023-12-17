import { Flex, Fade, AbsoluteCenter, Box, Spinner } from '@chakra-ui/react';
import { TopNav } from '../../sections/navigation';
import { UnitChoices } from '../../sections/interactive';
import { useData } from '../../../DataContext';

const DesignerPage = () => {
	const { loading } = useData();
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
	}
};

export default DesignerPage;

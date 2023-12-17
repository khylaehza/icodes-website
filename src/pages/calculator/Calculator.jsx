import {
	Flex,
	Heading,
	Text,
	AbsoluteCenter,
	Box,
	Spinner,
} from '@chakra-ui/react';
import { CalculatorForms } from '../../sections/calculators/index';
import { useData } from '../../../DataContext';
const Calculator = () => {
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
			<Flex
				bgColor={'w.200'}
				w={'100%'}
				flexDir={'column'}
				p={10}
				gap={2}
				// h={{ base: '', xl: '100vh' }}
			>
				<Heading
					fontSize={{
						base: '2xl',
						sm: '3xl',
						md: '4xl',
						lg: '5xl',
					}}
					alignSelf={'center'}
				>
					Congressional Town Center{' '}
					<Text
						as={'span'}
						bgGradient='linear(to-r, blue.700,b.300)'
						bgClip='text'
					>
						Calculator.
					</Text>{' '}
				</Heading>

				<CalculatorForms />
			</Flex>
		);
	}
};

export default Calculator;

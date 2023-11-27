import { Flex, Box, Heading, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { RadarGraph } from '../../utilities';
import { useNavigate } from 'react-router-dom';

const FinderStart = () => {
	const navigate = useNavigate();
	return (
		<Flex
			bgColor={'w.200'}
			w={'100%'}
			flexDir={'column'}
			p={10}
			gap={2}
			h={{ base: '', xl: '100%' }}
			alignItems={'center'}
		>
			<Heading
				fontSize={{
					base: '2xl',
					sm: '3xl',
					md: '4xl',
					lg: '5xl',
				}}
			>
				Congressional Town Center Unit{' '}
				<Text
					as={'span'}
					bgGradient='linear(to-r, blue.700,b.300)'
					bgClip='text'
				>
					Assessment
				</Text>
				.
			</Heading>
			<Text>
				Find the unit that best for you by taking 5-minutes assessment
				that will recommend the unit tailored to the your preferences
				and needs.{' '}
			</Text>

			<Box
				w={'100%'}
				h={'70%'}
			>
				<RadarGraph
					points={[
						{ name: 'Larger', max: 5 },
						{ name: 'Smaller', max: 3 },
						{ name: 'Higher', max: 6 },
						{ name: 'Lower', max: 5 },
						{ name: 'Medium', max: 8 },
					]}
				/>
			</Box>

			<Button
				bgColor={'b.300'}
				color={'w.300'}
				h={'40px'}
				_hover={{ bgColor: 'b.400', color: 'w.300' }}
				onClick={() => {
					navigate('/assessment');
				}}
			>
				Proceed
			</Button>
		</Flex>
	);
};

export default FinderStart;

import React from 'react';
import { Box, Center, Heading, Text, Button, Image } from '@chakra-ui/react';
import { IoIosArrowRoundBack } from 'react-icons/io';

const NotFoundPage = () => {
	const GoBack = () => {
		window.history.back();
	};
	return (
		<Center
			h='100vh'
			bgColor={'w.100'}
		>
			<Box
				textAlign='center'
				display={'flex'}
				flexDir={'column'}
			>
				<Image
					alignSelf={'center'}
					src={'/gifs/maintenance/404error.gif'}
					alt='404 - Not Found GIF'
					style={{
						width: '180px',
						height: '180px',
						marginBottom: '15px',
					}}
				/>
				<Heading
					fontSize='6xl'
					color='r.100'
					mb={4}
				>
					404 - Page Not Found
				</Heading>
				<Text
					fontSize='xl'
					color='gray.500'
					mb={8}
				>
					The requested page does not exist.
				</Text>

				<Button
					w={'45%'}
					alignSelf={'center'}
					colorScheme='blue'
					bgColor='b.200'
					_hover={{ bgColor: 'b.300' }}
					leftIcon={<IoIosArrowRoundBack />}
					size='lg'
					onClick={GoBack}
				>
					Go Back to Previous Page
				</Button>
			</Box>
		</Center>
	);
};

export default NotFoundPage;

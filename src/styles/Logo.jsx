import { Box } from '@chakra-ui/react';
import logo from '/logo/logo.png';

function Logo({ w = '50px' }) {
	return (
		<Box w={w}>
			<img
				// src={logo}
				src={'https://i.imgur.com/eY5C6Ei.png'}
				alt='logo'
			></img>
		</Box>
	);
}

export default Logo;

import React from 'react';
import {
	Box,
	Drawer,
	DrawerContent,
	useDisclosure,
	Flex,
} from '@chakra-ui/react';
import Header from './Header';
import { SidebarContent } from '../navigation';

const Body = ({ children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Flex
			flexDir={'row'}
			w={'100%'}
			zIndex={2}
			boxShadow='0 4px 12px 0 rgba(134,149,166,0.3)'
		>
			<Flex height={'100%'}>
				<SidebarContent
					onClose={() => onClose}
					display={{ base: 'none', md: 'block' }}
				/>
			</Flex>

			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement='left'
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size='full'
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>

			<Flex
				flexDir={'column'}
				w='100%'
				height={'100%'}
			>
				<Header onOpen={onOpen} />
				<Box
					bg={'#EFF3F6'}
					h={'90%'}
				>
					{children}
				</Box>
			</Flex>
		</Flex>
	);
};

export default Body;

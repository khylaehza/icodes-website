import React, { useState } from 'react';
import {
	IconButton,
	Avatar,
	Box,
	Flex,
	HStack,
	VStack,
	Text,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import { FiMenu, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../styles';
import { NameFormat } from '../../utilities';
import { useData } from '../../../DataContext';
const Header = ({ onOpen, ...rest }) => {
	const navigate = useNavigate();
	const {  logout, curUser } = useData();
	const handleLogout = () => {
		try {
			logout();
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	const handleCP = () =>{
		try {
			navigate('/forgotpass');
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<Flex
			px={{ base: 4, md: 4 }}
			alignItems='center'
			borderBottomWidth='1px'
			borderBottomColor={'w.200'}
			justifyContent={{ base: 'space-between', md: 'flex-end' }}
			{...rest}
			h={'75px'}
			bgColor={'w.300'}
			borderLeftWidth={'1px'}
			borderLeftColor={'w.200'}
			boxShadow='5px 5px 5px 3px rgba(134,149,166,0.5)'
		>
			<IconButton
				display={{ base: 'flex', md: 'none' }}
				onClick={onOpen}
				variant='outline'
				aria-label='open menu'
				icon={<FiMenu />}
			/>

			<Box display={{ base: 'flex', md: 'none' }}>
				<Logo w={'50px'} />
			</Box>

			<HStack
				spacing={{ base: '0', md: '6' }}
				mr={5}
			>
				<Flex alignItems={'center'}>
					<Menu>
						<MenuButton
							py={2}
							transition='all 0.3s'
							_focus={{ boxShadow: 'none' }}
						>
							<HStack>
								{curUser.Image && (
									<Avatar
										size={'sm'}
										src={curUser.Image}
									/>
								)}

								<VStack
									display={{ base: 'none', md: 'flex' }}
									alignItems='flex-start'
									spacing='1px'
									pr={10}
								>
									<Text fontSize='sm'>
										<NameFormat
											fName={curUser.FName}
											mName={curUser.MName}
											lName={curUser.LName}
										/>
									</Text>
									<Text
										fontSize='xs'
										color='gray.600'
									>
										{curUser.EmpPos}
									</Text>
								</VStack>

								<Box display={{ base: 'none', md: 'flex' }}>
									<FiChevronDown />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList>
							<MenuItem
								onClick={handleCP}
								fontSize={'sm'}
								_focus={{ boxShadow: 'none', bg: 'none' }}
								_hover={{ bg: 'w.100' }}
							>
								Change Password
							</MenuItem>
							<MenuItem
								onClick={handleLogout}
								fontSize={'sm'}
								_focus={{ boxShadow: 'none', bg: 'none' }}
								_hover={{ bg: 'w.100' }}
							>
								Sign out
							</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	);
};

export default Header;

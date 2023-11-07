import { useState, useEffect } from 'react';
import { Box, CloseButton, Flex, Icon } from '@chakra-ui/react';
import { Logo } from '../../styles';
import { Link, useLocation } from 'react-router-dom';
import { ad, fd, pm, am, sm } from '../../utilities';
import { useData } from '../../../DataContext';
const NavItem = ({ icon, children, nav, ...rest }) => {
	let location = useLocation();

	return (
		<Link to={nav}>
			<Flex
				fontSize={'xs'}
				fontWeight={'semibold'}
				align='center'
				p='4'
				mx='4'
				borderRadius='lg'
				role='group'
				cursor='pointer'
				color={location.pathname === nav ? 'w.300' : 'b.200'}
				backgroundColor={location.pathname === nav ? 'b.300' : ''}
				_hover={{
					color: 'b.100',
				}}
				{...rest}
			>
				{icon && (
					<Icon
						mr='4'
						fontSize='16'
						_groupHover={{
							color: 'b.100',
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	);
};

export const SidebarContent = ({ onClose, ...rest }) => {
	const { curUser } = useData();
	const [empNav, setEmpNav] = useState([]);

	useEffect(() => {
		setEmpNav(getNavigationItems(curUser.EmpPos));
	}, []);

	const getNavigationItems = (position) => {
		switch (position) {
			case 'Admin':
				return ad;
			case 'Front Desk':
				return fd;
			case 'Property Management':
				return pm;
			case 'Accounting Management':
				return am;
			case 'Sales Management':
				return sm;
			default:
				return [];
		}
	};

	return (
		<Box
			transition='1s ease'
			bgColor='w.300'
			zIndex={1}
			{...rest}
			h={'100%'}
		>
			<Flex
				h={40}
				alignItems='center'
				mx='8'
				justifyContent='space-between'
			>
				<Box
					w='100%'
					pt={30}
					alignSelf={'center'}
					ml={'25px'}
					mt={10}
					mb={10}
				>
					<Logo w={'80px'} />
				</Box>

				<CloseButton
					display={{ base: 'flex', md: 'none' }}
					onClick={onClose}
					color={'b.300'}
				/>
			</Flex>

			{empNav.map((link) => (
				<NavItem
					key={link.name}
					icon={link.icon}
					nav={link.nav}
				>
					{link.name}
				</NavItem>
			))}
		</Box>
	);
};

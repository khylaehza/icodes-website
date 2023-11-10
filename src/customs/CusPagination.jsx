import React from 'react';
import {
	Container,
	Text,
	Flex,
	Icon,
	useColorModeValue,
	Button,
} from '@chakra-ui/react';

import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const CusPagination = ({
	page,
	currentPage,
	setCurrentPage,
	firstIndex,
	lastIndex,
	numPage,
}) => {
	return (
		<Flex
			p={{ base: 1, sm: 2 }}
			w={'full'}
			alignItems='center'
			justifyContent='center'
			h={'10%	'}
		>
			<Pagination
				page={page}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				firstIndex={firstIndex}
				lastIndex={lastIndex}
				numPage={numPage}
			/>
		</Flex>
	);
};

const Pagination = ({
	page,
	currentPage,
	setCurrentPage,
	numPage,
	firstIndex,
	lastIndex,
}) => {
	const prePage = () => {
		if (currentPage !== 1) {
			setCurrentPage(currentPage - 1);
		}
	};
	const changePage = (n) => {
		setCurrentPage(n);
	};
	const nextPage = () => {
		if (currentPage !== numPage) {
			setCurrentPage(currentPage + 1);
		}
	};

	return (
		<Flex
			as='nav'
			aria-label='Pagination'
			alignItems='center'
			mt={{ base: 3, md: 0 }}
		>
			<PaginationButton
				borderTopLeftRadius='md'
				borderBottomLeftRadius='md'
				onClick={prePage}
				isDisabled={firstIndex == currentPage - 1}
			>
				<Icon
					as={FaChevronLeft}
					w={3.5}
					h={3.5}
				/>
			</PaginationButton>

			{page.map((n, i) => {
				return (
					<PaginationButton
						key={i}
						isActive={currentPage == n}
						bgColor={currentPage == n ? 'b.100' : 'w.100'}
						onClick={() => {
							changePage(n);
						}}
						p
					>
						{n}
					</PaginationButton>
				);
			})}

			<PaginationButton
				borderTopRightRadius='md'
				borderBottomRightRadius='md'
				onClick={nextPage}
				isDisabled={currentPage == numPage}
			>
				<Icon
					as={FaChevronRight}
					w={3.5}
					h={3.5}
				/>
			</PaginationButton>
		</Flex>
	);
};

const PaginationButton = ({ children, isDisabled, isActive, p, ...props }) => {
	const activeStyle = {
		bg: useColorModeValue('gray.300', 'gray.700'),
	};

	return (
		<Flex
			boxShadow={'0 4px 10px 0 rgba(134,149,166,0.4)'}
			mx={1}
			px={4}
			py={2}
			rounded='md'
			bg='white'
			color='gray.700'
			opacity={isDisabled && 0.6}
			_hover={!isDisabled && activeStyle}
			cursor={isDisabled ? 'not-allowed' : 'pointer'}
			{...(isActive && activeStyle)}
			{...props}
			display={
				p &&
				!isActive && {
					base: 'none',
					'2xl': 'block',
				}
			}
		>
			{children}
		</Flex>
	);
};

export default CusPagination;

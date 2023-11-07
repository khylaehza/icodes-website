import React from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';

function CusSearch({
	variant,
	background,
	children,
	placeholder,
	borderRadius,
	...rest
}) {
	return (
		<InputGroup
			w={{ base: '100%', md: '200px' }}
			{...rest}
		>
			<InputLeftElement
				children={
					<AiOutlineSearch
						color={'b.200'}
						w='15px'
						h='15px'
					/>
				}
			/>
			<Input
				variant='search'
				fontSize='sm'
				bg={background ? background : 'w.300'}
				color={'b.200'}
				fontWeight='normal'
				_placeholder={{ color: 'b.100', fontSize: 'sm' }}
				borderRadius='5px'
				placeholder={placeholder ? placeholder : 'Search...'}
				boxShadow='0 4px 12px 0 rgba(134,149,166,0.5)'
			/>
		</InputGroup>
	);
}

export default CusSearch;

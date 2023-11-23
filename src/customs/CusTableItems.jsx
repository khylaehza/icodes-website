import { Td, Text } from '@chakra-ui/react';
import React from 'react';
export const CusTD = ({ component }) => {
	return (
		<Td
			color={'b.300'}
			fontSize='xs'
			fontWeight='normal'
			textAlign={{
				base: 'left',
				xl: 'center',
			}}
			pl={{
				base: '20px',
				xl: '0px',
			}}
			pr={{
				base: '20px',
				xl: '0px',
			}}
		>
			{component}
		</Td>
	);
};

export const CusTitle = ({ component }) => {
	return (
		<>
			<Td
				display={{
					base: 'table-cell',
					xl: 'none',
				}}
				sx={{
					'@media print': {
						display: 'none',
					},
					textTransform: 'uppercase',
					color: 'b.300',
					fontSize: 'xs',
					fontWeight: 'bold',
					letterSpacing: 'wider',
					fontFamily: 'heading',
				}}
			>
				{component}
			</Td>
		</>
	);
};

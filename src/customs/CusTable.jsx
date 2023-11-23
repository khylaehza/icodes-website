import { Flex, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

const CusTable = ({ header, children }) => {
	return (
		<Flex
			w='100%'
			alignItems='flex-start'
			textAlign={'center'}
			justifyContent='flex-start'
		>
			<Table
				boxShadow='0 4px 10px 0 rgba(134,149,166,0.4)'
				w='100%'
				bg='b.100'
				variant='striped'
				rounded={5}
				size='md'
				display={{
					base: 'block',
					xl: 'table',
				}}
				sx={{
					'@media print': {
						display: 'table',
					},
				}}
			>
				<Thead
					display={{
						base: 'none',
						xl: 'table-header-group',
					}}
					sx={{
						'@media print': {
							display: 'table-header-group',
						},
					}}
					alignSelf='center'
					bgColor={'b.300'}
				>
					<Tr>
						{header.map((x) => (
							<Th
								key={x}
								textAlign={'center'}
								color={'w.300'}
							>
								{x}
							</Th>
						))}
					</Tr>
				</Thead>
				<Tbody
					display={{
						base: 'block',
						xl: 'table-row-group',
					}}
					sx={{
						'@media print': {
							display: 'table-row-group',
						},
					}}
				>
					{children}
				</Tbody>
			</Table>
		</Flex>
	);
};

export default CusTable;

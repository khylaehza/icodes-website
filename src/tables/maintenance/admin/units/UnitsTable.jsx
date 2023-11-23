import { CusTitle, CusTD } from '../../../../customs';
import React from 'react';
import { Tr } from '@chakra-ui/react';
const UnitsTable = ({ data, searchList, all }) => {
	const ret = searchList ? all : data;
	return ret
		.filter((item) => {
			return searchList === ''
				? item
				: item.name
						.toLowerCase()
						.replace(/\s/g, '')
						.includes(searchList.toLowerCase());
		})
		.map((data, id) => {
			return (
				<Tr
					key={id}
					display={{
						base: 'grid',
						xl: 'table-row',
					}}
					sx={{
						'@media print': {
							display: 'table-row',
						},
						gridTemplateColumns:
							'minmax(0px, 50%) minmax(0px, 50%)',
						gridGap: '10px',
					}}
				>
					<React.Fragment>
						<CusTitle component={'Type Code'} />
						<CusTD component={data.name} />
						<CusTitle component={'Tower'} />
						<CusTD component={data.tower} />
						<CusTitle component={'Floor'} />
						<CusTD component={data.floor} />
						<CusTitle component={'Unit No.'} />
						<CusTD component={data.no} />
						<CusTitle component={'Type'} />
						<CusTD component={data.typeName} />
						<CusTitle component={'Size'} />
						<CusTD
							component={
								data.typeSize
									? data.typeSize
									: `${data.typeSize} square.meters`
							}
						/>
						<CusTitle component={'Status'} />
						<CusTD component={data.status} />
					</React.Fragment>
				</Tr>
			);
		});
};

export default UnitsTable;

import { CusTitle, CusTD, CusDeleteTypes } from '../../../../customs';
import { DateChecker } from '../../../../utilities';
import React, { useState } from 'react';
import { EditUnitSet } from '../../../../modals';
import { Image, Tr, Td, ButtonGroup, useDisclosure } from '@chakra-ui/react';
import { CusEnlargeImage, CusCarousel } from '../../../../customs/index';

const UnitsSetTable = ({ data, search, all, units, unitTowerID }) => {
	const ret = search ? all : data;
	const [selectedImage1, setSelectedImage1] = useState(null);
	const [selectedImage2, setSelectedImage2] = useState(null);
	const {
		isOpen: isImage1Open,
		onOpen: onImage1Open,
		onClose: onImage1Close,
	} = useDisclosure();
	const {
		isOpen: isImage2Open,
		onOpen: onImage2Open,
		onClose: onImage2Close,
	} = useDisclosure();

	const handleImageClick1 = (src) => {
		setSelectedImage1(src);
		onImage1Open();
	};
	const handleImageClick2 = (src) => {
		setSelectedImage2(src);
		onImage2Open();
	};

	return ret
		.filter((item) => {
			return search.toLowerCase() === ''
				? item
				: item.TypeName.toLowerCase().includes(search.toLowerCase()) ||
						item.UnitSize.includes(search);
		})
		.map((data, id) => {
			if (data.CreatedDate) {
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
							<CusTitle component={'Created At'} />
							<CusTD
								component={
									<DateChecker
										dateToCheck={
											new Date(
												data.CreatedDate.seconds * 1000
											)
										}
									/>
								}
							/>
							<CusTitle component={'Floor Layout'} />
							<Td width={{ base: '', xl: '100px' }}>
								<Image
									src={data.LayoutImage}
									w='45px'
									onClick={() =>
										handleImageClick1(data.LayoutImage)
									}
								/>
							</Td>
							<CusTitle component={'Unit Image'} />
							<Td width={{ base: '', xl: '100px' }}>
								<Image
									src={data.TypeImage[0]}
									w='45px'
									onClick={() =>
										handleImageClick2(data.TypeImage)
									}
								/>
							</Td>
							<CusTitle component={'Type Name'} />
							<CusTD component={data.TypeName} />
							<CusTitle component={'Size'} />
							<CusTD component={data.UnitSize} />
							<CusTitle component={'Tower/s'} />
							<CusTD component={data.Tower.join(', ')} />
							<CusTitle component={'Unit/s'} />
							<CusTD component={data.Units.join(', ')} />
							<CusTitle component={'Quantity'} />
							<CusTD component={data.UnitQuan} />

							<CusTitle component={'Actions'} />
							<CusTD
								component={
									<ButtonGroup
										variant='solid'
										size='sm'
										spacing={3}
									>
										{data.id && (
											<EditUnitSet
												data={data}
												id={data.id}
												mainCollection='maintenance'
												tblDocUser='admin'
												tblUserCol='tbl_setUnit'
											/>
										)}

										<CusDeleteTypes
											id={data.id}
											stor={`admin/units/${data.UnitTypeID}/`}
											label={
												data.Units.length > 3
													? `${
															(data.Units[0],
															data.Units[1])
													  }...'s Data`
													: `${data.Units}'s Data`
											}
											mainCollection='maintenance'
											tblDocUser='admin'
											tblUserCol='tbl_setUnit'
											data={data}
											units={units}
											unitTowerID={unitTowerID}
										/>
									</ButtonGroup>
								}
							></CusTD>

							<CusEnlargeImage
								isOpen={isImage1Open}
								onClose={onImage1Close}
								label={'Floor Layout Preview'}
								body={
									<Image
										src={selectedImage1}
										width={'680px'}
										height={'500px'}
									/>
								}
							/>
							<CusEnlargeImage
								isOpen={isImage2Open}
								onClose={onImage2Close}
								label={'Unit Image/s'}
								body={<CusCarousel slides={selectedImage2} />}
							/>
						</React.Fragment>
					</Tr>
				);
			}
		});
};

export default UnitsSetTable;

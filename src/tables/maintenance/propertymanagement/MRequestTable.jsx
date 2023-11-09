import { CusTitle, CusTD, CusDelete, CusAlert } from '../../../customs';
import { DateChecker } from '../../../utilities';
import {
	Image,
	Tr,
	Td,
	ButtonGroup,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import React from 'react';
import { EditMRequest } from '../../../modals';
import { boolean } from 'yup';
import { useState } from 'react';
import { CusCarousel,CusEnlargeImage } from '../../../customs/index'



const MRequestTable = ({ data, search, all }) => {
    const toast = useToast();
	const ret = search ? all : data;
	const { isOpen, onOpen, onClose} = useDisclosure();
   
    const [selectedImage, setSelectedImage] = useState(null);


	const handleImageClick = (src) => {
		setSelectedImage(src);
		onOpen();
	};
	return ret
        .filter((item) => {
            return search.toLowerCase() === ''
                ? item
                : item.MRequestID.toString().toLowerCase().includes(search);
        })
		.map((data, id) => {

            if (data.CreatedDate){
                return(
                    <React.Fragment key={id}>
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
                                <CusTitle component={'Request ID'} />
                                <CusTD component={data.MRequestID} />
                                <CusTitle component={'Unit'} />
                                <CusTD component={data.Unit} />
                                {/* <CusTitle component={'For'} />
                                <CusTD component={data.For} /> */}
                                <CusTitle component={'Date Requested'} />
                                <CusTD
									component={
										<DateChecker
											dateToCheck={
												new Date(
													data.CreatedDate.seconds *
														1000
												)
											}
										/>
									}
								/>
                                <CusTitle component={'Type of Repair'} />
                                <CusTD component={data.RepairType} />
                                <CusTitle component={'File'} />
                                <Td width={{ base: '', xl: '100px' }}>
                                        <Image
                                            src={data.RequestImg[0]}
                                            width={{ base: '100px', xl: '100px' }}
                                            onClick={() =>
                                                handleImageClick(data.RequestImg)
                                            }
                                        />
                                    
                                </Td>
                                <CusTitle component={'Details'} />
                                <CusTD component={data.Details} />
                                {/* <CusTitle component={'Purpose'} />
                                <CusTD component={data.Purpose} /> */}
                                <CusTitle component={'Status'} />
                                <CusTD component={data.Status} />
                                <CusTitle component={'Actions'} />
                                <CusTD
                                    component={
                                        <ButtonGroup
                                            variant='solid'
                                            size='sm'
                                            spacing={3}
                                        >
                                            {data.id && (
                                                <EditMRequest
                                                    data={data}
                                                    id={data.id}
                                                    mainCollection='maintenance'
                                                    tblDocUser='propertymanagement'
                                                    tblUserCol='tbl_maintenance'
                                                />
                                            )}

                                            <CusDelete
                                                id={data.id}
                                                stor={`pm/maintenance/${data.MRequestID}`}
                                                label={` ${data.MRequestID}'s Data`}
                                                mainCollection='maintenance'
                                                tblDocUser='propertymanagement'
                                                tblUserCol='tbl_maintenance'
                                                onUpdate={() => {}}
                                            />
                                        </ButtonGroup>
                                    }
                                />

                            </React.Fragment>
                        </Tr>

                        <CusEnlargeImage
                            isOpen={isOpen}
                            onClose={onClose}
                            label={'Image/s Preview'}
                            body={
                                <CusCarousel slides={selectedImage}/>
                            }
                        />
                    </React.Fragment>
                )
            }
        })
}

export default MRequestTable
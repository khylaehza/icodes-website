import { CusTitle, CusTD, CusDelete, CusAlert } from '../../../customs';
import { DateChecker } from '../../../utilities';
import {
	Image,
	Tr,
	Td,
	ButtonGroup,
	Switch,
	useDisclosure,
	Text,
	useToast,
    Box,
	Flex,
} from '@chakra-ui/react';
import React from 'react';
import { EditAnncmnts } from '../../../modals';
import { boolean } from 'yup';
import { useState } from 'react';

import { db } from '../../../../firebase-config';
import { updateDoc, serverTimestamp, doc } from 'firebase/firestore';
import {CusEnlargeImage} from '../../../customs/index'

const AnnouncementTable = ({ data, search, all }) => {
    const toast = useToast();
	const ret = search ? all : data;
	const { isOpen: isImageModalOpen, onOpen: onImageModalOpen, onClose: onImageModalClose } = useDisclosure();
    const { isOpen: isStatusModalOpen, onOpen: onStatusModalOpen, onClose: onStatusModalClose } = useDisclosure();

    const [Id, setId] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
	const [anncmntState, setAnncmntState] = useState({
		statusLabel: '',
		anncmntId: '',
		currentStatus: boolean,
		status: boolean,
	});


	const handleImageClick = (src) => {
		setSelectedImage(src);
		onImageModalOpen();
	};
	return ret
		.filter((item) => {
			return search.toLowerCase() === ''
				? item
				: item.AnncmntID.toString().toLowerCase().includes(search);
		})
		.map((data, id) => {
            const status = data.Status ? 'Enabled' : 'Disabled'
            const statusConfirmation = (value, data) => {
				onStatusModalOpen();
				setAnncmntState({
					...anncmntState,
					statusLabel: value === true ? 'Enable' : 'Disable',
					anncmntId: data.AnncmntID,
					status: value,
					currentStatus: data.Status,
				});
			};

			const handleConfirmStatusChange = async () => {
				try {
					const docRef = doc(
						db,
						'maintenance',
						'propertymanagement',
						'tbl_announcements',
						Id
					);

					await updateDoc(docRef, {
						EditedDate: serverTimestamp(),
						Status: anncmntState.status,
					});

					toast({
						title: `${anncmntState.anncmntId}'s Status ${
							anncmntState.currentStatus
								? 'Disabled'
								: 'Enabled'
						}!`,
						status: 'success',
						duration: 3000,
						isClosable: true,
					});

					onStatusModalClose();
				} catch (error) {
					toast({
						title: 'Edit Status Failed!',
						status: 'error',
						duration: 3000,
						isClosable: true,
					});
					onStatusModalClose();
				}
			};
            if (data.CreatedDate){
                return(
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
                                <CusTitle component={'Annoucement ID'} />
                                <CusTD component={data.AnncmntID} />
                                <CusTitle component={'Purpose'} />
                                <CusTD component={data.Purpose} />
                                <CusTitle component={'For'} />
                                <CusTD component={data.For} />
                                <CusTitle component={'Date Posted'} />
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
                                <CusTitle component={'Author'} />
							    <CusTD component={data.Author} />
							    <CusTitle component={'File'} />
								<Td width={{ base: '', xl: '100px' }}>
									<Image
										src={data.AnncmntImg}
										width={{ base: '100px', xl: '100px' }}
                                        onClick={() =>
											handleImageClick(data.AnncmntImg)
										}
									/>
								</Td>
                                <CusTitle component={'Description'} />
							    <CusTD component={data.Description} />
							    <CusTitle component={'Status'} />
							    <CusTD
									component={
                                        <>
                                            <Flex direction={'column'}>
                                                {status}
                                                <Switch
                                                    id='isChecked'
                                                    isChecked={data.Status}
                                                    onChange={(e) => {
                                                        statusConfirmation(
                                                            e.target.checked,
                                                            data
                                                        );
                                                        setId(data.id);
                                                    }}
                                                />
                                            </Flex>
                                        </>
									}
								/>
                                <CusTitle component={'Actions'} />
                                <CusTD
                                    component={
                                        <ButtonGroup
                                            variant='solid'
                                            size='sm'
                                            spacing={3}
                                        >
                                            {data.id && (
                                                <EditAnncmnts
                                                    data={data}
                                                    id={data.id}
                                                    mainCollection='maintenance'
                                                    tblDocUser='propertymanagement'
                                                    tblUserCol='tbl_announcements'
                                                />
                                            )}

                                            <CusDelete
                                                id={data.id}
                                                stor={`pm/anncmnts/${data.AnncmntID}/anncmnts.png`}
                                                label={` ${data.AnncmntID}'s Data`}
                                                mainCollection='maintenance'
                                                tblDocUser='propertymanagement'
                                                tblUserCol='tbl_announcements'
                                                onUpdate={() => {}}
                                            />
                                        </ButtonGroup>
                                    }
                                />
								<CusTD
									component={
										<CusAlert
											isOpen={isStatusModalOpen}
											onClose={onStatusModalClose}
											header={'Status Confirmation'}
											action={handleConfirmStatusChange}
											actionLabel={'Confirm'}
											body={
												<Text fontSize='md'>
													Are you sure to{' '}
													<Text
														as='b'
														color={
															anncmntState.statusLabel ===
															'Disable'
																? 'r.100'
																: 'green'
														}
													>
														{anncmntState.statusLabel}
													</Text>{' '}
													this announcement? {' '}
													<Text
														as='b'
														color='b.300'
													>
														(  {anncmntState.anncmntId}  )
													</Text>
												</Text>
											}
										/>
									}
								/>
								<CusTD
									component={
										<CusEnlargeImage
											isOpen={isImageModalOpen}
											onClose={onImageModalClose}
											label={'Announcement Preview'}
											body={
												<Image
													src={selectedImage}
													width={'680px'}
													height={'500px'}
												/>
											}
										/>
									}
								/>
                            </React.Fragment>
                        </Tr>

                )
            }
        })
}

export default AnnouncementTable
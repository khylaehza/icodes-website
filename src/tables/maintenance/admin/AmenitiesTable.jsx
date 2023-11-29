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
	UnorderedList,
	ListItem,
	Flex
} from '@chakra-ui/react';
import React from 'react';

import { EditAmenities } from '../../../modals';
import { boolean } from 'yup';
import { useState } from 'react';

import { db } from '../../../../firebase-config';
import { updateDoc, serverTimestamp, doc } from 'firebase/firestore';
import { CusEnlargeImage } from '../../../customs/index'
const AmenitiesTable = ({ data, search, all }) => {
	const toast = useToast();
	const ret = search ? all : data;
	const {
		isOpen: isImageModalOpen,
		onOpen: onImageModalOpen,
		onClose: onImageModalClose,
	} = useDisclosure();
	const {
		isOpen: isStatusModalOpen,
		onOpen: onStatusModalOpen,
		onClose: onStatusModalClose,
	} = useDisclosure()
	const [Id, setId] = useState('');
	const [nameLabel, setNameLabel] = useState('')
	const [selectedImage, setSelectedImage] = useState(null);
	const [amenitiesState, setAmenitiesState] = useState({
		name: '',
		statusLabel: '',
		ameId: '',
		currentStatus: boolean,
		status: boolean,
	});

	const handleImageClick = (item) => {
		setSelectedImage(item.AmenityImg);
		setNameLabel(item.AmenityName)
		onImageModalOpen();
	};

	return ret
		.filter((item) => {
			return search.toLowerCase() === ''
				? item
				: item.AmenityName.includes(search);
		})
		.map((data, id) => {
			const statusConfirmation = (value, data) => {
				onStatusModalOpen();
				setAmenitiesState({
					...amenitiesState,
					name: data.AmenityName,
					statusLabel: value === true ? 'Enable' : 'Disable',
					ameId: data.AmenityID,
					status: value,
					currentStatus: data.Status,
				});
			};

			const handleConfirmStatusChange = async () => {
				try {
					const docRef = doc(
						db,
						'maintenance',
						'admin',
						'tbl_amenities',
						Id
					);

					await updateDoc(docRef, {
						EditedDate: serverTimestamp(),
						Status: amenitiesState.status,
					});

					toast({
						title: `${amenitiesState.name}'s Status ${
							amenitiesState.currentStatus
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
			if (data.CreatedDate) {
				return (
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
								<CusTitle component={'Created At'} />
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

								<CusTitle component={'Image'} />
								<Td width={{ base: '', xl: '100px' }}>
									<Image
										src={data.AmenityImg}
										width={{ base: '100px', xl: '100px' }}
										onClick={() =>
											handleImageClick(data)
										}
									/>
								</Td>
								<CusTitle component={'Amenity ID'} />
								<CusTD component={data.AmenityID} />
								<CusTitle component={'Amenity'} />
								<CusTD component={data.AmenityName} />
								<CusTitle component={'Tower Location'} />
								<CusTD component={data.TNum} />
								<CusTitle component={'Capacity'} />
								<CusTD component={data.Capacity} />
								<CusTitle component={'Description'} />
								<CusTD component={data.Description} />
								<CusTitle component={'Policies'} />
								<CusTD
									component={
										<>
											<Text fontWeight={'bold'}>
												Do's
											</Text>
											<UnorderedList
												ml={'5'}
												mr={'5'}
											>
												{data.DoPolicy.map(
													(item, index) => (
														<ListItem
															key={index}
															textAlign={'start'}
														>
															{item}
														</ListItem>
													)
												)}
											</UnorderedList>
											<Text fontWeight={'bold'}>
												Dont's
											</Text>
											<UnorderedList
												ml={'5'}
												mr={'5'}
											>
												{data.DontPolicy.map(
													(item, index) => (
														<ListItem
															key={index}
															textAlign={'start'}
														>
															{item}
														</ListItem>
													)
												)}
											</UnorderedList>
										</>
									}
								/>
								<CusTitle component={'Status'} />
								<CusTD
									component={
										<Flex direction={'column'}>
											{data.Status.toString()
												? 'Enabled'
												: 'Disabled'}
											<Switch
												id='isChecked'
												isChecked={data.Status}
												onChange={(e) => {
													statusConfirmation(
														e.target
															.checked,
														data
													);
													setId(data.id);
												}}
											/>
										</Flex>
									}
								/>
							</React.Fragment>
							<CusTitle component={'Actions'} />
							<CusTD
								component={
									<ButtonGroup
										variant='solid'
										size='sm'
										spacing={3}
									>
										{data.id && (
											<EditAmenities
												data={data}
												id={data.id}
												mainCollection='maintenance'
												tblDocUser='admin'
												tblUserCol='tbl_amenities'
											/>
										)}

										<CusDelete
											id={data.id}
											stor={`admin/amenities/${data.AmenityID}/profile.png`}
											label={` ${data.name}'s Data`}
											mainCollection='maintenance'
											tblDocUser='admin'
											tblUserCol='tbl_amenities'
											onUpdate={() => {}}
										/>
									</ButtonGroup>
								}
							/>
						</Tr>
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
											amenitiesState.statusLabel ===
											'Disable'
												? 'r.100'
												: 'green'
										}
									>
										{amenitiesState.statusLabel}
									</Text>{' '}
									
									this amenity?
									<Text
										as='b'
										color='b.300'
									>
										({amenitiesState.name})
									</Text>
								</Text>
							}
						/>
						<CusEnlargeImage
                            isOpen={isImageModalOpen}
                            onClose={onImageModalClose}
                            label={nameLabel}
                            body={
                                <Image
									src={selectedImage}
									width={'680px'}
									height={'500px'}
								/>
                            }
                        />
					</React.Fragment>
				);
			}
		});
};

export default AmenitiesTable;

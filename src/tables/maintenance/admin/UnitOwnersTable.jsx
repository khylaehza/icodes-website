import {
	CusTitle,
	CusTD,
	CusDeleteSingleUnit,
	CusAlert,
} from '../../../customs';
import { DateChecker, NameFormat } from '../../../utilities';
import {
	Image,
	Tr,
	Td,
	ButtonGroup,
	Switch,
	useDisclosure,
	Text,
	useToast,
	Flex,
} from '@chakra-ui/react';
import React from 'react';
import moment from 'moment';
import { EditUnitOwner } from '../../../modals';
import { boolean } from 'yup';
import { useState } from 'react';

import { db } from '../../../../firebase-config';
import { updateDoc, serverTimestamp, doc } from 'firebase/firestore';
import {
	CusEnlargeImage,
	CusReqModal,
	CusReqCarousel,
} from '../../../customs/index';

const UnitOwnersTable = ({
	data,
	search,
	all,
	units,
	unitTowerID,
	allowActions = true,
}) => {
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
	} = useDisclosure();
	const [Id, setId] = useState('');
	const [nameLabel, setNameLabel] = useState('');
	const [selectedImage, setSelectedImage] = useState(null);
	const [unitOwnerState, setUnitOwnerState] = useState({
		fName: '',
		statusLabel: '',
		uoId: '',
		currentStatus: boolean,
		status: boolean,
	});

	const handleImageClick = (item) => {
		setSelectedImage(item.UnOwnerImg);
		setNameLabel(item);
		onImageModalOpen();
	};

	return ret
		.filter((item) => {
			return search === ''
				? item
				: item.UID.toString().toLowerCase().includes(search);
		})
		.map((data, id) => {
			console.log(data.Status);
			const statusConfirmation = (value, data) => {
				onStatusModalOpen();
				setUnitOwnerState({
					...unitOwnerState,
					fName: data.FName,
					statusLabel: value === true ? 'Enable' : 'Disable',
					uoId: data.EmpId,
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
						'tbl_unitOwners',
						Id
					);

					await updateDoc(docRef, {
						EditedDate: serverTimestamp(),
						Status: unitOwnerState.status,
					});

					toast({
						title: `${unitOwnerState.fName}'s Status ${
							unitOwnerState.currentStatus
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
					onClose();
				}
			};
			if (data.CreatedDate) {
				console.log(data.Status);

				const firstName =
					data.FName.charAt(0).toUpperCase() + data.FName.slice(1);
				const middleName = data.MName.charAt(0).toUpperCase();
				const lastName =
					data.LName.charAt(0).toUpperCase() + data.LName.slice(1);
				const fullName =
					middleName === ''
						? `${firstName} ${middleName} ${lastName}`
						: `${firstName} ${middleName}. ${lastName}`;

				console.log(fullName);
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
										src={data.UnOwnerImg}
										width={{ base: '100px', xl: '100px' }}
										onClick={() => handleImageClick(data)}
									/>
								</Td>
								<CusTitle component={'Unit Owner ID'} />
								<CusTD component={data.UID} />
								<CusTitle component={'Name'} />
								<CusTD
									component={
										<NameFormat
											fName={data.FName}
											mName={data.MName}
											lName={data.LName}
										/>
									}
								/>
								<CusTitle component={'Contact Number'} />
								<CusTD component={'09' + data.CNum} />
								<CusTitle component={'Email'} />
								<CusTD component={data.Email + '.com'} />
								<CusTitle component={'Unit/s'} />
								<CusTD component={data.Units} />
								<CusTitle component={'Requirments'} />
								<CusTD
									component={
										<CusReqModal
											child={
												<CusReqCarousel data={data} />
											}
											data={data}
										/>
									}
								/>

								{allowActions && (
									<>
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
									</>
								)}
							</React.Fragment>
							{allowActions && (
								<>
									<CusTitle component={'Actions'} />
									<CusTD
										component={
											<ButtonGroup
												variant='solid'
												size='sm'
												spacing={3}
											>
												{data.id && (
													<EditUnitOwner
														data={data}
														id={data.id}
														mainCollection='maintenance'
														tblDocUser='admin'
														tblUserCol='tbl_unitOwners'
													/>
												)}

												<CusDeleteSingleUnit
													id={data.id}
													stor={`admin/unitOwners/${data.UID}/profile.png`}
													label={` ${data.FName}'s Data`}
													mainCollection='maintenance'
													tblDocUser='admin'
													tblUserCol='tbl_unitOwners'
													data={data}
													units={units}
													unitTowerID={unitTowerID}
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
																unitOwnerState.statusLabel ===
																'Disable'
																	? 'r.100'
																	: 'green'
															}
														>
															{unitOwnerState.statusLabel}
														</Text>{' '}
														<Text
															as='b'
															color='b.300'
														>
															{unitOwnerState.fName}
														</Text>
														's account?
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
												label={
													<NameFormat
														fName={nameLabel.FName}
														mName={nameLabel.MName}
														lName={nameLabel.LName}
													/>
												}
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
								</>
							)}
						</Tr>
					</React.Fragment>
				);
			}
		});
};

export default UnitOwnersTable;

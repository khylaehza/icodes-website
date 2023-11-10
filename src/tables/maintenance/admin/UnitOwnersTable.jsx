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
import { CusEnlargeImage } from '../../../customs/index';

const UnitOwnersTable = ({ data, search, all, units, unitTowerID }) => {
	const toast = useToast();
	const ret = search ? all : data;

	const { isOpen, onOpen, onClose } = useDisclosure();
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
		onOpen();
	};

	return ret
		.filter((item) => {
			return search === ''
				? item
				: item.UID.toString().toLowerCase().includes(search);
		})
		.map((data, id) => {
			const statusConfirmation = (value, data) => {
				onOpen();
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

					onClose();
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

								<CusTitle component={'Status'} />
								<CusTD
									component={
										<Flex direction={'column'}>
											{data.Status}
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
						</Tr>
						<CusAlert
							isOpen={isOpen}
							onClose={onClose}
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

						<CusEnlargeImage
							isOpen={isOpen}
							onClose={onClose}
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
					</React.Fragment>
				);
			}
		});
};

export default UnitOwnersTable;

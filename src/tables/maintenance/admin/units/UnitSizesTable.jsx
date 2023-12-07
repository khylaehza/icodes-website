import { CusTitle, CusTD, CusDelete, CusAlert } from '../../../../customs';
import { DateChecker } from '../../../../utilities';
import {
	Tr,
	ButtonGroup,
	Switch,
	useDisclosure,
	Text,
	useToast,
	Flex
} from '@chakra-ui/react';
import React from 'react';

import { boolean } from 'yup';
import { useState } from 'react';

import { db } from '../../../../../firebase-config';
import { updateDoc, serverTimestamp, doc } from 'firebase/firestore';

const UnitSizesTable = ({ all }) => {
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [Id, setId] = useState('');
	const [sizeState, setSizeState] = useState({
		name: '',
		statusLabel: '',
		sizeID: '',
		currentStatus: boolean,
		status: boolean,
	});
	return all.map((data, id) => {
		const statusConfirmation = (value, data) => {
			onOpen();
			setSizeState({
				...sizeState,
				name: data.UnitSize,
				statusLabel: value === true ? 'Enable' : 'Disable',
				sizeId: data.id,
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
					'tbl_unitSize',
					Id
				);

				await updateDoc(docRef, {
					EditedDate: serverTimestamp(),
					Status: sizeState.status,
				});

				toast({
					title: `${sizeState.name}'s Status ${
						sizeState.currentStatus ? 'Disabled' : 'Enabled'
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
				console.log(error);
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
												data.CreatedDate.seconds * 1000
											)
										}
									/>
								}
							/>

							<CusTitle component={'Size'} />
							<CusTD component={`${data.UnitSize} sq. m`} />
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
									<CusDelete
										id={data.id}
										label={`${data.UnitSize}sq. m's Data`}
										mainCollection='maintenance'
										tblDocUser='admin'
										tblUserCol='tbl_unitSize'
										hasFile={false}
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
										sizeState.statusLabel === 'Disable'
											? 'r.100'
											: 'green'
									}
								>
									{sizeState.statusLabel}
								</Text>{' '}
								<Text
									as='b'
									color='b.300'
								>
									{sizeState.name}
								</Text>
								's data?
							</Text>
						}
					/>
				</React.Fragment>
			);
		}
	});
};

export default UnitSizesTable;

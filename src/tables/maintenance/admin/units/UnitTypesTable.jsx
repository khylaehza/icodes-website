import { CusTitle, CusTD, CusDelete, CusAlert } from '../../../../customs';
import { DateChecker } from '../../../../utilities';
import {
	Tr,
	ButtonGroup,
	Switch,
	useDisclosure,
	Text,
	useToast,
} from '@chakra-ui/react';
import React from 'react';
import { boolean } from 'yup';
import { useState } from 'react';

import { db } from '../../../../../firebase-config';
import { updateDoc, serverTimestamp, doc } from 'firebase/firestore';

const UnitTypesTable = ({ all }) => {
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [Id, setId] = useState('');
	const [typeState, setTypeState] = useState({
		name: '',
		statusLabel: '',
		typeID: '',
		currentStatus: boolean,
		status: boolean,
	});
	return all.map((data, id) => {
		const statusConfirmation = (value, data) => {
			onOpen();
			setTypeState({
				...typeState,
				name: data.typeName,
				statusLabel: value === true ? 'Enable' : 'Disable',
				typeId: data.id,
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
					'tbl_unitTypes',
					Id
				);

				await updateDoc(docRef, {
					EditedDate: serverTimestamp(),
					Status: typeState.status,
				});

				toast({
					title: `${typeState.name}'s Status ${
						typeState.currentStatus ? 'Disabled' : 'Enabled'
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

							<CusTitle component={'Type Code'} />
							<CusTD component={data.TypeCode} />
							<CusTitle component={'Size'} />
							<CusTD component={data.TypeName} />

							<CusTitle component={'Status'} />
							<CusTD
								component={
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
										<CusDelete
											id={data.id}
											label={`${data.TypeCode}'s Data`}
											mainCollection='maintenance'
											tblDocUser='admin'
											tblUserCol='tbl_unitTypes'
											hasFile={false}
											onUpdate={() => {}}
										/>
									</ButtonGroup>
								}
							/>
						</React.Fragment>
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
										typeState.statusLabel === 'Disable'
											? 'r.100'
											: 'green'
									}
								>
									{typeState.statusLabel}
								</Text>{' '}
								<Text
									as='b'
									color='b.300'
								>
									{typeState.name}
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

export default UnitTypesTable;

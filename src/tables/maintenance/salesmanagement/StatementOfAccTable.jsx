import { CusTitle, CusTD, CusDelete, CusAlert } from '../../../customs';
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
// import { EditEmployee } from '../../../modals';
import { boolean } from 'yup';
import { useState } from 'react';

import { db } from '../../../../firebase-config';
import { updateDoc, serverTimestamp, doc } from 'firebase/firestore';

const StatementOfAccTable = ({ data, search, all }) => {
	const toast = useToast();
	const ret = search ? all : data;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [Id, setId] = useState('');
	const [soaStatus, setSoaStatus] = useState({
		fName: '',
		statusLabel: '',
		id: '',
		currentStatus: boolean,
		status: boolean,
	});
	return ret
		.filter((item) => {
			return search.toLowerCase() === ''
				? item
				: item.SOAID.toString().includes(search);
		})
		.map((data, id) => {
			const statusConfirmation = (value, data) => {
				onOpen();
				setSoaStatus({
					...soaStatus,
					fName: data.FName,
					statusLabel: value === true ? 'Enable' : 'Disable',
					id: data.SOAID,
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
						'tbl_soa',
						Id
					);

					await updateDoc(docRef, {
						EditedDate: serverTimestamp(),
						Status: soaStatus.status,
					});

					toast({
						title: `${soaStatus.fName}'s Status ${
							soaStatus.currentStatus ? 'Disabled' : 'Enabled'
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

								<CusTitle component={'SOA ID'} />
								<CusTD component={data.SOAID} />
								<CusTitle component={"Unit Owner's ID"} />
								<CusTD component={data.BuyersId} />
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
								<CusTitle component={'Unit Name'} />
								<CusTD component={data.Unit} />
								<CusTitle component={'Total Contract Price'} />
								<CusTD
									component={`₱ ${
										data.Amount.includes('.')
											? data.Amount
											: `${data.Amount}.00`
									}`}
								/>
								<CusTitle component={'Number of Months'} />
								<CusTD component={data.NoOfMonths} />
								<CusTitle component={'File'} />
								<CusTD component={'file'} />
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
										{/* {data.id && (
											<EditEmployee
												data={data}
												id={data.id}
												mainCollection='maintenance'
												tblDocUser='accountingmanagement'
												tblUserCol='tbl_soa'
											/>
										)} */}

										<CusDelete
											id={data.id}
											label={` ${data.FName}'s Data`}
											mainCollection='maintenance'
											tblDocUser='accountingmanagement'
											tblUserCol='tbl_soa'
											onUpdate={() => {}}
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
											soaStatus.statusLabel === 'Disable'
												? 'r.100'
												: 'green'
										}
									>
										{soaStatus.statusLabel}
									</Text>{' '}
									<Text
										as='b'
										color='b.300'
									>
										{soaStatus.fName}
									</Text>
									's account?
								</Text>
							}
						/>
					</React.Fragment>
				);
			}
		});
};

export default StatementOfAccTable;

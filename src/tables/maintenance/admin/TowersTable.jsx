import { CusTitle, CusTD, CusDelete, CusAlert } from '../../../customs';
import { DateChecker, NameFormat } from '../../../utilities';
import { Image, Tr, Td, ButtonGroup } from '@chakra-ui/react';
import React from 'react';
import moment from 'moment';

import { EditTower } from '../../../modals';

import { db } from '../../../../firebase-config';
import { deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, deleteObject, listAll } from 'firebase/storage';

const TowersTable = ({ data, search, all, unitData, amounts }) => {
	const storage = getStorage();
	const ret = search ? data : all;
	// const toast = useToast();
	// const { isOpen, onOpen, onClose } = useDisclosure();
	// const [Id, setId] = useState('');
	// const [towerState, setTowerState] = useState({
	// 	towerName: '',
	// 	statusLabel: '',
	// 	towerId: '',
	// 	currentStatus: boolean,
	// 	status: boolean,
	// });

	return ret
		.filter((item) => {
			return search.toLowerCase() === ''
				? item
				: item.TowerID.toLowerCase().includes(search);
		})
		.map((data, id) => {
			let unitQuan = 0;
			let unitPerFloor = 0;
			if (data.Units) {
				Object.values(data.Units).map((x) => {
					unitQuan += unitPerFloor;
					Object.values(x).map((y) => {
						unitPerFloor += 1;
					});
				});
			}

			if (data.CreatedDate) {
				console.log('dsd', amounts);

				const onUpdate = async () => {
					const matched = unitData.filter((item) => {
						return `T${data.TowerNum}` == item.Tower ? item.id : '';
					});

					const matchedAmt = amounts.filter((item) => {
						return `T${data.TowerNum}` == item.Tower ? item.id : '';
					});
					console.log(matchedAmt);
					try {
						matched.map(async (uid) => {
							const storageRef = ref(
								storage,
								`admin/units/${uid.UnitTypeID}/`
							);

							await deleteDoc(
								doc(
									db,
									'maintenance',
									'admin',
									'tbl_setUnit',
									uid.id
								)
							);

							listAll(storageRef)
								.then((res) => {
									res.items.forEach((itemRef) => {
										deleteObject(itemRef)
											.then(() => {})
											.catch((error) => {
												console.log(error);
											});
									});
								})
								.catch((error) => {
									console.log(error);
								});
						});

						console.log(matchedAmt);
						matchedAmt.map(async (uid) => {
							console.log('gfdg', uid);
							console.log(uid.id);

							try {
								await deleteDoc(
									doc(
										db,
										'maintenance',
										'admin',
										'tbl_setAmount',
										uid.id
									)
								);
							} catch (e) {
								console.log(e);
							}
						});
					} catch (e) {
						console.log(e);
					}
				};

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
							<CusTitle component={'Image'} />
							<Td width={{ base: '', xl: '100px' }}>
								<Image
									src={data.TowerImg}
									width={{ base: '100px', xl: '100px' }}
								/>
							</Td>
							<CusTitle component={'Tower ID'} />
							<CusTD component={data.TowerID} />
							<CusTitle component={'Tower'} />
							<CusTD component={data.TowerName} />
							<CusTitle component={'Description'} />
							<CusTD component={data.TowerDesc} />
							<CusTitle component={'Units Quantity'} />
							<CusTD component={unitPerFloor} />
							<CusTitle component={'Parking Quantity'} />
							<CusTD component={data.ParkQuan} />
							<CusTitle component={'Launch Date'} />
							<CusTD component={data.LaunchDate} />
							<CusTitle component={'Complete Date'} />
							<CusTD component={data.CompleteDate} />
							<CusTitle component={'Status'} />
							<CusTD component={data.Status} />
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
										<EditTower
											data={data}
											id={data.id}
											mainCollection='maintenance'
											tblDocUser='admin'
											tblUserCol='tbl_towers'
										/>
									)}
									<CusDelete
										id={data.id}
										label={`${data.TowerName}'s Data`}
										mainCollection='maintenance'
										tblDocUser='admin'
										tblUserCol='tbl_towers'
										stor={`admin/tower/${data.TowerID}/image.png`}
										onUpdate={onUpdate}
									/>
								</ButtonGroup>
							}
						/>
					</Tr>
				);
			}
		});
};

export default TowersTable;

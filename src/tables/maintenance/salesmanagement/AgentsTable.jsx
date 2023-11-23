import { CusTitle, CusTD } from '../../../customs';
import { NameFormat } from '../../../utilities';
import { Image, Tr, Td, ButtonGroup, Text, useDisclosure } from '@chakra-ui/react';
import React,{useState} from 'react';
import moment from 'moment';
import { EditTeam } from '../../../modals';
import { CusEnlargeImage } from '../../../customs/index'

const AgentsTable = ({ data, search, all }) => {
	const ret = search ? all : data;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [nameLabel, setNameLabel] = useState('')
	const [selectedImage, setSelectedImage] = useState(null);

	const handleImageClick = (item) => {
		setSelectedImage(item.Image);
		setNameLabel(item)
		onOpen();
	};

	return ret
		.filter((item) => {
			if (item.EmpId) {
				return search.toLowerCase() === ''
					? item
					: item.EmpId.toString().includes(search);
			}
		})
		.map((data, id) => {
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
								<CusTitle component={'Image'} />
								<Td width={{ base: '', xl: '100px' }}>
									<Image
										src={data.Image}
										width={{
											base: '100px',
											xl: '100px',
										}}
										onClick={ () => 
											handleImageClick(data)
										}
									/>
								</Td>
								<CusTitle component={'Employee ID'} />
								<CusTD component={data.EmpId} />
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

								<CusTitle component={'Employment Start'} />
								<CusTD
									component={moment(data.DStart).format(
										'MM/DD/YYYY'
									)}
								/>
								<CusTitle component={'Status'} />
								<CusTD
									component={
										<Text>
											{data.Status
												? 'Active'
												: 'Disabled'}
										</Text>
									}
								/>
								<CusTitle component={'Team'} />
								<CusTD component={data.Team} />
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
											<EditTeam
												data={data}
												id={data.id}
												mainCollection='maintenance'
												tblDocUser='admin'
												tblUserCol='tbl_employees'
											/>
										)}
									</ButtonGroup>
								}
							/>
						</Tr>
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

export default AgentsTable;

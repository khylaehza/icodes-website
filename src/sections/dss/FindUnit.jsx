import { Flex, Text, Heading, Button, useDisclosure } from '@chakra-ui/react';
import { useData } from '../../../DataContext';
import { CusCarousel, CusModalClear } from '../../customs';
import { FindOtherUnit } from '../../sections/dss';
import AddInterested from './AddInterested';
import { useNavigate } from 'react-router-dom';
const FindUnit = ({ pref, res, setUnitPref, setUserPref }) => {
	const { units, unitTypes, unitData, towers, amenities } = useData();

	const navigate = useNavigate();

	let unitPrefMatch = [];
	let unitPrefWithAmountMatch = [];
	let unitPrefWithAmenity = [];
	let unitPrefWithFamSize = [];
	const length = Object.keys(units).length;

	for (let x = 0; x < length; x++) {
		const i = units[x];

		var sorted = Object.keys(i);

		sorted.map((item) => {
			const element = i[item];

			if (Object.values(element).length != 0) {
				const k = Object.values(element);

				if (k) {
					k.sort(function (a, b) {
						var x = a.name.toLowerCase();
						var y = b.name.toLowerCase();
						return x < y ? -1 : x > y ? 1 : 0;
					});
				}

				k.map((e) => {
					if (
						e.status == 'Available' &&
						e.category[1] == pref[0] &&
						e.category[2] == pref[1]
					) {
						unitPrefMatch.push(e);
						if (
							parseFloat(res.minimumPrice.replace(/,/g, '')) <
								parseFloat(e.tcp.replace(/,/g, '')) &&
							parseFloat(res.maximumPrice.replace(/,/g, '')) >=
								parseFloat(e.tcp.replace(/,/g, ''))
						) {
							unitPrefWithAmountMatch.push(e);
						}

						res.selectedAmenity.map((rx) => {
							if (
								rx.slice(rx.length - 3, -1) ==
								e.name.substring(0, 2) > 0
							) {
								unitPrefWithAmenity.push(e);
							}
						});

						unitTypes.map((item) => {
							if (
								parseInt(res.familySize) <=
								parseInt(item.TypeMax).length >
								0
							) {
								unitPrefWithFamSize.push(e);
							}
						});
					}
				});
			}
		});
	}

	let unitPrefWithAmtAme = [];
	if (unitPrefWithAmountMatch && unitPrefWithAmenity) {
		unitPrefWithAmountMatch.map((amt) => {
			if (
				unitPrefWithAmenity.filter((am) => am.name === amt.name)
					.length > 0
			) {
				unitPrefWithAmtAme.push(amt);
			}
		});
	}

	let unitPrefWithAmtSize = [];
	if (unitPrefWithAmountMatch && unitPrefWithFamSize) {
		unitPrefWithAmountMatch.map((amt) => {
			if (
				unitPrefWithFamSize.filter((sz) => sz.name === amt.name)
					.length > 0
			) {
				unitPrefWithAmtSize.push(amt);
			}
		});
	}

	let unitPrefWithAmeSize = [];
	if (unitPrefWithAmenity && unitPrefWithFamSize) {
		unitPrefWithAmenity.map((am) => {
			if (
				unitPrefWithFamSize.filter((sz) => sz.name === am.name).length >
				0
			) {
				unitPrefWithAmeSize.push(am);
			}
		});
	}

	let unitPrefWithAmtAmeSize = [];
	if (unitPrefWithAmtAme && unitPrefWithFamSize) {
		unitPrefWithAmtAme.map((aa) => {
			if (
				unitPrefWithFamSize.filter((sz) => sz.name === aa.name).length >
				0
			) {
				unitPrefWithAmtAmeSize.push(aa);
			}
		});
	}

	let bestUnit = [];
	if (unitPrefWithAmtAmeSize.length > 0) {
		bestUnit.push({
			units: unitPrefWithAmtAmeSize,
			stat: 'all',
			msg: `This unit aligns with your preferences, including living in ${pref[0]} and ${pref[1]}. It also accommodates your desired amenity and family capacity, while the amount falls within the specified budget range, making it a suitable and financially feasible option for consideration.`,
		});
	} else if (unitPrefWithAmtAme.length > 0) {
		bestUnit.push({
			units: unitPrefWithAmtAme,
			stat: 'amt and ame',
			msg: `This unit aligns with your preferences, including living in ${pref[0]} and ${pref[1]}. It also accommodates your desired amenity and the amount falls within the specified budget range, making it a suitable and financially feasible option for consideration.`,
		});
	} else if (unitPrefWithAmtSize.length > 0) {
		bestUnit.push({
			units: unitPrefWithAmtSize,
			stat: 'amt and size',
			msg: `This unit aligns with your preferences, including living in ${pref[0]} and ${pref[1]}. It also accommodates your family capacity and the amount falls within the specified budget range, making it a suitable and financially feasible option for consideration.`,
		});
	} else if (unitPrefWithAmeSize.length > 0) {
		bestUnit.push({
			units: unitPrefWithAmeSize,
			stat: 'ame and size',
			msg: `This unit aligns with your preferences, including living in ${pref[0]} and ${pref[1]}. It also accommodates your desired amenity and family capacity, making it a suitable option for consideration.`,
		});
	} else if (unitPrefWithAmountMatch.length > 0) {
		bestUnit.push({
			units: unitPrefWithAmountMatch,
			stat: 'amt',
			msg: `This unit aligns with your preferences, including living in ${pref[0]} and ${pref[1]}. It also falls within the specified budget range, making it a suitable and financially feasible option for consideration.`,
		});
	} else if (unitPrefWithAmenity.length > 0) {
		bestUnit.push({
			units: unitPrefWithAmenity,
			stat: 'ame',
			msg: `This unit aligns with your preferences, including living in ${pref[0]} and ${pref[1]}. It also accommodates your desired amenity, making it a suitable option for consideration.`,
		});
	} else if (unitPrefWithFamSize.length > 0) {
		bestUnit.push({
			units: unitPrefWithFamSize,
			stat: 'ame',
			msg: `This unit aligns with your preferences, including living in ${pref[0]} and ${pref[1]}. It also accommodates your family capacity, making it a suitable option for consideration.`,
		});
	} else if (unitPrefMatch.length > 0) {
		bestUnit.push({
			units: unitPrefMatch,
			stat: 'pref',
			msg: `This unit aligns with your preferences, including living in ${pref[0]} and ${pref[1]}, making it a suitable option for consideration.`,
		});
	} else {
		bestUnit.push({ units: [], stat: 'no match' });
	}

	const unitDataGen = (num) => {
		let unitDataList = [];

		unitData.filter((data) => {
			if (data.Units && bestUnit[0]['units'][num]) {
				if (data.Units.includes(bestUnit[0]['units'][num]['name'])) {
					console.log(data);
					unitDataList = {
						'Unit Type': data.TypeName,
						'Unit Size': `${data.UnitSize} sq. meters`,
						Images: [...[data.LayoutImage], ...data.TypeImage],
						'Tower No':
							bestUnit[0]['units'][num]['tower'].substring(1),
						'Floor No': bestUnit[0]['units'][num]['floor'],
						'Unit No': bestUnit[0]['units'][num]['no'],
						'Contract Price': `₱${bestUnit[0]['units'][num]['tcp']}`,
						'Unit Name': bestUnit[0]['units'][num]['name'],
					};

					if (unitTypes) {
						unitTypes.filter((sz) => {
							if (
								`${sz.TypeName} (${sz.TypeCode})` ===
								data.TypeName
							) {
								unitDataList = {
									...unitDataList,
									'People Capacity': sz.TypeMax,
								};
							}
						});
					}
				}
			}
		});

		if (towers && bestUnit[0]['units'][num]) {
			towers.map((tow) => {
				if (
					tow.TowerNum ==
					bestUnit[0]['units'][num]['tower'].substring(1)
				) {
					unitDataList = {
						...unitDataList,
						'Tower Status': tow.Status,
					};
				}

				if (amenities) {
					let amenity = [];
					amenities.filter((ame) => {
						if (ame.TNum === tow.TowerName) {
							amenity.push(
								ame.AmenityName.substring(
									ame.AmenityName.length - 5,
									-1
								)
							);
						}
					});
					unitDataList = {
						...unitDataList,
						Amenities: amenity.join(', '),
					};
				}
			});
		}

		return unitDataList;
	};

	const firstBox = [
		{ 'Tower No: ': unitDataGen(0)['Tower No'] },
		{ 'Floor No: ': unitDataGen(0)['Floor No'] },
		{ 'Unit No: ': unitDataGen(0)['Unit No'] },
	];

	const secondBox = [
		{ 'Unit Type: ': unitDataGen(0)['Unit Type'] },
		{ 'Unit Size: ': unitDataGen(0)['Unit Size'] },
		{ 'People Capacity: ': unitDataGen(0)['People Capacity'] },
	];

	const thirdBox = [
		{ 'Status: ': unitDataGen(0)['Tower Status'] },
		{ 'Amenities: ': unitDataGen(0)['Amenities'] },
		{ 'Contract Price: ': unitDataGen(0)['Contract Price'] },
	];
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			{bestUnit[0]['stat'] == 'no match' ? (
				<Flex
					flexDir={'column'}
					alignItems={'center'}
					justifyContent={'center'}
				>
					<Text>
						There has no unit that match your preference. Please try
						to retake the assessment.
					</Text>
					<Button
						bgColor={'b.300'}
						color={'w.300'}
						h={'40px'}
						_hover={{ bgColor: 'b.400', color: 'w.300' }}
						onClick={() => {
							navigate('/assessment');
						}}
					>
						Proceed
					</Button>
				</Flex>
			) : (
				<>
					<Flex
						w={'100%'}
						justifyContent={'flex-end'}
					>
						{bestUnit[0]['units'] && (
							<>
								{bestUnit[0]['units'].length > 2 && (
									<>
										<CusModalClear
											button={
												<Button
													size={'xs'}
													variant={'link'}
													onClick={onOpen}
												>
													View Other Suitable Units
												</Button>
											}
											isOpen={isOpen}
											onClose={onClose}
											header={'Other Suitable Units'}
											body={
												<FindOtherUnit
													unit={bestUnit[0]['units']}
													unitTypes={unitTypes}
													unitData={unitData}
													towers={towers}
													amenities={amenities}
												/>
											}
										/>
									</>
								)}
							</>
						)}
					</Flex>

					<Text
						fontSize={'lg'}
						fontWeight={'medium'}
					>
						The best unit for you is:
					</Text>
					<Heading
						fontSize={'2xl'}
						color={'b.300'}
					>
						{unitDataGen(0)['Unit Name']}
					</Heading>

					<Flex
						flexDir={'row'}
						w={'100%'}
						h={'100%'}
						justifyItems={'center'}
						alignContent={'center'}
						alignItems={'center'}
						justifyContent={'center'}
						gap={5}
					>
						<Flex
							w={'50%'}
							h={'100%'}
							gap={2}
							flexDir={'column'}
						>
							<Flex h={'90%'}>
								{unitDataGen(0)['Images'] && (
									<CusCarousel
										slides={unitDataGen(0)['Images']}
									/>
								)}
							</Flex>

							<Flex h={'10%'}>
								<Button
									onClick={() => {
										setUnitPref(false);
										setUserPref(true);
									}}
									variant={'solid'}
									bgColor={'b.100'}
									color={'b.300'}
									_hover={{
										bgColor: 'b.200',
									}}
									w={100}
								>
									Back
								</Button>
							</Flex>
						</Flex>

						<Flex
							w={'50%'}
							h={'100%'}
							flexDir={'column'}
							gap={2}
						>
							<Flex
								p={5}
								bgColor={'b.100'}
								rounded={10}
								color={'b.300'}
								h={'30%'}
								alignItems={'center'}
							>
								<Text
									fontSize={'md'}
									align={'justify'}
									fontWeight={'medium'}
									fontStyle={'italic'}
									justifyContent={'center'}
								>
									"{bestUnit[0]['msg']}"
								</Text>
							</Flex>

							<Flex
								flexDir={'row'}
								w={'100%'}
								gap={2}
								justifyContent={'space-between'}
								h={'60%'}
							>
								<Flex
									p={7}
									bgColor={'w.100'}
									rounded={10}
									w={'25%'}
									flexDir={'column'}
									gap={1}
									borderColor={'b.100'}
									borderWidth={1}
									boxShadow='0 4px 12px 0 rgba(134,149,166,0.5)'
								>
									<Heading
										size={'md'}
										alignSelf={'center'}
										mb={2}
									>
										LOCATION
									</Heading>
									{firstBox.map((name, key) => (
										<Flex
											flexDir={'row'}
											gap={2}
											key={key}
											fontSize={'sm'}
											justifyContent={'flex-start'}
										>
											<Text fontWeight={'medium'}>
												{Object.keys(name)}
											</Text>
											<Text>{Object.values(name)}</Text>
										</Flex>
									))}
								</Flex>
								<Flex
									p={7}
									bgColor={'w.100'}
									rounded={10}
									w={'35%'}
									flexDir={'column'}
									gap={1}
									borderColor={'b.100'}
									borderWidth={1}
									boxShadow='0 4px 12px 0 rgba(134,149,166,0.5)'
								>
									<Heading
										size={'md'}
										alignSelf={'center'}
										mb={2}
									>
										UNIT DATA
									</Heading>
									{secondBox.map((name, key) => (
										<Flex
											flexDir={'row'}
											gap={2}
											key={key}
											fontSize={'sm'}
											justifyContent={'flex-start'}
										>
											<Text fontWeight={'medium'}>
												{Object.keys(name)}
											</Text>
											<Text>{Object.values(name)}</Text>
										</Flex>
									))}
								</Flex>
								<Flex
									p={7}
									bgColor={'w.100'}
									rounded={10}
									w={'35%'}
									flexDir={'column'}
									gap={1}
									h={'100%'}
									borderColor={'b.100'}
									borderWidth={1}
									boxShadow='0 4px 12px 0 rgba(134,149,166,0.5)'
								>
									<Heading
										size={'md'}
										alignSelf={'center'}
										mb={2}
									>
										OTHERS
									</Heading>
									{thirdBox.map((name, key) => (
										<Flex
											flexDir={'row'}
											gap={2}
											key={key}
											fontSize={'sm'}
											justifyContent={'flex-start'}
										>
											<Text fontWeight={'medium'}>
												{Object.keys(name)}
											</Text>
											<Text>{Object.values(name)}</Text>
										</Flex>
									))}
								</Flex>
							</Flex>

							<Flex
								justifyContent={'flex-end'}
								gap={2}
								h={'45px'}
							>
								<Button
									onClick={() => {
										navigate('/unitcanvas', {
											state: {
												unit: unitDataGen(0)[
													'Unit Type'
												],
												size: unitDataGen(0)[
													'Unit Size'
												],
											},
										});
									}}
									variant={'solid'}
									bgColor={'w.100'}
									borderWidth={1}
									borderColor={'b.300'}
									color={'b.300'}
									_hover={{
										bgColor: 'w.200',
									}}
									w={100}
									h={'100%'}
								>
									Explore
								</Button>

								<AddInterested
									unit={unitDataGen(0)['Unit Name']}
								/>
							</Flex>
						</Flex>
					</Flex>
				</>
			)}
		</>
	);
};

export default FindUnit;

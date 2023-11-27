import {
	Flex,
	Fade,
	HStack,
	Box,
	Text,
	Heading,
	Button,
	useDisclosure,
} from '@chakra-ui/react';
import { CusCarousel } from '../../customs';
import AddInterested from './AddInterested';
const FindOtherUnit = ({ unit, unitTypes, unitData, towers, amenities }) => {
	const unitDataGen = (num) => {
		let unitDataList = [];

		unitData.filter((data) => {
			if (data.Units && unit[num]) {
				if (data.Units.includes(unit[num]['name'])) {
					unitDataList = {
						'Unit Type': data.TypeName,
						'Unit Size': `${data.UnitSize} sq. meters`,
						Images: [...[data.LayoutImage], ...data.TypeImage],
						'Tower No': unit[num]['tower'].substring(1),
						'Floor No': unit[num]['floor'],
						'Unit No': unit[num]['no'],
						'Contract Price': `₱${unit[num]['tcp']}`,
						'Unit Name': unit[num]['name'],
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

		if (towers && unit[num]) {
			towers.map((tow) => {
				if (tow.TowerNum == unit[num]['tower'].substring(1)) {
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

	return (
		<Flex
			gap={3}
			flexDir={'column'}
		>
			{unit.map((u, key) => {
				const firstBox = [
					{ 'Tower No: ': unitDataGen(key)['Tower No'] },
					{ 'Floor No: ': unitDataGen(key)['Floor No'] },
					{ 'Unit No: ': unitDataGen(key)['Unit No'] },
				];

				const secondBox = [
					{ 'Unit Type: ': unitDataGen(key)['Unit Type'] },
					{ 'Unit Size: ': unitDataGen(key)['Unit Size'] },
					{
						'People Capacity: ':
							unitDataGen(key)['People Capacity'],
					},
				];

				const thirdBox = [
					{ 'Status: ': unitDataGen(key)['Tower Status'] },
					{ 'Amenities: ': unitDataGen(key)['Amenities'] },
					{
						'Contract Price: ': unitDataGen(key)['Contract Price'],
					},
				];

				if (key != 0) {
					return (
						<Flex
							w={'100%'}
							p={5}
							bgColor={key % 2 == 0 ? 'b.100' : 'w.200'}
							rounded={5}
							flexDir={'row'}
							h={'50%'}
							gap={5}
						>
							<Flex
								w={'50%'}
								h={'50%'}
							>
								<CusCarousel
									slides={unitDataGen(key)['Images']}
									h={'325px'}
								/>
							</Flex>

							<Flex
								flexDir={'column'}
								gap={3}
								w={'50%'}
							>
								<Heading size={'md'}>{u['name']}</Heading>
								<Flex
									flexDir={'column'}
									p={4}
									pb={0}
									pt={2}
								>
									{firstBox.map((name, key) => (
										<Flex
											gap={1}
											flexDir={'row'}
											key={key}
										>
											<Text fontWeight={'medium'}>
												{Object.keys(name)}
											</Text>
											<Text>{Object.values(name)}</Text>
										</Flex>
									))}
								</Flex>
								<Flex
									flexDir={'column'}
									p={4}
									pb={0}
									pt={0}
								>
									{secondBox.map((name, key) => (
										<Flex
											gap={1}
											flexDir={'row'}
											key={key}
										>
											<Text fontWeight={'medium'}>
												{Object.keys(name)}
											</Text>
											<Text>{Object.values(name)}</Text>
										</Flex>
									))}
								</Flex>
								<Flex
									flexDir={'column'}
									p={4}
									pb={0}
									pt={0}
								>
									{thirdBox.map((name, key) => (
										<Flex
											gap={1}
											flexDir={'row'}
											key={key}
										>
											<Text fontWeight={'medium'}>
												{Object.keys(name)}
											</Text>
											<Text>{Object.values(name)}</Text>
										</Flex>
									))}
								</Flex>
								<Flex
									justifyContent={'center'}
									width={'100%'}
								>
									<AddInterested unit={u['name']} />
								</Flex>
							</Flex>
						</Flex>
					);
				}
			})}

			<Text></Text>
		</Flex>
	);
};

export default FindOtherUnit;

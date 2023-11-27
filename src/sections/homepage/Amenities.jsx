import { Flex, Heading } from '@chakra-ui/react';
import { CusCarousel } from '../../customs';

import { useData } from '../../../DataContext';
const Amenities = () => {
	const { amenities } = useData();

	let ameData = [];
	amenities.map((m) => {
		ameData.push({ name: m.AmenityName, img: m.AmenityImg });
	});

	if (amenities) {
		return (
			<Flex
				width={'100vw'}
				align={'center'}
				justify={'center'}
				flexDir={'column'}
				p={10}
				color={'white'}
				bgColor={'w.300'}
			>
				<Heading
					fontSize='4xl'
					mb={2}
					color={'b.300'}
				>
					Amenities
				</Heading>
				<CusCarousel
					slides={ameData}
					fit={'cover'}
					text={true}
					data={ameData}
				/>
			</Flex>
		);
	}
};

export default Amenities;

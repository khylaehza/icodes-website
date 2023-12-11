import { Flex, Heading } from '@chakra-ui/react';
import { CusCarousel } from '../../customs';

const Amenities = ({ amenities }) => {
	if (amenities) {
		let ameData = [];
		amenities.map((m) => {
			ameData.push({ name: m.AmenityName, img: m.AmenityImg });
		});
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
	} else {
		let ameAlternative = [
			{
				name: 'Swimming Pool',
				img: 'https://i.imgur.com/AJBO8fi.jpg',
			},
			{
				name: 'GYM',
				img: 'https://i.imgur.com/EUwEruR.jpg',
			},
			{ name: 'Court', img: 'https://i.imgur.com/bEc7VF4.jpg' },
		];

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
					slides={ameAlternative}
					fit={'cover'}
					text={true}
					data={ameAlternative}
				/>
			</Flex>
		);
	}
};

export default Amenities;

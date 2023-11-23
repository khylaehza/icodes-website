import { useState } from 'react';

import { Card, CardBody, Image, Text } from '@chakra-ui/react';
import { useCustomization } from '../../FurnitureContext';
const Bathroom = () => {
	const { bathroomFurn, setActiveFurn } = useCustomization();

	const handleOnClick = (id) => {
		const newState = bathroomFurn.map((furn, index) => {
			if (index === id) {
				setActiveFurn((active) => [
					...active,
					{
						model: furn.model,
						name: furn.name,
						l: furn.l,
						w: furn.w,
						key: furn.key,
						rotation: furn.rotation,
						isActive: furn.isActive,
						isShown: !furn.isShown,
						color: furn.color,
						xMin: furn.xMin,
						xMax: furn.xMax,
						zMin: furn.zMin,
						zMax: furn.zMax,
					},
				]);
			}
		});
	};

	return (
		<>
			{bathroomFurn.map((furn, index) => {
				return (
					<Card
						boxShadow={'lg'}
						border={1}
						key={index}
					>
						<CardBody
							p={1.2}
							bgColor={'w.100'}
							_hover={{ bgColor: 'w.300' }}
							rounded={5}
							boxShadow='0px 0px 5px 3px rgba(134,149,166,0.1)'
							onClick={() => handleOnClick(index)}
							cursor={'pointer'}
						>
							<Image
								src={furn.img}
								w={'100%'}
								h={'67px'}
							/>
							<Text fontSize={'2xs'}>
								{furn.l} in × {furn.w} in
							</Text>
						</CardBody>
					</Card>
				);
			})}
		</>
	);
};

export default Bathroom;

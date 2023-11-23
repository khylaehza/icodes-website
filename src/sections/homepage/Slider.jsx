import Carousel from 'react-spring-3d-carousel';
import { useState, useEffect } from 'react';
import { config } from '@react-spring/web';
import { Flex } from '@chakra-ui/react';
export default function Slider(props) {
	const table = props.cards.map((element, index) => {
		return { ...element, onClick: () => setGoToSlide(index) };
	});

	const [offsetRadius, setOffsetRadius] = useState(10);
	const [showArrows, setShowArrows] = useState(false);
	const [goToSlide, setGoToSlide] = useState(null);
	const [cards] = useState(table);

	useEffect(() => {
		setOffsetRadius(props.offset);
		setShowArrows(props.showArrows);
	}, [props.offset, props.showArrows]);

	return (
		<Flex
			w={'850px'}
			alignContent={'center'}
			marginTop={-20}
		>
			<Carousel
				slides={cards}
				goToSlide={goToSlide}
				offsetRadius={offsetRadius}
				showNavigation={showArrows}
				animationConfig={config.gentle}
			/>
		</Flex>
	);
}

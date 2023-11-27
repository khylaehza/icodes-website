import { Flex, Fade, Box, Text, Heading, Button } from '@chakra-ui/react';
import { TopNav } from '../../sections/navigation';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { RadarGraph } from '../../utilities';
import { FindUnit } from '../../sections/dss';

const FinderResult = () => {
	const location = useLocation();

	const res = location.state?.val;

	let flrSize = res.questions;
	let largeSize = 0;
	let smallSize = 0;
	let lowFloor = 0;
	let highFloor = 0;
	let midFloor = 0;

	flrSize.filter((item) => {
		switch (item) {
			case 'larger':
				largeSize++;
				break;
			case 'lower':
				lowFloor++;
				break;
			case 'smaller':
				smallSize++;
				break;
			case 'higher':
				highFloor++;
				break;
			case 'medium':
				midFloor++;
				break;
		}
	});

	let flrPref = '';
	let sizePref = '';
	if (largeSize > smallSize) {
		sizePref = 'Large Rooms';
	} else {
		sizePref = 'Small Rooms';
	}

	if (lowFloor > highFloor) {
		flrPref = 'Low-Level Floors';
		if (lowFloor > midFloor) {
			flrPref = 'Low-Level Floors';
		} else {
			flrPref = 'Mid-Level Floors';
		}
	} else if (lowFloor < highFloor) {
		if (highFloor > midFloor) {
			flrPref = 'High-Level Floors';
		} else {
			flrPref = 'Mid-Level Floors';
		}
	} else {
		flrPref = 'Mid-Level Floors';
	}

	const points = {
		'Large Rooms': largeSize,
		'Small Rooms': smallSize,
		'Low-Level Floors': lowFloor,
		'Mid-Level Floors': midFloor,
		'High-Level Floors': highFloor,
	};
	const pref = [flrPref, sizePref];

	function retText(pref) {
		const textRef = [pref[0], pref[1]];

		if (
			textRef.includes('High-Level Floors') &&
			textRef.includes('Large Rooms')
		) {
			return 'Your preference is higher floors and large rooms, it suggests that you are someone who enjoys expansive living spaces and the elevated perspective that comes with living on higher floors. You may have a penchant for breathtaking views, a sense of privacy, and a desire to be above the hustle and bustle of the world below. Living on higher floors can offer a sense of tranquility and a feeling of being removed from the noise and commotion of the street. Additionally, your preference for large rooms indicates that you value ample space for various activities, such as entertaining guests, pursuing hobbies, or simply having room to spread out and relax.';
		} else if (
			textRef.includes('High-Level Floors') &&
			textRef.includes('Small Rooms')
		) {
			return 'Your preference is higher floors and small rooms, it suggests that you are someone who values a compact and elevated living experience. Living on higher floors allows you to enjoy a sense of privacy and detachment from the happening on the ground level. It offers a peaceful and secluded environment where you can retreat and find solace. Your preference for small rooms suggests that you prioritize simplicity, functionality, and efficiency in your living space. You may prefer to have a cozy and minimalistic environment that is easy to maintain and organize.';
		} else if (
			textRef.includes('Mid-Level Floors') &&
			textRef.includes('Large Rooms')
		) {
			return 'Your preference is middle floors and large rooms, it suggests that you are someone who enjoys a balance between elevation and spaciousness. middle floors offer a middle ground between higher and lower perspectives, providing you with a decent view without being too distant from the ground. Large rooms accommodate various activities and provide ample space for comfortable living.';
		} else if (
			textRef.includes('Mid-Level Floors') &&
			textRef.includes('Small Rooms')
		) {
			return 'Your preference is middle floors and small rooms, it suggests that you are someone who appreciates a balanced and efficient living space. middle floors offer a moderate perspective while small rooms ensure simplicity and functionality in your living environment. You value practicality and comfort without the need for excessive space.';
		} else if (
			textRef.includes('Low-Level Floors') &&
			textRef.includes('Large Rooms')
		) {
			return 'Your preference is lower floors and large rooms, it suggests that you are someone who finds comfort and enjoyment in spacious living environments closer to the ground. You may appreciate the feeling of being grounded and having a strong sense of stability. Additionally, living on lower floors can provide a sense of security and convenience, allowing easy access to the outdoors or amenities within the condo.';
		} else if (
			textRef.includes('Low-Level Floors') &&
			textRef.includes('Small Rooms')
		) {
			return 'Your preference is lower floors and small rooms, it suggests that you are someone who appreciates a cozy and intimate living environment. You may find comfort in smaller spaces that offer a sense of security and containment. Living on lower floors can provide a grounded feeling and a connection to the immediate surroundings. You may also value the convenience and ease of access that comes from being closer to the ground.';
		} else {
			return 'Unable to determine preferences based on the provided inputs.';
		}
	}

	const resultText = retText(pref);

	const [userPref, setUserPref] = useState(true);
	const [unitPref, setUnitPref] = useState(false);
	return (
		<Fade
			initialScale={0.9}
			in='true'
		>
			<Flex
				flexDir={'column'}
				height={'100vh'}
				bgColor={'w.200'}
			>
				<TopNav />
				<Flex
					w={'100%'}
					h={'100%'}
					flexDir={'column'}
					justifyContent={'center'}
					p={10}
				>
					<Flex
						flexDir={'column'}
						justifyContent={'center'}
						bgColor={'b.300'}
						p={2}
						rounded={10}
						boxShadow='0 4px 12px 0 rgba(134,149,166,0.5)'
					>
						<Flex
							flexDir={'column'}
							p={6}
							bgColor={'w.300'}
							rounded={10}
							h={'100%'}
							alignItems={'center'}
							gap={5}
							boxShadow='0 4px 12px 0 rgba(134,149,166,0.5)'
						>
							{userPref && !unitPref ? (
								<>
									<Flex
										flexDir={'column'}
										alignItems={'center'}
										gap={2}
										h={'100%'}
									>
										<Text
											fontSize={'lg'}
											fontWeight={'medium'}
										>
											Your unit preference is:{' '}
										</Text>
										<Heading
											fontSize={'2xl'}
											color={'b.300'}
										>
											{pref[0]} and {pref[1]}
										</Heading>
									</Flex>

									<Flex
										flexDir={'row'}
										w={'100%'}
										h={'100%'}
										justifyItems={'center'}
										alignContent={'center'}
										alignItems={'center'}
										justifyContent={'center'}
									>
										<Box
											w={'50%'}
											h={'100%'}
										>
											<RadarGraph points={points} />
										</Box>
										<Flex
											flexDir={'column'}
											w={'50%'}
											h={'100%'}
											p={10}
											justifyContent={'center'}
										>
											<Box textAlign={'justify'}>
												<Text
													lineHeight={2.2}
													color={'b.300'}
												>
													{resultText}
												</Text>
											</Box>
											<Flex
												justifyContent={'flex-end'}
												mt={5}
											>
												<Button
													onClick={() => {
														setUnitPref(true);
														setUserPref(false);
													}}
													variant={'solid'}
													bgColor={'b.300'}
													color={'w.300'}
													_hover={{
														bgColor: 'b.400',
													}}
													w={100}
												>
													Next
												</Button>
											</Flex>
										</Flex>
									</Flex>
								</>
							) : (
								<>
									<Flex
										flexDir={'column'}
										alignItems={'center'}
										gap={1}
										h={'100%'}
										justifyContent={'flex-start'}
									>
										<FindUnit
											pref={pref}
											res={res}
											setUnitPref={setUnitPref}
											setUserPref={setUserPref}
										/>
									</Flex>
								</>
							)}
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Fade>
	);
};

export default FinderResult;

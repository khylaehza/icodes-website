import { Flex, Heading, Text, Image } from '@chakra-ui/react';
import { Units, Tower } from '.';
const Hero = ({unitData,unitTypes}) => {

	if(unitData,unitTypes){

		return (
			<>
				<Flex
					flexDir={'column'}
					p={20}
					alignItems={'center'}
					justifyItems={'center'}
					gap={4}
				>
					<Heading
						size={'3xl'}
						color={'#FFF'}
					>
						Congressional Town Center
					</Heading>
					<Text
						size={'lg'}
						color={'#FFF'}
						fontSize={24}
					>
						Live a Life of Convenience
					</Text>
				</Flex>
				<Units unitData={unitData} unitTypes={unitTypes} />
	
				<Image
					objectFit={'cover'}
					w={'100vw'}
					src={'/imgs/bg/homepage-bg.png'}
					position={'absolute'}
					top={'-0px'}
					h={'100vh'}
					zIndex={-1}
				/>
			</>
		);
	}
	
};

export default Hero;

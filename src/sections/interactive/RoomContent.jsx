import {
	PopoverContent,
	PopoverBody,
	PopoverArrow,
	SimpleGrid,
} from '@chakra-ui/react';
const RoomContent = ({ furniture }) => {
	return (
		<PopoverContent
			flexDirection={'column'}
			height={'50vh'}
			ml={2}
			bgColor={'#FFFAF0'}
			boxShadow={'lg'}
			justifyContent={'center'}
		>
			<PopoverArrow />
			<PopoverBody
				p={5}
				overflowY={'auto'}
				sx={{
					'::-webkit-scrollbar': {
						display: 'none',
					},
				}}
			>
				<SimpleGrid
					spacing={3}
					templateColumns='repeat(auto-fill, minmax(65px, 1fr))'
					padding={2}
				>
					{furniture.component}
				</SimpleGrid>
			</PopoverBody>
		</PopoverContent>
	);
};

export default RoomContent;

import {
	Flex,
	Box,
	Text,
	Button,
	Popover,
	PopoverTrigger,
} from '@chakra-ui/react';
import RoomContent from './RoomContent';
import { RoomComponents } from '../../utilities';
const FurnitureChoices = () => {
	return (
		<Flex>
			<Flex
				flexDirection={'column'}
				justifyContent={'center'}
				position={'absolute'}
				top={'30vh'}
				left={5}
				zIndex={5}
			>
				<Flex
					flexDirection={'column'}
					padding={1}
					bgColor={'#FFFAF0'}
					borderRadius={5}
					boxShadow={'xl'}
				>
					{RoomComponents.map((furniture) => (
						<Popover
							isLazy
							key={furniture.name}
							placement={'right'}
						>
							<PopoverTrigger>
								<Button
									height={'65px'}
									padding={1}
									flexDirection={'column'}
									variant='outline'
									borderRadius={0}
									key={furniture.name}
									border={0}
									_hover={{ bgColor: '#EFDEC7' }}
								>
									<Box padding={1}>{furniture.icon}</Box>
									<Box>
										<Text fontSize={'x-small'}>
											{furniture.name}
										</Text>
									</Box>
								</Button>
							</PopoverTrigger>
							<RoomContent furniture={furniture} />
						</Popover>
					))}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default FurnitureChoices;

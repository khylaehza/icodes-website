import { CusModalClear } from '../../customs';
import {
	useDisclosure,
	Flex,
	Text,
	AspectRatio,
	IconButton,
} from '@chakra-ui/react';
import { FaInfoCircle } from 'react-icons/fa';

const Guide = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<CusModalClear
			button={
				<IconButton
					bgColor={'#373C4B'}
					color={'#FFFFFF'}
					icon={<FaInfoCircle />}
					position={'absolute'}
					top={20}
					right={5}
					mt={'26px'}
					rounded={2}
					size={'xs'}
					_hover={{ background: '#373C4B' }}
					onClick={onOpen}
				/>
			}
			isOpen={isOpen}
			onClose={onClose}
			header={'Interactive Guide'}
			body={
				<Flex
					flexDir={'column'}
					gap={5}
					w={'100%'}
				>
					<Text size={'sm'}>
						1. Explore the unit and its measurement by dragging it
						laterally and zooming it to get a closer or wider view.{' '}
					</Text>
					<AspectRatio ratio={2.3}>
						<iframe src='./vids/DraggingandZooming.mp4' />
					</AspectRatio>
					<Text size={'sm'}>
						2. Choose from the various furnitures and click it to
						add in the unit.
					</Text>
					<AspectRatio ratio={2.3}>
						<iframe src='./vids/ChoosingAddingFurniture.mp4' />
					</AspectRatio>
					<Text size={'sm'}>
						3. Place the unit by dragging it on the desired
						location.
					</Text>
					<AspectRatio ratio={2.3}>
						<iframe src='./vids/PlacingFurniture.mp4' />
					</AspectRatio>
					<Text size={'sm'}>
						4. Identify the unit's measurements, duplicate, delete,
						or change the colors and rotation, by double clicking
						the furniture.
					</Text>
					<AspectRatio ratio={2.3}>
						<iframe src='./vids/CustomizeFurniture.mp4' />
					</AspectRatio>
					<Text size={'sm'}>
						5. Download the image file of your unit design and
						measurements through the save button.
					</Text>
					<AspectRatio ratio={2}>
						<iframe src='./vids/DownloadDesignPDF.mp4' />
					</AspectRatio>
				</Flex>
			}
		/>
	);
};

export default Guide;

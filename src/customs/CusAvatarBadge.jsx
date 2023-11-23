import { Avatar, AvatarBadge, IconButton } from '@chakra-ui/react';

import { MdClose } from 'react-icons/md';

const CusAvatarBadge = ({ src, action }) => {
	return (
		<Avatar
			size='xl'
			src={src}
			border={'2px'}
			borderColor={'Highlight'}
		>
			<AvatarBadge
				as={IconButton}
				size='sm'
				rounded='full'
				top='-10px'
				colorScheme='red'
				aria-label='remove Image'
				icon={<MdClose />}
				onClick={action}
			/>
		</Avatar>
	);
};

export default CusAvatarBadge;

import '../styles/FileStyle.css';
import {
	FormControl,
	Flex,
	Center,
	FormLabel,
	Input,
	FormErrorMessage,
	Text,
	Box,
} from '@chakra-ui/react';
import { RxUpload } from 'react-icons/rx';

function CusUpload({
	onChange,
	fileName,
	name,
	id,
	onBlur,
	error,
	touch,
	isRequired,
	value,
	showImage,
	multiple = false,
}) {
	return (
		<FormControl
			isInvalid={error && touch}
			isRequired={isRequired}
			id={id}
		>
			<Box className='parent'>
				<Box
					className={
						(error == undefined && touch && showImage == null) ||
						(error && touch)
							? 'file-upload-error'
							: 'file-upload'
					}
				>
					<Center>
						<RxUpload />
					</Center>

					<FormLabel
						fontSize={'xs'}
						fontWeight={'medium'}
						textAlign={'center'}
					>
						{fileName}
					</FormLabel>
					<Text>Maximum file size is 10MB.</Text>
					<Input
						name={name}
						type='file'
						onChange={onChange}
						onBlur={onBlur}
						value={value}
						multiple={multiple}
					/>
				</Box>
			</Box>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
}

export default CusUpload;

import {
	FormControl,
	FormLabel,
	Input,
	Box,
	InputGroup,
	InputLeftAddon,
	InputRightAddon,
	FormErrorMessage,
	Textarea,
} from '@chakra-ui/react';

export function CusInputFloat({
	variant,
	placeholder = ' ',
	label,
	isRequired,
	type,
	onChange,
	onBlur,
	value,
	id,
	p,
	error,
	touch,
}) {
	return (
		<Box w={'100%'}>
			<FormControl
				variant={variant}
				id={id}
				isInvalid={error && touch}
				isRequired={isRequired}
			>
				<Input
					placeholder={placeholder}
					variant={'filled'}
					type={type}
					p={p}
					onChange={onChange}
					fontSize={'xs'}
					id={id}
					value={value}
					onBlur={onBlur}
				/>
				<FormLabel fontSize={'xs'}>{label}</FormLabel>
				<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
			</FormControl>
		</Box>
	);
}
export function CusInputRegular({
	placeholder = ' ',
	label,
	isRequired,
	isInvalid,
	type,
	onChange,
	id,
	p,
	value,
	onBlur,
	error,
	touch,
	variant = 'filled',
	name,
	disabled,
}) {
	return (
		<Box w={'100%'}>
			<FormControl
				variant={variant}
				id={id}
				isInvalid={error && touch}
				isRequired={isRequired}
			>
				<FormLabel fontSize={'xs'}>{label}</FormLabel>
				<Input
					name={name}
					placeholder={placeholder}
					variant={variant}
					type={type}
					p={p}
					onChange={onChange}
					fontSize={'xs'}
					value={value}
					onBlur={onBlur}
					disabled={disabled}
				/>

				<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
			</FormControl>
		</Box>
	);
}

export const CusInputLeftAdd = ({
	label,
	name,
	onChange,
	value,
	placeholder,
	type,
	error,
	onBlur,
	touch,
	add,

	isRequired,
	maxLength,
	disabled = false,
}) => {
	return (
		<FormControl
			isInvalid={error && touch}
			isRequired={isRequired}
		>
			<FormLabel fontSize={'xs'}>{label}</FormLabel>
			<InputGroup>
				<InputLeftAddon
					children={add}
					fontSize={'xs'}
				/>

				<Input
					name={name}
					variant={'outline'}
					onChange={onChange}
					onBlur={onBlur}
					value={value ? value : ''}
					placeholder={placeholder}
					fontSize={'xs'}
					type={type}
					bgColor={'w.300'}
					disabled={disabled}
					maxLength={maxLength}
				/>
			</InputGroup>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusInputRightAdd = ({
	label,
	name,
	onChange,
	value,
	placeholder,
	type,
	error,
	onBlur,
	touch,
	add,
	isRequired,
}) => {
	return (
		<FormControl
			isInvalid={error && touch}
			isRequired={isRequired}
		>
			<FormLabel fontSize={'xs'}>{label}</FormLabel>
			<InputGroup>
				<Input
					name={name}
					variant={'outline'}
					onChange={onChange}
					onBlur={onBlur}
					value={value}
					placeholder={placeholder}
					fontSize={'xs'}
					type={type}
					bgColor={'w.300'}
				/>
				<InputRightAddon
					children={add}
					fontSize={'xs'}
				/>
			</InputGroup>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusTextArea = ({
	placeholder = ' ',
	label,
	name,
	isRequired,
	onChange,
	value,
	onBlur,
	error,
	touch,
}) => {
	return (
		<FormControl
			isInvalid={error && touch}
			isRequired={isRequired}
		>
			<FormLabel fontSize={'xs'}>{label}</FormLabel>

			<Textarea
				name={name}
				variant={'outline'}
				onChange={onChange}
				onBlur={onBlur}
				value={value}
				placeholder={placeholder}
				fontSize={'xs'}
				bgColor={'w.300'}
				h={'55px'}
			/>

			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

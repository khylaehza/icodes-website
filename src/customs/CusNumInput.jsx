import {
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	FormControl,
	FormErrorMessage,
	FormLabel,
	InputGroup,
	InputLeftAddon,
} from '@chakra-ui/react';

export const CusNumInput = ({
	label,
	name,
	id,
	touch,
	onChange,
	onBlur,
	value,
	error,
	min,
	max,
	placeholder = 0,
	isRequired,
	disabled = false,
	type = 'number',
}) => {
	return (
		<FormControl
			isInvalid={error && touch}
			isRequired={isRequired}
		>
			<FormLabel
				w='100%'
				fontSize={'xs'}
			>
				{label}
			</FormLabel>

			<NumberInput
				min={0}
				onChange={onChange}
				value={value}
			>
				<NumberInputField
					name={name}
					variant={'filled'}
					bgColor={'#edf2f6'}
					fontSize={'xs'}
					id={id}
					placeholder={placeholder}
					onBlur={onBlur}
					min={min}
					max={max}
					disabled={disabled}
					type={type}
				/>
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>

			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusNumInputLeftAdd = ({
	label,
	name,
	onChange,
	value,
	error,
	onBlur,
	touch,
	add,
	isRequired,
	id,
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

				<NumberInput
					min={0}
					onChange={onChange}
					value={value}
					w={'100%'}
				>
					<NumberInputField
						name={name}
						variant={'outline'}
						fontSize={'xs'}
						id={id}
						placeholder={0}
						onBlur={onBlur}
						disabled={disabled}
					/>
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
			</InputGroup>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Select,
} from '@chakra-ui/react';
import { useData } from '../../DataContext';

export const CusSelectEmployees = ({
	label,
	name,
	onChange,
	value,
	error,
	onBlur,
	touch,
	isRequired,
}) => {
	return (
		<FormControl
			isInvalid={error && touch}
			isRequired={isRequired}
		>
			<FormLabel fontSize={'xs'}>{label}</FormLabel>

			<Select
				name={name}
				variant={'filled'}
				onChange={onChange}
				onBlur={onBlur}
				value={value ? value : 'Select'}
				fontSize={'xs'}
			>
				<option
					value='Select'
					disabled
				>
					Select
				</option>

				<option value='Admin'>Admin</option>
				<option value='Property Management'>Property Management</option>
				<option value='Front Desk'>Front Desk</option>
				<option value='Accounting Management'>
					Accounting Management
				</option>
				<option value='Sales Management'>Sales Management</option>
				<option value='Agent'>Agent</option>
			</Select>

			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusSelectUnTypes = ({
	label,
	name,
	onChange,
	value,
	error,
	onBlur,
	touch,
	isRequired,
}) => {
	let currentValue = value || 'Select';
	const { unitTypes } = useData();

	return (
		<FormControl
			isInvalid={error && touch}
			isRequired={isRequired}
		>
			<FormLabel fontSize={'xs'}>{label}</FormLabel>

			<Select
				name={name}
				variant={'outline'}
				bgColor={'w.300'}
				onChange={onChange}
				onBlur={onBlur}
				value={currentValue}
				fontSize={'xs'}
			>
				<option
					value='Select'
					disabled
				>
					Select
				</option>
				{unitTypes.map((item, key) => {
					return (
						<option
							key={key}
							value={item.TypeName + ' (' + item.TypeCode + ')'}
						>
							{item.TypeName + ' (' + item.TypeCode + ')'}
						</option>
					);
				})}
			</Select>

			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusSelectSize = ({
	label,
	name,
	onChange,
	value,
	error,
	onBlur,
	touch,
	isRequired,
}) => {
	let currentValue = value || 'Select';
	const { unitSize } = useData();
	return (
		<FormControl
			isInvalid={error && touch}
			isRequired={isRequired}
		>
			<FormLabel fontSize={'xs'}>{label}</FormLabel>

			<Select
				name={name}
				variant={'outline'}
				bgColor={'w.300'}
				onChange={onChange}
				onBlur={onBlur}
				value={currentValue}
				fontSize={'xs'}
			>
				<option
					value='Select'
					disabled
				>
					Select
				</option>
				{unitSize.map((item, key) => {
					return (
						<option
							key={key}
							value={item.Size}
						>
							{item.UnitSize + ' sq. meter'}
						</option>
					);
				})}
			</Select>

			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusSelectDscType = ({
	label,
	name,
	onChange,
	value,
	error,
	onBlur,
	touch,
	isRequired,
}) => {
	return (
		<FormControl
			isInvalid={error && touch}
			isRequired={isRequired}
		>
			<FormLabel fontSize={'xs'}>{label}</FormLabel>

			<Select
				name={name}
				variant={'filled'}
				onChange={onChange}
				onBlur={onBlur}
				value={value ? value : 'Select'}
				fontSize={'xs'}
			>
				<option
					value='Select'
					disabled
				>
					Select
				</option>

				<option value='Percent'>Percent</option>
				<option value='Amount'>Amount</option>
			</Select>

			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusSelectPayTerm = ({
	label,
	name,
	onChange,
	value,
	error,
	onBlur,
	touch,
	isRequired,
}) => {
	return (
		<FormControl
			isInvalid={error && touch}
			isRequired={isRequired}
		>
			<FormLabel fontSize={'xs'}>{label}</FormLabel>

			<Select
				name={name}
				variant={'filled'}
				onChange={onChange}
				onBlur={onBlur}
				value={value ? value : 'Select'}
				fontSize={'xs'}
			>
				<option
					value='Select'
					disabled
				>
					Select
				</option>

				<option value='Ready for Occupancy (RFO)'>
					Ready for Occupancy (RFO)
				</option>
				<option value='Pre-Selling'>Pre-Selling</option>
			</Select>

			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusSelectUnit = ({
	label,
	name,
	onChange,
	value,
	placeholder,
	error,
	onBlur,
	touch,
	isRequired,
}) => {
	const { units } = useData();

	const unitList = [];

	const length = Object.keys(units).length;

	for (let x = 0; x < length; x++) {
		const i = units[x];

		var sorted = Object.keys(i);
		sorted.sort();

		sorted.map((item, key) => {
			const element = i[item];

			if (Object.values(element).length != 0) {
				const k = Object.values(element);

				if (k) {
					k.sort(function (a, b) {
						var x = a.name.toLowerCase();
						var y = b.name.toLowerCase();
						return x < y ? -1 : x > y ? 1 : 0;
					});
				}

				k.map((e) => {
					if (e.status === 'Available') {
						unitList.push(e);
					}
				});
			}
		});
	}

	let currentValue = value || 'Select';
	return (
		<FormControl
			isInvalid={error && touch}
			isRequired={isRequired}
		>
			<FormLabel fontSize={'xs'}>{label}</FormLabel>

			<Select
				name={name}
				variant={'outline'}
				bgColor={'w.300'}
				onChange={onChange}
				onBlur={onBlur}
				value={currentValue}
				fontSize={'xs'}
				// defaultValue={'Select'}
			>
				<option
					value='Select'
					disabled
				>
					Select
				</option>
				{unitList.map((item, key) => {
					return (
						<option
							key={key}
							value={item.name}
						>
							{item.name}
						</option>
					);
				})}
			</Select>

			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusSelectTower = ({
	label,
	name,
	onChange,
	value,
	placeholder,
	error,
	onBlur,
	touch,
	variant = 'outline',
	bg,
	icon,
	bgColor = 'w.300',
	isRequired,
}) => {
	const { towers } = useData();

	var byName = towers.slice(0);

	if (byName) {
		byName.sort(function (a, b) {
			var x = a.TowerName.toLowerCase();
			var y = b.TowerName.toLowerCase();
			return x < y ? -1 : x > y ? 1 : 0;
		});
	}

	let currentValue = value || 'Select';
	return (
		<FormControl
			isInvalid={error && touch}
			isRequired={isRequired}
		>
			<FormLabel fontSize={'xs'}>{label}</FormLabel>

			<Select
				name={name}
				variant={variant}
				bgColor={bgColor}
				onChange={onChange}
				onBlur={onBlur}
				value={currentValue}
				fontSize={'xs'}
				icon={icon}
			>
				<option
					value='Select'
					disabled
				>
					Select
				</option>

				{byName.map((item, key) => {
					return (
						<option
							key={key}
							value={item.TowerName}
						>
							{item.TowerName}
						</option>
					);
				})}
			</Select>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};
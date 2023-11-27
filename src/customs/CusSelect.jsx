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
	disabled = false,
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
				disabled={disabled}
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
	disabled = false,
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
				disabled={disabled}
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
							value={item.UnitSize}
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
	disabled = false,
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
				disabled={disabled}
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
	error,
	onBlur,
	touch,
	isRequired,
	disabled = false,
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
					if (e.status === 'Reserved') {
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
				disabled={disabled}
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

export const CusSelectOccupiedUnit = ({
	label,
	name,
	onChange,
	value,
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
					if (e.status === 'Occupied') {
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
	error,
	onBlur,
	touch,
	variant = 'outline',
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
					if (item.Status == 'Ready for Occupancy') {
						return (
							<option
								key={key}
								value={item.TowerName}
							>
								{item.TowerName}
							</option>
						);
					}
				})}
			</Select>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusSelectTeams = ({
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

				<option value='Eagles'>Eagles</option>
				<option value='Soaring'>Soaring</option>
				<option value='Blazing'>Blazing</option>
			</Select>

			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusSelectLocation = ({
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

				<option value='Trinoma, Quezon City'>
					Trinoma, Quezon City
				</option>
				<option value='SM North, Quezon City'>
					SM North, Quezon City
				</option>
				<option value='Wilcon, Visayas Ave'>Wilcon, Visayas Ave</option>
				<option value='Showroom, Quezon City'>
					Showroom, Quezon City
				</option>
				<option value='EastWest Bank, Congressional Avenue'>
					EastWest Bank, Congressional Avenue
				</option>
			</Select>

			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusSelectPBuyers = ({
	label,
	name,
	onChange,
	value,
	error,
	onBlur,
	touch,
	variant = 'outline',
	icon,
	bgColor = 'w.300',
	isRequired,
}) => {
	const { buyers } = useData();

	var byName = buyers.slice(0);

	if (byName) {
		byName.sort(function (a, b) {
			var x = a.FName.toLowerCase();
			var y = b.FName.toLowerCase();
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
					if (item.Status == 'On Hold') {
						return (
							<option
								key={key}
								value={`${item.FName} ${item.LName}`}
							>
								{`${item.FName} ${item.LName}`}
							</option>
						);
					}
				})}
			</Select>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusSelectPreSellTerm = ({
	label,
	name,
	onChange,
	value,
	error,
	onBlur,
	touch,
	variant = 'outline',
	icon,
	bgColor = 'w.300',
	isRequired,
}) => {
	const { payterm } = useData();

	var type = payterm.slice(0);

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

				{type.map((item, key) => {
					if (item.PaymentTypeFor == 'Pre-Selling') {
						return (
							<option
								key={key}
								value={item.PaymentTermName}
							>
								{item.PaymentTermName}
							</option>
						);
					}
				})}
			</Select>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusSelectAnnouncement = ({
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

				<option value='Events'>Events</option>
				<option value='Maintenance'>Maintenance</option>

				<option value='News'>News</option>
				<option value='Others'>Others</option>
			</Select>

			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusMaintenanceItem = ({
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
				value={currentValue}
				fontSize={'xs'}
			>
				<option
					value='Select'
					disabled
				>
					Select
				</option>
				<option value='Fixtures'>Fixtures</option>
				<option value='Lavatories'>Lavatories</option>
				<option value='Structures'>Structures</option>
				<option value='Others'>Others</option>
			</Select>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusMaintenanceStatus = ({
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
				value={currentValue}
				fontSize={'xs'}
			>
				<option
					value='Select'
					disabled
				>
					Select
				</option>
				<option value='Pending'>Pending</option>
				<option value='Active'>Active</option>
				<option value='Completed'>Completed</option>
			</Select>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusSelectReservedOwner = ({
	label,
	name,
	onChange,
	value,
	error,
	onBlur,
	touch,
	variant = 'outline',
	icon,
	bgColor = 'w.300',
	isRequired,
}) => {
	const { buyers } = useData();

	var byName = buyers.slice(0);

	if (byName) {
		byName.sort(function (a, b) {
			var x = a.FName.toLowerCase();
			var y = b.FName.toLowerCase();
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
					if (item.Status == 'Reserved') {
						return (
							<option
								key={key}
								value={`${item.FName} ${item.LName}`}
							>
								{`${item.FName} ${item.LName}`}
							</option>
						);
					}
				})}
			</Select>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusSelectOccOwner = ({
	label,
	name,
	onChange,
	value,
	error,
	onBlur,
	touch,
	variant = 'outline',
	icon,
	bgColor = 'w.300',
	isRequired,
	owner,
	disabled,
}) => {
	const { unitOwners } = useData();

	var byName = unitOwners.slice(0);

	if (byName) {
		byName.sort(function (a, b) {
			var x = a.FName.toLowerCase();
			var y = b.FName.toLowerCase();
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
				disabled={disabled}
			>
				<option
					value='Select'
					disabled
				>
					Select
				</option>

				{byName.map((item, key) => {
					if (item.Status == 'Active' || item.Status) {
						return (
							<option
								key={key}
								value={`${item.FName} ${item.LName}`}
							>
								{`${item.FName} ${item.LName}`}
							</option>
						);
					}
				})}
			</Select>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusSelectTransactMonth = ({
	label,
	name,
	onChange,
	value,
	error,
	onBlur,
	touch,
	variant = 'outline',
	icon,
	bgColor = 'w.300',
	isRequired,
	disabled,
	choice,
}) => {
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
				disabled={disabled}
			>
				<option
					value='Select'
					disabled
				>
					Select
				</option>

				{choice.map((item, key) => {
					if (item.status != 'Paid') {
						return (
							<option
								key={key}
								value={item.month}
							>
								{item.month}
							</option>
						);
					}
				})}
			</Select>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusPaymentMode = ({
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
				value={currentValue}
				fontSize={'xs'}
			>
				<option
					value='Select'
					disabled
				>
					Select
				</option>
				<option value='Cash'>Cash</option>
				<option value='Check'>Check</option>
				<option value='Cash Deposit'>Cash Deposit</option>
				<option value='Others'>Others</option>
			</Select>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusBookingStatus = ({
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
				value={currentValue}
				fontSize={'xs'}
			>
				<option
					value='Select'
					disabled
				>
					Select
				</option>
				<option value='Pending'>Pending</option>
				<option value='Confirmed'>Confirmed</option>
				<option value='Completed'>Completed</option>
			</Select>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusSelectAmenities = ({
	label,
	name,
	onChange,
	value,
	placeholder,
	error,
	onBlur,
	touch,
	isRequired,
	tower,
	edit = false,
}) => {
	const { amenities } = useData();
	let currentValue = value || 'Select';

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
				value={currentValue}
				fontSize={'xs'}
				placeholder={'Select'}
			>
				{amenities.map((amenity) => {
					// if (amenity.TNum == tower) {
					return (
						<option
							key={amenity.AmenityID}
							value={amenity.AmenityName}
						>
							{amenity.AmenityName}
						</option>
					);
					// }
				})}
			</Select>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusSelectOnHoldUnit = ({
	label,
	name,
	onChange,
	value,
	error,
	onBlur,
	touch,
	isRequired,
	disabled = false,
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
					if (e.status === 'On Hold') {
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
				disabled={disabled}
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

export const CusSelectTowerToCal = ({
	label,
	name,
	onChange,
	value,
	error,
	onBlur,
	touch,
	variant = 'outline',
	icon,
	bgColor = 'w.300',
	isRequired,
}) => {
	const { unitValues } = useData();

	let towerMap = new Map();

	unitValues.forEach((item) => {
		const towerName = item.Tower
		if (!towerMap.has(towerName)) {
			towerMap.set(towerName, item.Tower);
		}
	});

	let uniqueTowers = Array.from(towerMap.values());

	//uniqueTowers.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

	let currentValue = value || 'Select';
	return (
		<FormControl isInvalid={error && touch} isRequired={isRequired}>
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
				<option value='Select' disabled>
					Select
				</option>

				{uniqueTowers.map((tower, key) => (
					<option key={key} value={tower}>
						{tower}
					</option>
				))}
			</Select>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusSelectTowerLoan = ({
	label,
	name,
	onChange,
	value,
	error,
	onBlur,
	touch,
	variant = 'outline',
	icon,
	bgColor = 'w.300',
	isRequired,
}) => {
	const { loans } = useData();

	let towerMap = new Map();

	loans.forEach((item) => {
		const towerName = item.Tower
		if (!towerMap.has(towerName)) {
			towerMap.set(towerName, item.Tower);
		}
	});

	let uniqueTowers = Array.from(towerMap.values());

	//uniqueTowers.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

	let currentValue = value || 'Select';
	return (
		<FormControl isInvalid={error && touch} isRequired={isRequired}>
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
				<option value='Select' disabled>
					Select
				</option>

				{uniqueTowers.map((tower, key) => (
					<option key={key} value={tower}>
						{tower}
					</option>
				))}
			</Select>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};
export const CusSelectPayterm = ({
	label,
	name,
	onChange,
	value,
	error,
	onBlur,
	touch,
	variant = 'outline',
	icon,
	bgColor = 'w.300',
	isRequired,
}) => {
	const { payterm } = useData();

	let paytermMap = new Map();

	payterm.forEach((item) => {
		const paytrm = item.PaymentTermName
		if (!paytermMap.has(paytrm)) {
			paytermMap.set(paytrm, item.PaymentTermName);
		}
	});

	let uniquePayTerm = Array.from(paytermMap.values());

	//uniqueTowers.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

	let currentValue = value || 'Select';
	return (
		<FormControl isInvalid={error && touch} isRequired={isRequired}>
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
				<option value='Select' disabled>
					Select
				</option>

				{uniquePayTerm.map((pt, key) => (
					<option key={key} value={pt}>
						{pt}
					</option>
				))}
			</Select>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusSelectYearsToCal = ({
	label,
	name,
	onChange,
	value,
	error,
	onBlur,
	touch,
	variant = 'outline',
	icon,
	bgColor = 'w.300',
	isRequired,
	tower
}) => {
	const { unitValues } = useData();

	if(unitValues && tower){
	const year = unitValues.filter((item) => item.Tower === tower).map(itm => itm.Years)
	let currentValue = value || 'Select';
	return (
		<FormControl isInvalid={error && touch} isRequired={isRequired}>
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
				<option value='Select' disabled>
					Select
				</option>

				{year.map((tower, key) => (
					<option key={key} value={tower}>
						{tower}
					</option>
				))}
			</Select>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
	}

	

	//uniqueTowers.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

	
};


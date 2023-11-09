import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useData } from '../../DataContext';
import { MultiSelect } from 'react-multi-select-component';

export const CusMultiSelectUnit = ({
	value,
	onChange,
	error,
	touch,
	label,
	onBlur,
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
		sorted.map((item) => {
			const element = i[item];

			if (Object.values(element).length != 0) {
				const k = Object.values(element);

				// if (k) {
				// 	k.sort(function (a, b) {
				// 		var x = a.name.toLowerCase();
				// 		var y = b.name.toLowerCase();
				// 		return x < y ? -1 : x > y ? 1 : 0;
				// 	});
				// }

				k.map((e) => {
					if (e.status === 'Pending Details') {
						unitList.push({ label: e.name, value: e.name });
					}
				});
			}
		});
	}

	return (
		<FormControl
			isInvalid={error && touch}
			fontSize={'xs'}
			isRequired={isRequired}
		>
			<FormLabel fontSize={'xs'}>{label}</FormLabel>

			<MultiSelect
				options={unitList}
				value={value}
				onChange={onChange}
				labelledBy='Select'
				onBlur={onBlur}
				className='multi-select'
				disabled={disabled}
			/>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusMultiSelectUnitAmt = ({
	value,
	onChange,
	error,
	touch,
	label,
	onBlur,
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
		sorted.map((item) => {
			const element = i[item];

			if (Object.values(element).length != 0) {
				const k = Object.values(element);

				// if (k) {
				// 	k.sort(function (a, b) {
				// 		var x = a.name.toLowerCase();
				// 		var y = b.name.toLowerCase();
				// 		return x < y ? -1 : x > y ? 1 : 0;
				// 	});
				// }

				k.map((e) => {
					if (e.status === 'Pending Amount') {
						unitList.push({ label: e.name, value: e.name });
					}
				});
			}
		});
	}

	return (
		<FormControl
			isInvalid={error && touch}
			fontSize={'xs'}
			isRequired={isRequired}
		>
			<FormLabel fontSize={'xs'}>{label}</FormLabel>

			<MultiSelect
				options={unitList}
				value={value}
				onChange={onChange}
				labelledBy='Select'
				onBlur={onBlur}
				className='multi-select'
				disabled={disabled}
			/>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusMultiSelectUnitAvail = ({
	value,
	onChange,
	error,
	touch,
	label,
	onBlur,
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
		sorted.map((item) => {
			const element = i[item];

			if (Object.values(element).length != 0) {
				const k = Object.values(element);

				// if (k) {
				// 	k.sort(function (a, b) {
				// 		var x = a.name.toLowerCase();
				// 		var y = b.name.toLowerCase();
				// 		return x < y ? -1 : x > y ? 1 : 0;
				// 	});
				// }

				k.map((e) => {
					if (e.status === 'Available') {
						unitList.push({ label: e.name, value: e.name });
					}
				});
			}
		});
	}

	return (
		<FormControl
			isInvalid={error && touch}
			fontSize={'xs'}
			isRequired={isRequired}
		>
			<FormLabel fontSize={'xs'}>{label}</FormLabel>

			<MultiSelect
				options={unitList}
				value={value}
				onChange={onChange}
				labelledBy='Select'
				onBlur={onBlur}
				className='multi-select'
				disabled={disabled}
			/>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusMultiSelectDiscount = ({
	value,
	onChange,
	error,
	touch,
	label,
	onBlur,
	isRequired,
	disabled = false,
}) => {
	const { discounts } = useData();

	const disc = [];
	discounts.map((dsc, key) => {
		disc.push({ label: dsc.DscName, value: dsc.DscName });
	});

	return (
		<FormControl
			isInvalid={error && touch}
			fontSize={'xs'}
			isRequired={isRequired}
		>
			<FormLabel fontSize={'xs'}>{label}</FormLabel>

			<MultiSelect
				options={disc}
				value={value}
				onChange={onChange}
				labelledBy='Select'
				onBlur={onBlur}
				className='multi-select'
				disabled={disabled}
			/>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

export const CusMultiSelectTower = ({
	value,
	onChange,
	error,
	touch,
	label,
	onBlur,
	name,
}) => {
	const { towers } = useData();

	const towerList = [];

	var twrSort = towers.slice(0);
	twrSort.sort(function (a, b) {
		var x = a.TowerName.toLowerCase();
		var y = b.TowerName.toLowerCase();
		return x < y ? -1 : x > y ? 1 : 0;
	});

	twrSort.map((e) => {
		towerList.push({ label: e.TowerName, value: e.TowerName });
	});

	return (
		<FormControl
			isInvalid={error && touch}
			fontSize={'xs'}
		>
			<FormLabel fontSize={'xs'}>{label}</FormLabel>

			<MultiSelect
				options={towerList}
				value={value}
				onChange={onChange}
				labelledBy='Select'
				onBlur={onBlur}
			/>
			<FormErrorMessage fontSize={'xs'}>{error}</FormErrorMessage>
		</FormControl>
	);
};

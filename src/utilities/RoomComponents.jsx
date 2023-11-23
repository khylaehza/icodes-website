import { FaToilet, FaCouch } from 'react-icons/fa';
import { IoBed } from 'react-icons/io5';
import { MdKitchen, MdTableBar } from 'react-icons/md';

import {
	Kitchen,
	LivingRoom,
	Bedroom,
	Bathroom,
	DiningRoom,
} from '../components';
export const RoomComponents = [
	{
		name: 'Living Room',
		icon: (
			<FaCouch
				size={30}
				style={{ fill: 'gray' }}
			/>
		),
		component: <LivingRoom />,
	},
	{
		name: 'Kitchen',
		icon: (
			<MdKitchen
				size={30}
				style={{ fill: 'gray' }}
			/>
		),
		component: <Kitchen />,
	},
	{
		name: 'Dining Room',
		icon: (
			<MdTableBar
				size={30}
				style={{ fill: 'gray' }}
			/>
		),
		component: <DiningRoom />,
	},

	{
		name: 'Bedroom',
		icon: (
			<IoBed
				size={30}
				style={{ fill: 'gray' }}
			/>
		),
		component: <Bedroom />,
	},
	{
		name: 'Bathroom',
		icon: (
			<FaToilet
				size={30}
				style={{ fill: 'gray' }}
			/>
		),
		component: <Bathroom />,
	},
];

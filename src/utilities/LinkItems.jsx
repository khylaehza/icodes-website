import { RiBuilding2Fill } from 'react-icons/ri';
import { MdSpaceDashboard } from 'react-icons/md';
import {
	FaUserTie,
	FaSwimmer,
	FaHouseUser,
	FaMoneyBill,
	FaList,
	FaExchangeAlt,
} from 'react-icons/fa';
import { HiOfficeBuilding } from 'react-icons/hi';
import { AiFillCalculator, AiOutlineSchedule } from 'react-icons/ai';
import { BsMegaphoneFill, BsPersonLinesFill } from 'react-icons/bs';
import { FiTool } from 'react-icons/fi';
import { BsFilePerson, BsFillBookmarkPlusFill } from 'react-icons/bs';
import { RiBillLine } from 'react-icons/ri';
import { IoIosPerson } from 'react-icons/io';
import { ImStatsBars } from 'react-icons/im';
import { RxActivityLog } from 'react-icons/rx';
import { VscFeedback } from 'react-icons/vsc';

export const ad = [
	{ name: 'Home', icon: MdSpaceDashboard, nav: '/adHome' },
	{ name: 'Employees', icon: FaUserTie, nav: '/employees' },
	{ name: 'Towers', icon: RiBuilding2Fill, nav: '/towers' },
	{ name: 'Unit Types', icon: HiOfficeBuilding, nav: '/unitTypes' },
	{ name: 'Unit Amounts', icon: FaMoneyBill, nav: '/amounts' },
	{ name: 'Unit Owners', icon: FaHouseUser, nav: '/unitOwners' },
	{ name: 'Amenities', icon: FaSwimmer, nav: '/amenities' },
	{ name: 'Computations', icon: AiFillCalculator, nav: '/computations' },
	{ name: 'Audit Logs', icon: RxActivityLog, nav: '/logs' },
	{
		name: 'Reports & Feedback',
		icon: VscFeedback,
		nav: '/reports',
	},
];
export const fd = [
	{ name: 'Home', icon: MdSpaceDashboard, nav: '/fdHome' },
	{ name: 'Unit Owner List', icon: FaList, nav: '/ownerlist' },
	{ name: 'Visitors', icon: BsFilePerson, nav: '/visitors' },
	{
		name: 'Booking Amenities',
		icon: BsFillBookmarkPlusFill,
		nav: '/bookings',
	},
];
export const pm = [
	{ name: 'Home', icon: MdSpaceDashboard, nav: '/PmHome' },
	{ name: 'Announcement', icon: BsMegaphoneFill, nav: '/announcements' },
	{ name: 'Maintenance Request', icon: FiTool, nav: '/maintenance' },
];

export const am = [
	{ name: 'Home', icon: MdSpaceDashboard, nav: '/AmHome' },
	{ name: 'Statement of Accounts', icon: RiBillLine, nav: '/soa' },
	{ name: 'Transaction List', icon: FaExchangeAlt, nav: '/transactionList' },
	{ name: 'Unit Amount', icon: FaMoneyBill, nav: '/condoAmount' },
];

export const sm = [
	{ name: 'Home', icon: MdSpaceDashboard, nav: '/SmHome' },
	{ name: 'Agents', icon: IoIosPerson, nav: '/agents' },
	{ name: 'Prospective Buyers', icon: BsPersonLinesFill, nav: '/pbuyers' },
	// { name: 'Boosting Reports', icon: GiUpgrade, nav: '/boostreports' },
	{
		name: 'Manning Schedule',
		icon: AiOutlineSchedule,
		nav: '/manningSched',
	},
	// { name: 'Reports', icon: ImStatsBars, nav: '/reports' },
];

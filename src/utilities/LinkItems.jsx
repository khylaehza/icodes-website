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
	{ name: 'Home', icon: MdSpaceDashboard, nav: '/admin' },
	{ name: 'Employees', icon: FaUserTie, nav: '/admin/employees' },
	{ name: 'Towers', icon: RiBuilding2Fill, nav: '/admin/towers' },
	{ name: 'Unit Types', icon: HiOfficeBuilding, nav: '/admin/unitTypes' },
	{ name: 'Unit Amounts', icon: FaMoneyBill, nav: '/admin/amounts' },
	{ name: 'Unit Owners', icon: FaHouseUser, nav: '/admin/unitOwners' },
	{ name: 'Amenities', icon: FaSwimmer, nav: '/admin/amenities' },
	{ name: 'Computations', icon: AiFillCalculator, nav: '/admin/computations' },
	{ name: 'Audit Logs', icon: RxActivityLog, nav: '/admin/logs' },
	{
		name: 'Reports & Feedback',
		icon: VscFeedback,
		nav: '/admin/reports',
	},
];
export const fd = [
	{ name: 'Home', icon: MdSpaceDashboard, nav: '/frontdesk' },
	{ name: 'Unit Owner List', icon: FaList, nav: '/frontdesk/viewUnitOwner' },
	{ name: 'Visitors', icon: BsFilePerson, nav: '/frontdesk/visitors' },
	{
		name: 'Booking Amenities',
		icon: BsFillBookmarkPlusFill,
		nav: '/frontdesk/bookings',
	},
];
export const pm = [
	{ name: 'Home', icon: MdSpaceDashboard, nav: '/pm' },
	{ name: 'Announcement', icon: BsMegaphoneFill, nav: '/pm/announcements' },
	{ name: 'Maintenance Request', icon: FiTool, nav: '/pm/maintenance' },
];

export const am = [
	{ name: 'Home', icon: MdSpaceDashboard, nav: '/am' },
	{ name: 'Statement of Accounts', icon: RiBillLine, nav: '/am/soa' },
	{ name: 'Transactions', icon: FaExchangeAlt, nav: '/am/transactions' },
	{ name: 'Unit Amounts', icon: FaMoneyBill, nav: '/am/viewAmounts' },
];

export const sm = [
	{ name: 'Home', icon: MdSpaceDashboard, nav: '/sm' },
	{ name: 'Agents', icon: IoIosPerson, nav: '/sm/agents' },
	{ name: 'Prospective Buyers', icon: BsPersonLinesFill, nav: '/sm/pbuyers' },
	// { name: 'Boosting Reports', icon: GiUpgrade, nav: '/sm/boostreports' },
	{
		name: 'Manning Schedule',
		icon: AiOutlineSchedule,
		nav: '/sm/manningSched',
	},
	// { name: 'Reports', icon: ImStatsBars, nav: '/sm/reports' },
];

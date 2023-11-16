import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
	PrivateRoutes,
	AdminRoutes,
	FrontDeskRoutes,
	PropertyManagementRoutes, 
	AccountingManagementRoutes,
	SalesManagementRoutes 
} from './PrivateRoutes';
import { DataProvider } from '../../DataContext';
// start
import { LoginPage, ForgotPassPage,HomePage } from '../pages/start';
//maintenance
import {
	AdHome,
	Employees,
	Towers,
	UnitTypes,
	Amounts,
	UnitOwners,
	Amenities,
	Computations,
	AuditLogs,
	Reports,
	SmHome,
	Agents,
	ProspectiveBuyers,
	ManningSchedule,
	AmHome,
	StatementOfAccounts,
	PmHome,
	Announcements,
	MRequest,
	Transactions,
	FdHome,
	Visitors,
	ViewAmounts,
	ViewUnitOwner,
	BookAmenities,
} from '../pages/maintenance';
import NotFoundPage from './NotFoundPage';


const RoutesNav = () => {
	return (
		<Router>
			<DataProvider>
				<Routes>
					<Route element={<PrivateRoutes />}>
						{/* admin */}
						<Route element={<AdminRoutes/>}>
							<Route
								exact
								path={'/admin/employees'}
								element={<Employees />}
							/>
							<Route
								exact
								path={'/admin'}
								element={<AdHome />}
							/>
							<Route
								exact
								path={'/admin/towers'}
								element={<Towers />}
							/>
							<Route
								exact
								path={'/admin/unitTypes'}
								element={<UnitTypes />}
							/>
							<Route
								exact
								path={'/admin/amounts'}
								element={<Amounts />}
							/>
							<Route
								exact
								path={'/admin/unitOwners'}
								element={<UnitOwners />}
							/>
							<Route
								exact
								path={'/admin/amenities'}
								element={<Amenities />}
							/>
							<Route
								exact
								path={'/admin/computations'}
								element={<Computations />}
							/>
							<Route
								exact
								path={'/admin/logs'}
								element={<AuditLogs />}
							/>
							<Route
								exact
								path={'/admin/reports'}
								element={<Reports />}
							/>
						</Route>
						{/* salesmanagement */}
						<Route element={<SalesManagementRoutes/>}>
							<Route
								exact
								path={'/sm'}
								element={<SmHome />}
							/>
							<Route
								exact
								path={'/sm/agents'}
								element={<Agents />}
							/>
							<Route
								exact
								path={'/sm/pbuyers'}
								element={<ProspectiveBuyers />}
							/>
							<Route
								exact
								path={'/sm/manningSched'}
								element={<ManningSchedule />}
							/>
						</Route>
						{/* accountmanagement */}
						<Route element={<AccountingManagementRoutes/>}>
							<Route
								exact
								path={'/am'}
								element={<AmHome />}
							/>

							<Route
								exact
								path={'/am/soa'}
								element={<StatementOfAccounts />}
							/>
							<Route
								exact
								path={'/am/transactions'}
								element={<Transactions />}
							/>
							<Route
								exact
								path={'/am/viewAmounts'}
								element={<ViewAmounts />}
							/>
						</Route>
						{/* propertymanagement */}
						<Route element={<PropertyManagementRoutes/>}>
							<Route
								exact
								path={'/pm'}
								element={<PmHome />}
							/>
							<Route
								exact
								path={'/pm/announcements'}
								element={<Announcements />}
							/>

							<Route
								exact
								path={'/pm/maintenance'}
								element={<MRequest />}
							/>
						</Route>
						{/* frontdesk */}
						<Route element={<FrontDeskRoutes/>}>
							<Route
								exact
								path={'/frontdesk'}
								element={<FdHome />}
							/>
							<Route
								exact
								path={'/frontdesk/visitors'}
								element={<Visitors />}
							/>
							<Route
								exact
								path={'/frontdesk/viewUnitOwner'}
								element={<ViewUnitOwner />}
							/>
							<Route
								exact
								path={'/frontdesk/bookings'}
								element={<BookAmenities />}
							/>
						</Route>
					</Route>

					<Route
						exact
						path={'/'}
						element={<HomePage/>}
					/>

					<Route
						exact
						path={'/login'}
						element={<LoginPage />}
					/>

					<Route
						exact
						path={'/forgotpass'}
						element={<ForgotPassPage />}
					/>
					<Route
						exact
						path={'/forgotpass'}
						element={<ForgotPassPage />}
					/>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</DataProvider>
		</Router>
	);
};

export default RoutesNav;

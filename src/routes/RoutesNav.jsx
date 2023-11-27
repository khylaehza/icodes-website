import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
	PrivateRoutes,
	AdminRoutes,
	FrontDeskRoutes,
	PropertyManagementRoutes,
	AccountingManagementRoutes,
	SalesManagementRoutes,
} from './PrivateRoutes';
import { DataProvider } from '../../DataContext';
import { FurnitureProvider } from '../../FurnitureContext';
// start
import {
	LoginPage,
	ForgotPassPage,
	InteractiveGuide,
	DesignerPage,
	HomePage,
	UnitCanvasPage,
	CalculatorPage
} from '../pages/';
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
import { FinderHome } from '../pages/finder';
import NotFoundPage from './NotFoundPage';

const RoutesNav = () => {
	return (
		<Router>
			<DataProvider>
				<FurnitureProvider>
					<Routes>
						<Route element={<PrivateRoutes />}>
							{/* admin */}
							<Route element={<AdminRoutes />}>
								<Route
									exact
									path={'/ad/employees'}
									element={<Employees />}
								/>
								<Route
									exact
									path={'/ad'}
									element={<AdHome />}
								/>
								<Route
									exact
									path={'/ad/towers'}
									element={<Towers />}
								/>
								<Route
									exact
									path={'/ad/unitTypes'}
									element={<UnitTypes />}
								/>
								<Route
									exact
									path={'/ad/amounts'}
									element={<Amounts />}
								/>
								<Route
									exact
									path={'/ad/unitOwners'}
									element={<UnitOwners />}
								/>
								<Route
									exact
									path={'/ad/amenities'}
									element={<Amenities />}
								/>
								<Route
									exact
									path={'/ad/computations'}
									element={<Computations />}
								/>
								<Route
									exact
									path={'/ad/logs'}
									element={<AuditLogs />}
								/>
								<Route
									exact
									path={'/ad/reports'}
									element={<Reports />}
								/>
							</Route>
							{/* salesmanagement */}
							<Route element={<SalesManagementRoutes />}>
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
							<Route element={<AccountingManagementRoutes />}>
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
							<Route element={<PropertyManagementRoutes />}>
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
							<Route element={<FrontDeskRoutes />}>
								<Route
									exact
									path={'/fd'}
									element={<FdHome />}
								/>
								<Route
									exact
									path={'/fd/visitors'}
									element={<Visitors />}
								/>
								<Route
									exact
									path={'/fd/viewUnitOwner'}
									element={<ViewUnitOwner />}
								/>
								<Route
									exact
									path={'/fd/bookings'}
									element={<BookAmenities />}
								/>
							</Route>
						</Route>
						<Route
							exact
							path={'/'}
							element={<HomePage />}
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
							path={'/designer'}
							element={<DesignerPage />}
						/>
						<Route
							exact
							path={'/unitcanvas'}
							element={<UnitCanvasPage />}
						/>
						<Route
							exact
							path={'/finder'}
							element={<FinderHome />}
						/>
						<Route
							exact
							path={'/calculator'}
							element={<CalculatorPage />}
						/>
						<Route
							path='*'
							element={<NotFoundPage />}
						/>
					</Routes>
				</FurnitureProvider>
			</DataProvider>
		</Router>
	);
};

export default RoutesNav;

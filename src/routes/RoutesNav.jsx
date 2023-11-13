import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import { DataProvider } from '../../DataContext';
// start
import { LoginPage, ForgotPassPage } from '../pages/start';
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
	Visitors
} from '../pages/maintenance';

const RoutesNav = () => {
	return (
		<Router>
			<DataProvider>
				<Routes>
					<Route element={<PrivateRoutes />}>
						<Route
							exact
							path={'/employees'}
							element={<Employees />}
						/>
						<Route
							exact
							path={'/adHome'}
							element={<AdHome />}
						/>
						<Route
							exact
							path={'/towers'}
							element={<Towers />}
						/>
						<Route
							exact
							path={'/unitTypes'}
							element={<UnitTypes />}
						/>
						<Route
							exact
							path={'/amounts'}
							element={<Amounts />}
						/>
						<Route
							exact
							path={'/unitOwners'}
							element={<UnitOwners />}
						/>
						<Route
							exact
							path={'/amenities'}
							element={<Amenities />}
						/>
						<Route
							exact
							path={'/computations'}
							element={<Computations />}
						/>
						<Route
							exact
							path={'/logs'}
							element={<AuditLogs />}
						/>
						<Route
							exact
							path={'/reports'}
							element={<Reports />}
						/>
						<Route
							exact
							path={'/smHome'}
							element={<SmHome />}
						/>
						<Route
							exact
							path={'/agents'}
							element={<Agents />}
						/>
						<Route
							exact
							path={'/pbuyers'}
							element={<ProspectiveBuyers />}
						/>
						<Route
							exact
							path={'/manningSched'}
							element={<ManningSchedule />}
						/>
						<Route
							exact
							path={'/amHome'}
							element={<AmHome />}
						/>

						<Route
							exact
							path={'/soa'}
							element={<StatementOfAccounts />}
						/>
						<Route
							exact
							path={'/pmHome'}
							element={<PmHome />}
						/>
						<Route
							exact
							path={'/announcements'}
							element={<Announcements />}
						/>

						<Route
							exact
							path={'/maintenance'}
							element={<MRequest />}
						/>
						<Route
							exact
							path={'/transactions'}
							element={<Transactions />}
						/>
						<Route
							exact
							path={'/fdHome'}
							element={<FdHome />}
						/>
						<Route
							exact
							path={'/visitors'}
							element={<Visitors />}
						/>
					</Route>

					<Route
						exact
						path={'/'}
						element={<LoginPage />}
					/>

					<Route
						exact
						path={'/forgotpass'}
						element={<ForgotPassPage />}
					/>
				</Routes>
			</DataProvider>
		</Router>
	);
};

export default RoutesNav;

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
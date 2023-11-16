import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useData } from '../../DataContext';

const PrivateRoutes = () => {
	const { curUser } = useData();
	const location = useLocation();

	return curUser.length == 0 ? (
		<Navigate to={'/login'} />
	) : (
		innerPrivate(curUser)
	);
};

const innerPrivate = (curUser) => {
	switch (curUser.EmpPos) {
		case 'Admin':
			return AdminRoutes();
		case 'Front Desk':
			return FrontDeskRoutes();
		case 'Property Management':
			return PropertyManagementRoutes();
		case 'Accounting Management':
			return AccountingManagementRoutes();
		case 'Sales Management':
			return SalesManagementRoutes();
		default:
	}
};

const AdminRoutes = () => {
	const { curUser } = useData();
	const location = useLocation();
	if (curUser.EmpPos === 'Admin' && location.pathname.startsWith('/ad')) {
		return <Outlet />;
	} else {
		return <Navigate to={'/ad'} />;
	}
};

const FrontDeskRoutes = () => {
	const { curUser } = useData();
	const location = useLocation();
	if (
		curUser.EmpPos === 'Front Desk' &&
		location.pathname.startsWith('/fd')
	) {
		return <Outlet />;
	} else {
		return <Navigate to={'/fd'} />;
	}
};

const PropertyManagementRoutes = () => {
	const { curUser } = useData();
	const location = useLocation();
	if (
		curUser.EmpPos === 'Property Management' &&
		location.pathname.startsWith('/pm')
	) {
		return <Outlet />;
	} else {
		return <Navigate to={'/pm'} />;
	}
};

const AccountingManagementRoutes = () => {
	const { curUser } = useData();
	const location = useLocation();
	if (
		curUser.EmpPos === 'Accounting Management' &&
		location.pathname.startsWith('/am')
	) {
		return <Outlet />;
	} else {
		return <Navigate to={'/am'} />;
	}
};

const SalesManagementRoutes = () => {
	const { curUser } = useData();
	const location = useLocation();
	if (
		curUser.EmpPos === 'Sales Management' &&
		location.pathname.startsWith('/sm')
	) {
		return <Outlet />;
	} else {
		return <Navigate to={'/sm'} />;
	}
};

export {
	PrivateRoutes,
	AdminRoutes,
	FrontDeskRoutes,
	PropertyManagementRoutes,
	AccountingManagementRoutes,
	SalesManagementRoutes,
};

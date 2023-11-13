import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useData } from '../../DataContext';

const PrivateRoutes = () => {
	const { curUser } = useData();
	const location = useLocation();

	return curUser.length == 0 ? <Navigate to={'/'} /> : <Outlet />;
};

export default PrivateRoutes;

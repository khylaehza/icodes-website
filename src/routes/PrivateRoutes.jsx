import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useData } from '../../DataContext';

const PrivateRoutes = () => {
	const { curUser } = useData();
	const location = useLocation();

	return curUser.length == 0 ? (
		<Navigate to={'/'} />
	) : (
		<Outlet /> // change mo ung outlet to //InnerRoutes()
	);
};

// const InnerRoutes = () => {
// switch (curUser.uname)
// case 'AD': return AdminRoutes
// case 'FD': return FDRoutes

//}

// const AdminRoutes = () => {return <Outlet/>}

//const FDRoutes = () = {return <Outlet/>}

export default PrivateRoutes;

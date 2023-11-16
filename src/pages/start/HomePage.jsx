import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';

const Homepage = () => {
	const storedData = localStorage.getItem('user');

	if (storedData) {
		// this happen when nag close ang user ng tab ng hindi nag llogout, or nag add ng tab ng hindi nag llogout
		console.log('may current user');
		const jsonData = JSON.parse(storedData);
		switch (jsonData.EmpPos) {
			case 'Admin':
				return <Navigate to={'/admin'} />;
			case 'Front Desk':
				return <Navigate to={'/frontdesk'} />;
			case 'Property Management':
				return <Navigate to={'/pm'} />;
			case 'Accounting Management':
				return <Navigate to={'/am'} />;
			case 'Sales Management':
				return <Navigate to={'/sm'} />;
			default:
				localStorage.clear();
		}
	} else {
		console.log('walang current user');
		return (
			<Flex>
				<Text>Homepage</Text>
			</Flex>
		); //dito yung content
	}
};

export default Homepage;

import React from 'react';
import { Flex, Fade } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { TopNav } from '../../sections/navigation';
import { Hero, Tower, Contact, Amenities } from '../../sections/homepage';
import { useData } from '../../../DataContext';

const Homepage = () => {
	const storedData = localStorage.getItem('user');
	const {towers,unitTypes,unitData} = useData();

	if (storedData) {
		// this happen when nag close ang user ng tab ng hindi nag llogout, or nag add ng tab ng hindi nag llogout

		const jsonData = JSON.parse(storedData);

		switch (jsonData.EmpPos) {
			case 'Admin':
				return <Navigate to={'/ad'} />;
			case 'Front Desk':
				return <Navigate to={'/fd'} />;
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

		if(towers,unitData,unitTypes){
			const NewTowers = [...towers]
			const NewUnitData = [ ...unitData]
			const NewUnitTypes = [ ...unitTypes]
			return (
				<Fade
					initialScale={0.9}
					in='true'
				>
					<>
						<Flex
							flexDir={'column'}
							height={'100vh'}
							alignItems={'center'}
							justifyItems={'center'}
						>
							<TopNav />
							<Hero unitData={NewUnitData} unitTypes={NewUnitTypes} />
						</Flex>
						<Flex h={'100%'}>
							<Tower towers={NewTowers}/>
						</Flex>
						<Flex h={'100%'}>
							<Amenities />
						</Flex>
						<Flex h={'100%'}>
							<Contact />
						</Flex>
					</>
				</Fade>
			);
		}
		
	}
};

export default Homepage;

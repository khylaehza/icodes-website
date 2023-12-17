import React from 'react';
import { Flex, Fade, Spinner, Box, AbsoluteCenter } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { TopNav } from '../../sections/navigation';
import { Hero, Tower, Contact, Amenities } from '../../sections/homepage';
import { useData } from '../../../DataContext';
const Homepage = () => {
	const storedData = localStorage.getItem('user');
	const { towers, amenities, unitData, loading } = useData();
	const jsonData = JSON.parse(storedData);

	if (loading) {
		return (
			<Box
				position='relative'
				h='100vh'
			>
				<AbsoluteCenter
					axis='both'
					alignItems={'center'}
					justifyItems={'center'}
				>
					<Spinner
						thickness='4px'
						speed='0.65s'
						emptyColor='gray.200'
						color='blue.400'
						size='xl'
						display={'flex'}
					/>
				</AbsoluteCenter>
			</Box>
		);
	} else {
		if (jsonData.length == 0) {
			if (towers && amenities && unitData) {
				if (
					towers.length > 0 &&
					amenities.length > 0 &&
					unitData.length > 0
				) {
					return (
						<Fade
							initialScale={0.9}
							in='true'
						>
							<Flex
								flexDir={'column'}
								height={'100vh'}
								alignItems={'center'}
								justifyItems={'center'}
							>
								<TopNav />
								<Hero unitData={unitData} />
							</Flex>
							<Flex h={'100%'}>
								<Tower towers={towers} />
							</Flex>
							<Flex h={'100%'}>
								<Amenities amenities={amenities} />
							</Flex>
							<Flex h={'100%'}>
								<Contact />
							</Flex>
						</Fade>
					);
				} else {
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
									<Hero />
								</Flex>
								<Flex h={'100%'}>
									<Tower />
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
		} else {
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
		}
	}
};

export default Homepage;

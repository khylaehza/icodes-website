import { useContext, useState, useEffect, createContext } from 'react';
import { useToast, Spinner, AbsoluteCenter, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { db } from './firebase-config';
import { collection, query, onSnapshot } from 'firebase/firestore';

const DataContext = createContext();

export function useData() {
	return useContext(DataContext);
}

export function DataProvider({ children }) {
	const toast = useToast();

	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const [employees, setEmployees] = useState([{}]);
	useEffect(() => {
		const q = query(
			collection(db, 'maintenance', 'admin', 'tbl_employees')
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const employees = [];
			querySnapshot.forEach(
				(doc) => {
					employees.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setEmployees(employees);
		});
		return () => unsubscribe();
	}, []);

	const [savedUser] = useState(localStorage.getItem('user'));
	const [curUser, setCurUser] = useState(
		savedUser ? JSON.parse(savedUser) : []
	);

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(curUser));
	}, [curUser]);

	const login = async (username, password) => {
		setLoading(true);

		var hasMatch =
			employees.filter((data) => {
				return username == data.UName;
			}).length > 0;

		if (!hasMatch) {
			toast({
				title: 'Account does not exist!',
				status: 'error',
				isClosable: true,
				position: 'top',
				duration: 3000,
			});
		}

		employees.map((data, id) => {
			if (
				username === data.UName &&
				password === data.Password &&
				data.Status === false
			) {
				toast({
					title: 'Account is currently disabled.',
					status: 'error',
					isClosable: true,
					position: 'top',
					duration: 3000,
				});
			} else {
				if (
					username === data.UName &&
					password === data.Password &&
					data.Status === true
				) {
					setCurUser(data);
					if (username.includes('AD')) {
						navigate('adHome');
					} else if (username.includes('SM')) {
						navigate('/smHome');
					} else if (username.includes('AM')) {
						navigate('/amHome');
					} else if (username.includes('FD')) {
						navigate('/FDHome');
					} else if (username.includes('PM')) navigate('/pmHome');
					// } else if (username.includes('AM')) {
					// 	navigate('/AMHome');
					// } else if (username.includes('SM')) {
					// 	navigate('/SMHome');
					// }
				} else if (
					username === data.UName &&
					password != data.Password
				) {
					toast({
						title: 'Invalid Password.',
						status: 'error',
						isClosable: true,
						position: 'top',
						duration: 3000,
					});
				}
			}
		});

		setLoading(false);
	};

	const logout = () => {
		localStorage.clear();
		navigate('/login');
	};

	const [towers, setTowers] = useState([{}]);
	useEffect(() => {
		const q = query(collection(db, 'maintenance', 'admin', 'tbl_towers'));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const towers = [];
			querySnapshot.forEach(
				(doc) => {
					towers.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setTowers(towers);
		});
		return () => unsubscribe();
	}, []);

	const [unitTypes, setUnitTypes] = useState([{}]);
	useEffect(() => {
		const q = query(
			collection(db, 'maintenance', 'admin', 'tbl_unitTypes')
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const unTypes = [];
			querySnapshot.forEach(
				(doc) => {
					unTypes.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setUnitTypes(unTypes);
		});
		return () => unsubscribe();
	}, []);

	const [unitSize, setUnitSize] = useState([{}]);
	useEffect(() => {
		const q = query(collection(db, 'maintenance', 'admin', 'tbl_unitSize'));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const unSize = [];
			querySnapshot.forEach(
				(doc) => {
					unSize.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setUnitSize(unSize);
		});
		return () => unsubscribe();
	}, []);

	const [units, setUnits] = useState([{}]);
	const [unitTowerID, setUnitTowerID] = useState([{}]);
	useEffect(() => {
		const q = query(collection(db, 'maintenance', 'admin', 'tbl_towers'));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const unit = [];
			const unitTID = [];
			querySnapshot.forEach(
				(doc) => {
					unit.push({ ...doc.data().Units });
					unitTID.push({ ...doc.data().Units, id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setUnits(unit);
			setUnitTowerID(unitTID);
		});
		return () => unsubscribe();
	}, []);

	const [unitData, setUnitData] = useState([{}]);
	useEffect(() => {
		const q = query(collection(db, 'maintenance', 'admin', 'tbl_setUnit'));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const unt = [];

			querySnapshot.forEach(
				(doc) => {
					unt.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);

			setUnitData(unt);
		});
		return () => unsubscribe();
	}, []);

	const [amounts, setAmounts] = useState([{}]);
	useEffect(() => {
		const q = query(
			collection(db, 'maintenance', 'admin', 'tbl_setAmount')
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const amt = [];

			querySnapshot.forEach(
				(doc) => {
					amt.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);

			setAmounts(amt);
		});
		return () => unsubscribe();
	}, []);

	const [discounts, setDiscounts] = useState([{}]);
	useEffect(() => {
		const q = query(
			collection(db, 'maintenance', 'admin', 'tbl_discounts')
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const discounts = [];
			querySnapshot.forEach(
				(doc) => {
					discounts.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setDiscounts(discounts);
		});
		return () => unsubscribe();
	}, []);

	const [payterm, setPayterm] = useState([{}]);
	useEffect(() => {
		const q = query(collection(db, 'maintenance', 'admin', 'tbl_payTerms'));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const payterm = [];
			querySnapshot.forEach(
				(doc) => {
					payterm.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setPayterm(payterm);
		});
		return () => unsubscribe();
	}, []);

	const [unitOwners, setUnitOwners] = useState([{}]);
	useEffect(() => {
		const q = query(
			collection(db, 'maintenance', 'admin', 'tbl_unitOwners')
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const uo = [];

			querySnapshot.forEach(
				(doc) => {
					uo.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);

			setUnitOwners(uo);
		});
		return () => unsubscribe();
	}, []);

	const [amenities, setAmenities] = useState([{}]);
	useEffect(() => {
		const q = query(
			collection(db, 'maintenance', 'admin', 'tbl_amenities')
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const amenities = [];
			querySnapshot.forEach(
				(doc) => {
					amenities.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setAmenities(amenities);
		});
		return () => unsubscribe();
	}, []);

	const [unitValues, setUnitValues] = useState([{}]);
	useEffect(() => {
		const q = query(
			collection(db, 'maintenance', 'admin', 'tbl_unitValues')
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const unitValues = [];
			querySnapshot.forEach(
				(doc) => {
					unitValues.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setUnitValues(unitValues);
		});
		return () => unsubscribe();
	}, []);

	const [loans, setLoans] = useState([{}]);
	useEffect(() => {
		const q = query(collection(db, 'maintenance', 'admin', 'tbl_loans'));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const loans = [];
			querySnapshot.forEach(
				(doc) => {
					loans.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setLoans(loans);
		});
		return () => unsubscribe();
	}, []);

	const [logs, setLogs] = useState([{}]);
	useEffect(() => {
		const q = query(collection(db, 'maintenance', 'admin', 'tbl_logs'));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const log = [];
			querySnapshot.forEach(
				(doc) => {
					log.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setLogs(log);
		});
		return () => unsubscribe();
	}, []);

	const [reports, setReports] = useState([{}]);
	useEffect(() => {
		const q = query(collection(db, 'maintenance', 'admin', 'tbl_reports'));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const report = [];

			querySnapshot.forEach(
				(doc) => {
					report.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setReports(report);
		});
		return () => unsubscribe();
	}, []);

	const [manningSched, setManningSched] = useState([{}]);
	useEffect(() => {
		const q = query(
			collection(
				db,
				'maintenance',
				'salesmanagement',
				'tbl_manningSchedule'
			)
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const schedule = [];
			querySnapshot.forEach(
				(doc) => {
					schedule.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setManningSched(schedule);
		});
		return () => unsubscribe();
	}, []);

	const [buyers, setBuyers] = useState([{}]);
	useEffect(() => {
		const q = query(
			collection(db, 'maintenance', 'salesmanagement', 'tbl_prosBuyers')
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const buyers = [];
			querySnapshot.forEach(
				(doc) => {
					buyers.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setBuyers(buyers);
		});
		return () => unsubscribe();
	}, []);

	const [soa, setSOA] = useState([{}]);
	useEffect(() => {
		const q = query(
			collection(db, 'maintenance', 'accountingmanagement', 'tbl_soa')
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const soa = [];
			querySnapshot.forEach(
				(doc) => {
					soa.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setSOA(soa);
		});
		return () => unsubscribe();
	}, []);

	const [anncmnts, setAnncmnts] = useState([{}]);
	useEffect(() => {
		const q = query(
			collection(
				db,
				'maintenance',
				'propertymanagement',
				'tbl_announcements'
			)
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const anncmnts = [];
			querySnapshot.forEach(
				(doc) => {
					anncmnts.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setAnncmnts(anncmnts);
		});
		return () => unsubscribe();
	}, []);

	const [mrequest, setMRequest] = useState([{}]);
	useEffect(() => {
		const q = query(
			collection(
				db,
				'maintenance',
				'propertymanagement',
				'tbl_maintenance'
			)
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const mrequest = [];
			querySnapshot.forEach(
				(doc) => {
					mrequest.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setMRequest(mrequest);
		});
		return () => unsubscribe();
	}, []);

	const [transactions, setTransactions] = useState([{}]);
	useEffect(() => {
		const q = query(
			collection(
				db,
				'maintenance',
				'accountingmanagement',
				'tbl_transactions'
			)
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const transactions = [];
			querySnapshot.forEach(
				(doc) => {
					transactions.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);
			setTransactions(transactions);
		});
		return () => unsubscribe();
	}, []);

	const [visitors, setVisitors] = useState([{}]);
	useEffect(() => {
		const q = query(
			collection(db, 'maintenance', 'frontdesk', 'tbl_visitors')
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const visitors = [];
			querySnapshot.forEach(
				(doc) => {
					visitors.push({ ...doc.data(), id: doc.id });
				},
				(error) => {
					console.log(error);
				}
			);

			setVisitors(visitors);
		});
		return () => unsubscribe();
	}, []);
	const value = {
		logout,
		login,
		curUser,
		employees,
		setLoading,
		towers,
		unitTypes,
		unitSize,
		units,
		unitTowerID,
		unitData,
		amounts,
		discounts,
		payterm,
		unitOwners,
		amenities,
		unitValues,
		loans,
		logs,
		reports,
		buyers,
		manningSched,
		soa,
		anncmnts,
		mrequest,
		transactions,
		visitors,
	};

	return (
		<DataContext.Provider value={value}>
			{loading ? (
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
			) : (
				children
			)}
		</DataContext.Provider>
	);
}

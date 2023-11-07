import CusAlert from './CusAlert';
import { IconButton, useDisclosure, useToast } from '@chakra-ui/react';
import { BsFillTrashFill } from 'react-icons/bs';
import { getStorage, ref, deleteObject, listAll } from 'firebase/storage';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

const CusDeleteUnits = ({
	id,
	label,
	mainCollection,
	tblDocUser,
	tblUserCol,
	stor,
	data,
	units,
	unitTowerID,
}) => {
	const storage = getStorage();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const onDeleteClick = async () => {
		const storageRef = ref(storage, stor);

		try {
			UpdateUnit();

			await deleteDoc(
				doc(db, mainCollection, tblDocUser, tblUserCol, id)
			);

			listAll(storageRef)
				.then((res) => {
					res.items.forEach((itemRef) => {
						deleteObject(itemRef)
							.then(() => {})
							.catch((error) => {
								console.log(error);
							});
					});
				})
				.catch((error) => {
					console.log(error);
				});

			onClose();
			toast({
				title: `${label}'s Details Deleted!`,
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const UpdateUnit = () => {
		function TowerIdentifier(towers) {
			const towerLength = Object.keys(unitTowerID).length;
			let id;

			for (let y = 0; y < towerLength; y++) {
				const e = unitTowerID[y];

				Object.keys(e).map(function (k) {
					const nest = e[k];

					Object.keys(nest).map((x) => {
						if (nest[x].tower === towers) {
							id = e.id;
						}
					});
				});
			}
			return id;
		}

		data.Units.map((e) => {
			const tower = e.substring(0, 2);

			const length = Object.keys(units).length;

			for (let x = 0; x < length; x++) {
				const i = units[x];

				var sorted = Object.keys(i);

				sorted.map((item, key) => {
					const element = i[item];

					if (Object.values(element).length != 0) {
						const k = Object.values(element);

						k.map((x) => {
							if (x.name === e) {
								const collectionRef = doc(
									db,
									'maintenance',
									'admin',
									'tbl_towers',
									`${TowerIdentifier(tower)}`
								);
								let status = {};

								status[`Units.${x.floor}.${x.no}.status`] =
									'Available';

								updateDoc(collectionRef, status);
							}
						});
					}
				});
			}
		});
	};

	return (
		<CusAlert
			button={
				<IconButton
					onClick={onOpen}
					colorScheme='red'
					variant='outline'
					icon={<BsFillTrashFill />}
					aria-label='Delete'
				/>
			}
			header={`Delete ${label}?`}
			body={`Are you sure? You can't undo this action afterwards.`}
			action={onDeleteClick}
			actionLabel={'Delete'}
			isOpen={isOpen}
			onClose={onClose}
		/>
	);
};

export default CusDeleteUnits;

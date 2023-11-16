import { CusModal } from '../../../customs';
import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { IdGenerator, OrdinalSuffix } from '../../../utilities';
import { useData } from '../../../../DataContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { StatementOfAccForm } from '../../../forms';
import { db } from '../../../../firebase-config';
import {
	collection,
	serverTimestamp,
	addDoc,
	updateDoc,
	doc,
} from 'firebase/firestore';
import { useState } from 'react';
import moment from 'moment';
const AddStatementOfAcc = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { curUser, buyers, units, payterm, amounts, discounts, unitTowerID } =
		useData();
	const [buyer, setBuyer] = useState();
	const [pTermName, setPayTermName] = useState();
	const [discs, setDiscounts] = useState([]);
	const toast = useToast();
	const soaID = IdGenerator(6);

	const t = [];
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
						if (!t.includes(towers)) {
							t.push(towers);
						}
					}
				});
			});
		}
		return id;
	}

	const filteredBuyer = buyers.filter((buy) => {
		if (buy.Status == 'On Hold') {
			const name = `${buy.FName} ${buy.LName}`;
			return name == buyer ? buy : '';
		}
	});

	let u = [];
	const length = Object.keys(units).length;

	for (let x = 0; x < length; x++) {
		const i = units[x];

		var sorted = Object.keys(i);

		sorted.map((item, key) => {
			const element = i[item];

			if (Object.values(element).length != 0) {
				const k = Object.values(element);

				if (k) {
					k.sort(function (a, b) {
						var x = a.name.toLowerCase();
						var y = b.name.toLowerCase();
						return x < y ? -1 : x > y ? 1 : 0;
					});
				}

				k.map((e) => {
					u.push(e);
				});
			}
		});
	}

	const filteredUnit = u.filter((i) => {
		if (filteredBuyer[0]) {
			if (i.name == filteredBuyer[0].Units.toString()) {
				return i;
			}
		}
	});

	const filteredAmount = amounts.filter((amt) => {
		if (amt.Units && filteredUnit[0]) {
			return amt.Units.includes(filteredUnit[0].name);
		}
	});

	const filteredPayTerm = payterm.filter((term) => {
		return term.PaymentTermName == pTermName ? term : '';
	});

	const acqDisc = [];
	discs.map((e) => {
		acqDisc.push(e.value);
	});

	const filteredDiscounts = discounts.filter((dsc) => {
		if (dsc.DscName && acqDisc) {
			return acqDisc.includes(dsc.DscName);
		}
	});

	let computedDisc = [];
	let amtDisc = [];
	filteredDiscounts.map((filDisc) => {
		const tcp = filteredAmount[0]
			? parseFloat(filteredAmount[0].TCP.replace(/,/g, ''))
			: 0;
		if (filDisc.DscType == 'Percent') {
			const discVal = filDisc.Discount / 100;
			const compute = tcp * discVal;
			computedDisc.push({ name: filDisc.DscName, amount: compute });
			amtDisc.push(compute);
		} else if (filDisc.DscType == 'Amount') {
			computedDisc.push({
				name: filDisc.DscName,
				amount: parseFloat(filDisc.Discount.replace(/,/g, '')),
			});
			amtDisc.push(parseFloat(filDisc.Discount.replace(/,/g, '')));
		}
	});
	const totalDisc = amtDisc.reduce((x, y) => x + y, 0);
	const vatConvert = filteredAmount[0] ? filteredAmount[0].Vat / 100 : 0;
	const form = useFormik({
		initialValues: {
			pbName: filteredBuyer[0]
				? `${filteredBuyer[0].FName} ${filteredBuyer[0].MName} ${filteredBuyer[0].LName}`
				: '',
			unit: filteredUnit[0] ? filteredUnit[0].name : '',
			tcp: filteredUnit[0] ? filteredUnit[0].tcp : '',
			unitSize: filteredUnit[0] ? filteredUnit[0].typeSize : '',
			typeName: filteredUnit[0] ? filteredUnit[0].typeName : '',
			discount: '',
			vat: filteredAmount[0] ? filteredAmount[0].Vat : '',
			payterm: filteredBuyer[0] ? filteredBuyer[0].PaymentTypeFor : '',
			paytermName: filteredPayTerm[0]
				? filteredPayTerm[0].PaymentTermName
				: '',
			reservationFee: filteredPayTerm[0]
				? filteredPayTerm[0].ReservationFee
				: '',
			monthlyPercent: filteredPayTerm[0]
				? filteredPayTerm[0].MonthlyPercent
				: '',
			noOfMonths: filteredPayTerm[0] ? filteredPayTerm[0].NoOfMonths : '',
			moveInFees: filteredPayTerm[0] ? filteredPayTerm[0].MoveInFees : '',
			dpPercent: filteredPayTerm[0] ? filteredPayTerm[0].DPPercent : '',
			otherChargePercent: filteredPayTerm[0]
				? filteredPayTerm[0].OtherChargePercent
				: '',
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			pbName: Yup.string().required(
				"Prospective Buyer's name is required."
			),
			unit: Yup.string().required('Unit is required.'),
			unitSize: Yup.string().required('Unit size is required.'),
			typeName: Yup.string().required('Unit type is required.'),
			tcp: Yup.string().required('Amount is required.'),
		}),
		onSubmit: async (value, actions) => {
			const tcpLessDisc =
				parseFloat(value.tcp.replace(/,/g, '')) - totalDisc;

			const computeVat = tcpLessDisc * vatConvert;
			const totalTCP = computeVat + tcpLessDisc;
			const totalPayInMon =
				parseFloat(value.monthlyPercent / 100) * totalTCP -
				parseFloat(value.reservationFee.replace(/,/g, ''));

			const perWithOthers =
				parseFloat(value.monthlyPercent / 100) *
				((parseFloat(value.otherChargePercent) / 100) * totalTCP);
			const total =
				parseFloat(totalPayInMon) / Number(value.noOfMonths) +
				parseFloat(perWithOthers) / Number(value.noOfMonths);
			try {
				let table = {};
				let count = 1;

				while (count <= Number(value.noOfMonths)) {
					var currentDate = moment();
					var futureMonth = moment(currentDate).add(count, 'M');
					var futureMonthEnd = moment(futureMonth).endOf('month');

					if (
						currentDate.date() != futureMonth.date() &&
						futureMonth.isSame(futureMonthEnd.format('YYYY-MM-DD'))
					) {
						futureMonth = futureMonth.add(count, 'd');
					}

					table[count] = {
						num: OrdinalSuffix(count),
						month: futureMonth.format('DD-MMM-YYYY'),
						unit: `₱${new Intl.NumberFormat('en-US', {
							maximumFractionDigits: 2,
							minimumFractionDigits: 2,
						}).format(totalPayInMon / Number(value.noOfMonths))}`,
						others: `₱${new Intl.NumberFormat('en-US', {
							maximumFractionDigits: 2,
							minimumFractionDigits: 2,
						}).format(perWithOthers / Number(value.noOfMonths))}`,
						total: `₱${new Intl.NumberFormat('en-US', {
							maximumFractionDigits: 2,
							minimumFractionDigits: 2,
						}).format(total)}`,
					};
					count++;
				}

				await addDoc(
					collection(
						db,
						'maintenance',
						'accountingmanagement',
						'tbl_soa'
					),
					{
						CreatedDate: serverTimestamp(),
						FullName: filteredBuyer[0]
							? `${
									filteredBuyer[0].FName
							  } ${filteredBuyer[0].MName.charAt(
									0
							  ).toUpperCase()} ${filteredBuyer[0].LName}`
							: '',
						FName: filteredBuyer[0]
							? `${filteredBuyer[0].FName}`
							: '',
						MName: filteredBuyer[0]
							? `${filteredBuyer[0].MName}`
							: '',
						LName: filteredBuyer[0]
							? `${filteredBuyer[0].LName}`
							: '',
						BuyersId: filteredBuyer[0]
							? filteredBuyer[0].BuyersID
							: '',
						Tower: filteredUnit[0]
							? filteredUnit[0].tower.charAt(1)
							: '',
						UnitNo: filteredUnit[0] ? filteredUnit[0].no : '',
						Floor: filteredUnit[0] ? filteredUnit[0].floor : '',
						Unit: value.unit,
						UnitSize: value.unitSize,
						TypeName: value.typeName,
						Amount: value.tcp,
						Discounts: computedDisc,
						Vat: value.vat,
						ComputedVat: computeVat,
						PaymentTypeFor: value.payterm,
						PaymentTermName: value.paytermName,
						ReservationFee: value.reservationFee,
						DPPercent: value.dpPercent,
						MonthlyPercent: value.monthlyPercent,
						NoOfMonths: value.noOfMonths,
						MoveInFees: value.moveInFees,
						OtherChargePercent: value.otherChargePercent,
						TotalDiscount: totalDisc,
						SOAID: soaID,
						Status: true,
						TotalTCP: totalTCP,
						TotalCharge:
							(parseFloat(value.otherChargePercent) / 100) *
							totalTCP,
						PerWithTCP:
							parseFloat(value.monthlyPercent / 100) * totalTCP,
						PercentUnitMonth:
							parseFloat(value.monthlyPercent / 100) * totalTCP,
						TotalPayInMon: totalPayInMon,
						PerWithOthers: perWithOthers,
						SOA: table,
					}
				);

				if (filteredUnit[0]) {
					const tower = filteredUnit[0].name.substring(0, 2);

					const length = Object.keys(units).length;
					for (let x = 0; x < length; x++) {
						const i = units[x];

						var sorted = Object.keys(i);

						sorted.map((item) => {
							const element = i[item];

							if (Object.values(element).length != 0) {
								const k = Object.values(element);

								k.map((x) => {
									if (x.name === filteredUnit[0].name) {
										const collectionRef = doc(
											db,
											'maintenance',
											'admin',
											'tbl_towers',
											`${TowerIdentifier(tower)}`
										);
										let status = {};

										status[
											`Units.${x.floor}.${x.no}.status`
										] = 'Reserved';

										updateDoc(collectionRef, status);
									}
								});
							}
						});
					}

					const docRef = doc(
						db,
						'maintenance',
						'salesmanagement',
						'tbl_prosBuyers',
						filteredBuyer[0].id
					);
					updateDoc(docRef, {
						EditedDate: serverTimestamp(),
						Status: 'Reserved',
					});
				}

				if (curUser) {
					await addDoc(
						collection(db, 'maintenance', 'admin', 'tbl_logs'),
						{
							CreatedDate: serverTimestamp(),
							Msg: `${curUser.EmpPos} ${curUser.FName} ${curUser.LName} (${curUser.EmpId}) added a new soa.`,
							Module: 'Statement of Accounts',
						}
					);
				}

				toast({
					title: 'New SOA Added!',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			} catch (e) {
				toast({
					title: 'Error adding new SOA',
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
				console.log(e);
			}

			actions.resetForm();
			onClose();
		},
	});

	const onCloseModal = () => {
		onClose();
		form.resetForm();
		setBuyer();
		setPayTermName();
		setDiscounts([]);
	};

	return (
		<Flex>
			<CusModal
				header={`Fill the SOA details.`}
				component={
					<StatementOfAccForm
						form={form}
						setBuyer={setBuyer}
						disabled={true}
						setPayTermName={setPayTermName}
						setDiscounts={setDiscounts}
						discounts={discs}
					/>
				}
				action={`+ Add SOA`}
				isOpen={isOpen}
				onClose={onCloseModal}
				onOpen={onOpen}
				justifyContent={'flex-start'}
				form={form}
			/>
		</Flex>
	);
};

export default AddStatementOfAcc;

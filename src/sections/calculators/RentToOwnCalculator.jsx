import React,{useState} from "react";
import { Box, Button,Text } from "@chakra-ui/react";
import { useData } from "../../../DataContext";
import { CusSelectPayterm, CusNumInputLeftAdd } from "../../customs";
import { useFormik } from "formik";

const RenToOwnCalculator = () =>{
    const [pyterm, setPayterm] = useState('');
    const [displayresult, setDisplayResult] = useState({
        value: '',
        months: ''
    });

    const { payterm } = useData();

    let ReservationFee = payterm.filter( item => item.PaymentTermName === pyterm).map(itm=>itm.ReservationFee)
    const form = useFormik({
        initialValues:{
            totaltcp: '',
            payterm: '',
            reservationfee: '',

        }, onSubmit:(value, action) => {

            const numMonth = payterm.filter( item => item.PaymentTermName === value.payterm).map(itm=>itm.NoOfMonths)
            const monthlyP = payterm.filter( item => item.PaymentTermName === value.payterm).map(itm=>itm.MonthlyPercent)
            const monthlyPercent = monthlyP /100
            const number_of_months = parseInt(numMonth)
          
            const formattedTotalTCP = parseInt(value.totaltcp).toFixed(2);
            const updatedValues = { ...value, totaltcp: formattedTotalTCP };
            const total_tcp = Number(value.totaltcp.replace(/,/g, ''))
            const resevationInt = parseInt(ReservationFee[0].replace(/,/g, ''))

            const v = (monthlyPercent * total_tcp) / number_of_months
            const result = resevationInt - v


            const formattedResult = result.toLocaleString('en-US', {
                style: 'currency',
                currency: 'PHP' 
            });

            setDisplayResult({
                ...displayresult,
                value: formattedResult,
                months: number_of_months
            })
            console.log(result)
        }
    })

    return(
        <>
            <Box 
                display={'flex'}
                flexDir={'column'}
                bgColor={'w.300'} 
                boxShadow='0 4px 10px 0 rgba(134,149,166,0.3)'
                borderRadius={15} 
                alignItems={'center'}
                w={'100%'}
                p={5}
                gap={3}
            >
                <Box  display={'flex'} flexDir={{xl: 'row', sm: 'column'}} w={{xl: '80%', sm: '80%'}} gap={3}>

                    <CusNumInputLeftAdd
                        name='totaltcp'
                        id={'totaltcp'} 
                        label={'Total TCP'}
                        add={'₱'}
                        placeholder={'0'}
                        value={form.values.totaltcp}
                        onChange={(e) => {
                            let parts = e.split('.');
                            let v = parts[0].replace(/\D/g, '');
                            let dec = parts[1];
                            Number(dec !== undefined ? v + '.' + dec : v);
                            let n = new Intl.NumberFormat('en-US').format(
                                v
                            );
                            n = dec !== undefined ? n + '.' + dec : n;
                            form.setFieldValue('totaltcp', n);
                        }}
                        onBlur={form.handleBlur}
                        error={form.errors.totaltcp}
                        touch={form.touched.totaltcp}
                    />
        
                    <CusSelectPayterm
                        label={'Payment Term Name'}
                        name='payterm'
                        id='payterm'
                        placeholder={'Select Payment Term'}
                        onChange={(e)=>{
                            const value = e.target.value;
                            form.setFieldValue('payterm', value);
                            setPayterm(value)
                        }}
                        onBlur={form.handleBlur}
                        value={form.values.payterm}
                        error={form.errors.payterm}
                        touch={form.touched.payterm}
                    />
                    
                    <CusNumInputLeftAdd
                        label={'Reservation Fee'}
                        id={'reservationfee'}
                        name={'reservationfee'}
                        add={'₱'}
                        placeholder={'0'}
                        onBlur={form.handleBlur}
                        onChange={(e)=>{
                            form.setFieldValue('reservationfee', e);
                        }}
                        value={ReservationFee? ReservationFee : ''}
                        error={form.errors.payterm}
                        touch={form.touched.payterm}
                        disabled={true}
                    />
                       
                </Box>

                <Button onClick={form.handleSubmit}>Calculate</Button>
            </Box>
            {displayresult.value? (<Text>Your estimated monthly payment for rent-to-own-unit is {displayresult.value} for ({displayresult.months} months)  </Text>):('')}
        </>
    )
}
export default RenToOwnCalculator
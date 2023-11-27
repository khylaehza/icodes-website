import React,{useState} from "react";
import { Box, Button,Text } from "@chakra-ui/react";
import { useData } from "../../../DataContext";
import { CusSelectTowerToCal, CusSelectYearsToCal, CusNumInputLeftAdd } from "../../customs";
import { useFormik } from "formik";

const UnitValueCalculator = () =>{
    const [tower, setTower] = useState('');
    const [displayresult, setDisplayResult] = useState({
        value: '',
        year: ''
    });
    const { unitValues } = useData();
    const form = useFormik({
        initialValues:{
            tower:'',
            years: '',
            totaltcp: '',
        }, onSubmit:(value,actions)=>{
            const get_increase = unitValues.filter(item => item.Years === value.years).map(itm => itm.Increase)

            const formattedTotalTCP = parseFloat(value.totaltcp).toFixed(2);
            const updatedValues = { ...value, totaltcp: formattedTotalTCP };
            const total_tcp = Number(value.totaltcp.replace(/,/g, ''))

            const increase = get_increase / 100
            const result  = total_tcp * increase

            const formattedResult = result.toLocaleString('en-US', {
                style: 'currency',
                currency: 'PHP' 
            });


            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const yearsAsInt = parseInt(value.years);
            const year = currentYear + yearsAsInt

            setDisplayResult({
                ...displayresult,
                value: formattedResult,
                year: year
            })
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
                <Box display={'flex'} flexDir={{xl: 'row', sm: 'column'}} w={tower ? '80%' : '50%'} gap={3}>
                    <CusSelectTowerToCal
                        label={'Tower'}
                        name='tower'
                        id='tower'
                        placeholder={'Select Tower'}
                        onChange={(e) => {
                            const value = e.target.value;
                            form.setFieldValue('tower', value);
                            setTower(value)
                        }}
                        onBlur={form.handleBlur}
                        value={form.values.tower}
                        error={form.errors.tower}
                        touch={form.touched.tower}
                    />
                    {tower?(
                        <CusSelectYearsToCal 
                            label={'No. of Years'}
                            name='years'
                            id={'years'}
                            value={form.values.years}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.errors.years}
                            touch={form.touched.years}
                            tower={tower}
                        />
                    ):('')}
    
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

                </Box>
                <Button onClick={form.handleSubmit}>Calculate</Button>
             
            </Box>

            {displayresult.value? (<Text>Your estimated unit value on {displayresult.year} is {displayresult.value} </Text>):('')}
        </>
    )
}
export default UnitValueCalculator
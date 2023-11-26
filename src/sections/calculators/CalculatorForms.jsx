import React from "react";
import { VStack,Text } from "@chakra-ui/react";
import { UnitValueCalculator,LoanPaymentCalucalator,RentToOwnCalculator }from './index'

const CalculatorForms = () =>{
    return(
        <VStack spacing={3} alignSelf={'center'} w={'60%'} p={5}>
            <Text alignSelf={'self-start'}>
                Calculate your unit value
            </Text>
            <UnitValueCalculator/>

            <Text alignSelf={'self-start'}>
                Calculate your loan payment
            </Text>
            <LoanPaymentCalucalator/>
            <Text alignSelf={'self-start'}>
                Calculate your rent to own payment
            </Text>
            <RentToOwnCalculator/>
        </VStack>
    )

}

export default CalculatorForms
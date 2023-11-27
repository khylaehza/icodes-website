import {
	Flex,
	Box,
	Heading,
	Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { CalculatorForms } from '../../sections/calculators/index';

const Calculator = () => {
    return (
        <Flex
        bgColor={'w.200'}
        w={'100%'}
        flexDir={'column'}
        p={10}
        gap={2}
        h={{ base: '', xl: '100%' }}
    >
        <Heading
            fontSize={{
                base: '2xl',
                sm: '3xl',
                md: '4xl',
                lg: '5xl',
            }}
            alignSelf={'center'}
        >
            Unit Value{' '}
            <Text
                as={'span'}
                bgGradient='linear(to-r, blue.700,b.300)'
                bgClip='text'
            >
                Calculator
            </Text>{' '}
        </Heading>

        <CalculatorForms/>

    </Flex>
    )
}

export default Calculator;
import React from 'react';
import { VStack, Text, Heading, Flex, Image } from '@chakra-ui/react';
import {
	UnitValueCalculator,
	LoanPaymentCalucalator,
	RentToOwnCalculator,
} from './index';

const CalculatorForms = () => {
	return (
		<VStack
			spacing={3}
			alignSelf={'center'}
			w={'100%'}
			p={5}
			flexDir={'row'}
		>
			<Flex
				flexDir={'column'}
				w={'80%'}
				p={5}
				bgColor={'b.300'}
				gap={2}
				rounded={15}
				h={'100%'}
			>
				<Heading
					size={'lg'}
					alignSelf={'center'}
					color={'w.300'}
				>
					Unit Value
				</Heading>
				<Flex gap={3}>
					<Flex>
						<Text
							size={'md'}
							alignSelf={'center'}
							color={'w.300'}
							textAlign={'justify'}
						>
							Planning to sell your unit? Determine your unit
							value based on your selected year set by CTC's
							admin.
						</Text>
					</Flex>
					<Flex>
						<Image
							src={'https://i.imgur.com/Ul1GYls.png'}
							objectFit={'contain'}
							w={'150px'}
						/>
					</Flex>
				</Flex>
				<UnitValueCalculator />
			</Flex>

			<Flex
				flexDir={'column'}
				w={'80%'}
				p={5}
				bgColor={'b.300'}
				gap={2}
				rounded={15}
			>
				<Heading
					size={'lg'}
					alignSelf={'center'}
					color={'w.300'}
				>
					Loan Payment
				</Heading>
				<Flex gap={3}>
					<Flex>
						<Text
							size={'md'}
							alignSelf={'center'}
							color={'w.300'}
							textAlign={'justify'}
						>
							Identify your monthly loan payment based on your
							agreement with your bank or property loan financier.
						</Text>
					</Flex>
					<Flex>
						<Image
							src={'https://i.imgur.com/z16pW8b.png'}
							objectFit={'contain'}
							w={'150px'}
						/>
					</Flex>
				</Flex>

				<LoanPaymentCalucalator />
			</Flex>

			<Flex
				flexDir={'column'}
				w={'80%'}
				p={5}
				bgColor={'b.300'}
				gap={2}
				rounded={15}
			>
				<Heading
					size={'lg'}
					alignSelf={'center'}
					color={'w.300'}
				>
					Rent to Own Payment
				</Heading>
				<Flex gap={3}>
					<Flex>
						<Text
							size={'md'}
							alignSelf={'center'}
							color={'w.300'}
							textAlign={'justify'}
						>
							Identify your monthly based on your selected payment
							term to be paid on Congressional Town Center.
						</Text>
					</Flex>
					<Flex>
						<Image
							src={'https://i.imgur.com/wGMN9mA.png'}
							objectFit={'contain'}
							w={'150px'}
						/>
					</Flex>
				</Flex>
				<RentToOwnCalculator />
			</Flex>
		</VStack>
	);
};

export default CalculatorForms;

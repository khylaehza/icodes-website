import {
	Step,
	StepDescription,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
	useSteps,
	Box,
	Progress,
	Stack,
	Text,
} from '@chakra-ui/react';
const CusStepper = ({ currentStep, questions }) => {
	return (
		<Stack>
			<Stepper
				size='sm'
				index={currentStep}
				// bgColor={'b.300'}
				p={2}
				rounded={5}
				colorScheme='gray'
			>
				{questions.map((step, index) => (
					<Step key={index}>
						<StepIndicator>
							<StepStatus
								complete={<StepIcon />}
								incomplete={<StepNumber />}
								active={<StepNumber />}
							/>
						</StepIndicator>

						<StepSeparator
							_horizontal={{ ml: -1, mr: -3, bgColor: 'b.200' }}
						/>
					</Step>
				))}
			</Stepper>
		</Stack>
	);
};

export default CusStepper;

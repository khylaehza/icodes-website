import React from 'react';
import { Button, Box } from '@chakra-ui/react';
import RequirementForm from './RequirementForm';
import OwnerInfoForm from './OwnerInfoForm';

const UnitOwnerForm = ({
	onClose,
	reqForm,
	ownerInfoForm,
	showImage,
	setShowImage,
	activeStep,
	handleBack,
	fileData,
	disabled,
	setOwner,
	isEdit,
}) => {
	function getSteps() {
		return ['Requirements'];
	}

	const steps = getSteps();
	const getStepContent = (step) => {
		switch (step) {
			case 0:
				return (
					<RequirementForm
						form={reqForm}
						showImage={showImage}
						setShowImage={setShowImage}
						fileData={fileData}
						setOwner={setOwner}
						disabled={disabled}
						isEdit={isEdit}
					/>
				);

			case 1:
				return (
					<OwnerInfoForm
						form={ownerInfoForm}
						disabled={disabled}
					/>
				);

			default:
				return 'No file';
		}
	};

	const handleSubmit = () => {
		switch (activeStep) {
			case 0:
				reqForm.handleSubmit();
				break;
			case 1:
				ownerInfoForm.handleSubmit();
				break;

			default:
				return 'Unknown';
		}
	};

	return (
		<>
			{getStepContent(activeStep)}

			<Box
				display={'flex'}
				justifyContent={'flex-end'}
			>
				<Button
					mt={5}
					onClick={handleBack}
					style={{
						display:
							activeStep > 0 && activeStep <= 3
								? 'block'
								: 'none',
					}}
					variant={'secondary'}
					w='20%'
				>
					Back
				</Button>
				{activeStep === steps.length - 0 ? (
					<Button
						mt={5}
						ml={5}
						variant={'primary'}
						w='20%'
						onClick={(e) => {
							handleSubmit(e);
							onClose(e);
						}}
					>
						Finish
					</Button>
				) : (
					<Button
						mt={5}
						ml={5}
						onClick={handleSubmit}
						variant={'primary'}
						w='20%'
					>
						Next
					</Button>
				)}
			</Box>
		</>
	);
};

export default UnitOwnerForm;

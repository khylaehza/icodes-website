import TowerInfoForm from './towers/TowerInfoForm';
import UnitsPerFloorForm from './towers/UnitsPerFloorForm';
import { Button, Box } from '@chakra-ui/react';

const TowersForm = ({
	onClose,
	infoForm,
	setFloorNum,
	setTower,
	setShowImage,
	showImage,
	unitPerFloorForm,
	floorNum,
	activeStep,
	handleBack,
	imgFileName,
}) => {
	const getSteps = () => {
		return ['Info'];
	};

	const steps = getSteps();
	const getStepContent = (step) => {
		switch (step) {
			case 0:
				return (
					<TowerInfoForm
						form={infoForm}
						imgFileName={imgFileName}
						setFloorNum={setFloorNum}
						setTower={setTower}
						setShowImage={setShowImage}
						showImage={showImage}
					/>
				);

			case 1:
				return (
					<UnitsPerFloorForm
						floorNum={floorNum}
						form={unitPerFloorForm}
					/>
				);

			default:
				return 'No file';
		}
	};

	const handleSubmit = () => {
		switch (activeStep) {
			case 0:
				infoForm.handleSubmit();
				break;

			case 1:
				unitPerFloorForm.handleSubmit();
				break;
			case 2:
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

export default TowersForm;

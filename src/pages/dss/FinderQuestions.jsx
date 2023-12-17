import { useFormik } from 'formik';
import { Flex, Text, Box, Button, Image, Fade } from '@chakra-ui/react';
import { TopNav } from '../../sections/navigation';
import { useState } from 'react';
import { CusStepper } from '../../customs';
import questions from '../finder/scripts/Questionnaires';
import { useNavigate } from 'react-router-dom';
const FinderQuestions = () => {
	const navigate = useNavigate();

	const [currentCard, setCurrentCard] = useState(0);
	const [currentStep, setCurrentStep] = useState(0);
	const questionLength = questions.length;

	const [category, setCategory] = useState([]);

	const form = useFormik({
		initialValues: {
			familySize: '',
			selectedAmenity: [],
			minimumPrice: '',
			maximumPrice: '',
			questions: category,
		},
		onSubmit: (values) => {
			values.questions = category;

			navigate('/result', {
				state: { val: values },
			});

			setCurrentStep((prevStep) => prevStep + 1);
		},
	});

	const handleNext = () => {
		if (currentCard < questions.length - 1) {
			setCurrentCard((prevCard) => prevCard + 1);
			setCurrentStep((prev) => prev + 1);
		}
	};
	const handlePrevious = () => {
		if (currentCard > 0) {
			setCurrentCard((prevCard) => prevCard - 1);
			setCurrentStep((prev) => prev - 1);
		}
	};

	const isLastCard = currentCard === questions.length - 1;
	const isFirstCard = currentCard === 0;

	let setAnswerVal = [];

	return (
		<Fade
			initialScale={0.9}
			in='true'
		>
			<Flex
				flexDir={'column'}
				height={'100vh'}
			>
				<TopNav />

				<Flex
					p={10}
					height={'100%'}
					justifyContent={'space-between'}
					flexDir={'column'}
					bgColor={'w.200'}
				>
					<CusStepper
						currentStep={currentStep}
						questionLength={questionLength}
						questions={questions}
					/>

					<Flex
						flexDir={'column'}
						justifyContent={'center'}
						height={'80%'}
						bgColor={'b.300'}
						p={2}
						rounded={10}
						boxShadow='0 4px 12px 0 rgba(134,149,166,0.5)'
					>
						<FinderForm
							cardIndex={currentCard}
							setAnswerVal={setAnswerVal}
							form={form}
							setCategory={setCategory}
							category={category}
						/>
					</Flex>

					<Flex
						justifyContent={'center'}
						flexDir={'row'}
						gap={5}
					>
						{isFirstCard && <Box />}
						{!isFirstCard && (
							<Button
								onClick={handlePrevious}
								variant={'solid'}
								bgColor={'b.200'}
								color={'w.300'}
								_hover={{ bgColor: 'b.100' }}
							>
								Prev
							</Button>
						)}
						{isLastCard ? (
							<Button
								onClick={form.handleSubmit}
								variant={'solid'}
								bgColor={'b.300'}
								color={'w.300'}
								_hover={{ bgColor: 'b.400' }}
							>
								Submit
							</Button>
						) : (
							<>
								{currentCard < questionLength - 3 &&
									category[currentCard] && (
										<>
											<Button
												onClick={handleNext}
												variant={'solid'}
												bgColor={'b.300'}
												color={'w.300'}
												_hover={{ bgColor: 'b.400' }}
											>
												Next
											</Button>
										</>
									)}

								{currentCard >= questionLength - 3 && (
									<Button
										onClick={handleNext}
										variant={'solid'}
										bgColor={'b.300'}
										color={'w.300'}
										_hover={{ bgColor: 'b.400' }}
									>
										Next
									</Button>
								)}
							</>
						)}
					</Flex>
				</Flex>
			</Flex>
		</Fade>
	);
};

const FinderForm = ({ cardIndex, form, setCategory, category }) => {
	const question = questions[cardIndex];

	const [item, setItem] = useState([]);

	const handleSet = (optn) => {
		const addCategory = [...category];
		addCategory[cardIndex] = optn.category;
		setCategory(addCategory);

		const addItem = [...item];
		addItem[cardIndex] = optn.answerText;
		setItem(addItem);
	};
	return (
		<>
			{question.file && (
				<>
					{question.component ? (
						<Flex
							flexDir={'row'}
							rounded={10}
							bgColor={'w.300'}
							gap={20}
							h={'100%'}
							boxShadow='0 4px 12px 0 rgba(134,149,166,0.5)'
						>
							<Flex
								flexDir={'column'}
								gap={'10px'}
								w={'70%'}
								pl={10}
								pr={10}
								key={cardIndex}
								rounded={10}
								justifyContent={'center'}
							>
								<Text
									fontSize={'5xl'}
									fontWeight={'semibold'}
									fontFamily={'heading'}
								>
									{question.questionText}
								</Text>
								{question.component(form)}
							</Flex>
							<Box
								w={'30%'}
								bgColor={'w.300'}
								rounded={10}
							>
								<Image
									fit={'contain'}
									align={'center'}
									w={'100%'}
									h={'100%'}
									src={question.file}
								/>
							</Box>
						</Flex>
					) : (
						<Flex
							flexDir={'row'}
							rounded={10}
							bgColor={'w.300'}
							gap={20}
							h={'100%'}
							boxShadow='0 4px 12px 0 rgba(134,149,166,0.5)'
						>
							<Flex
								w={'70%'}
								rounded={10}
								gap={10}
								flexDir={'column'}
								justifyContent={'center'}
								pl={10}
								pr={10}
								key={cardIndex}
							>
								<Text
									fontSize={'5xl'}
									fontWeight={'semibold'}
									fontFamily={'heading'}
								>
									{question.questionText}
								</Text>

								<Flex
									flexDir={'column'}
									gap={'10px'}
								>
									{question.answerOptions.map(
										(optn, index) => {
											return (
												<Button
													variant={
														item[cardIndex] ==
														optn.answerText
															? 'solid'
															: 'outline'
													}
													borderColor={'b.400'}
													bgColor={
														item[cardIndex] ==
															optn.answerText &&
														'b.100'
													}
													w={'100%'}
													h={'60px'}
													fontSize={'xl'}
													key={index}
													onClick={() => {
														handleSet(optn);
													}}
												>
													{optn.answerText}
												</Button>
											);
										}
									)}
								</Flex>
							</Flex>

							<Box
								w={'30%'}
								bgColor={'w.300'}
								rounded={10}
							>
								<Image
									fit={'contain'}
									align={'center'}
									w={'100%'}
									h={'100%'}
									src={question.file}
								/>
							</Box>
						</Flex>
					)}
				</>
			)}
		</>
	);
};
export default FinderQuestions;

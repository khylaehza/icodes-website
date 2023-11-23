import React,{useState} from 'react';
import { 
    Grid, 
    GridItem,
    Card,
    CardHeader,
    CardBody,
    Heading,
    Image,
    Text,
    VStack,
    Box,
    Button,
    Flex,
    useDisclosure,
    HStack,
    FormControl,
    FormErrorMessage,
    Select,
    Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
 } from "@chakra-ui/react";
 import {GrFormNext,GrFormPrevious} from 'react-icons/gr'
 import { Results } from './index.js';
 import questions from './scripts/Questionnaires';
const FinderForm = ({setStart, form, results, points,text}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()


    const [currentCard, setCurrentCard] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [displayResults, setDisplayResults] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const number_of_questions = questions.length

    const handleNext = () => {
        if (currentCard < questions.length - 1) {
        setCurrentCard((prevCard) => prevCard + 1);
        setCurrentStep((prev) => prev + 1);
        } 
    }
    const handlePrevious = () => {
        if (currentCard > 0) {
            setCurrentCard((prevCard) => prevCard - 1);
            setCurrentStep((prev) => prev -1)
        }
    };

    const handleSubmit = () => {
        form.handleSubmit();
        onOpen();
        setCurrentStep((prevStep) => prevStep + 1);
        setDisplayResults(true)
    };


    const isLastCard = currentCard === questions.length - 1 
    const isFirstCard = currentCard === 0;

    const renderCard = (cardIndex) => {

    const question = questions[cardIndex];
    const currentValue = form.values.questions[cardIndex] || "Select";
    
        return (
            <>
            <Card key={cardIndex} shadow={"md"} maxH={'500px'} maxW={'600px'} minW={'600px'} alignSelf={'center'}>
                <CardHeader backgroundColor={"#D6E4C7"}>
                    <Heading size={"sm"}>{question.questionText}</Heading>
                </CardHeader>
                <CardBody
                    display={"flex"}
                    flexDir={"column"}
                    justifyContent={"center"}
                    h={'400px'}
                    maxH={"400px"}
                >
                    {question.component? question.component(form) : (
                        <>
                            <FormControl
                                isInvalid={form.errors.questions && form.touched.questions}
                            >
                                <Select
                                    name={`questions[${cardIndex}]`}
                                    variant={"outline"}
                                    bgColor={"w.300"}
                                    onChange={form.handleChange}
                                    onBlur={form.handleBlur}
                                    value={currentValue}
                                    fontSize={"xs"}
                                >
                                    <option value="Select" disabled>
                                        Select
                                    </option>
                                    {question.answerOptions.map((optn, answerKey) => (
                                        <option key={answerKey} value={optn.category}>
                                        {optn.answerText}
                                        </option>
                                    ))}
                                </Select>
                                    <FormErrorMessage fontSize={"xs"}>
                                        {form.errors.questions && form.errors.questions[cardIndex]}
                                    </FormErrorMessage>
                                </FormControl>
                            <Image
                                objectFit={"fill"}
                                style={{ aspectRatio: "3/3" }}
                                w={"40%"}
                                h={"40%"}
                                src={question.file}
                                alignSelf={"center"}
                                justifyContent={"center"}
                                display={"flex"}
                                overflow={"hidden"}
                                pt={5}
                                onClick={() => {
                                    setIsModalOpen(true);
                                    setSelectedImage(question.file);
                                }}
                            />
                        </>
                    )}

                </CardBody>
            </Card>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size={'4xl'}>
                <ModalOverlay />
                <ModalContent  
                    display="flex"
                    alignItems="center"
                    justifyContent="center" >
                <ModalBody>
                    {selectedImage && (
                        <Image
                            src={selectedImage}
                            alt="Selected Image"
                            maxW="100%"
                            maxH="100%"
                        />
                    )}
                </ModalBody>
                </ModalContent>
            </Modal>
            </>
        );
    };
    
    return(
        <>
            {displayResults ? (
                <Results isOpen={isOpen} onClose={onClose} result={results} points={points} setStart={setStart} rtext={text}/>
            ):(
                <Flex flexDir={'column'} display={'flex'}>
                    <Grid templateColumns='repeat(8, 1fr)' gap={0} overflow={'hidden'} h={'500px'} >
                        <GridItem display={'flex'} colStart={3} colEnd={7} justifyContent={'center'} maxH={'60%'}>
                            <form style={{display: 'flex',justifyContent: 'center', overflow: 'hidden'}}>
                                <Box backgroundColor={'white'} boxSize={'container.xl'} maxH={'90%'} maxW={'95%'} justifyContent={'center'} p={5} borderRadius={10} overflow={'hidden'}>
                                    <VStack spacing={2}>
                                        <Box h={'60%'}  justifyContent={'center'} display={'flex'}>
                                            {renderCard(currentCard)}
                                        </Box>
                                        <Box h={'40%'}>
                                        <HStack spacing={20} p={3}>
                                            {!isFirstCard && (
                                            
                                                <Button leftIcon={<GrFormPrevious/>} onClick={handlePrevious}>Prev </Button>
                                            )}
                                            {isLastCard? (
                                                <Button onClick={handleSubmit} backgroundColor={'b.300'} color={'#ffffff'}>Submit</Button>
                                            ) : (
                                                <Button rightIcon={<GrFormNext/>} onClick={handleNext}>Next</Button>
                                            )}
                                            </HStack>
                                        </Box>
                                    </VStack>
                                </Box>
                            </form>
                        </GridItem>
                        <GridItem ml={10} colStart={7} justifyItems={'center'} maxW={'100%'}>
                            <Box  
                                maxH={'55%'} 
                                borderRadius={10} 
                                p={5} 
                                overflowY="auto"
                                css={{
                                    "&::-webkit-scrollbar":{
                                        width: "5px",
                                    },
                                    "&::-webkit-scrollbar-thumb":{
                                        backgroundColor: "black.300",
                                        borderRadius: "4px",
                                    },
                                    "&::-webkit-scrollbar-thumb:hover":{
                                        backgroundColor: "black.500",
                                    },
                                    "&::-webkit-scrollbar-track":{
                                        backgroundColor: "black.100",
                                    }
                                }}
                            >
                                <Stepper orientation="vertical" index={currentStep} color="black" size="sm">
                                    {Array.from({ length: number_of_questions }, (_, index) => (
                                        <Step key={index} mt={-3} fontSize="sm">
                                        <StepIndicator>
                                            <StepStatus
                                            complete={<StepIcon fontSize="sm" />}
                                            incomplete={<StepNumber fontSize="sm" />}
                                            active={<StepNumber fontSize="sm" />}
                                            />
                                        </StepIndicator>
                                        <Box flexShrink="0">
                                            <StepTitle fontSize="sm">{`Question ${index + 1}`}</StepTitle>
                                        </Box>
                                            <StepSeparator />
                                        </Step>
                                    ))}
                                </Stepper>
                            </Box>
                        </GridItem>
                    </Grid>
                </Flex> 
    
            )}
        </>
    );
}


    


export default FinderForm;
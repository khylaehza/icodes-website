import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Card,
    CardHeader,
    CardBody,
    Text,
    Heading,
    HStack,
    Box,
    Image,
    Container,
    Button,
    Flex

  } from '@chakra-ui/react'
  import RadarGraph from "../../utilities/graphs/RadarGraph";
  import { AddInterested } from "./index";
  //import AddGuestForm from "../../modals/finder/AddGuestForm";
  import { useData } from "../../../DataContext";


  
export const Results  = ({ isOpen,  onClose, result,points,rtext,setStart})=>{
    const [isClicked, setClicked] = useState(false)
    const [isModalClose, setModalClose] = useState(false)
    const { unitData } = useData();
    const other_units = ()=>{
        setClicked(true)

    }
    const handleClose = ()=>{
        setModalClose(true)
        setStart(false)

    }

    if(result == null){
        return null
    }

    console.log("results",result)

    return(
        <>
            <Container maxW={'85%'} p={5} css={{
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                WebkitBackdropFilter: 'blur(2px)',
                backdropFilter: 'blur(2px)',
                borderRadius: '5px'
            }}>
                <Heading color={'b.400'} size={'md'}>With the data you given, the best unit for you is:</Heading>
                <Stats points={points} text={rtext} />    
                <hr style={{borderColor: 'rgba(102, 96, 99, 0.8)'}} />   
                <Heading p={5} size={'md'} color={'blackAlpha.900'}>Top preferred Unit:</Heading>
                <Flex flexDir={'column'}>
                {result.map((item, key) => (
                            <div key={key} style={{display: 'flex', alignSelf: 'center'}}>
                            
                            {key === 0 ? (  // Display only for index 1
                                <CustomCard 
                                    Cardkey={key} 
                                    name={item.name}
                                    no={item.no}
                                    tower={item.tower}
                                    floor={item.floor}
                                    typeName={item.typeName}
                                    typeSize={item.typeSize}
                                    src={unitData.filter((un)=> un.TypeName == item.typeName).map(img => img.TypeImage)}
                                    tcp={item.tcp}
                                    amenity={item.amenities}
                                />
                            ) : null}
                            </div>
                    ))}

                        {!isClicked && (
                            <Box display={'flex'} alignContent={'canter'} justifyContent={'center'} flexWrap={'wrap'} style={{alignContent: 'center'}}>
                            <Button width={'40%'} alignSelf={'center'} backgroundColor={'b.300'} color={'#ffffff'} onClick={other_units}>Check other suitable units</Button>
                            </Box>
                        )}

                        {isClicked && (
                        
                                <Heading p={5} size={'md'} color={'blackAlpha.900'}>Other suitable units:</Heading>
                            
                        )}
                    
                    {isClicked &&(
                        <Flex flexDir={'column'}  h={'500px'} overflowY={'auto'}>
                        {result.map((item, key) => {
                            if (isClicked == true){
                                return (
                                     
                                        
                                        <div key={key} style={{display: 'flex', alignSelf: 'center'}}>
                                        {key !== 0 ? ( 
                                            <CustomCard 
                                                Cardkey={key} 
                                                name={item.name}
                                                no={item.no}
                                                tower={item.tower}
                                                floor={item.floor}
                                                typeName={item.typeName}
                                                typeSize={item.typeSize}
                                                src={unitData.filter((un)=> un.TypeName == item.typeName).map(img => img.TypeImage)}
                                                tcp={item.tcp}
                                                amenity={item.amenities}
                                            />
                                        ) : null}
                                        </div>
                                        
                                    
                                )
                            }
                            
                        })} 
                        </Flex>
                    )}
                    
                </Flex>          
            </Container>
        </>
    )
}

export const CustomCard = ({ Cardkey,src, floor, name,no, tcp,tower, typeName, typeSize,amenity}) =>{
    return(
        <>
            <Card key={Cardkey} size={'md'} w={'3xl'}  mb={5} shadow={'xl'} alignSelf={'center'}>
                <CardBody display={'flex'} flexDir={'column'}>
                <HStack spacing={3}>
                    <Box  w='60%' justifyContent={'center'} display={'flex'}>
                    <Image
                        alt={'unit image'}
                        w={'80%'}
                        h={'80%'}
                        src={src}
                        alignSelf={'center'}
                        overflow={'hidden'}
                        objectFit={'cover'}
                    />
                    </Box>
                    <Box w='50%' flexDir={'column'}>
                     <Heading size={'md'} pb={5}>{name}</Heading>
                       <table width={'100%'}>
                        <tbody>
                        <tr>
                            <td><Text as={'b'} color={'b.400'}>Unit number: </Text></td>
                            <td><Text color={'#000000'}>{no}</Text></td>
                        </tr>
                        <tr>
                            <td><Text as={'b'} color={'b.400'}>Unit type: </Text></td>
                            <td><Text color={'#000000'}>{typeName}</Text></td>
                        </tr>
                        <tr>
                            <td><Text as={'b'} color={'b.400'}>Tower Number: </Text></td>
                            <td><Text color={'#000000'}>{tower}</Text></td>
                        </tr>
                        <tr>
                            <td><Text as={'b'} color={'b.400'}>Floor number: </Text></td>
                            <td><Text color={'#000000'}>{floor}</Text></td>
                        </tr>
                        <tr>
                            <td><Text as={'b'} color={'b.400'}>Sq. Meters:</Text> </td>
                            <td><Text color={'#000000'}>{typeSize}</Text></td>
                        </tr>
                        <tr>
                            <td><Text as={'b'} color={'b.400'}>Accessible Amenities:</Text> 
                            {amenity.map((amenityItem, index) => (
                                <Text key={index} color={'#000000'}>{amenityItem}</Text>
                            ))}</td>
                        </tr>
                        </tbody>
                       </table>
                    
                        <Box width={'45%'}  m={3} p={2} backgroundColor={'b.400'} color={'#ffffff'} borderRadius={5} justifyContent={'center'} display={'flex'}> TCP ₱{tcp}</Box>
                    </Box>
                
                </HStack>
                    {/* <Button width={'40%'} alignSelf={'center'} backgroundColor={'b.400'} color={'#ffffff'}>INTERESTED</Button> */}
                    {/* <AddGuestForm unit={name}/> */}
                    <AddInterested unit={name}/>
                </CardBody>
            </Card>
        </>
    )
}

export const Stats = ({points,text}) =>{

    return(
        <>
            <Flex size={'md'} display={'flex'} flexDir={'column'}    shadow={'none'} alignSelf={'center'}>
                
                <HStack spacing={3}>
                    <Box p={5} pb={0} w='40%'>
                        <RadarGraph points={points}/>
                    </Box>
                    <Box w='50%' h={'50%'} flexDir={'column'} textAlign={'justify'} overflow={'hidden'}>
                    <Heading color={'black'} as='abbr' size={'xs'}>{text}</Heading>
                        
                    </Box>
                </HStack>
               
            </Flex>
        </>
    )
}


import React,{useState,useEffect} from "react";
import { 
    Checkbox,
    CheckboxGroup,
    Box,
    Image,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
 } from "@chakra-ui/react";
 import Slider from "react-slick";
 import 'slick-carousel/slick/slick.css';
 import 'slick-carousel/slick/slick-theme.css'; 
import '../styles/CheckBoxSlider.css';
import { useData } from "../../DataContext";


 export const CusCheckbox = ({src,text,value, isChecked, onChange,key }) =>{


    return(
        
        <>
            <Box  alignSelf={'center'} justifyContent={'center'} position={'relative'} overflow={'visible'}>
                <CheckboxGroup colorScheme='green'>
                    <Box display={'flex'} flexDir={'column'} px={1} alignItems={'center'} position={'relative'}>
                        <Text pb={1}>{text}</Text>
                        <Box display={'flex'} overflow={'visible'} justifyContent={'center'}>
                            <Image
                                key={key}
                                h={'100%'} w={'100%'}
                                style={{ aspectRatio: '3/3'}}
                                objectFit={'cover'}
                                overflow={'hidden'}
                                src={src}

                                
                            >

                        </Image>
                        </Box>

                        <Box 
                            display={'flex'} 
                            flexDir={'column'} 
                            boxSize={'full'} 
                            position={'absolute'} 
                            justifyContent={'end'}
                            px={4}py={2}
                           
                        >
                            
                            <Checkbox
                                size={'lg'} 
                                key={key}
                                value={value}
                                isChecked={isChecked}
                                onChange={onChange}
                                
                            />
                        </Box>
                    </Box>

                    
                </CheckboxGroup>
                
                
            </Box>

            
        </>
        
    );
}
 export const CusSliderCheckbox = ({form}) =>{
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        easing: 'ease-in-out',
        autoplay: false,
        arrows: true,
        //autoplaySpeed: 3000,
      };

    const {amenities} = useData();
    const selectedValues = form.values.selectedAmenity;

    const handleCheckboxChange = (value, isChecked) => {
      if (isChecked) {
        form.setFieldValue('selectedAmenity', [...selectedValues, value]);
      } else {
        form.setFieldValue('selectedAmenity', selectedValues.filter((item) => item !== value));
      }
    };
    
    return(
        <>
        <Box display={'flex'} alignSelf={'center'}flexDir={'column'} flexShrink={1} width={'md'}  justifyItems={'center'} pb={2} overflow={'visible'} minW={'10%'} >

          <Slider {...settings}>
            {amenities.map((item,index)=>(
                <CusCheckbox 
                    key={index}
                    src={item.AmenityImg}
                    text={item.AmenityName}
                    value={item.AmenityName}
                    isChecked={selectedValues.includes(item.AmenityName)}
                    onChange={(event) => handleCheckboxChange(item.AmenityName, event.target.checked)}
                />
            ))}
                   
          </Slider>
        </Box>
        </>

    );
 }

 
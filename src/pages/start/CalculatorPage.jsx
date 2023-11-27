import { Flex, Fade } from '@chakra-ui/react';
import { TopNav } from '../../sections/navigation';
import Calculator from '../calculator/Calculator';

const CalculatorPage = () =>{
    return(
        <Fade
			initialScale={0.9}
			in='true'
		>
            <Flex
				flexDir={'column'}
				height={'100vh'}
			>
                <TopNav />
                <Calculator/>
            </Flex>
        </Fade>
    )
}

export default CalculatorPage;
import { CusTitle, CusTD, CusDelete, CusAlert } from '../../../customs';
import { DateChecker } from '../../../utilities';
import {
	Tr,
	Td,
	ButtonGroup,
    UnorderedList,
    ListItem
} from '@chakra-ui/react';
import React from 'react';
import { EditVisitors } from '../../../modals';


const VisitorTable = ({ data, search, all }) =>{
    const ret = search ? all : data;
    return ret
    .filter((item) => {
        return search.toLowerCase() === ''
            ? item
            : item.VisitorID.toString().toLowerCase().includes(search);
    })
    .map((data, id) => {

        if (data.CreatedDate){
            return(
                <React.Fragment key={id}>
                    <Tr
                        key={id}
                        display={{
                            base: 'grid',
                            xl: 'table-row',
                        }}
                        sx={{
                            '@media print': {
                                display: 'table-row',
                            },
                            gridTemplateColumns:
                                'minmax(0px, 50%) minmax(0px, 50%)',
                            gridGap: '10px',
                        }}
                    >
                        <React.Fragment>
                            <CusTitle component={'Visitor ID'} />
                            <CusTD component={data.VisitorID}/>
                            <CusTitle component={'Unit'} />
                            <CusTD component={data.Unit}/>
                            <CusTitle component={'Unit owner'} />
                            <CusTD component={data.For}/>
                            <CusTitle component={"Visitor/s Name/s"} />
                            <CusTD 
                                component={
                                
                                        <UnorderedList
												ml={'5'}
												mr={'5'}
										>
                                            {data.Visitor.map((item, index) => (
                                                    <ListItem key={index} textAlign={'center'}>
                                                    {item}
                                                    </ListItem>
                                                ))}
                                        </UnorderedList>
                                
                               }/>
                            <CusTitle component={'Date'} />
                            <CusTD component={`${data.DateStart} - ${data.DateEnd}`}/>
                            <CusTitle component={'Purpose'} />
                            <CusTD component={data.Purpose}/>
                            <CusTitle component={'Status'} />
                            <CusTD component={data.Status}/>
                            <CusTitle component={'Actions'} />
                            <CusTD
                                component={
                                    <ButtonGroup
                                        variant='solid'
                                        size='sm'
                                        spacing={3}
                                    >
                                        {data.id && (
                                            
                                            <EditVisitors
                                                data={data}
                                                id={data.id}
                                                mainCollection='maintenance'
                                                tblDocUser='frontdesk'
                                                tblUserCol='tbl_visitors'
                                            />
                                        )}

                                        <CusDelete
                                            id={data.id}
                                            label={` ${data.VisitorID}'s Data`}
                                            mainCollection='maintenance'
                                            tblDocUser='frontdesk'
                                            tblUserCol='tbl_visitors'
                                            hasFile={false}
                                            onUpdate={() => {}}
                                        />
                                    </ButtonGroup>
                                }
                            />

                        </React.Fragment>
                    </Tr>

                </React.Fragment>
            )
        }
    })
}
export default VisitorTable;
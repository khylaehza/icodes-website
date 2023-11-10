import React from 'react';
import { Stack, Button } from '@chakra-ui/react';
import {
    CusBookingStatus,
    CusSelectOccupiedUnit,
	CusInputRegular,
    CusTextArea,
} from '../../../customs';

const VisitorForm = ({ form, units,setUnits, visitors, setVisitors }) => {

    return (
		<Stack w={'100%'}>
			<form id='formDiv'>
				<Stack>
					<Stack
						spacing={6}
						pt={2}
						direction={['column', 'row']}
						mb={2}
					>
						<CusSelectOccupiedUnit
							label={'Unit'}
							name='units'
							id={'units'}
							placeholder={'Select Location'}
							value={form.values.units}
							onBlur={form.handleBlur}
							onChange={form.handleChange}
							error={form.errors.units}
							touch={form.touched.units}
						/>
					</Stack>
						<CusTextArea
							label={"Visitor/s (Press ';' to add new line)"}
							name='visitors'
							id='visitors'
							placeholder={"Enter Visitor/s name"}
							onChange={(e)=>{
								const value = e.target.value;
								const modified = value.replace(/;/g, ',\n')
								const vArray = modified.split(',');
								form.setFieldValue('visitors', vArray);
								setVisitors(vArray)
							}}
							onBlur={form.handleBlur}
							value={visitors.join(',') || form.values.visitors}
							error={form.errors.visitors}
							touch={form.touched.visitors}
						/>
					<Stack
						direction={['column', 'row']}
						spacing={6}
						mb={3}
					>

						<CusInputRegular
							label={'Date Start'}
							name='dateStart'
							id='dateStart'
							type={'datetime-local'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.dateStart}
							error={form.errors.dateStart}
							touch={form.touched.dateStart}
						/>

						<CusInputRegular
							label={'Date End'}
							name='dateEnd'
							id='dateEnd'
							type={'datetime-local'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.dateEnd}
							error={form.errors.dateEnd}
							touch={form.touched.dateEnd}
						/>
					</Stack>
					<Stack
						direction={['column', 'row']}
						spacing={6}
						mb={3}
					>
						<CusTextArea
							label={'Visit Purpose'}
							name='purpose'
							id='purpose'
							placeholder={'Enter Purpose of visit'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.purpose}
							error={form.errors.purpose}
							touch={form.touched.purpose}
						/>
						<CusBookingStatus
							label={'Status'}
							name='status'
							id='status'
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.status}
							error={form.errors.status}
							touch={form.touched.status}
						/>
					</Stack>
					<Stack
						direction={['column', 'row']}
						justify={'flex-end'}
					>
						<Button
							variant={'primary'}
							onClick={form.handleSubmit}
						>
							Save
						</Button>
					</Stack>
				</Stack>
			</form>
		</Stack>
	);
}

export default VisitorForm
import React, { useState } from 'react';
import { Stack, Button, Heading, HStack, Box } from '@chakra-ui/react';
import {
	CusNumInput,
	CusSelectTower,
	CusSelectOccOwner,
	CusBookingStatus,
	CusInputRegular,
	CusSelectAmenities,
} from '../../../customs';
const BookingsForm = ({ form }) => {
	return (
		<Stack w={'100%'}>
			<form id='formDiv'>
				<Stack>
					<Stack
						direction={['column', 'row']}
						spacing={6}
					>
						<CusSelectTower
							label={'Tower'}
							name='tower'
							id='tower'
							placeholder={'Select Tower'}
							onChange={(e) => {
								form.setFieldValue('tower', e.target.value);
							}}
							onBlur={form.handleBlur}
							value={form.values.tower}
							error={form.errors.tower}
							touch={form.touched.tower}
							isRequired
						/>
					</Stack>
					<Stack
						direction={['column', 'row']}
						spacing={6}
					>
						<CusSelectAmenities
							label={'Amenities'}
							name='amenityType'
							id='amenityType'
							placeholder={'Select Amenity'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.amenityType}
							error={form.errors.amenityType}
							touch={form.touched.amenityType}
							isRequired
							tower={form.values.tower}
						/>
						<CusSelectOccOwner
							label={'Unit Owner Name'}
							name='unitOwner'
							id='unitOwner'
							placeholder={'Unit Owner Name'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.unitOwner}
							error={form.errors.unitOwner}
							touch={form.touched.unitOwner}
							isRequired
						/>

						<CusNumInput
							isRequired
							label={'No. of Persons'}
							id={'numPerson'}
							name='numPerson'
							onChange={(e) => {
								form.setFieldValue('numPerson', e);
							}}
							error={form.errors.numPerson}
							touch={form.touched.numPerson}
							value={form.values.numPerson}
						/>
					</Stack>
					<Stack
						direction={['column', 'row']}
						spacing={6}
					>
						<CusInputRegular
							isRequired
							label={'Date'}
							type={'date'}
							name='date'
							id='date'
							onChange={form.handleChange}
							value={form.values.date}
							error={form.errors.date}
							onBlur={form.handleBlur}
							touch={form.touched.date}
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
};

export default BookingsForm;

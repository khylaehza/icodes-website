import { Image, Text, VStack, Box } from '@chakra-ui/react';
import { CusNumSpinner } from '../../../customs';
import { CusSliderCheckbox } from '../../../customs';
import { CusNumInputLeftAdd } from '../../../customs';

const questions = [
	// space
	{
		questionText: 'What is this unit for?',
		file: './gifs/dss/mortgage.gif',
		answerOptions: [
			{ answerText: 'Personal Use', category: 'larger' },
			{ answerText: 'Investment', category: 'smaller' },
		],
	},

	{
		questionText: 'Are you more interested in having more living space?',
		file: './gifs/dss/responsive.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'larger' },
			{ answerText: 'No', category: 'smaller' },
		],
	},

	{
		questionText: 'Are you a minimalist or maximalist person?',
		file: './gifs/dss/space.gif',
		answerOptions: [
			{ answerText: 'Minimalist', category: 'smaller' },
			{ answerText: 'Maximalist', category: 'larger' },
		],
	},

	{
		questionText:
			'Do you have a significant amount of furniture or possessions that would require a larger living space?',
		file: './gifs/dss/storage.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'larger' },
			{ answerText: 'No', category: 'smaller' },
		],
	},

	{
		questionText:
			'Do you prefer a modern or traditional interior design style?',
		file: './gifs/dss/modern-house.gif',
		answerOptions: [
			{ answerText: 'Modern', category: 'smaller' },
			{ answerText: 'Traditional', category: 'larger' },
		],
	},

	{
		questionText: 'Would you also use your unit as a work place?',
		file: './gifs/dss/presentation.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'larger' },
			{ answerText: 'No', category: 'smaller' },
		],
	},

	{
		questionText:
			'Is having a smaller utility and maintenance cost a priority for you?',
		file: './gifs/dss/cost.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'smaller' },
			{ answerText: "I don't mind", category: 'larger' },
		],
	},

	{
		questionText: 'Do you tend to host parties in your house?',
		file: './gifs/dss/party.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'larger' },
			{ answerText: 'No', category: 'smaller' },
		],
	},

	{
		questionText: 'Do you have a pet?',
		file: './gifs/dss/pawprint.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'larger' },
			{ answerText: 'No', category: 'smaller' },
		],
	},

	{
		questionText: 'Are you an adventurous and outgoing person?',
		file: './gifs/dss/backpack.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'smaller' },
			{ answerText: 'No', category: 'larger' },
		],
	},

	{
		questionText:
			'Are you prepared for the responsibilities of cleaning and maintaining a larger space?',
		file: './gifs/dss/housekeeping.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'smaller' },
			{ answerText: 'No', category: 'larger' },
		],
	},
	//level
	{
		questionText: 'Do you want to see the view of city from your unit?',
		file: './gifs/dss/skyline.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'higher' },
			{ answerText: 'No', category: 'lower' },
			{ answerText: 'Maybe', category: 'medium' },
		],
	},

	{
		questionText: 'Do you prefer living in quiet floors?',
		file: './gifs/dss/silence.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'higher' },
			{ answerText: 'No', category: 'lower' },
			{ answerText: 'Maybe', category: 'medium' },
		],
	},

	{
		questionText: 'Do you have fear in heights?',
		file: './gifs/dss/scared.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'lower' },
			{ answerText: 'No', category: 'higher' },
			{ answerText: 'Maybe', category: 'medium' },
		],
	},

	{
		questionText:
			'Are you more inclined in living near the parking floors?',
		file: './gifs/dss/parking.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'lower' },
			{ answerText: 'No', category: 'higher' },
			{ answerText: 'Maybe', category: 'medium' },
		],
	},
	{
		questionText: 'Are you comfortable of using stairs?',
		file: './gifs/dss/stairs.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'lower' },
			{ answerText: 'No', category: 'higher' },
			{ answerText: 'Maybe', category: 'medium' },
		],
	},
	{
		questionText:
			'Do you have a senior citizen or a person with a disabilities in your family?',
		file: './gifs/dss/wheelchair.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'lower' },
			{ answerText: 'No', category: 'higher' },
		],
	},

	// static questions

	{
		questionText: 'What amenities do you like?',
		component: (form) => (
			<>
				<CusSliderCheckbox form={form} />
			</>
		),
		file: './gifs/dss/selfie.gif',
	},

	{
		questionText: 'What is your family size?',
		component: (form) => (
			<>
				<CusNumSpinner
					name='familySize'
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					error={form.errors.familySize}
					touch={form.touched.familySize}
					value={form.values.familySize}
				/>
			</>
		),
		file: './gifs/dss/inclusion.gif',
	},

	{
		questionText: 'What is your budget range for purchasing a condo unit?',
		component: (form) => (
			<>
				<VStack
					spacing={1}
					align={'stretch'}
				>
					<Text
						as={'b'}
						fontSize={'sm'}
					>
						Minimum
					</Text>
					<Box>
						<CusNumInputLeftAdd
							name='minimumPrice'
							id={'minimumPrice'}
							add={'₱'}
							placeholder={'0'}
							value={form.values.minimumPrice}
							onChange={(e) => {
								let parts = e.split('.');
								let v = parts[0].replace(/\D/g, '');
								let dec = parts[1];
								Number(dec !== undefined ? v + '.' + dec : v);
								let n = new Intl.NumberFormat('en-US').format(
									v
								);
								n = dec !== undefined ? n + '.' + dec : n;
								form.setFieldValue('minimumPrice', n);
							}}
							onBlur={form.handleBlur}
							error={form.errors.minimumPrice}
							touch={form.touched.minimumPrice}
						/>
					</Box>
					<Text
						as={'b'}
						fontSize={'sm'}
					>
						Maximum
					</Text>
					<Box>
						<CusNumInputLeftAdd
							name='maximumPrice'
							id={'maximumPrice'}
							add={'₱'}
							placeholder={'0'}
							value={form.values.maximumPrice}
							onChange={(e) => {
								let parts = e.split('.');
								let v = parts[0].replace(/\D/g, '');
								let dec = parts[1];
								Number(dec !== undefined ? v + '.' + dec : v);
								let n = new Intl.NumberFormat('en-US').format(
									v
								);
								n = dec !== undefined ? n + '.' + dec : n;
								form.setFieldValue('maximumPrice', n);
							}}
							onBlur={form.handleBlur}
							error={form.errors.maximumPrice}
							touch={form.touched.maximumPrice}
						/>
					</Box>
				</VStack>
			</>
		),
		file: './gifs/dss/real-estate.gif',
	},
];

export default questions;

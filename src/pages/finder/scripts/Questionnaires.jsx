import { Image, Text, VStack, Box } from '@chakra-ui/react';
import { CusNumSpinner } from '../../../customs';
import { CusSliderCheckbox } from '../../../customs';
import { CusNumInputLeftAdd } from '../../../customs';

const questions = [
	// space
	{
		questionText: 'What is this unit for?',
		file: 'https://i.imgur.com/krzxKh4.gif',
		answerOptions: [
			{ answerText: 'Own Property', category: 'larger' },
			{ answerText: 'Investment', category: 'smaller' },
		],
	},

	{
		questionText: 'Do you want a big Space in your unit?',
		file: 'https://i.imgur.com/RgP6hhS.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'larger' },
			{ answerText: 'No', category: 'smaller' },
		],
	},

	{
		questionText: 'Are you a minimalist or maximalist person?',
		file: 'https://i.imgur.com/PYw7DeR.gif',
		answerOptions: [
			{ answerText: 'Minimalist', category: 'smaller' },
			{ answerText: 'Maximalist', category: 'larger' },
		],
	},

	{
		questionText: 'Do you have a lot of personal things? ',
		file: 'https://i.imgur.com/rWQ5n8j.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'larger' },
			{ answerText: 'No', category: 'smaller' },
		],
	},

	{
		questionText:
			'Do you prefer a modern or traditional interior design style?',
		file: 'https://i.imgur.com/gTwhxL4.gif',
		answerOptions: [
			{ answerText: 'Modern', category: 'smaller' },
			{ answerText: 'Traditional', category: 'larger' },
		],
	},

	{
		questionText: 'Do you want your unit also a work place',
		file: 'https://i.imgur.com/NFG4pcC.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'larger' },
			{ answerText: 'No', category: 'smaller' },
		],
	},

	{
		questionText:
			'Is having a smaller utility and maintenance cost a priority for you?',
		file: 'https://i.imgur.com/XECVfs1.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'smaller' },
			{ answerText: "I don't mind", category: 'larger' },
		],
	},

	{
		questionText: 'Do you have pet included',
		file: 'https://i.imgur.com/z3Br1WN.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'larger' },
			{ answerText: 'No', category: 'smaller' },
		],
	},
	//level
	{
		questionText: 'Do you want to have a City view in your unit?',
		file: 'https://i.imgur.com/oLlxYpM.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'higher' },
			{ answerText: 'No', category: 'lower' },
			{ answerText: 'Maybe', category: 'medium' },
		],
	},

	{
		questionText:
			'Do you want a balcony or other outdoor area in your unit?',
		file: 'https://i.imgur.com/eL3cfwQ.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'higher' },
			{ answerText: 'No', category: 'lower' },
			{ answerText: 'Maybe', category: 'medium' },
		],
	},

	{
		questionText:
			'Do you want to have a Palm trees and Pools view in your unit?',
		file: 'https://i.imgur.com/4BdFYoF.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'lower' },
			{ answerText: 'No', category: 'higher' },
			{ answerText: 'Maybe', category: 'medium' },
		],
	},

	{
		questionText: 'Do you want your unit is close to parking floor',
		file: 'https://i.imgur.com/TfCCFfl.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'lower' },
			{ answerText: 'No', category: 'higher' },
			{ answerText: 'Maybe', category: 'medium' },
		],
	},
	{
		questionText: 'Do you want to have easy access on lobby?',
		file: 'https://i.imgur.com/UgSyqtL.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'lower' },
			{ answerText: 'No', category: 'higher' },
			{ answerText: 'Maybe', category: 'medium' },
		],
	},
	{
		questionText:
			'Do you have a senior citizen or a person with a disabilities in your family?',
		file: 'https://i.imgur.com/WKdfKi4.gif',
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
		file: 'https://i.imgur.com/njtHf0q.gif',
	},

	{
		questionText: 'Family Size',
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
		file: 'https://i.imgur.com/m6sGdjY.gif',
	},

	{
		questionText: 'Price',
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
		file: 'https://i.imgur.com/TSPoGjS.gif',
	},
];

export default questions;

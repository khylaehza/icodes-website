const questions = [
	// space
	{
		
		questionText: 'What is this unit for?',
		file: '/imgs/dss/dss-home.jpg',
		answerOptions: [
			{ answerText: 'Own Property', category: 'larger' },
			{ answerText: 'Investment', category: 'smaller' },
		],
		
	},
	
	{	
		questionText: 'Do you want a big Space in your unit?',
		file: '/imgs/dss/dss-unit.jpg',
		answerOptions: [
			{ answerText: 'Yes', category: 'larger' },
			{ answerText: 'No', category: 'smaller' },
		],
	},


	{
		questionText: 'Are you a minimalist or maximalist person?',
		file: 'imgs/dss/dss-minimax.jpg',
		answerOptions: [
			{ answerText: 'Minimalist', category: 'smaller' },
			{ answerText: 'Maximalist', category: 'larger' },
		],
		
	},

	{
		questionText: 'Do you have a lot of personal things? ',
		file: '/imgs/dss/dss-personal-things.jpg',
		answerOptions: [
			{ answerText: 'Yes', category: 'larger' },
			{ answerText: 'No', category: 'smaller' },
		],
		
	},

	{
		questionText: 'Do you prefer a modern or traditional interior design style?',
		file: '/imgs/dss/dss-modern-traditional.png',
		answerOptions: [
			{ answerText: 'Modern', category: 'smaller' },
			{ answerText: 'Traditional', category: 'larger' },
		],
		
	},

	{
		questionText: 'Do you want your unit also a work place',
		file: '/imgs/dss/dss-workplace.jpg',
		answerOptions: [
			{ answerText: 'Yes', category: 'larger' },
			{ answerText: 'No', category: 'smaller' },
		],
	},

	{
		questionText: 'Is having a smaller utility and maintenance cost a priority for you?',
		file: '/imgs/dss/dss-save-cost.png',
		answerOptions: [
			{ answerText: 'Yes', category: 'smaller' },
			{ answerText: "I don't mind", category: 'larger' },
		],
	},


	{
		questionText: 'Do you have pet included',
		file: '/imgs/dss/dss-pet.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'larger' },
			{ answerText: 'No', category: 'smaller' },
		],
		
	},
//level
	{
		questionText: 'Do you want to have a City view in your unit?',
		file: '/imgs/dss/dss-cityview.gif',
		answerOptions: [
			{ answerText: 'Yes', category: 'higher' },
			{ answerText: 'No', category: 'lower' },
			{ answerText: 'Maybe', category: 'medium' },
		],
	},

	
	{
		questionText: 'Do you want a balcony or other outdoor area in your unit?',
		file: '/imgs/dss/dss-balcony.jpg',
		answerOptions: [
			{ answerText: 'Yes', category: 'higher' },
			{ answerText: 'No', category: 'lower' },
			{ answerText: 'Maybe', category: 'medium' },
		],
	},


	{
		questionText: 'Do you want to have a Palm trees and Pools view in your unit?',
		file: '/imgs/dss/dss-pool-trees.jpg',
		answerOptions: [
			{ answerText: 'Yes', category: 'lower' },
			{ answerText: 'No', category: 'higher' },
			{ answerText: 'Maybe', category: 'medium' },
		],
	},

	{
		questionText: 'Do you want your unit is close to parking floor',
		file: '/imgs/dss/dss-parking.jpg',
		answerOptions: [
			{ answerText: 'Yes', category: 'lower' },
			{ answerText: 'No', category: 'higher' },
			{ answerText: 'Maybe', category: 'medium' },
		],
	},
	{
		questionText: 'Do you want to have easy access on lobby?',
		file: '/imgs/dss/dss-lobby.jpg',
		answerOptions: [
			{ answerText: 'Yes', category: 'lower' },
			{ answerText: 'No', category: 'higher' },
			{ answerText: 'Maybe', category: 'medium' },
		],
		
	},
	{
		questionText: 'Do you have a senior citizen or a person with a disabilities in your family?',
		file: '/imgs/dss/dss-persons-with-disabilities.jpg',
		answerOptions: [
			{ answerText: 'Yes', category: 'lower' },
			{ answerText: 'No', category: 'higher' },
		],
		
	},

	/// what is the floor level do you want
	
];

export default questions;

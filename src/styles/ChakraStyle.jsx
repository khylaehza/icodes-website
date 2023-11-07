import { extendTheme } from '@chakra-ui/react';

const activeLabelStyles = {
	transform: 'scale(0.85) translateY(-35px)',
};

const ChakraStyle = extendTheme({
	colors: {
		w: {
			100: '#F8FAFA',
			200: '#E1E6E9',
			300: '#FFFFFF',
		},
		b: {
			100: '#C2CDD9',
			200: '#8695A6',
			300: '#0D2B4D',
			400: '#0A2542',
		},
		g: {
			100: '#D6E4C7',
			200: '#B4CD93',
			300: '#5A674A',
		},
		r: {
			100: '#B91E23',
		},
	},

	components: {
		MenuButton: {
			variants: {
				primary: {
					borderColor: 'b.300',
					bg: 'b.300',
					color: 'w.300',
					_hover: {
						bg: 'b.400',
						boxShadow: 'md',
						transform: 'scale(1.01)',
						transition: 'all .01s ease',
					},
				},
			},
		},
		Button: {
			variants: {
				primary: {
					borderColor: 'b.300',
					bg: 'b.300',
					color: 'w.300',
					_hover: {
						bg: 'b.400',
						boxShadow: 'md',
						transform: 'scale(1.01)',
						transition: 'all .01s ease',
					},
				},
				secondary: {
					bg: 'transparent',
					color: 'b.300',
					border: '1px solid',
					borderColor: 'b.300',
					_hover: {
						boxShadow: 'md',

						bg: 'b.200',
					},
				},
				tertiary: {
					bg: 'transparent',
					color: 'b.200',
					_hover: {
						color: 'b.400',
						transform: 'scale(1.01)',
						transition: 'all .01s ease',
					},
				},
				fourth: {
					bg: 'transparent',
					color: 'b.300',
					_hover: {
						color: 'b.400',
						transform: 'scale(1.01)',
						transition: 'all .01s ease',
					},
				},
			},
		},

		Icons: {
			variants: {
				primeIcon: {
					bg: 'b.100',

					_hover: {
						bg: 'b.400',
						boxShadow: 'md',
						transform: 'scale(1.01)',
						transition: 'all .01s ease',
					},
				},
			},
		},

		Input: {
			variants: {
				fillOutline: {
					field: {
						bg: 'w.300',
						color: 'b.300',
						border: '1px solid',
						borderColor: 'w.200',
						rounded: '5px',

						_hover: {
							bg: 'w.200',
						},
						_focus: {
							bg: 'w.100',
						},
					},
				},
			},
		},

		Form: {
			variants: {
				floating: {
					container: {
						_focusWithin: {
							label: {
								...activeLabelStyles,
							},
						},
						'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label':
							{
								...activeLabelStyles,
							},
						label: {
							top: 0,
							left: 0,
							zIndex: 2,
							position: 'absolute',
							// backgroundColor: 'white',
							pointerEvents: 'none',
							mx: 3,
							px: 1,
							my: 3,

							transformOrigin: 'left top',
						},
					},
				},
			},
		},
	},
});

export default ChakraStyle;

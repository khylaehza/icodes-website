import React from 'react';
import {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
	Image,
} from '@react-pdf/renderer';
//StyleSheet
// Create styles
const styles = StyleSheet.create({
	page: {
		backgroundColor: '#FFFFFF',
	},
	section: {
		margin: 20,
		padding: 10,
		flexGrow: 1,
	},

	title: {
		fontSize: 15,
		marginBottom: 10,
		fontWeight: 700,
		textAlign: 'center',
	},

	name: {
		fontSize: 12,
		fontWeight: 700,
		textAlign: 'center',
	},

	innerSection: {
		margin: 10,
	},

	subTitle: {
		fontSize: 12,
		fontWeight: 700,
	},

	text: {
		fontSize: 11,
		fontWeight: 'normal',
	},

	image: {
		width: '100%',
		marginBottom: 10,
	},
});

const CusPDF = ({ img, data, unit, size }) => {
	let count = 0;

	return (
		<Document>
			<Page
				size='A4'
				style={styles.page}
			>
				<View style={styles.section}>
					<Text style={styles.title}>
						CONGRESSIONAL TOWN CENTER PREFERRED UNIT DESIGN
					</Text>
					<Image
						style={unit && styles.image}
						source={img}
					/>
					<Text>{unit}</Text>
					<Text>{size}</Text>
					<Text style={styles.subTitle}>
						Furnitures and its Measurements
					</Text>
					<View style={styles.innerSection}>
						{data.map((data, key) => {
							if (data.isShown) {
								count++;
								return (
									<Text
										style={styles.text}
										key={key}
									>
										{count}. {data.name} - {data.l} in x{' '}
										{data.w} in (
										{(data.l * 2.54).toFixed(2)} cm x{' '}
										{(data.w * 2.54).toFixed(2)} cm)
									</Text>
								);
							}
						})}
					</View>
				</View>
			</Page>
		</Document>
	);
};

export default CusPDF;

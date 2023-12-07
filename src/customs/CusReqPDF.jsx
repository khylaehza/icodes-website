import React from 'react';
import { Page, Text, View, Document, StyleSheet,Image } from '@react-pdf/renderer';

import moment from 'moment';

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
		color: '#0A2542',
	},

	section2: {
		color: '#0A2542',
		flexDirection: 'row',
	},

	info: {
		flexDirection: 'row',
	},

	name: {
		fontSize: 12,
		fontWeight: 500,
		textAlign: 'center',
	},

	label: {
		fontSize: 11,
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

    reqlabel: {
		fontSize: 11,
		fontWeight: 'normal',
        paddingVertical: 3,
	},

	image: {
		width: '80%',
		marginBottom: 5,
        alignSelf: 'center',
        justifyContent: 'center'
	},
	table: {
		display: 'table',
		width: '100%',
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#bfbfbf',
		marginTop: 10,
	},
	tableRow: {
		flexDirection: 'row',
	},
	tableHeader: {
		flex: 1,
		backgroundColor: '#f0f0f0',
		fontWeight: 'bold',
		padding: 5,
		textAlign: 'center',
		borderTopWidth: 0,
		borderBottomWidth: 1,
		borderRightWidth: 0,
		borderLeftWidth: 0,
		borderColor: '#bfbfbf',
		fontSize: 10,
		color: '#0A2542',
	},
	tableCell: {
		flex: 1,
		borderStyle: 'solid',
		borderWidth: 0,
		borderTopWidth: 0,
		borderBottomWidth: 1,
		padding: 5,
		textAlign: 'center',
		borderColor: '#bfbfbf',
		fontSize: 10,
	},
	alternateRow: {
		backgroundColor: '#f9f9f9',
	},
	additionalSection: {
		marginTop: 5,
		backgroundColor: '#f0f0f0',
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#bfbfbf',
		justifyContent: 'space-between',
	},

});
const CusReqPDF = ({
	data,
    unitOwner
}) => {

	return (
		<Document>
			<Page
				size='A4'
				style={styles.page}
			>
				<View style={styles.section}>
					<Text style={styles.title}>Requirements List</Text>
                    <View style={styles.info}>
                        <Text style={styles.label}>Name:{' '}</Text>
                        <Text style={styles.text}>{unitOwner}{' '}{' '}</Text>
                        <Text style={styles.label}>ID:{' '}</Text>
                        <Text style={styles.text}>{data.UID}{' '}{' '}</Text>
                    </View>
                    <Text style={styles.reqlabel}>Birth/Marriage Certificate</Text>
                    <Image
						style={styles.image}
						src={data.Cert}
					/>
                    <Text style={styles.reqlabel}>Proof of Income</Text>
                    <Image
						style={styles.image}
						src={data.Income}
					/>
                    <Text style={styles.reqlabel}>Proof of Billing</Text>
                    <Image
						style={styles.image}
						src={data.Billing}
					/>
                    <Text style={styles.reqlabel}>Tax Identification Number (TIN)</Text>
                    <Image
						style={styles.image}
						src={data.Tin}
					/>
                    <Text style={styles.reqlabel}>ID 1</Text>
                    <Image
						style={styles.image}
						src={data.Id1}
					/>
                    <Text style={styles.reqlabel}>ID 2</Text>
                    <Image
						style={styles.image}
						src={data.Id2}
					/>
				</View>
			</Page>
		</Document>
	);
};

export default CusReqPDF;

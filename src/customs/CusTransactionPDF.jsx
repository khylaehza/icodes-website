import React from 'react';
import {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
} from '@react-pdf/renderer';

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
  
  	section2:{
      color: '#0A2542',
      flexDirection: 'row'
    },

	info:{
      flexDirection: 'row',
	  justifyContent: 'space-between',
    },

	name: {
		fontSize: 12,
		fontWeight: 500,
		textAlign: 'center',

	},

  	label: {
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
const CusTransactionPDF = ({personalDet,amountDet,table,deduct,remainUnit,remainOthers,totalRemain}) =>{
    return(
     <Document>
		<Page
			size='A4'
			style={styles.page}
		>
			  
			<View style={styles.section} >
				<Text style={styles.title}>
					Transaction List
				</Text> 
				<View style={styles.info}>
                        {personalDet.map((item, index) => (
                            <Text key={index} style={styles.label}>
                                <Text style={styles.text}>
                                    {Object.keys(item)[0]}:
                                </Text>{' '}
                                {Object.values(item)[0]}
								{'     '}
                            </Text>
                        ))}

                        {amountDet.map((item, index) => (
                            <Text key={index} style={styles.label}>
                                <Text style={styles.text}>
                                    {Object.keys(item)[0]}:
                                </Text>₱{' '}
                                    {new Intl.NumberFormat(
										'en-US',
										{
											maximumFractionDigits: 2,
											minimumFractionDigits: 2,
										}
									).format(
										Object.values(item)[0]
									)}
                            </Text>
                        ))}


                </View>
			  
			
			   <View style={styles.table}>
					{/* Table Header */}
					<View style={styles.tableRow}>
						<View style={styles.tableHeader}>
							<Text>No.</Text>
						</View>
                        <View style={styles.tableHeader}>
							<Text>Transaction NO.</Text>
						</View>
						<View style={styles.tableHeader}>
							<Text>DUE DATE</Text>
						</View>
						<View style={styles.tableHeader}>
							<Text>DATE PAID</Text>
						</View>
						<View style={styles.tableHeader}>
							<Text>MODE OF PAYMENT</Text>
						</View>
						<View style={styles.tableHeader}>
							<Text>AMOUNT</Text>
						</View>
                        <View style={styles.tableHeader}>
							<Text>RECEIPT NO.</Text>
						</View>
                        <View style={styles.tableHeader}>
							<Text>REMAINING BALANCE.</Text>
						</View>
					</View>
					{/* Table Rows */}
					{table.map((data,key)=>{
                        if (data.status == 'Paid') {
                            deduct += parseFloat(
                                data.amountPaid.replace(
                                    /,/g,
                                    ''
                                )
                            );
                            return(
                                <View key={key} style={[
                                    styles.tableRow,
                                    key % 2 !== 0 ? styles.alternateRow : null, // Apply alternateRow style to odd-indexed rows
                                  ]}
                                >
                                    <View style={styles.tableCell}>
                                        <Text>{data.num}</Text>
                                    </View>
                                    <View style={styles.tableCell}>
                                        <Text>{data.transactId}</Text>
                                    </View>
                                    <View style={styles.tableCell}>
                                        <Text>{moment(
													data.month
												).format(
													'DD-MM-YYYY'
												)}  </Text>
                                    </View>
                                    <View style={styles.tableCell}>
                                        <Text>{moment(
													data.datePaid
												).format(
													'DD-MM-YYYY'
												)}  </Text>
                                    </View>
                                    <View style={styles.tableCell}>
                                        <Text>{data.paymentMode}</Text>
                                    </View>
                                    <View style={styles.tableCell}>
                                        <Text>{'₱ ' +  data.amountPaid}</Text>
                                    </View>
                                    <View style={styles.tableCell}>
                                        <Text>{data.receiptNo}</Text>
                                    </View>
                                    <View style={styles.tableCell}>
                                        <Text>{`₱ ${new Intl.NumberFormat(
													'en-US',
													{
														maximumFractionDigits: 2,
														minimumFractionDigits: 2,
													}
												).format(
													amountDet[2]
														.Total -
														deduct
												)}`}</Text>
                                    </View>
                            </View>
                            )
                            }
                        })
                    }

				</View>

				{/* <View style={styles.additionalSection}>
					<Text style={styles.label}>REMAINING UNIT BALANCE ({remainPer}% of TCP):</Text>
					<Text style={styles.name}>₱ {remainUnit}</Text>
				</View>
				<View style={styles.additionalSection}>
					<Text style={styles.label}>REMAINING OTHER BALANCE ({remainPer}% of OC):</Text>
					<Text style={styles.name}>₱ {remainOthers}</Text>
				</View>
				<View style={styles.additionalSection}>
					<Text style={styles.label}>TOTAL REMAINING BALANCE:</Text>
					<Text style={styles.name}>₱ {totalRemain}</Text>
				</View> */}
			  
			</View>
		  
			  
		</Page>
	</Document>
    )
}

export default CusTransactionPDF
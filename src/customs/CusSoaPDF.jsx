import React from 'react';
import {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
} from '@react-pdf/renderer';



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


	text: {
		fontSize: 11,
		fontWeight: 'normal',
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
		fontSize: 12,
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
		fontSize: 11,
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
		textAlign: 'left',
		flexDirection: 'row'
	},
  
  
});
const CusSoaPDF = ({personalDet,table,remainPer,remainUnit,remainOthers,totalRemain}) =>{
    return(
     <Document>
		<Page
			size='A4'
			style={styles.page}
		>
			  
			<View style={styles.section} >
				<Text style={styles.title}>
					Statement of Account
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
                </View>
			  
			
			   <View style={styles.table}>
					{/* Table Header */}
					<View style={styles.tableRow}>
						<View style={styles.tableHeader}>
							<Text>NO.</Text>
						</View>
						<View style={styles.tableHeader}>
							<Text>DATE</Text>
						</View>
						<View style={styles.tableHeader}>
							<Text>AMOUNT</Text>
						</View>
						<View style={styles.tableHeader}>
							<Text>OTHER</Text>
						</View>
						<View style={styles.tableHeader}>
							<Text>TOTAL</Text>
						</View>
					</View>
					{/* Table Rows */}
					{table.map((data,key)=>(
						<View key={key} style={[
							styles.tableRow,
							key % 2 !== 0 ? styles.alternateRow : null, // Apply alternateRow style to odd-indexed rows
						  ]}
						>
							<View style={styles.tableCell}>
								<Text>{data.num}</Text>
							</View>
							<View style={styles.tableCell}>
								<Text>{data.month}</Text>
							</View>
							<View style={styles.tableCell}>
								<Text>{data.unit.replace(/±/,'\u20B1')}</Text>
							</View>
							<View style={styles.tableCell}>
								<Text>{data.others.replace(/±/,'\u20B1')}</Text>
							</View>
							<View style={styles.tableCell}>
								<Text>{data.total.replace(/±/,'\u20B1')}</Text>
							</View>
					</View>
					))}
				</View>

				<View style={styles.additionalSection}>
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
				</View>
			  
			</View>
		  
			  
		</Page>
	</Document>
    )
}

export default CusSoaPDF
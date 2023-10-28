import {memo} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {translationValues} from '../staticDataFiles/translationValues';
const {en} = translationValues;

const PartiesWorkTableHeader = (props)=>{
	return(
		<View style={styles.tableHeadingContainer}>
			<Text style={styles.headingTextStyle}>{en.partyName}</Text>
			<Text style={styles.headingTextStyle}>{en.mobile}</Text>
			<Text style={styles.headingTextStyle}>{en.amount}</Text>
			<Text style={styles.headingTextStyle}>{en.workType}</Text>
		</View>
	);
}

export default memo(PartiesWorkTableHeader);

const styles = StyleSheet.create({
	tableHeadingContainer:{
		width:wp('100%'),
		flexDirection:'row',
		alignItems:'center',
		borderWidth:0.9,
		borderColor:'#D1D1D1',
		justifyContent:'space-between',
		alignSelf:'center',
		marginTop:8,
	},
	headingTextStyle:{
		width:wp('25%'),
		paddingVertical:15,
		paddingHorizontal:3,
		borderLeftColor:'#B3B3B3',
		borderLeftWidth:1,
		textAlign:'center',
		fontWeight:'bold',
		fontSize:15,
	},
});
import {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';
// import {changeLoginUserData} from '../learnRedux/actions';

import {getAnObjectFromAsyncStorage} from '../javaScriptFunction/asyncStorageFunctionality';
import {constantValues} from '../staticDataFiles/constantValues';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import LogoutUI from './LogoutUI';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const UserShortDetails = (props)=>{
	// let loginUserData  = useSelector((state)=>state.loginUserData);
	const [loginUserData, setLoginUserData]  = useState('');
	// const dispatchrefrence = useDispatch()		// To send the data in store

	useEffect( ()=>{
		const getBusinessUserData = async ()=>{
			if(!loginUserData || loginUserData){
				let localLoginUserData = await getAnObjectFromAsyncStorage('businessUserData');
				if(localLoginUserData){
					localLoginUserData = JSON.parse(localLoginUserData);
					setLoginUserData(localLoginUserData);
				}
				// dispatchrefrence(changeLoginUserData({
				// 	loginUserData:{
				// 		mobileNumber:constantValues.registeredMobileNumber,
				// 		userName:constantValues.registeredUserName
				// 	}
				// }));
			}
		}
		getBusinessUserData();
	}, []);

	return(
		<View style={styles.userDetailsContainer}>
			<FontAwesome name="user-circle" size={50} color="#B3B3B3" />
			<View style={styles.userDetails}>
				<Text style={styles.userNameStyle}>{loginUserData.userName}</Text>
				<Text>{loginUserData.mobileNumber}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	userDetailsContainer:{
		flexDirection:'row',
		paddingHorizontal:10,
		alignItems:'center',
	},
	userDetails:{
		marginLeft:10,
		paddingVertical:8,
	},
	userNameStyle:{
		fontSize:20,
		fontWeight:'bold',
		color:'#175491',
		marginBottom:11,
		width:wp('39%'),
	}
});
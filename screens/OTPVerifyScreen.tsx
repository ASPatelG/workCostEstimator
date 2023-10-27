import {Text, ScrollView, Image} from 'react-native';
import {useState, useCallback, useMemo, useRef, useEffect} from 'react';

import {constantValues} from '../staticDataFiles/constantValues';
import BoxOTPInput from '../components/boxOTPInput';
import {CommonHeaderComponent} from '../components/commonHeaderComponent';
import ButtonComponent from '../components/buttonComponent';
import {crossPlatformToast} from '../components/crossPlatformToast';
import {changeLoginUserData} from '../learnRedux/actions';
import {saveAnObjectInAsyncStorage} from '../javaScriptFunction/asyncStorageFunctionality';
import {sendSMS} from '../javaScriptFunction/sendSMS';
import {translationValues} from '../staticDataFiles/translationValues';
const {en} = translationValues;

import {styles} from './screens.styles/OTPVerifyStyles';

export const OTPVerifyScreen = (props)=>{
	/* Used to show ui till the app is loading */
	const {route:{params}} = props;

	const [otp, setOTP] = useState(params.otp);
	const [otpValueArray, setOtpValueArray] = useState(['', '', '', '']); 	// To fill generated otp automatically

	useEffect(()=>{
		const openSMSApp = async ()=>{
			console.log('generatedOTP: ', otp);
			const otpSMSText = `Generated OTP --> ${otp} On ASPatel App`;
			const sendSMSResponse = await sendSMS(params.mobileNumber, otpSMSText);
		}
		openSMSApp();
	}, []);

	function onchangeOTP(enteredText){
		const regularExpression = /^[0-9]+$/;
		if(regularExpression.test(enteredText) || enteredText === ''){
			setOTP(enteredText);
		}
		else{
			null
		}
	}

	const clearValueOnFocus = (index)=>{
		otpValueArray.fill('', index, otpValueArray.length - 1);
	}

	const myRefsArray = Array(4).fill(null).map(() => useRef());

	const onchangeBoxValue = (value, index)=>{
		const regularExpression = /^[0-9]+$/;
		if(regularExpression.test(value) || value === ''){
			otpValueArray[index] = value;
			setOtpValueArray([...otpValueArray]);
			if(myRefsArray[index+1]?.current && value){
				myRefsArray[index+1]?.current.focus();
			}
		}
		else{
			null
		}
	}

	const onFocusTextInput = (index)=>{
		let localOtpValueArray = otpValueArray;
		if(otpValueArray[index]){
			for(index; index < otpValueArray?.length; index++){
				localOtpValueArray[index] = '';
			}
			setOtpValueArray([...localOtpValueArray]);
		}
	}


	const onPressVerify = (nativeEvent)=>{
		const {navigation} = props;
		const enteredOTP = otpValueArray.join('');
		if(otp === enteredOTP){
			crossPlatformToast(en.loginSuccess);
			saveAnObjectInAsyncStorage(
				'businessUserData',
				{
					mobileNumber:constantValues.registeredMobileNumber,
					userName:constantValues.registeredUserName
				}
			);
			/* userData has set from constant because i will register user before creating build */
			// navigation.navigate('CostEstimationCalculator');
		}
		else{
			crossPlatformToast(en.wrongOTP);
		}
	};

	const disableVerifyButton = ()=> {
		let disableButton = otpValueArray.some(item => item === '');
		return disableButton
	};

	return(
		<ScrollView style={styles.mainContainer} keyboardShouldPersistTaps={'always'}>
			<CommonHeaderComponent/>
			<Text style={styles.screenHeading}>{en.otpVerify}</Text>
			<Image source={require('../appImage/homeIcon.jpg')}  style={styles.loginIcon} />
			<Text style={styles.otpTitleStyle}>{en.otpSentTo}</Text>
			<Text style={styles.mobileNumberStyle}>{params.mobileNumber}</Text>
			<BoxOTPInput
				onchangeBoxValue={onchangeBoxValue}
				otpValueArray={otpValueArray}
				myRefsArray={myRefsArray}
				boxValueLength = {1}
				otpMaxLength = {4}
				onFocusTextInput={onFocusTextInput}
			/>
			<ButtonComponent
				title={en.verifyOTP}
				onPressIn={onPressVerify}
				disabled={disableVerifyButton()}
				mainContainer={styles.buttonContainer}
			/>
			<Text style={styles.signupHintStyle}>{en.signupHint}</Text>
		</ScrollView>
	);
}
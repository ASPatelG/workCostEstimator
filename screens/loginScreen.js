import {Text, ScrollView, Image} from 'react-native';
import {useState, useCallback, useEffect} from 'react';
import {constantValues} from '../staticDataFiles/constantValues';

import TextInputComponent from '../components/textInputComponent';
import {CommonHeaderComponent} from '../components/commonHeaderComponent';
import ButtonComponent from '../components/buttonComponent';
import {crossPlatformToast} from '../components/crossPlatformToast';

import {generateOTP} from '../javaScriptFunction/generateOTP';
// import {getAnObjectFromAsyncStorage, saveAnObjectInAsyncStorage} from '../javaScriptFunction/asynStorageFunctionality';

import {translationValues} from '../staticDataFiles/translationValues';
const {en} = translationValues;

import {styles} from './screens.styles/loginScreenStyle';

export const LoginScreen = (props)=>{
	/* Used to show ui till the app is loading */
	const [mobileNumber, setMobileNumber] = useState('');
	const [countryCode, setContryCode] = useState('+91');
	const [showOTPUI] = useState(true);		// to otp send ui(by default used mobileNumber)
	// const transRef  = useSelector((state)=>state.transRef);
	// const dispatchrefrence = useDispatch()		// To send the data in store

	// useEffect(()=>{
	// 	const nagigateOnHomeScreen = async ()=>{	// It will navigate on home screen if businessUserData will exist in async Storage
	// 		const businessUserData = await getAnObjectFromAsyncStorage('businessUserData');
	// 		if(businessUserData){
	// 			const {navigation} = props;
	// 			navigation.navigate('CostEstimationCalculator');
	// 		}
	// 	}
	// 	nagigateOnHomeScreen();
	// }, [])

	function onchangeMobileNumber(enteredText){
		const regularExpression = /^[0-9]+$/;
		if(regularExpression.test(enteredText) || enteredText === ''){
			setMobileNumber(enteredText);
		}
		else{
			null
		}
	}

	// useCallback hook used to avoid rerendering of component if not changed props
	const onPressSubmit = async(nativeEvent)=>{
		const {navigation} = props;
		if(constantValues.registeredMobileNumber === mobileNumber || showOTPUI){
			if(showOTPUI){
				let generatedOTP = generateOTP();
				const mobileNumbersArray = [constantValues.registeredMobileNumber];
				navigation.navigate('OTPVerifyScreen', {
					mobileNumber:countryCode+' '+mobileNumber,
					otp:generatedOTP,
				});
				setMobileNumber('');
			}
			else{
				saveAnObjectInAsyncStorage(
					'businessUserData',
					{
						mobileNumber:constantValues.registeredMobileNumber,
						userName:constantValues.registeredUserName
					}
				);
				setMobileNumber('');
				navigation.navigate('CostEstimationCalculator');
			}
		}
		else{
			crossPlatformToast(en.notRegistered);
		}
	}

	return(
		<ScrollView style={styles.mainContainer} keyboardShouldPersistTaps={'always'}>
			<CommonHeaderComponent/>
			<Text style={styles.screenHeading}>{en.login}</Text>
			<Image source={require('../appImage/homeIcon.jpg')}  style={styles.loginIcon} />
			<TextInputComponent
				showFieldLabel={true}
				fieldLabelText={en.enterMobilNumber}
				value={mobileNumber}
				onChangeText={onchangeMobileNumber}
				keyboardType='number-pad'
				// inputIcon={()=>(<FontAwesome name="mobile-phone" size={24} color="black" />)}
				maxLength={10}
				placehodar={en.phoneNumber}
			/>
			<ButtonComponent
				title={showOTPUI ?en.getOTP :en.submit}
				onPressIn={onPressSubmit}
				disabled={mobileNumber.length < 10}
				mainContainer={styles.buttonContainer}
			/>
			{
				showOTPUI
				? <Text style={styles.signupHintStyle}>{en.signupHint}</Text>
				: null
			}
		</ScrollView>
	);
}
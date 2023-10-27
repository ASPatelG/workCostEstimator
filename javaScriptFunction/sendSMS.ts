import { Linking } from 'react-native';

export const sendSMS = (mobileNumber, smsText) => {
	return new Promise( async (resolve, reject) => {
		// Construct the SMS URI
		const smsUri = `sms:${'+91'+mobileNumber}?body=${encodeURIComponent(smsText)}`;
		// Open the default messaging app with the SMS URI
		Linking.openURL(smsUri)
			.then(() => resolve('Messaging app opened.'))
			.catch((err) => resolve("Messaging app couldn't opened, Error: ", err));
	});
};
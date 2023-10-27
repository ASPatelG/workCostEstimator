import {StatusBar} from 'react-native';
	
export const getStatusBarHeight = ()=> {
	const statusBarHeight = StatusBar.currentHeight;
	if(statusBarHeight){
		return statusBarHeight;
	}
	else{
		return 0;
	}
}

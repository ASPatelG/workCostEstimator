import {StatusBar} from 'react-native';
	
export const getStatusBarHeight = ()=> {
	const statusBarHeight = StatusBar.currentHeight;	// For ios device it's returning height 0
	if(statusBarHeight){
		return statusBarHeight;
	}
	else{
		return 0;
	}
}

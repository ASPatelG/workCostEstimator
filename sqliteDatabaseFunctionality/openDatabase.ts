import SQLite from 'react-native-sqlite-storage';
import {Platform} from 'react-native';

/* This function will be use to open database  */
export const openDatabase = ()=> {
	if (Platform.OS === "web") {
		return {
			transaction: () => {
				return {
					executeSql: () => {},
				};
			},
		};
	}	// When if statement will run the above code will not run
	const db = SQLite.openDatabase(
		{ name: 'APSinghDB.db', location: 'default' },
		() => { },
		error => {
			console.error('Error opening database: ', error);
		}
	);

	// const db = SQLite.openDatabase("APSinghDB.db");
	return db;
}
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import {Provider} from 'react-redux';
// import {dataStore} from './learnRedux/dataStore';

import {LoginScreen} from './screens/loginScreen';
import {OTPVerifyScreen} from './screens/OTPVerifyScreen';
import HomeScreen from './screens/homeScreen';
import AddUpdatePartyWorkDetails from './screens/addUpdatePartyWorkDetails';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const ApploadingStack = createNativeStackNavigator();   // App Starting navigation(app root navigation)
function AppMainStack (){
  // dataStore --> To use centralized state,  Provider --> To map all screen with store
  return (
	<NavigationContainer>
	  {/*<Provider store={dataStore}>*/}
		<ApploadingStack.Navigator
		  initialRouteName='LoginScreen'  // To programing practise set ChooseWork
		>
		  <ApploadingStack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
		  <ApploadingStack.Screen name="OTPVerifyScreen" component={OTPVerifyScreen} options={{headerShown:false}}/>
		  <ApploadingStack.Screen name="CostEstimationCalculator" component={CostEstimationCalculator} options={{headerShown:false}}/>
		</ApploadingStack.Navigator>
	  {/*</Provider>*/}
	</NavigationContainer>
  )
}

const CostEstimationStack = createNativeStackNavigator();   // This is cost estimation stack
function CostEstimationCalculator (){
  return (
	<CostEstimationStack.Navigator
	  initialRouteName='HomeScreen'
	>
	  <CostEstimationStack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false, title: 'Back'}}/>
	  <ApploadingStack.Screen name="AddUpdatePartyWorkDetails" component={AddUpdatePartyWorkDetails} options={{headerShown:false}}/>
	</CostEstimationStack.Navigator>
  )
}

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
	<View style={styles.sectionContainer}>
	  <Text
		style={[
		  styles.sectionTitle,
		  {
			color: isDarkMode ? Colors.white : Colors.black,
		  },
		]}>
		{title}
	  </Text>
	  <Text
		style={[
		  styles.sectionDescription,
		  {
			color: isDarkMode ? Colors.light : Colors.dark,
		  },
		]}>
		{children}
	  </Text>
	</View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
	backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  return (
	<AppMainStack/>
	// <SafeAreaView style={backgroundStyle}>
	//   <StatusBar
	//     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
	//     backgroundColor={backgroundStyle.backgroundColor}
	//   />
	//   <ScrollView
	//     contentInsetAdjustmentBehavior="automatic"
	//     style={backgroundStyle}>
	//     <Header />
	//       <AppMainStack/>
	//     <View
	//       style={{
	//         backgroundColor: isDarkMode ? Colors.black : Colors.white,
	//       }}>
	//       <Section title="Step One">
	//         Edit <Text style={styles.highlight}>App.tsx</Text> to change this
	//         screen and then come back to see your edits.
	//       </Section>
	//       <Section title="See Your Changes">
	//         <ReloadInstructions />
	//       </Section>
	//       <Section title="Debug">
	//         <DebugInstructions />
	//       </Section>
	//       <Section title="Learn More">
	//         Read the docs to discover what to do next:
	//       </Section>
	//       <LearnMoreLinks />
	//     </View>
	//   </ScrollView>
	// </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
	marginTop: 32,
	paddingHorizontal: 24,
  },
  sectionTitle: {
	fontSize: 24,
	fontWeight: '600',
  },
  sectionDescription: {
	marginTop: 8,
	fontSize: 18,
	fontWeight: '400',
  },
  highlight: {
	fontWeight: '700',
  },
});

export default App;

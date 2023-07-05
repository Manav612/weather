import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,ScrollView} from 'react-native';

import Weather from './src';
import SunPosition from './src/SunPosition';



export default function App() {
  return (
    <View style={styles.container}>
    
        <Weather/>
        {/* <SunPosition/> */}
       
        
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    // height:500
  },
});

import { StyleSheet, Text, View ,TextInput,Dimensions} from 'react-native'
import React,{useState} from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
const Search = ({fetchWeatherData,navigation}) => {
    const [cityName,setCityName]=useState('');
  return (
    <SafeAreaView>
    <ScrollView>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:Dimensions.get('screen').width -20,paddingVertical:10,borderRadius:35,marginHorizontal:10,backgroundColor:'#f5f5f5'}}>
     <TextInput
        placeholder='Search City'
        value={cityName}
        onChangeText={(text)=>setCityName(text)}
        style={{marginLeft:10}}
     />
     <EvilIcons name='search' size={28} color='black'
        onPress={()=>fetchWeatherData(cityName)}
        style={{marginRight:10}}
     />
    </View>
    <View>

    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({})
import { StyleSheet, Text, View,Alert,ActivityIndicator,ImageBackground } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Constants } from 'expo-constants'
import WeatherInfo from './WeatherInfo'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
const API_KEYS = 'fa87b1a61ceadcd572751e8a2ac3017d'
const Weather = () => {
    const [weatherData,setWeatherData]=useState(null);
    const [loaded,setLoaded]=useState(false);
    // const [cityName,setCityName]=useState('');
    const fetchWeatherData = async(cityName)=>{
        try{
                setLoaded(false);
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEYS}&units=metric&exclude=current,minutely,daily,alerts`)
                if(response.status == 200){
                    const data = await response.json();
                    setWeatherData(data);
                }
                else{
                    setWeatherData(null);
                }
                setLoaded(true)
        }catch(error){
           Alert.alert('Error',error.message);
        }
    }

    // const fetchHourlyForecastData = async (latitude, longitude) => {
       
      
    //       if (response) {
    //         const data = await response.json();
    //         const hourlyForecast = data.hourly;
    //         // Process and use the hourly forecast data as needed
    //         console.log(hourlyForecast);
    //       } else {
    //         throw new Error('Failed to fetch hourly forecast data');
    //       }
    //     }
      

    useEffect(()=>{
        fetchWeatherData('Mumbai');
      
    },[])

if(!loaded){
    return(
        <View  style={styles.container}>
           <ActivityIndicator size="large" color="red"/>
        </View>
    )
}

  return (
    <SafeAreaView style={styles.container}>
   
    <View  style={styles.container}>
    <ImageBackground
        source={require("../assets/C3.gif")}
     >
     <View  style={styles.header}>
        <Text style={styles.title}>Weather App</Text>
        <WeatherInfo weatherData={weatherData} fetchWeatherData={fetchWeatherData}/>
     </View>
     </ImageBackground>
    </View>
    
    </SafeAreaView>
  )
}

export default Weather

const styles = StyleSheet.create({
    container: {
        // flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      header:{
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      title:{
        fontSize:25,
        fontStyle:'italic',
        fontWeight:'bold',
        margin:10
      }
})
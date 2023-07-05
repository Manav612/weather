{
    /* <ScrollView   style={{height:100,backgroundColor:"red"}} >
                                {hourlyWeather.map((hour,index) =>{
                                    return(
                                    <View key={index}  style={styles.hourlyForecastItem}>
                                            <Image
                                                style={{ height: 50, width: 50 }}
                                                source={{
                                                    uri: `http://openweathermap.org/img/wn/${icon}.png`,
                                                }}
                                            />
                                            <Text style={{ fontSize: 18 }}>{hour.temp}°C</Text>
                                            {/* <Text style={{ fontSize: 18 }}>{hour.time}</Text> */
}
{
    /* <Text style={{ fontSize: 18 }}>
                                                {hour.time.split(" ")[1]}
                                            </Text>
                                            <Text style={{ fontSize: 18 }}>{hour.wind_speed} km/h</Text>
                                        </View>  */
}
{
    /* )
                                })}
                                </ScrollView> */
}
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    ImageBackground,
    FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "./Search";
import axios from "axios";
import Compass from "./Compass";
import { ProgressBar, Colors } from "react-native-paper";
const WeatherInfo = ({ weatherData, fetchWeatherData }) => {
    const {
        name,
        visibility,
        weather: [{ icon, description }],
        main: { temp, humidity, feels_like },
        wind: { speed },
        sys: { sunrise, sunset },
    } = weatherData;

    const [hourlyWeather, setHourlyWeather] = useState([]);
    
    
    //   const [suns, setSuns] = useState(new Date(sunset * 1000).toLocaleString());
    //   const [sunr, setSunr] = useState(new Date(sunrise * 1000).toLocaleString());
    const [count, setCount] = useState(0);

    const API_KEY = "d134c4f6fb134da08c0115835232106";
    const cityName = "Mumbai";

    useEffect(() => {
        fetchHourlyWeather();
    }, []);

    const fetchHourlyWeather = async () => {
        // setSuns(new Date(sunset * 1000).toLocaleString());
        // setSunr(new Date(sunrise * 1000).toLocaleString());
        const sunriseTime = new Date(sunrise * 1000);
        const sunriseMinutes =
            sunriseTime.getHours() * 60 + sunriseTime.getMinutes();
        console.log(sunriseMinutes);

        const sunsetTime = new Date(sunset * 1000);
        const sunsetMinutes = sunsetTime.getHours() * 60 + sunsetTime.getMinutes();
        console.log(sunsetMinutes);

        const diff = sunsetMinutes - sunriseMinutes;

        // setInterval(() => {

        const curtime = new Date();
        const currentMinutes = curtime.getHours() * 60 + curtime.getMinutes();
        const parts = 1 / diff;
        if (currentMinutes > sunsetMinutes) {
            setCount(1);
        } else if (currentMinutes < sunriseMinutes) {
            setCount(0);
        } else {
            setCount(parts * (currentMinutes - sunriseMinutes));
        }
        // console.log(currentMinutes);

        //   }, 1000);

        try {
            const response = await axios.get(
                `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=1&aqi=no&alerts=no`
            );
            const { forecast } = response.data;
            //   console.log("ss", forecast.forecastday[0].hour);
            const hourlyData = forecast.forecastday[0].hour.map((hour) => ({
                temp: hour.temp_c,
                time: hour.time,
                wind_speed: hour.wind_kph,
            }));

            setHourlyWeather(hourlyData);
        } catch (error) {
            console.error("Error fetching hourly weather:", error);
        }
    };

    return (
        // <SafeAreaView style={styles.container}>
        <ScrollView>
            <View style={styles.content}>
            <Search fetchWeatherData={fetchWeatherData} />
            {/* <Search fetchWeatherData={fetchWeatherData} /> */}
            

            <View>
                <ProgressBar
                    style={{ marginTop: 10, width: 400 }}
                    progress={count}
                    color="red"
                />
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View>
                        <Image
                            style={{height:50,width:50}}
                            source={require("../assets/sr.png")}
                        />
                        <Text style={styles.infoText}>

                            {new Date(sunrise * 1000).toLocaleString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}{" "}
                        </Text>
                    </View>
                    <View>
                        <Image
                            style={{height:50,width:50,right:10}}
                            source={require("../assets/sunset2.png")}
                        />
                        <Text style={styles.infoText}>

                            {new Date(sunset * 1000).toLocaleString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}{" "}
                        </Text>
                    </View>

                </View>
            </View>
            {/* <View> */}
            {/* style={styles.weatherContainer} */}

            <View style={{ alignItems: "center" }}>
                <Text style={styles.title}>{name}</Text>
            </View>
            {/* <View style={{alignItems:'center'}}>
                             <Text style={styles.title}>{name}</Text>
                        </View> */}
            <View style={styles.logo}>
                <Image
                    style={styles.largeIcon}
                    source={{ uri: `http://openweathermap.org/img/wn/${icon}.png` }}
                />
                <Text style={styles.currentTemp}>{temp} °C</Text>
            <Compass/>
            </View>
            <Text style={styles.description}>{description}</Text>

            {/* <View style={{backgroundColor:'green'}}> */}
            <View style={styles.extraInfo}>
                <View style={styles.info}>
                    {/* <Image
                                        style={styles.smallIcon}
                                        source={require('../assets/temp.gif')}
                                    /> */}
                    <Text style={styles.infoText}>{feels_like} °C</Text>
                    <Text style={styles.infoText}>Feels Like</Text>
                </View>
                <View style={styles.info}>
                    {/* <Image
                                        style={styles.smallIcon}
                                        source={require('../assets/Hum.gif')}
                                    /> */}
                    <Text style={styles.infoText}>{humidity} %</Text>
                    <Text style={styles.infoText}>Humidity</Text>
                </View>
            </View>

            <View style={styles.extraInfo}>
                <View style={styles.info}>
                    {/* <AntDesign
                        name="eye"
                        size={30}
                        color="black"
                        style={{ marginLeft: 50 }}
                    /> */}
                    <Text style={styles.infoText}>{visibility} </Text>
                    <Text style={styles.infoText}>Visibility</Text>
                </View>
                <View style={styles.info}>
                    {/* <Image
                                        style={styles.smallIcon}
                                        source={require('../assets/wind.gif')}
                                    /> */}
                    <Text style={styles.infoText}>{speed} m/s</Text>
                    <Text style={styles.infoText}>Wind Speed</Text>
                </View>
            </View>

            <View style={styles.extraInfo}>
                <View style={styles.info}>
                    {/* <Image
                                        style={styles.smallIcon}
                                        source={require('../assets/Sunrise.gif')}
                                    /> */}
                    <Text style={styles.infoText}>
                        {new Date(sunrise * 1000).toLocaleString()}{" "}
                    </Text>
                    <Text style={styles.infoText}>Sunrise</Text>
                </View>
                <View style={styles.info}>
                    {/* <Image
                                        style={styles.smallIcon}
                                        source={require('../assets/Sunset.gif')}
                                    /> */}
                    <Text style={styles.infoText}>
                        {new Date(sunset * 1000).toLocaleString()}
                    </Text>
                    <Text style={styles.infoText}>Sunset</Text>
                </View>
            </View>
            {/* <Compass/> */}
            {/* </View> */}

            {/* </View> */}
            {/* </View> */}
            <Text style={styles.hourlyForecastTitle}>Hourly Forecast</Text>
            {/* <View> */}
            <FlatList
                horizontal
                data={hourlyWeather}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item: hour }) => (
                    <View style={styles.hourlyForecastItem}>
                        <Image
                            style={{ height: 50, width: 50 }}
                            source={{ uri: `http://openweathermap.org/img/wn/${icon}.png` }}
                        />
                        <Text style={{ fontSize: 18 }}>{hour.temp}°C</Text>
                        {/* <Text style={{ fontSize: 18 }}>{hour.time}</Text> */}
                        <Text style={{ fontSize: 18 }}>{hour.time.split(" ")[1]}</Text>
                        <Text style={{ fontSize: 18 }}>{hour.wind_speed} km/h</Text>
                    </View>
                )}
            />
            {/* <Compass/> */}
            </View>
        </ScrollView>

        // </SafeAreaView>
    );
};

export default WeatherInfo;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // marginTop:15
    },
    content: {
        // flex: 1,
        // backgroundColor: "red",
        // height:'100%'
    },
    // weatherContainer: {
    //     flex: 1,
    // },
    title: {
        width: "100%",
        textAlign: "center",
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 10,
    },
    logo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    largeIcon: {
        width: 150,
        height: 150,
    },
    currentTemp: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
    },
    description: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        margin: 5,
    },
    extraInfo: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 5,
    },
    info: {
        width: Dimensions.get("screen").width / 2.5,
        backgroundColor: "#D0EAFA",
        padding: 10,
        borderRadius: 15,
        justifyContent: "center",
    },
    smallIcon: {
        height: 50,
        width: 50,
        borderRadius: 40,
        marginLeft: 40,
    },
    infoText: {
        textAlign: "center",
        fontSize: 18,
    },
    hourlyForecastTitle: {
        fontSize: 25,
        // marginVertical: 200,
        marginLeft: 10,
        fontWeight: "bold",
    },
    hourlyForecastItem: {
        margin: 5,
        marginBottom: 15,
    },
});

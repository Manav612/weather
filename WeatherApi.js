// // url : "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
// import React, { useEffect, useState } from 'react';
// import { View, Text,ScrollView,SafeAreaView } from 'react-native';
// import axios from 'axios';
// const WeatherForecast = () => {
//     const [weatherData, setWeatherData] = useState([]);
//     const [searchTerm,setSearchTerm]=useState();
//     const cities = [
    
// 'Mumbai',
// 'Hyderabad',
// 'Bengaluru',
// 'Chennai',
// 'Kolkata',
// 'Lucknow',
// 'Jaipur',
// 'Pune',
// 'Ahmedabad',
// 'Surat',
// 'Kanpur',
// 'Visakhapatnam',
// 'Nagpur',
// 'Mangaluru',
// 'Udaipur',
// 'Jodhpur',
// 'Madurai',

// 'Kochi',

// 'Vadodara',

// 'Nashik',

// 'Bhopal',

// 'Amritsar',

// // Coimbatore,

// // Varanasi,

// // Asansol,

// // Indore,

// // Jamshedpur,

// // Bhubaneswar,
// // Agra,
// // Patna,
// // Durgapur,
// // Mysuru,
// // Dehradun,
// // Thrissur,
// // Kollam,
// // Kozhikode,
// // Ludhiana,
// // Thiruvananthapuram,
// // Thane,
// // Ajmer,
// // Warangal,
// // Kurnool,
// // Puducherry,
// // Rajkot,
// // Pop,
// // Ghaziabad,
// // Pop,
// // Firozabad,
// // Siliguri,
// // Faridabad,
// // Pop,
// // Saharanpur,
// // Gaya,
// // Kolhapur,
// ]; // Replace with your desired city names
//     const API_KEY = 'fa87b1a61ceadcd572751e8a2ac3017d';
  
//     useEffect(() => {
//       const fetchWeatherData = async () => {
//         try {
//           const requests = cities.map(city =>
//             axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
//           );
//           const responses = await Promise.all(requests);
//           const data = responses.map(response => response.data);
//           setWeatherData(data);
//           console.log(data);
//         } catch (error) {
//           console.error('Error fetching weather data:', error);
//         }
//       };
  
//       fetchWeatherData();
//     }, []);
  
//     if (weatherData.length === 0) {
//       return (
//         <View>
//           <Text>Loading weather data...</Text>
//         </View>
//       );
//     }
  
//     return (
//         <SafeAreaView>
//       <View style={{marginTop:30}}>
//         <ScrollView>
//         {weatherData.map((data, index) => (
//           <View key={index}>
//             <Text>City: {data.name}</Text>
//             <Text>Current Temperature: {data.main.temp}°C</Text>
//             <Text>Description: {data.weather[0].description}</Text>
//             <Text>--------------------</Text>
            
//           </View>
//         ))}
//         </ScrollView>
//       </View>
//       </SafeAreaView>
//     );
//   };
  
//   export default WeatherForecast;
  


// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, SafeAreaView, TextInput, Button,TouchAb } from 'react-native';
// import axios from 'axios';

// const WeatherForecast = () => {
//   const [weatherData, setWeatherData] = useState([]);
//   const [SearchTerm, setsearchTerm] = useState("");
//   const [searchedArray, setSearchedArray] = useState([]);
//   const cities = ['Mumbai',
//   'Hyderabad',
//   'Bengaluru',
//   'Chennai',
//   'Kolkata',
//   'Lucknow',
//   'Jaipur',
//   'Pune',
//   'Ahmedabad',
//   'Surat',
//   'Kanpur',
//   'Visakhapatnam',
//   'Nagpur',
//   'Mangaluru',
//   'Udaipur',
//   'Jodhpur',
//   'Madurai',]
//   const API_KEY = 'fa87b1a61ceadcd572751e8a2ac3017d';

//   const searchFilterFunction = (text) => {
//     // Check if searched text is not blank
//     if (text) {
//       // Inserted text is not blank
//       // Filter the masterDataSource
//       // Update FilteredDataSource
//       const newData = searchPost.filter(function (item) {
//         const itemData = item.RandomName
//           ? item.RandomName.toUpperCase()
//           : "".toUpperCase();
//         const textData = text.toUpperCase();
//         return itemData.indexOf(textData) > -1;
//       });
//       setSearchedArray(newData);
//       setsearchTerm(text);
//     } else {
//       // Inserted text is blank
//       // Update FilteredDataSource with masterDataSource
//       setSearchedArray(searchPost);
//       setsearchTerm(text);
//     }
//   };


//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       try {
//         const requests = cities.map(city =>
//           axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
//         );
//         const responses = await Promise.all(requests);
//         const data = responses.map(response => response.data);
//         setWeatherData(data);
//         console.log(data);
//       } catch (error) {
//         console.error('Error fetching weather data:', error);
//       }
//     };

//     fetchWeatherData();
//   }, []);

//   if (weatherData.length === 0) {
//     return (
//       <View>
//         {SearchTerm ? (
//           <Text>No weather data found for {SearchTerm}</Text>
//         ) : (
//           <Text>Loading weather data...</Text>
//         )}
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView>
//       <View style={{ marginTop: 30 }}>
//         <ScrollView>
//         <View>
//         <TextInput
//           placeholder="Search Name"
//           style={{ textAlign: "center", width: "90%" }}
//           onChangeText={(text) => searchFilterFunction(text)}
//           value={SearchTerm}
//         ></TextInput>
//         <TouchableOpacity onPress={()=> {setsearchTerm('')}}/>
//          {weatherData.map((data, index) => (
//             <View key={index}>
//               <Text>City: {data.name}</Text>
//               <Text>Current Temperature: {data.main.temp}°C</Text>
//               <Text>Description: {data.weather[0].description}</Text>
//               <Text>--------------------</Text>
//             </View>
//           ))}
//         </View>
        
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default WeatherForecast;


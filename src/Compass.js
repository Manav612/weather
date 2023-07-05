
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { Magnetometer } from 'expo-sensors';

const Compass = () => {
  const [heading, setHeading] = useState(0);
  const [isAvailable, setAvailable] = useState(false);

  useEffect(() => {
    // Request permission and start magnetometer updates
    const startMagnetometer = async () => {
      const { status } = await Magnetometer.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Magnetometer permission not granted');
        return;
      }

      Magnetometer.setUpdateInterval(100); // Set the update interval in milliseconds

      Magnetometer.addListener(handleMagnetometerData); // Start listening for magnetometer updates

      setAvailable(true);
    };

    startMagnetometer();

    // Clean up on component unmount
    return () => {
      Magnetometer.removeAllListeners();
    };

  }, []);

  const handleMagnetometerData = (magnetometerData) => {
    const { x, y, z } = magnetometerData;

    // Calculate the heading from magnetometer data
    const newHeading = (Math.atan2(y, x) * 90 - 100) / Math.PI;
    const adjustedHeading = newHeading >= 0 ? newHeading : 360 + newHeading;

    setHeading(adjustedHeading);
  };

  const imageRotationStyle = {
    transform: [{ rotate: `${heading.toFixed(0)}deg` }],
  };

  return (
    <View style={styles.container}>
      {isAvailable ? (
        <>
          <Image
            style={[styles.compassImage, imageRotationStyle]}
            source={require('../assets/cooo.png')}
          />
          {/* <Text style={styles.headingText}>{heading.toFixed(0)}°</Text> */}
        </>
      ) : (
        <Text style={styles.unavailableText}>Compass data unavailable</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20
  },
  compassImage: {
    height: 150,
    width: 150,
  },
  headingText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  unavailableText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: 'red',
  },
});

export default Compass;

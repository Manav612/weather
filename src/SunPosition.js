import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ProgressBar, Colors } from 'react-native-paper';
const SunPosition = () => {
  
  return (
    <View>
      <ProgressBar style={{marginTop: 30,width:300}}progress={0} color="#49B5F2" />
    </View>
  )
}

export default SunPosition

const styles = StyleSheet.create({})
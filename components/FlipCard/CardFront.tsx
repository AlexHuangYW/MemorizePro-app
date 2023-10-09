import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {SharedValue} from 'react-native-reanimated'
interface IProps{
  rotate: SharedValue<number>,
  front: string
};

const CardFront = ({rotate, front}:IProps)=>{
    return (
        <View>
            <Pressable onPress={()=>{
                rotate.value = rotate.value ? 0 : 1;
                }} style={styles.container}>
                <Text style={styles.front}>{front}</Text>
            </Pressable>
            
        </View>
      
    );
  }
export default CardFront;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8ecae6',
    width: 300,
    height: 200,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center'
  },
  
  front: {
    fontSize: 18,
    color: '#023047',
    alignSelf: 'center',

  },

});
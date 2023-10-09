import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import { createBox } from "@shopify/restyle";
import { ThemeProps } from "../../theme";
import Button from "../Button";

interface IProps{
  rotate: SharedValue<number>,
  back: string;
  onReview: (isCorrect: boolean) => void;
};

const Box = createBox<ThemeProps>();

const CardBack = ({rotate, back, onReview}:IProps)=> {
  

    const handleButtonPress = (isCorrect: boolean) => {
        onReview(isCorrect);
        rotate.value = 0;
    };
    
    return (
        <>
        <Pressable 
        onPress={()=>{
            rotate.value = rotate.value ? 0 : 1;
        }} 
        style={styles.container}>
        <Text style={styles.front}>{back}</Text>
      </Pressable>
       <Box flexDirection="row" mt='xl' justifyContent="center" gap='xl'>
        <Button label='Correct' variant="primary" onPress={() => handleButtonPress(true)}/>
        <Button label='Incorrect' variant="secondary" onPress={() => handleButtonPress(false)}/>
        </Box>
        </>
      
    );
  }
export default CardBack;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#023047',
    width: 300,
    height: 200,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center'
  },
  front: {
    fontSize: 18,
    color: '#8ecae6',
    alignSelf: 'center',
  },

});
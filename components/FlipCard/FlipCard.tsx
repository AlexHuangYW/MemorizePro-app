import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import CardBack from './CardBack';
import CardFront from './CardFront';
import React, { useEffect } from 'react';

interface FlipCardProps{
    front: string,
    back: string;
    onReview: (isCorrect: boolean) => void;
  };

const FlipCard: React.FC<FlipCardProps> = ({ front, back, onReview}) => {
    const rotate = useSharedValue(0);

    const frontAnimatedStyles = useAnimatedStyle(()=>{
        const rotateValue = interpolate(rotate.value,[0,1],[0,180])
        return{
        transform:[
            {
            rotateY : withTiming(`${rotateValue}deg`,{duration:1000})
            }
        ]
        }
    })
    const backAnimatedStyles = useAnimatedStyle(()=>{
        const rotateValue = interpolate(rotate.value,[0,1],[180,360])
        return{
        transform:[
            {
            rotateY : withTiming(`${rotateValue}deg`,{duration:1000})
            }
        ]
        }
    })
  return (
    <View style={styles.container}>
      <View>
      <Animated.View style={[styles.frontcard,frontAnimatedStyles]}>
        <CardFront rotate={rotate} front={front}/>
      </Animated.View>
      <Animated.View style={[styles.backCard,backAnimatedStyles]}>
        <CardBack rotate={rotate} back={back} onReview={onReview}/>
      </Animated.View>
      </View>
   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
 frontcard:{
position:"absolute",
backfaceVisibility:'hidden'
 },
 backCard:{
backfaceVisibility:"hidden"
 },
  button:{
    paddingHorizontal:25,
    paddingVertical:5,
    backgroundColor:"#8ecae6",
    marginTop:10,
    borderRadius:5,
  },
 
});

export default FlipCard;
import React from 'react';
import {
    TouchableOpacity,
    Dimensions
   } from 'react-native';
import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "../../theme";
import { ICard } from '../../interface/card'

export type CardProps = {
    item: ICard,
    onPress: Function
};

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

const Card: React.FC<CardProps> = ({item, onPress}) => {
    const width = Dimensions.get('window').width - 40;
    const { title, front } = item;

  return (
    <TouchableOpacity onPress={onPress}>
        <Box width={width/2-10} p='s' borderRadius={10} backgroundColor='purple'>
        <Text variant='body' numberOfLines={2} color='white'>
            {title}
        </Text>
        <Text variant='body' numberOfLines={3}>
            {front}
        </Text>
        </Box>
    </TouchableOpacity>
    
    
  );
};


export default Card;

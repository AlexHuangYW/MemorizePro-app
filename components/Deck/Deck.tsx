import React from 'react';
import {
    TouchableOpacity
   } from 'react-native';
import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "../../theme";

import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather';
import ReactTimeAgo from 'react-time-ago';

export type DeckProps = {
    id: String,
    title: String,
    desc: String,
    time: number | Date,
    onPress: Function

};
const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

const Deck: React.FC<DeckProps> = ({title, time, id, desc, onPress}) => {

  return (
    <TouchableOpacity onPress={onPress}>
        <Box flexDirection='row' alignItems='center' justifyContent='space-between' borderBottomWidth={1} opacity={0.7}>
            
            <Box alignItems='flex-start'>
                <Box paddingHorizontal='m' pt='s'>
                    <Text variant='body'>{title}</Text>
                </Box>
                <Box flexDirection='row' paddingHorizontal='m' paddingVertical='s'>
                    <Box flexDirection='row' alignItems='center' pr='m'>
                        <MaterialCommunityIcons name="credit-card-fast" color='gray' size={15}/>
                        <Text variant='smallBody' color='darkGray'>3</Text>

                    </Box>
                    <Box flexDirection='row' alignItems='center'>
                        <Feather name="edit" color='darkGray'/>
                        <Text>
                            
                        </Text>

                    </Box>
                </Box>
            </Box>
            <Box pr='s'>
                <Icon name='right'/>
            </Box>   
        </Box>
    </TouchableOpacity>
    
    
  );
};

export default Deck;

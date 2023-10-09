import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// import Carousel from 'react-native-snap-carousel';

// import BannerSlider from '../components/BannerSlider';
// import {windowWidth} from '../utils/Dimensions';

// import {freeGames, paidGames, sliderData} from '../model/data';
// import CustomSwitch from '../components/CustomSwitch';
// import ListItem from '../components/ListItem';
import { createText, createBox } from "@shopify/restyle";
import { ThemeProps } from "../../theme";
import Button from '../Button'
export type EditProfileProps = {


};
const Text = createText<ThemeProps>();
const Box = createBox<ThemeProps>();


const EditProfile: React.FC<EditProfileProps> = () => {
    
  return (
    <SafeAreaView>
      <ScrollView>
        <Box alignSelf='center' width='90%' backgroundColor='white' borderRadius={20} m='l'>
            <Box alignItems='flex-start' paddingHorizontal='m' pt='m'>
                <Text variant='body'>John Doe</Text>
                <Text variant='body'>JohnDoe111@gmail.com</Text>
            </Box>
       
            <Box alignSelf='center' paddingVertical='m' width='90%'>
                <Button label="Edit Profile" variant="primary"/>
            </Box>
            
        </Box>

     
   
      </ScrollView>
    </SafeAreaView>
  );
}
 export default EditProfile;
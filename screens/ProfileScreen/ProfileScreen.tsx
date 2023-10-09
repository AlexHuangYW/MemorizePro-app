import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { createText, createBox } from "@shopify/restyle";
import { ThemeProps } from "../../theme";
import EditProfile from '../../components/EditProfile/EditProfile';
import Setting from '../../components/Setting/Setting';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


export type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<any,any>

};
const Text = createText<ThemeProps>();
const Box = createBox<ThemeProps>();

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {

  return (
    <SafeAreaView>
      <EditProfile />
      <Setting navigation={navigation}/>
    </SafeAreaView>
  );
}
 export default ProfileScreen;
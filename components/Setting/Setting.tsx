import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Modal,
  View,
  Alert,
} from 'react-native';
import { createText, createBox } from "@shopify/restyle";
import { ThemeProps } from "../../theme";
import Icon from 'react-native-vector-icons/AntDesign';
import { FIREBASE_AUTH } from '../../firebase';
import { signOut } from 'firebase/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type SettingProps = {
    navigation: NativeStackNavigationProp<any,any>


};
const Text = createText<ThemeProps>();
const Box = createBox<ThemeProps>();

const SECTIONS = [
    {id: 'about', label:'About', icon: 'infocirlceo'},
    {id: 'settings', label:'Settings', icon: 'setting'},
    {id: 'help', label:'Help', icon: 'smileo'},
    {id: 'contact', label:'Contact', icon: 'inbox'},
    {id: 'logout', label:'Logout', icon: 'logout'},
]

const auth = FIREBASE_AUTH;

const Setting: React.FC<SettingProps> = ({navigation}) => {
  const [value, setValue] = React.useState(0);

  const confirmSignOut = async () => {
    const response = await signOut(auth);
    console.log("log out", response)
    navigation.replace('Onboarding')
  };

  const handleSectionPress = (label: string, index: number) => {
    setValue(index);
    if (label === 'Logout') {
      console.log("pass")
      displaySignOutAlert()
    }
  };

  const displaySignOutAlert = () => {
    Alert.alert(
      'Are you sure you want to sign out?',
      '',
      [
        {
          text: 'Confirm',
          onPress: () => confirmSignOut(),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel'),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Box alignSelf='center' width='90%' backgroundColor='white' borderRadius={20} >
            {SECTIONS.map(({label, icon}, index)=>{
                const isActive = value === index;
                return (
                    <TouchableOpacity onPress={() => handleSectionPress(label, index)} key={index}>
                      
                        <Box key={index} flexDirection="row" justifyContent="space-between" borderBottomWidth={1} borderColor='gray' p='s'>
                          <Box flexDirection="row"  alignItems='center' g='s'>

                          <Icon name={icon} size={20} />
                            <Text variant='body' fontWeight='400'>{label}</Text>
                          </Box>
                          <Icon name='right' />
                          
                        </Box>
                        
                        
                    </TouchableOpacity>
                )

            })}
            

        </Box>
        
      </ScrollView>   
    </SafeAreaView>
  );
}
 export default Setting;
import {
  Alert,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
//import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
//import { RootStackParamList } from "../types";
import AppTextInput from "../../components/AppTextInput";
import Button from '../../components/Button'
import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "../../theme";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase";

export type LoginScreenProps = {
  navigation: NativeStackNavigationProp<any,any>

};

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = FIREBASE_AUTH;
  const handleSignIn = async() => {
      try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);
        navigation.navigate('Main');
      } catch (error:any) {
        Alert.alert('Sign in failed: ' + error.message);
      };
  }



  return (
    <SafeAreaView>
      <Box p="xl" width='100%'>
        <Box alignItems= "center">
          <Text variant="title">
            Login here
          </Text>
          <Text
          variant="body">
            Welcome back you've been missed!
          </Text>
        </Box>
        <Box marginVertical='m'>
          <AppTextInput 
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <AppTextInput 
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
        </Box>

        <Box marginBottom='xl'>
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.small,
              color: Colors.primary,
              alignSelf: "flex-end",
            }}
          >
            Forgot your password?
          </Text>
        </Box>
            <Button label="Sign in" variant="primary" onPress={handleSignIn}/>
      
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
        >
          <Text variant= "smallBody" p='xl'>
            Create new account
          </Text>
        </TouchableOpacity>

        <View>
          <Text variant="smallBody" color="blue" fontWeight="700">
            Or continue with
          </Text>

          <View
            style={{
              marginTop: Spacing,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.gray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}
            >
              {/* <Ionicons
                name="logo-google"
                color={Colors.text}
                size={Spacing * 2}
              /> */}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.gray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}
            >
              {/* <Ionicons
                name="logo-apple"
                color={Colors.text}
                size={Spacing * 2}
              /> */}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.gray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}
            >
              {/* <Ionicons
                name="logo-facebook"
                color={Colors.text}
                size={Spacing * 2}
              /> */}
            </TouchableOpacity>
          </View>
        </View>
      </Box>
    </SafeAreaView>
  );
};

export default LoginScreen;

function alert(message: any) {
  throw new Error("Function not implemented.");
}


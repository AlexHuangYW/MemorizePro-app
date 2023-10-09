import {
    Alert,
    SafeAreaView,
    TouchableOpacity,
    View,
  } from "react-native";
import React, { useState } from "react";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";

import {  NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppTextInput from "../../components/AppTextInput";
import { createBox, createText } from "@shopify/restyle";
import Button from "../../components/Button/Button";
import { ThemeProps } from "../../theme";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';

export type RegisterScreenProps = {
    navigation: NativeStackNavigationProp<any,any>
};

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();
  
const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    
    const auth = FIREBASE_AUTH;
    
    const handleSignUp = async() => {
        if (password !== confirmPassword) {
            // 检查密码和确认密码是否匹配
            Alert.alert("Password Mismatch", "Password and Confirm Password do not match.");
            return;
          };

          try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            navigation.navigate('Main');
          } catch (error:any) {
            Alert.alert('Sign up failed: ' + error.message);
          };

        
      }

    return (
        <SafeAreaView>
        <Box p='m'>
            <View
            style={{
                alignItems: "center",
            }}
            >
            <Text variant="title">
                Create account
            </Text>
            <Text variant="body">
                Create an account. Let's get started!
            </Text>
            </View>
            <Box p='m'>
                <AppTextInput placeholder="Email" 
                value={email}
                onChangeText={text => setEmail(text)}
                />
                <AppTextInput placeholder="Password"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />
                <AppTextInput 
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    secureTextEntry={true}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
            </Box>

        <Box p='m'>
            <Button label="Sign up" variant="primary" onPress={handleSignUp}/>

        </Box>
            
            <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            >
            <Text variant="smallBody">
                Already have an account
            </Text>
            </TouchableOpacity>

            <View
            style={{
                marginVertical: Spacing * 3,
            }}
            >
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

export default RegisterScreen;


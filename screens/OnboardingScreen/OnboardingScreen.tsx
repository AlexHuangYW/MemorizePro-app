import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { createContext } from "react";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createText, createBox } from "@shopify/restyle";
import { ThemeProps } from "../../theme";
import Button from "../../components/Button/Button";

const { height } = Dimensions.get("window");


export type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<any,any>

};
const Text = createText<ThemeProps>();
const Box = createBox<ThemeProps>();

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({navigation}) => {
  return (
    <SafeAreaView>
      <View>
        <ImageBackground
          style={{
            height: height / 2.5,
          }}
          resizeMode="contain"
          source={require("../../assets/images/welcome-img.png")}
        />
        <View
          style={{
            paddingHorizontal: Spacing * 4,
            paddingTop: Spacing * 4,
          }}
        >
          <Text
       
            variant="title"
          >
            Welcome to MemorizePro
            
          </Text>

          <Text
      
            variant="body"
          >
            An app designed to help you enhance your memory. Let us help you achieve your learning goals.
          </Text>
        </View>
        {/* <View
          style={{
            paddingHorizontal: Spacing * 2,
            paddingTop: Spacing * 6,
            flexDirection: "row",
          }}
        > */}
        <Box flexDirection="row" mt='xl' justifyContent="center" gap='xl'>
          <Button label='sign in' variant="primary" onPress={() => navigation.navigate("Login")}/>
          <Button label='sign up' variant="secondary" onPress={() => navigation.navigate("Register")}/>

        </Box>
          {/* <TouchableOpacity
            onPress={() => navigate("Login")}
            style={{
              backgroundColor: Colors.primary,
              paddingVertical: Spacing * 1.5,
              paddingHorizontal: Spacing * 2,
              width: "48%",
              borderRadius: Spacing,
              shadowColor: Colors.primary,
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              shadowOpacity: 0.3,
              shadowRadius: Spacing,
            }}
          >
            <Text
              style={{
                fontFamily: Font["poppins-bold"],
                color: Colors.onPrimary,
                fontSize: FontSize.large,
                textAlign: "center",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate("Register")}
            style={{
              paddingVertical: Spacing * 1.5, */
              /* paddingHorizontal: Spacing * 2,
              width: "48%",
              borderRadius: Spacing,
            }}
          > */}
            {/* <Text
              style={{
                fontFamily: Font["poppins-bold"],
                color: Colors.text,
                fontSize: FontSize.large,
                textAlign: "center",
              }}
            >
              Register
            </Text>
          </TouchableOpacity> */}
        </View>
   
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({});

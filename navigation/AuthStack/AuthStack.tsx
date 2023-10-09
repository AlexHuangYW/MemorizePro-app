import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import OnboardingScreen from '../../screens/OnboardingScreen';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import TabNavigator from '../../navigation/TabNavigator';
import DeckDetailScreen from '../../screens/DeckDetailScreen';
import {NavigationContainer} from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../../api/todo';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
    
      
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        {/* <Stack.Screen name="Main" component={TabNavigator} /> */}
    
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
import React, { useEffect, useState } from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNavigator from '../TabNavigator';
import DeckDetailScreen from '../../screens/DeckDetailScreen';
import NewCard from '../../screens/NewCard';
import ReviewScreen from '../../screens/ReviewScreen';
import {NavigationContainer} from '@react-navigation/native';

export type AppStackProps = {

};

const AppStack: React.FC<AppStackProps> = () => {

  const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Main'
            component={TabNavigator}
            options={{ headerShown: false }}
          />
            
            <Stack.Screen 
              name='DeckDetail'
              component={DeckDetailScreen}
              options={({ navigation, route }) => ({ 
                headerTitle: "",
              })}
            />

            <Stack.Screen 
              name='NewCard'
              component={NewCard}
              options={({ navigation, route }) => ({ 
                headerTitle: "New Card",
              })}
            />

            <Stack.Screen 
              name='Review'
              component={ReviewScreen}
              options={({ navigation, route }) => ({ 
                headerTitle: "Review Card",
              })}
            />   
          </Stack.Navigator>
        </NavigationContainer>

    );
}
export default AppStack;
  
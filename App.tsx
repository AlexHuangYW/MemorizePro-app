import React, { useEffect, useState } from 'react';
import AuthStack from './navigation/AuthStack';
import { ThemeProvider } from '@shopify/restyle';
import { theme } from './theme';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebase';
import { User } from 'firebase/auth';
import AppStack from './navigation/AppStack';
import messaging from '@react-native-firebase/messaging';
import { getTodos } from './api/todo';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState<User | null>(null);

  const getToken = async() => {
    const authStatus = await messaging().requestPermission();
    const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
  const token = await messaging().getToken();
  console.log({token})

  }

  

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user)
    });
    // push notification
    getToken();

    //console.log(todosQuery.isLoading)


  }, []);

   return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          {user? <AppStack />  : <AuthStack />}
        </ReduxProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
//import PushNotificationIOS from '@react-native-community/push-notification-ios';
//import PushNotification from 'react-native-push-notification';

import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

AppRegistry.registerComponent(appName, () => App);


// PushNotification.configure({
//     onRegister: function(token) {
//       console.log('Token:', token)
//     },
//     onNotification: function(notification) {
//       console.log('notification:', notification);
//       notification.finish(PushNotificationIOS.FetchResult.NoData)
//     },
//     channelId: '1',

//     permissions: {
//         alert: true,
//         badge: true,
//         sound: true,
//     },

//     popInitialNotification: true,

//     requestPermissions: Platform.OS === 'ios',
//   });
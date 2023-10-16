import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { RootState } from '../../redux/store';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DeckInputModal from '../../components/DeckInputModal';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "../../theme";
import { AppState } from '../../interface/redux';
import { addDeck } from '../../redux/slices/deck';
import Deck from '../../components/Deck';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { IDeck } from '../../interface/deck';
import { isEmpty } from 'lodash';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GetLocation from 'react-native-get-location';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { getAddressFromCoordinates } from '../../api/location';

export type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any,any>
};
type AddressResult = {
  TimeZoneId: string;
  GMT_offset: number;
  TimeZoneName: string;
  LocalTime_Now: string;
  Country: string;
  CountryId: string;
}

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [decks, setDecks] = useState<IDeck[] | undefined>();
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [address, setAddress]= useState<AddressResult>();

  const reduxDeck = useAppSelector((state: AppState) => state.decks);
  const dispatch = useAppDispatch();


  const handleOnSubmit = async (title: String, desc: String) => {
    const deck = { id: Date.now(), title, desc, time: Date.now() };
    dispatch(addDeck(deck));
    setDecks(reduxDeck.decks)
    
    //await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };
  const openDeck = (deck: IDeck) => {
    navigation.navigate('DeckDetail', {deck} );
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        });
  
        setLatitude(location.latitude);
        setLongitude(location.longitude);
  
        const result: AddressResult = await getAddressFromCoordinates({ latitude, longitude });
   
        setAddress(result);

      } catch (error) {
        console.error(error);
      }
    };
  
    fetchLocation();
    setDecks(reduxDeck.decks);
  
  }, [reduxDeck, latitude, longitude]);
  

  useEffect(() => {
    if (address && address.TimeZoneId) {
      console.log("why", address);
      navigation.setOptions({
        headerRight: () => (
          <Box flexDirection='row'>
            <EntypoIcon name='location-pin' size={20} />
            <Text variant='body'>{address?.TimeZoneId}</Text>
          </Box>
        ),
      });
    }
  }, [address, navigation]);




  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <Box alignItems='flex-start' >
          
          <Text variant="title">
              Decks
          </Text>
        </Box>

        <Box borderColor='gray' borderWidth={1} flexDirection="row" alignItems='center' borderRadius={8} p='s' marginHorizontal='m'mb='m'>
          <AntDesignIcon name='search1' color='gray'/>
          <TextInput placeholder="Search" />
        </Box>
          
          
        <Box height={0} borderTopWidth={6}  borderColor='gray' >

        </Box>
        <ScrollView>
          {!isEmpty(decks) ?
            (
              decks?.map(( item:IDeck, index ) => {
              return <Deck key={index} title={item.title} id={item.id} time={item.time} desc={item.desc} onPress={() => openDeck(item)} />
              }
              )
            ):  
            (
              <Box alignItems='center'  padding='xl'>
                <Text variant='title' color='gray'>Add Decks</Text>
              </Box>
            )
              
          }

      </ScrollView>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Box position= 'absolute' zIndex={1} right={15} bottom={50} backgroundColor="blue" p='m' borderRadius={50} elevation={5}>
          <Icon name='plus' color='white'/>
        </Box>
      </TouchableOpacity>
      
      
      <DeckInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />

    </SafeAreaView>
  );
}
 export default HomeScreen;
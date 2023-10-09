import React, {useEffect, useState} from 'react';
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

export type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any,any>
};

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [decks, setDecks] = useState<IDeck[] | undefined>();

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

  useEffect(()=> {
    setDecks(reduxDeck.decks) 
  }, [reduxDeck]);

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
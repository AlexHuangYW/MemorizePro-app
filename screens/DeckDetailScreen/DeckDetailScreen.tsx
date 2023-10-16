import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Alert, FlatList, Button} from 'react-native';
import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "../../theme";

import Card from '../../components/Card';
import PopUpMenu from '../../components/PopUpMenu';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IDeck } from '../../interface/deck';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { removeDeck } from '../../redux/slices/deck';
import { AppState } from '../../interface/redux';
import { isEmpty } from 'lodash';
import { addCard } from '../../redux/slices/card';
import { ICard } from '../../interface/card';
import { RouteProp } from '@react-navigation/native';


const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export type DeckDetailProps = {
  navigation: NativeStackNavigationProp<any,any>,
  route: RouteProp<{ params: {deck: IDeck} }, 'params'> 
};

const DeckDetailScreen: React.FC<DeckDetailProps> = ({navigation, route}) => {
  const { id, title, desc } = route.params.deck;
  const [cards, setCards] = useState<ICard[]>([]);

  const dispatch = useAppDispatch();
  const reduxDeck = useAppSelector((state: AppState) => state.decks);
  const reduxCard = useAppSelector((state: AppState) => state.cards);
 
  const [visible, setVisible] = useState<boolean | undefined>(false);

  const hideMenu = () => setVisible(false);
  
  const showMenu = () => setVisible(true);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <EntypoIcon name='dots-three-horizontal' size={20} onPress={() => showMenu()} />
      ),
    });
    const targetDeck = reduxDeck.decks.find((deck) => deck.id === id);

    if (targetDeck) {
      const cardsInTargetDeck = targetDeck.cards;
      setCards(cardsInTargetDeck);
    }

  }, [navigation, cards, reduxDeck]);
  

  const deleteDeck = () => {
    dispatch(removeDeck(id));
    navigation.goBack();
  };

  const navigateToNewCard = () => {
    navigation.navigate("NewCard", {id, title})
  };

  const handleToReview = () => {
    navigation.navigate("Review")
  }

  const handleEditCard = (item: ICard) => {
    const isEdit = true
    navigation.navigate("NewCard", {isEdit, item, id, title})
  }

  return (
   
      <Box alignItems='flex-start' height="100%">
        
        <Text variant='title' color="black">
          My Deck
        </Text>
        {
          !(isEmpty(desc)) ? (
            <><Text variant='header'>
            Description
          </Text><Box alignSelf='center' width='90%' backgroundColor='white' borderRadius={10}>
              <Text variant='body' color='dark'>{desc}</Text>
            </Box></>

          ): null
        }
        
        <Text variant='header'>
          My Cards
        </Text>
        <Box alignSelf='center' width="90%" >
          <FlatList
                data={cards}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                  paddingTop: 0
               
                }}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <Card item={item} onPress={() => handleEditCard(item)}/>
                )}
            />

        </Box>
        <Box position='absolute' zIndex={1} left={200}>
          <PopUpMenu showMenu={showMenu} hideMenu={hideMenu} visible={visible} deleteDeck={deleteDeck} navigateToNewCard={navigateToNewCard}/>
        </Box>
        <Box position='absolute' bottom={0} backgroundColor='white' width="100%" height={50} zIndex={1}>
          <Button title='Review' onPress={handleToReview}/>
        </Box>
      </Box>
 
  );
};


export default DeckDetailScreen;
import React, { useState, useEffect } from 'react';
import { View, Button, TextInput } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
//import "react-native-get-random-values";
//import { v4 as uuidv4 } from 'uuid';
import { addCard, editCard } from '../../redux/slices/card';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createBox, createText } from '@shopify/restyle';
import { ThemeProps } from "../../theme";
import { AppState } from '../../interface/redux';
import { RouteProp } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import { addCardToDeck, addDeck, updateCardInDeck } from '../../redux/slices/deck';
import { ICard } from '../../interface/card';

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export type NewCardProps = {
  navigation: NativeStackNavigationProp<any,any>,
  route: RouteProp<{ params: {id: string, title: string, item: ICard, isEdit: boolean|undefined} }, 'params'>
   
};

const NewCard: React.FC<NewCardProps> = ({navigation, route}) => {
  const [title, setTitle] = useState<String>('');
  const [front, setFront] = useState<String>('');
  const [back, setBack] = useState<String>('');

  const {id: deckId, title: deckTitle, item: card, isEdit} = route.params;
  useEffect(() => {
    if (isEdit && card) {
      setTitle(card.title);
      setFront(card.front);
      setBack(card.back);
    }
  }, [isEdit, card]);

  const dispatch = useAppDispatch();
  const reduxDeck = useAppSelector((state: AppState) => state.decks);

  const initialCardData = {
      id: Date.now(), 
      title,
      front,
      back,
      level: 0, 
      interval: 1, 
      lastReviewDate: Date.now(), 
    };

  const handleCreateCard = (front: string | undefined, back: string | undefined, title: string | undefined) => {
      if (!isEmpty(front) && !isEmpty(back) && !isEmpty(title)) {
        if (isEdit) {
          dispatch(
            editCard({
              id: card.id, // 卡片的 ID
              title,
              front,
              back,
            })
          );
          dispatch(
            updateCardInDeck({
              deckId, // 牌组的 ID
              cardId: card.id, // 卡片的 ID
              updatedProps: {
                title,
                front,
                back,
              },
            })
          );

        } else {
          const newCard = initialCardData;
          dispatch(addCard(newCard));
          dispatch(
              addCardToDeck({
                deckId,
                newCard
              })
          );
          };
        }

      setFront('');
      setBack('');
      navigation.goBack()
  };

  useEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Text variant='body' color='blue' onPress={() => handleCreateCard(front, back, title)}>
              Save
          </Text>
        ),
      });
    }, [navigation, title, front, back]);

  return (
    <Box>
        <Box>
          <Box alignItems='flex-start'>
            <Text variant='header'>
              Title
            </Text>
            <Box backgroundColor='lightBlue' height={25} width="90%" alignSelf='center' borderRadius={8} borderColor='blue' borderWidth={2}>
              <TextInput
                  value={title}
                  placeholder='  Please input title'
                  onChangeText={(text) => setTitle(text)}>
              </TextInput>
            </Box>
          </Box>
        
        <Box alignItems='flex-start'>
        <Text variant='header'>
            Front
        </Text>
        <Box backgroundColor='lightBlue' height={200} width="90%" alignSelf='center' borderRadius={8} borderColor='blue' borderWidth={2}>
            <TextInput
                value={front}
                multiline
                placeholder='  Please input front'
                onChangeText={(text) => setFront(text)}>
            </TextInput>

        </Box>
    </Box>
        
    </Box>
    <Box alignItems='flex-start'>
        <Text variant='header'>
            Back
        </Text>
        <Box backgroundColor='lightBlue' height={200} width="90%" alignSelf='center' borderRadius={8} borderColor='blue' borderWidth={2}>
            <TextInput
                value={back}
                multiline
                placeholder='  Please input back'
                onChangeText={(text) => setBack(text)}>
            </TextInput>
        </Box>
    </Box>
    </Box>
  );
}

export default NewCard;



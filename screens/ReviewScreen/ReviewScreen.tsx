import React, { useCallback, useEffect, useState } from 'react';
import { View, Button, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { AppState } from '../../interface/redux';
import { createBox, createText } from '@shopify/restyle';
import { ThemeProps } from "../../theme";
import { updateCard } from '../../redux/slices/card';
import { ICard } from '../../interface/card';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import FlipCard from '../../components/FlipCard';
import { isEmpty } from 'lodash';

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

const ReviewScreen = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [reviewing, setReviewing] = useState<boolean>(true);
  const [currentCard, setCurrentCard] = useState<ICard>();

  const dispatch = useAppDispatch();

  const cards = useAppSelector((state: AppState) => state.cards);


  const handleReviewCard = useCallback((isCorrect: boolean) => {
    if (!currentCard) {
        console.log("enter")
        return;
      }
    
    console.log("here test",currentCard)
    const currentDate = Date.now();
    const lastReviewDate = currentCard.lastReviewDate;
    const interval = currentCard.interval;
  
    if (currentDate >= lastReviewDate + interval) {
      let newLevel = currentCard.level;
      let newInterval = currentCard.interval;
  
      if (isCorrect) {
        newLevel++;
        // 根据级别调整间隔时间，可以使用您之前提到的方法
        newInterval = calculateNewInterval(newLevel);
      } else {
        newLevel = 0;
        newInterval = 1;
      }

      console.log("newLevel", newLevel)
  
      const updatedCard = {
        ...currentCard,
        level: newLevel,
        interval: newInterval,
        lastReviewDate: currentDate,
      };
  
      // 使用 Redux action 更新卡片信息
      dispatch(updateCard(updatedCard));
      
    }
  
    // 将当前卡片索引移至下一张卡片
    if (currentCardIndex < cards.cards.length - 1) {
        console.log("here pass")
      setCurrentCardIndex(currentCardIndex + 1);
      const newCurrentCard = cards.cards[currentCardIndex];
      console.log("new one", newCurrentCard)
      setCurrentCard(newCurrentCard)
    } else {
      // 所有卡片都已评审完毕
      setReviewing(false);
    }
    }, [cards, currentCardIndex]);
  

  

    const calculateNewInterval = (level) => {
        // 定义一个基础间隔时间，例如 1 天
        const baseInterval = 1; // 这里可以根据需求调整基础间隔时间
      
        // 使用指数增长来计算新的间隔时间
        // 例如，每个级别将间隔时间乘以 2
        const newInterval = baseInterval * Math.pow(2, level);
      
        return newInterval;
      };

    useEffect(() => {
        setCurrentCard(cards.cards[currentCardIndex]); 
    }, [currentCardIndex, currentCard, cards]);

    useEffect(() => {
        setReviewing(true);
    }, []);

  return (
    <View style={{backgroundColor:"blue"}}>
      {reviewing ? (
        <View>
        {
            !isEmpty(currentCard) &&
            <FlipCard 
                front={currentCard?.front} 
                back={currentCard?.back} 
                onReview={handleReviewCard}  
            />
        }
      </View>
      ) : (
        <View>
            <Text>All Done!!!!</Text>
        </View>
      )}
      
      
    </View>
  );
};


export default ReviewScreen;

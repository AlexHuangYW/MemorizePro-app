import { createSlice } from '@reduxjs/toolkit';

import  { ICard } from '../../interface/card';

interface ICardsState {
    cards: ICard[];
};

const initialState: ICardsState = {
    cards: []
};

const cardSlice = createSlice({
    name: 'Card',
    initialState,
    reducers: {
        addCard: (state, { payload }) => {
            console.log("payload", payload)
            state.cards.push(payload);
        },
        updateCard: (state, action) => {
            const { id, level, interval, lastReviewDate } = action.payload;
            const cardToUpdate = state.cards.find((card) => card.id === id);
            if (cardToUpdate) {
              cardToUpdate.level = level;
              cardToUpdate.interval = interval;
              cardToUpdate.lastReviewDate = lastReviewDate;
            }
        },
        deleteCard: (state, action) => {
          const cardIdToDelete = action.payload;
          // 在卡片数组中查找要删除的卡片的索引
          const indexToDelete = state.cards.findIndex((card) => card.id === cardIdToDelete);
          if (indexToDelete !== -1) {
            state.cards.splice(indexToDelete, 1); // 从卡片数组中删除卡片
          }
        },
        editCard: (state, action) => {
          const editedCard = action.payload;
          console.log("editedCard", editedCard)
          const cardToEdit = state.cards.find((card) => card.id === editedCard.id);
          if (cardToEdit) {
            // 更新卡片的属性
            cardToEdit.title = editedCard.title;
            cardToEdit.front = editedCard.front;
            cardToEdit.back = editedCard.back;
          }
        },
    },
});

export const { addCard, updateCard, deleteCard, editCard } = cardSlice.actions;
export default cardSlice.reducer;
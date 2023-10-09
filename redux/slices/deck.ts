import { createSlice } from '@reduxjs/toolkit';
import  { IDeck } from '../../interface/deck';


interface IDecksState {
    decks: IDeck[];
};

const initialState: IDecksState = {
    decks: []
};

const deckSlice = createSlice({
    name: 'Deck',
    initialState,
    reducers: {
        addDeck: (state, { payload }) => {
            state.decks.push(payload);
        },
        removeDeck: (state, { payload }) => {
            state.decks.splice(state.decks.findIndex(deck => deck.id === payload.id), 1);
        },
        addCardToDeck: (state, { payload }) => {
            console.log("deck paload", payload)
            // find specific deck
            const targetDeck = state.decks.find((deck) => deck.id === payload.deckId);
            if (targetDeck) {
                if (!Array.isArray(targetDeck.cards)) {
                    // if cards is not a array，initial
                    targetDeck.cards = [];
                  }
                  targetDeck.cards.push(payload.newCard);
                
            }
            console.log("deck slice", state.decks[0].cards)
        },
        updateCardInDeck: (state, action) => {
            const { deckId, cardId, updatedProps } = action.payload;
            const targetDeck = state.decks.find((deck) => deck.id === deckId);
            if (targetDeck) {
              const targetCard = targetDeck.cards.find((card) => card.id === cardId);
              if (targetCard) {
                // 更新卡片的属性
                Object.assign(targetCard, updatedProps);
              }
            }
          },
        removeCardFromDeck: (state, { payload }) => {
            // find specific deck
            const targetDeck = state.decks.find((deck) => deck.id === payload.deckId);
            if (targetDeck) {
            // remove
                targetDeck.cards.splice(
                    targetDeck.cards.findIndex((card) => card.id === payload.cardId),
                    1
                );
            }
        },
    },
  });
  
  export const { addDeck, removeDeck, addCardToDeck, removeCardFromDeck, updateCardInDeck} =
    deckSlice.actions;
  export default deckSlice.reducer;
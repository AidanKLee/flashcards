import { createSlice } from '@reduxjs/toolkit';

export const cardsSlice = createSlice({
    name: 'cards',
    initialState: {
        cards: {}
    },
    reducers: {
        addCards: (state, action) => {
            //declare payload variables
            const { quizCards } = action.payload;
            //iterate over cards
            quizCards.forEach(card => {
                //build the new card
                const newCard = {
                    id: card.id,
                    frontQuestion: card.frontQuestion,
                    backAnswer: card.backAnswer
                }
                //return new quiz to add to state
                state.cards = {
                    ...state.cards,
                    [card.id]: newCard
            }
            })
        }
    }
})

//selector for Cards
export const selectCards = state => state.cards;

//actions for Cards
export const { addCards } = cardsSlice.actions;

//reducer
export default cardsSlice.reducer 
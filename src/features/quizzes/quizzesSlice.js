import { createSlice } from '@reduxjs/toolkit';

export const quizzesSlice = createSlice({
    name: 'quizzes',
    initialState: {
        quizzes: {}
    },
    reducers: {
        addQuiz: (state, action) => {
            //declare payload variables
            const { name, topicId, id } = action.payload;
            //build the new quiz
            const newQuiz = {
                id: id,
                name: name,
                topicId: topicId,
                cardIds: []
            }
            //return new quiz to add to state
            state.quizzes = {
                ...state.quizzes,
                [id]: newQuiz
            }
        },
        addCardIds: (state, action) => {
            //declare payload variables
            const { quizId, quizCards } = action.payload;
            //iterate over cards array
            quizCards.forEach(card => {
                const { id } = card;
                state.quizzes = {
                    ...state.quizzes,
                    [quizId]: {
                        ...state.quizzes[quizId],
                        cardIds: [...state.quizzes[quizId].cardIds, id]
                    }
                }
            })
        }
    }
})

//selector for Quizzes
export const selectQuizzes = state => state.quizzes;

//actions for Quizzes
export const { addQuiz, addCardIds } = quizzesSlice.actions;

//reducer
export default quizzesSlice.reducer 
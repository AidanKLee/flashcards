import { createSlice } from '@reduxjs/toolkit';
import { v4 as createId } from 'uuid';

export const topicsSlice = createSlice({
    name: 'topics',
    initialState: {
        topics: {},
    },
    reducers: {
        addTopic: (state, action) => {
            //declare payload variables
            const { name, icon } = action.payload;
            //create unique ID
            const id = createId();
            //build the new topic
            const newTopic = {
                id: id,
                name: name,
                icon: icon,
                quizIds: []
            }
            //return new topic to add to state
            state.topics = {
                ...state.topics,
                [id]: newTopic
            }
        },
        addQuizId: (state, action) => {
            //declare payload variables
            const { id, topicId } = action.payload;
            //return new quiz ID to correct topic
            state.topics = {
                ...state.topics,
                [topicId]: {
                    ...state.topics[topicId],
                    quizIds: [...state.topics[topicId].quizIds, id]
                }
            }
        }
    }
})

//selector for Topics
export const selectTopics = state => state.topics;

//actions for Topics
export const { addTopic, addQuizId } = topicsSlice.actions;

//reducer
export default topicsSlice.reducer;
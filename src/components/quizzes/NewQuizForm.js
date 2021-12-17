import React, { useState } from 'react';
import './NewQuizForm.css';
import { useSelector, useDispatch } from 'react-redux';
import { addQuiz, addCardIds } from '../../features/quizzes/quizzesSlice';
import { selectTopics, addQuizId } from '../../features/topics/topicsSlice';
import { addCards } from '../../features/card/cardsSlice';
import { v4 } from 'uuid';

function NewQuizForm() {

    const createId = v4;

    const dispatch = useDispatch();

    const topics = useSelector(selectTopics);

    const [ name, setName ] = useState('');
    const [ topicId, setTopicId ] = useState('');
    const [ quizCards, setQuizCards ] = useState([{id: createId(), frontQuestion: '', backAnswer: ''}]);

    const handleChangeName = e => setName(e.target.value);
    const handleChangeTopicId = e => setTopicId(e.target.value);

    const addCard = () => {
        if (name && topicId) {
            setQuizCards([...quizCards, {id: createId(), frontQuestion: '', backAnswer: ''}])
        }
    }
    const handleCardChange = e => {
        quizCards.forEach((card, index) => {
            if (e.target.name === card.id + 'front') {
                setQuizCards([
                    ...quizCards.slice(0, index),
                    {...card, frontQuestion: e.target.value},
                    ...quizCards.slice(index + 1)
                ])
            } else if (e.target.name === card.id + 'back') {
                setQuizCards([
                    ...quizCards.slice(0, index),
                    {...card, backAnswer: e.target.value},
                    ...quizCards.slice(index + 1)
                ])
            }
        })
    }
    const handleCardDelete = e => {
        e.preventDefault();
        if (quizCards.length > 1) {
            setQuizCards(
                quizCards.filter(card => card.id !== e.target.name)
            )
        }
    }

    const handleClear = e => setName('');
    const handleSubmit = e => {
        e.preventDefault();
        if (name && topicId) {
            const newQuiz = {
                name: name,
                topicId: topicId,
                id: createId()
            }
            dispatch(addQuiz(newQuiz));
            dispatch(addQuizId(newQuiz));

            const cards = {
                quizId: newQuiz.id,
                quizCards: quizCards
            }
            dispatch(addCards(cards))
            dispatch(addCardIds(cards))

            setName('');
            setQuizCards([{id: createId(), frontQuestion: '', backAnswer: ''}]);
            document.getElementById('quizForm').reset();
        }
    }

    const renderCardForm = () => {
        if (name && topicId) {
            return (
                <div className='formAddCard'>
                    <div className='mainNewQuizHeader'>
                        <h3>
                            Quiz Cards
                        </h3>
                        <svg onClick={addCard} className='mainNewQuizHeaderImg' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                    </div>
                    {  
                        quizCards.map(card => {
                        return (
                            <div key={card.id}>
                                <input required onChange={handleCardChange} name={card.id + 'front'} id={card.frontQuestion} placeholder='Enter a Question...' />
                                <input required onChange={handleCardChange} name={card.id + 'back'} id={card.backAnswer} placeholder='Enter The Answer...' />
                                <div className='formAddCardRemove'> 
                                <label className='formAddCardRemoveLabel'>
                                    <button className='formAddCardRemoveButton' onClick={handleCardDelete} name={card.id}/>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13H5v-2h14v2z"/></svg>
                                </label>
                                </div>  
                            </div>
                        )    
                        })
                    }
                </div>
                
            )
        }
    }

    return (
        <div>
            <h1>
                New Quiz
            </h1>
            <form id='quizForm' onSubmit={handleSubmit}>
                <input required onChange={handleChangeName} type='text' name='quizName' id='quizName' placeholder='Quiz Name' value={name}/>
                <select required onChange={handleChangeTopicId} name='quizTopic' id='quizTopic'>
                    <option disabled selected>Select a Quiz Topic...</option>
                    {
                        Object.values(topics.topics).map(topic => {
                            return <option key={topic.id} name={topic.name} value={topic.id}>{topic.name}</option>
                        })
                    }
                </select>
                {renderCardForm()}
                <div className='formButtonWrapper'>
                    <button className='button' type='submit'>Submit</button>
                    <button onClick={handleClear} className='button red' type='reset'>Clear</button>
                </div>
            </form>
        </div>
    )
}

export default NewQuizForm;
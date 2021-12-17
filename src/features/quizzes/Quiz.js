import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTopics } from '../../features/topics/topicsSlice';
import { selectQuizzes } from '../../features/quizzes/quizzesSlice';
import { selectCards } from '../../features/card/cardsSlice';

function Quiz() {

    const { quizId } = useParams();
    const quiz = useSelector(selectQuizzes).quizzes[quizId];
    const topics = useSelector(selectTopics);
    const cards = useSelector(selectCards);

    const [ cardNumber, setCardNumber ] = useState(0);

    const quizTopic = () => {
        let thisTopic = {};
        Object.values(topics.topics).forEach(topic => {
            if (topic.quizIds.includes(quizId)) {
                thisTopic = topic
            }
        })
        return thisTopic;
    }

    const quizCards = () => {
        if (quiz) {
            const cardIds = quiz.cardIds;
            let quizCards = [];
            Object.values(cards.cards).forEach(card => {
                if (cardIds.includes(card.id)) {
                    quizCards = [...quizCards, card];
                }
            })
            return quizCards;
        }
    }

    const cardOrder = () => {
        if (quizCards()) {
            let order = ['Click the card to start the quiz'];
            quizCards().forEach(card => {
                const { frontQuestion, backAnswer } = card;
                order.push(frontQuestion);
                order.push(backAnswer);
            })
            order.push("You've finished the quiz! Click To Restart");
            return order;
        }
    }

    const isEven = (value) => {
        if (value%2 === 0)
            return true;
        else
            return false;
    }

    const handleCardClick = () => {
        if (cardNumber === cardOrder().length - 1) {
            setCardNumber(0)
        } else {
            setCardNumber(cardNumber + 1)
        }
    }

    const cardText = cardOrder() ? cardOrder()[cardNumber] : 'This is an invalid quiz'

    return (
        <section className='appMainQuiz'>
            <div className='appMainSectionsHeader'>
                <h1>
                    Quiz: {quiz ? quiz.name : ''}
                </h1>
                <img className='appMainSectionsHeaderImg' src={quizTopic().icon} alt={quizTopic().name}/>
            </div>
            <p className='appMainQuizTopicText'>
                Topic: {quizTopic().name}
            </p>
            <div onClick={handleCardClick} className='appMainQuizCard'>
            {
                cardNumber !== 0 && cardNumber !== cardOrder().length - 1 ?
                <h2>
                    Card Number {`${Math.ceil(cardNumber / 2)} of ${quizCards().length}`}
                </h2>
                :
                ''
            }
            {
                cardNumber !== 0 && cardNumber !== cardOrder().length - 1 ?
                
                isEven(cardNumber) ? <p className='smallPrint'>Click The Card For the Next Question</p> : <p className='smallPrint'>Click The Card To Reveal The Answer</p> 
                :
                ''
            }
            
                <p>
                    {cardText}
                </p>
                <img className='appMainQuizCardImg' src={quizTopic().icon} alt={quizTopic().name}/>
            </div>
            
        </section>
    )
}

export default Quiz;
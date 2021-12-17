import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTopics } from '../../features/topics/topicsSlice';
import { selectQuizzes } from '../../features/quizzes/quizzesSlice';

function Topic() {

    const { topicId } = useParams();
    const topic = useSelector(selectTopics).topics[topicId];
    const quizzes = useSelector(selectQuizzes);

    const quizzesInTopic = () => {
        if (topic.quizIds) {
            const quizIds = topic.quizIds;
            let quizzesInTopic = [];
            quizIds.forEach(id => {
                Object.values(quizzes.quizzes).forEach(quiz => {
                    if (id === quiz.id) {
                        quizzesInTopic = [...quizzesInTopic, quiz]
                    }
                })
            })
        return quizzesInTopic;
        }
    }

    const renderQuizzes = () => {
        if (topic.quizIds) {
            const quizzes = quizzesInTopic();
            return (
                <ul className='appMainQuizzesList'>
                    {
                        quizzes.map(quiz => {
                            return (
                                <Link
                                    className='appMainTopicsListLink'
                                    to={`/quizzes/${quiz.id}`}
                                    key={quiz.id}
                                >
                                    <li key={quiz.id} className='appMainQuizzesListItem'>
                                        <img src={topic.icon} alt={quiz.name}/>
                                        <div className='appMainQuizzesListItemInfo'>
                                            <h2>
                                                {quiz.name}
                                            </h2>
                                            <p>
                                                Topic: <strong>{topic.name}</strong>
                                            </p>
                                            <p>
                                                Number of Question Cards: <strong>{quiz.cardIds.length}</strong>
                                            </p>
                                        </div>
                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>
            )
        }
    }

    return (
        <section className='appMainTopic'>
            <div className='appMainSectionsHeader'>
                <h1>
                    Topic: {topic.name}
                </h1>
                <img className='appMainSectionsHeaderImg' src={topic.icon} alt={topic.name}/>
            </div>
            {topic.quizIds.length > 0 ? renderQuizzes() : <h6>There are currently no quizzes created for this topic. Head to the new quiz page to create your first {topic.name} quiz.</h6>}
        </section>
    )
}

export default Topic;
import React from 'react';
import './Quizzes.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectQuizzes } from '../../features/quizzes/quizzesSlice';
import { selectTopics } from '../../features/topics/topicsSlice';

function Quizzes() {

    const quizzes = useSelector(selectQuizzes);
    const topics = useSelector(selectTopics);

    const selectQuizIcon = (quizId) => {
        let icon;
        let name;
        Object.values(topics.topics).forEach(topic => {
            if (topic.quizIds.includes(quizId)) {
                icon = topic.icon;
                name = topic.name;
            }
        })
        return {icon: icon, name: name}
    }

    const renderQuizzes = () => {
        if (quizzes.quizzes) {
            return (
                <ul className='appMainQuizzesList'>
                    {
                        Object.values(quizzes.quizzes).map(quiz => {
                            const icon = selectQuizIcon(quiz.id).icon;
                            const topicName = selectQuizIcon(quiz.id).name
                            return (
                                <Link
                                    className='appMainTopicsListLink'
                                    to={`/quizzes/${quiz.id}`}
                                    key={quiz.id}
                                >
                                    <li key={quiz.id} className='appMainQuizzesListItem'>
                                        <img src={icon} alt={quiz.name}/>
                                        <div className='appMainQuizzesListItemInfo'>
                                            <h2>
                                                {quiz.name}
                                            </h2>
                                            <p>
                                                Topic: <strong>{topicName}</strong>
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
        <section className='appMainQuizzes'>
            <div className='appMainSectionsHeader'>
                <h1>
                    Quizzes
                </h1>
                <Link className='button' to='/quizzes/newQuiz'>Create A New Quiz</Link>
            </div>
            {Object.values(quizzes.quizzes).length > 0 ? renderQuizzes() : <h6>There are currently no quizzes created. Click The "Create A New Quiz" Button</h6>}
        </section>
    )
}

export default Quizzes;
import React from 'react';
import './Topics.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTopics } from '../../features/topics/topicsSlice';

function Topics() {

    const topics = useSelector(selectTopics);

    const renderTopics = () => {
        if (topics.topics) {
            return (
                <ul className='appMainTopicsList'>
                    {
                        Object.values(topics.topics).map(topic => {
                            return (
                                <Link
                                    className='appMainTopicsListLink'
                                    to={`/topics/${topic.id}`}
                                    key={topic.id}
                                >
                                    <li className='appMainTopicsListItem'>
                                        <img src={topic.icon} alt={topic.name}/>
                                        <h2>
                                            {topic.name}
                                        </h2>
                                        <p>Number of Quizzes: <strong>{topic.quizIds.length}</strong></p>
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
        <section className='appMainTopics'>
            <div className='appMainSectionsHeader'>
                <h1>
                    Topics
                </h1>
                <Link className='button' to='/topics/newTopic'>Create A New Topic</Link>
            </div>
            {Object.values(topics.topics).length > 0 ? renderTopics() : <h6>There are currently no topics created. Click The "Create A New Topic" Button</h6>}
        </section>
    )
}

export default Topics;
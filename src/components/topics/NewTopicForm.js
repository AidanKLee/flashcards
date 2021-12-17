import React, { useState } from 'react';
import './NewTopicForm.css';
import { allIcons } from '../../data/icons';
import { useDispatch } from 'react-redux';
import { addTopic } from '../../features/topics/topicsSlice';

function NewTopicForm() {

    const dispatch = useDispatch();

    const [ name, setName ] = useState('');
    const [ iconSrc, setIconSrc ] = useState('');
    
    const handleChangeName = e => setName(e.target.value);
    const handleChangeIconSrc = e => setIconSrc(e.target.value);
    const handleClear = e => setName('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && iconSrc) {
            const newTopic = {
                name: name,
                icon: iconSrc
            }
            dispatch(addTopic(newTopic))
            setName('');
            setIconSrc('');
            document.getElementById('topicForm').reset();
        }
    }

    return (
        <div>
            <h1>
                New Topic
            </h1>
            <form id='topicForm' onSubmit={handleSubmit}>
                <input onChange={handleChangeName} type='text' name='topicName' id='topicName' placeholder='Topic Name' value={name}/>
                <select onChange={handleChangeIconSrc} name='topicIcon' id='topicIcon'>
                    <option disabled selected>Select an Icon...</option>
                    {allIcons.map(icon => {
                        return <option key={icon.name} name={icon.name} value={icon.url}>{icon.name}</option>
                    })}
                </select>
                <div className='formButtonWrapper'>
                    <button className='button' type='submit'>Submit</button>
                    <button onClick={handleClear} className='button red' type='reset'>Clear</button>
                </div>
            </form>
        </div>
    )
}

export default NewTopicForm;
import React from 'react';
import './App.css';
import Quizzes from '../features/quizzes/Quizzes';
import NewQuizForm from '../components/quizzes/NewQuizForm';
import Quiz from '../features/quizzes/Quiz'
import Topics from '../features/topics/Topics';
import NewTopicForm from '../components/topics/NewTopicForm';
import Topic from '../features/topics/Topic';
import {
  Routes,
  Route,
  NavLink,
  Outlet
} from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <header className="appHeader">
        <nav className='appHeaderNav'>
          <ul className='appHeaderNavList'>
            <li className='appHeaderNavListItem'>
              <NavLink activeclassname='active' to='/topics'><p>Topics</p></NavLink>
            </li>
            <li className='appHeaderNavListItem'>
              <NavLink activeclassname='active' to='/quizzes'><p>Quizzes</p></NavLink>
            </li>
            <li className='appHeaderNavListItem'>
              <NavLink activeclassname='active' to='/quizzes/newQuiz'><p>New Quiz</p></NavLink>
            </li>
          </ul>
        </nav>
        <Outlet/>
      </header>

      <main className='appMain'>
        <div className='appMainSections'>
          <Routes>
            <Route path='/'>
              <Route path='' element={<Topics/>}/>
              <Route path='topics' element={<Topics/>}/>
              <Route path='topics/newTopic' element={<NewTopicForm/>}/>
              <Route path='topics/:topicId' element={<Topic/>}/>
              <Route path='quizzes' element={<Quizzes/>}/>
              <Route path='quizzes/newQuiz' element={<NewQuizForm/>}/>
              <Route path='quizzes/:quizId' element={<Quiz/>}/>
              <Route path='*' element={
                <h4>There seems to have been a problem, please return to another page.</h4>
              } />
            </Route>
          </Routes>
          
          
        </div>
      </main>
    </div>
  );
}

export default App;

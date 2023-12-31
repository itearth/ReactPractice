import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from "./component/pages/TodoListPage/TodoList";
import LoginPage from "./component/pages/LoginPage/Login";
import HomePage from './component/pages/HomePage/Home';
import Table from './component/pages/Table/Table';
import QuotePage from './component/pages/Quotes/QuotePage';
import PostPage from './component/pages/Post/PostPage';

const App = () => {
  return (
    <Router>
        {/* <Switch> */}
           <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/home" element={<HomePage />} /> 
          <Route path="/table" element={<Table />} /> 
          <Route path="/quotes" element={<QuotePage />} /> 
          <Route path="/post" element={<PostPage />} />
          {/* <Route path="/home" element={<Home />} />  */}
          </Routes>
        {/* </Switch> */}     
    </Router>
  );
}


export default App;

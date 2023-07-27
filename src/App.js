import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from "./component/pages/TodoListPage/TodoList";
import LoginPage from "./component/pages/LoginPage/Login";
import HomePage from './component/pages/HomePage/Home';
import Table from './component/pages/Table/Table';



const App = () => {
  return (
    <Router>
      <div className="App"> 
        {/* <Switch> */}
           <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/home" element={<HomePage />} /> 
          <Route path="/table" element={<Table />} /> 
          {/* <Route path="/home" element={<Home />} />  */}
          </Routes>
        {/* </Switch> */}
      </div>
    </Router>
  );
}


export default App;

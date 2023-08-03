import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from "./component/pages/TodoListPage/TodoList";
import LoginPage from "./component/pages/LoginPage/Login";
import HomePage from './component/pages/HomePage/Home';
import Table from './component/pages/Table/Table';
import QuoteGenerator from './component/pages/Quotes/Quotes';
import { Provider } from 'react-redux';
import store from './redux/store';




const App = () => {
  return (
    <Router>
      <Provider store={store}> <div className="App"> 
        {/* <Switch> */}
           <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/home" element={<HomePage />} /> 
          <Route path="/table" element={<Table />} /> 
          <Route path="/quotes" element={<QuoteGenerator />} /> 
          {/* <Route path="/home" element={<Home />} />  */}
          </Routes>
        {/* </Switch> */}
      </div>
      </Provider>
     
    </Router>
  );
}


export default App;

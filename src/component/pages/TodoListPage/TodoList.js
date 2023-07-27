import React, { useState } from "react";
import "./style.css";
import Navbar from "../../generics/Navbar/Navbar";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") {
      return;
    }

    if (editTodoId !== null) {
      // Update existing todo
      const updatedTodos = todos.map((todo) => {
        if (todo.id === editTodoId) {
          return {
            ...todo,
            text: inputValue.trim(),
          };
        }
        return todo;
      });

      setTodos(updatedTodos);
      setEditTodoId(null);
    } else {
      // Add new todo
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        time: new Date().toLocaleTimeString(), // Add current time
      };

      setTodos([...todos, newTodo]);
    }

    setInputValue("");
  };

  const handleTodoToggle = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleTodoDelete = (id) => {
    if (editTodoId === id) {
      setEditTodoId(null);
      return;
    }

    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleTodoEdit = (id) => {
    setEditTodoId(id);
    const todo = todos.find((todo) => todo.id === id);
    setInputValue(todo.text);
  };

  const handleTodoCancelEdit = () => {
    setEditTodoId(null);
    setInputValue("");
  };

  return (
    <div>
      <nav className="navbar">
        <Navbar />
      </nav>
      <div className="todo-app">
        <h1>Todo List</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Add a todo"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type="submit">{editTodoId !== null ? "Update" : "Add"}</button>
          {editTodoId !== null && (
            <button type="button" onClick={handleTodoCancelEdit}>
              Cancel
            </button>
          )}
        </form>
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? "completed" : ""}>
              <span>{todo.text}</span>
              <div>
                <span className="time">{todo.time}</span>
                <button onClick={() => handleTodoToggle(todo.id)}>
                  {todo.completed ? "Undo" : "Done"}
                </button>
                <button onClick={() => handleTodoEdit(todo.id)}>Edit</button>
                <button onClick={() => handleTodoDelete(todo.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;

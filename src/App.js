import "./App.css";
import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import { EaseInControlPoint, IconsOff } from "tabler-icons-react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("react-todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todosCount, setTodoCounts] = useState(todos.length);

  const [isBackgroundWhite, setIsBackgroundWhite] = useState(true);

  const toggleBackgroundHandler = () => {
    setIsBackgroundWhite(!isBackgroundWhite);
  };

  useEffect(() => {
    
    localStorage.setItem("react-todos", JSON.stringify(todos));
  }, [todos]);

  const onkeyupHandler = (e) => {
    if (e.key !== "Enter") return;

    if (todo === "") {
      alert("Todo cannot be empyty!!!");
    } else {
      e.preventDefault();
      const newTodos = [
        {
          id: Math.random(),
          text: todo,
          completed: false,
        },
        ...todos,
      ];
      setTodos(newTodos);
      setTodoCounts(todosCount + 1);
    }
    setTodo("");
  };
  const deleteTodo = (ID) => {
    const newTodos = todos.filter((todo) => todo.id !== ID);
    setTodos(newTodos);
    setTodoCounts(todosCount - 1);
  };
  const markTodo = (index) => {
    todos[index].completed = !todos[index].completed;
    setTodos([...todos]);
  };
  
  
  return (
    <div className={isBackgroundWhite ? "backgroundWhite" : "backgroundBlack"}>
      <header className="navbar-container">
        <p className="myapp-text">My App</p>
        <label className="switch">
          <input type="checkbox" />
          <span
            className="slider round"
            onClick={toggleBackgroundHandler}
          ></span>
        </label>
      </header>

      <section className = "header-container">
        <h1>Todolist App</h1>
        <input
          className="input-box"
          type="text"
          placeholder="Enter todo ..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyUp={onkeyupHandler}
        />
        
      </section>
      <section className="todo-container">
        <ul className = "todos">
          {todos.map((todo, i) => (
            <li key={i} id={todo.id} className="eachTodo">
              <p style={
                  todo.completed
                    ? {
                        textDecoration: "line-through",
                        textDecorationThickness: "4px",
                      }
                    : null
                }
              >
                {todo.text}
              </p>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="closebutton"
              >
                X
              </button>
              <button onClick={() => markTodo(i)} className="checkbutton">
                &radic;
              </button>
            </li>
          ))}
        </ul>
        
        
      </section>
      <div className = "clear">
        <button>Clear</button>
      </div>
      
      <section className="remain-container">
        <p className="remain-text">Remainning Task({todosCount})</p>
      </section>
    </div>
  );
}

export default App;

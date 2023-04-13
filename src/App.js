import { clear } from "@testing-library/user-event/dist/clear";
import "./App.css";
import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import { EaseInControlPoint, FirstAidKit, IconsOff } from "tabler-icons-react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [todosCount, setTodoCounts] = useState(todos.length);

  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isBackgroundBlack, setIsBackgroundBlack] = useState(true);

  //get from local storage
  useEffect(() => {
    const storedTodos = localStorage.getItem("react-todos");
    if(!storedTodos) setTodos([])
    else setTodos(JSON.parse(storedTodos))
  }, []);
  useEffect(() =>{
    if(isFirstRender){
      setIsFirstRender(false)
      return;
    }
    saveToLocalStorage()
  },[todos])

  const saveToLocalStorage = () => {
    localStorage.setItem("react-todos", JSON.stringify(todos));
  };
  const toggleBackgroundHandler = () => {
    setIsBackgroundBlack(!isBackgroundBlack);
  };
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
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    setTodoCounts(todosCount - 1);
  };
  const markTodo = (index) => {
    if (todos[index].completed === false) setTodoCounts(todosCount - 1);
    else setTodoCounts(todosCount + 1);
    todos[index].completed = !todos[index].completed;
    setTodos([...todos]);
  };
  const clearTodos = () => {
    localStorage.clear();
    setTodos([]);
  };

  return (
    <div className={isBackgroundBlack ? "backgroundBlack" : "backgroundWhite"}>
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

      <section className="header-container">
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
        <ul className="todos-box">
          {todos.map((todo, i) => (
            <li key={i} className="eachTodo">
              <p
                style={
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
      <div className="clear">
        <button onClick={clearTodos}>Clear</button>
      </div>

      <section className="remain-container">
        <p className="remain-text">Remainning Task({todosCount})</p>
      </section>
    </div>
  );
}

export default App;

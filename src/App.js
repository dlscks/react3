import "./App.css";
import React, { useEffect, useState } from "react"; //버전17 이후에는 jsx 사용하더라도 별도로 사용안해줘도 됨
import axios from "axios";
import { baseUrl } from "./commonApi/todoApi";

function App() {
  const wrap = {
    width: "500px",
    border: "1px solid black",
    margin: "10px auto",
  };
  //const baseUrl = "http://localhost:8090";

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  //백엔드 데이터를 가져오기 위해선 axios가 필요하다. npm install axios
  //동기화처리를 위해서 async가 필요
  async function getTodos() {
    //동기화 부분에 처리를 기다리기 위해서 await 를 사용한다.
    //await 는 async function 내부에서만 사용가능하다.
    await axios
      .get(baseUrl + "/todo/all")
      .then((response) => {
        //console.log(response.data);
        console.log("11111111111111");
        setTodos(response.data);
      })
      .catch((error) => {
        console.log("ww3333232323232");
      });
  }

  //DB에 insert
  const insertTodo = async (e) => {
    e.preventDefault();
    await axios
      .post(baseUrl + "/todo", { todoname: input })
      .then((response) => {
        console.log(response.data);
        setInput("");
        getTodos();
      })
      .catch((error) => {
        console.log(error);
      });

    setInput("할일이 추가됨!");
  };

  const handleChangeText = (e) => {
    setInput(e.target.value);
  };

  const updateTodo = async (id, completed) => {
    await axios
      .put(baseUrl + "/todo/" + id + "/" + completed)
      .then((response) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id
              ? { ...todo, completed: todo.completed === 1 ? 0 : 1 }
              : todo
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //넘겨받는 값 여러개이면 {return } 사용하기

  const deleteTodo = async (id) => {
    await axios
      .delete(baseUrl + "/todo/" + id)
      .then((response) => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log("input:" + input);
  }, [input]);

  return (
    //JSX사용
    <div className="App" style={wrap}>
      <h1>TODO LIST</h1>
      <form onSubmit={insertTodo}>
        <input
          type="text"
          required={true}
          value={input}
          onChange={handleChangeText}
        />
        <input type="submit" value="Create" />
      </form>
      {todos
        ? todos.map((todo) => {
            return (
              <div className="todo" key={todo.id}>
                <h3>
                  <label
                    className={todo.completed ? "completed" : null}
                    onClick={() => updateTodo(todo.id, todo.completed)}
                  >
                    {todo.todoname}
                  </label>
                  <label
                    onClick={() => {
                      deleteTodo(todo.id);
                    }}
                  >
                    &nbsp;&nbsp;&nbsp;삭제
                  </label>
                </h3>
              </div>
            );
          })
        : null}
    </div>
  );
}
//updateTodo값에 파라미터값 있어서 onClick에서 바로 처리

export default App;

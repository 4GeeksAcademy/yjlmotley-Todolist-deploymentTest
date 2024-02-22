import React, { useState } from "react";
import FetchAll, { fetchTodos } from "./FetchAll";


const TodoList = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    const handleAddTodo = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            const newTodo = {
                id: Date.now(),
                label: inputValue.trim(),
                done: false
            };
            setTodos([...todos, newTodo]);

            addTaskToApi();
            console.log("New Todo Added to API: " + newTodo.label);

            setInputValue("");
            fetchTodos(setTodos); //Fetch the updated list of todos on "Enter"
        }
    };

    const addTaskToApi = () => {
        const updatedTodos = [
            ...todos,
            {
                id: Date.now(),
                label: inputValue.trim(),
                done: false,
            },
        ];

        fetch("https://playground.4geeks.com/apis/fake/todos/user/yjlmotley", {
            method: "PUT",
            body: JSON.stringify(updatedTodos),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => {
                if (resp.ok) {
                    setTodos(updatedTodos);
                }
            })
            .catch((error) => console.error("Error adding task to API:", error));
    };

    const handleDeleteTodo = (index) => {
        const updatedTodos = todos.filter((todo, i) => index !== i);
        setTodos(updatedTodos);

        deleteTaskFromApi(updatedTodos);
    };

    const deleteTaskFromApi = (updatedTodos) => {
        const apiUrl = "https://playground.4geeks.com/apis/fake/todos/user/yjlmotley";
        const requestOptions = {
            method: "PUT",
            body: JSON.stringify(updatedTodos),
            headers: {
                "Content-Type": "application/json"
            },
        };

        //If there are less than 1 todo, use DELETE method instead of PUT
        if (updatedTodos.length < 1) {
            requestOptions.method = "DELETE";
            delete requestOptions.body; // No need to send body for DELETE method since there is none
        }

        fetch(apiUrl, requestOptions)
            .then((resp) => {
                if (resp.ok) {
                    if (requestOptions.method === "DELETE") {
                        console.log("Todos and user successfullly deleted from API");
                    } else {
                        console.log("Todos deleted successfully from API");
                        fetchTodos(setTodos); //Fetch the updated list of todos on delete
                    }

                } else {
                    console.error("Failed to delete todo(s) from API");
                }
            })
            .catch((error) => console.error("Error deleting task from API:", error));
    };


    return (
        <div className="container">
            <h1 className="text-center mt-5">todos</h1>
            <div className="card todo-card mx-auto mt-5" style={{ maxWidth: "800px" }}>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <input 
                            type="text"
                            onChange={(e) => setInputValue(e.target.value)} 
                            value={inputValue}
                            onKeyDown={handleAddTodo}
                            placeholder="What needs to be done?"
                        />
                    </li>
                    {todos.length === 0 ? (
                        <li className="list-group-item no-tasks">-- No tasks, add a task --</li>
                    ) : (
                        todos.map((todo, index) => (
                            <li className="list-group-item" key={todo.id}>
                                <div className="list-group-item-todo" id="screen">
                                    {todo.label}
                                </div>
                                <span className="x-container" onClick={() => handleDeleteTodo(index)}>
                                    <i className="fa-solid fa-x"></i>
                                </span>
                            </li>
                        ))
                    )}
                </ul>
                <div className="card-footer text-secondary">
                    {todos.length} {todos.length === 1 ? "item" : "items"} left
                </div>
                <FetchAll setTodos={setTodos} />
            </div>
        </div>
    );
};


export default TodoList;
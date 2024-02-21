import React, { useEffect, useState } from "react";

export const fetchTodos = (setTodos) => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/yjlmotley")
        .then((resp) => {
            if (!resp.ok) {
                throw new Error("Failed to fetch todo list. Status: " + resp.status);
            }
            return resp.json();
        })
        .then((data) => {
            console.log("Todo List from API", data);
            setTodos(data);
        })
        .catch((error) => {
            console.error("There has been a problem with your fetch operation:", error);
        });
};

const FetchAll = ({ setTodos }) => {
    const [remoteTodos, setRemoteTodos] = useState([]);

    useEffect(() => {
        fetchTodos(setTodos); // Pass setTodos to fetchTodos
    }, [setTodos]); // Add setTodos as a dependency

    useEffect(() => {
        if (remoteTodos.length > 0) {
            addRemoteTodos();
        }
    }, [remoteTodos]);

    const addRemoteTodos = () => {
        setTodos((prevTodos) => [
            ...prevTodos,
            ...remoteTodos.map((todo) => ({
                id: todo.id,
                label: todo.label,
                done: false,
            })),
        ]);
    };

    return null;
};

export default FetchAll;
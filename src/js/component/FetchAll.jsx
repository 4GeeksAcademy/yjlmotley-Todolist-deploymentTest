import React, { useEffect, useState } from "react";


// Functions to fetch todos from the API
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

// Initial fetch with an effect to make sure the initial fetch only runs once at the beginning
const FetchAll = ({ setTodos }) => {
    const [initialFetchDone, setInitialFetchDone] = useState(false);

    useEffect(() => {
        if (!initialFetchDone) {
            fetchTodos(setTodos);
            setInitialFetchDone(true);
        }
    }, [setTodos, initialFetchDone]);


    return null;
};


export default FetchAll;
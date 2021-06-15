import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { AddTodo } from "./AddTodo";

let LAST_ID = 0;

export const TodoList = () => {
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) !== null ? JSON.parse(localStorage.getItem("todos")) : []);
    const [todos1, setTodos1] = useState(todos.filter(todo1 => todo1.importance === "1" && !todo1.checked));
    const [todos2, setTodos2] = useState(todos.filter(todo2 => todo2.importance === "2" && !todo2.checked));
    const [todos3, setTodos3] = useState(todos.filter(todo3 => todo3.importance === "3" && !todo3.checked));

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
        setTodos1(todos.filter(todo1 => todo1.importance === "1" && !todo1.checked));
        setTodos2(todos.filter(todo2 => todo2.importance === "2" && !todo2.checked));
        setTodos3(todos.filter(todo3 => todo3.importance === "3" && !todo3.checked));
    }, [todos])

    const handleCheck = (index) => {
        setTodos(todos => todos.map(todo => ({
            ...todo,
            checked: todo.id === index ? !todo.checked : todo.checked
        })))
    }

    const handleEdit = (index, content) => {
        setTodos(todos => todos.map(todo => ({
            ...todo,
            content: todo.id === index ? content : todo.content
        })))
    }

    const handleDelete = (index) => {
        if(window.confirm("Étes-vous sûr de vouloir supprimer cette tâche ?"))
            setTodos(todos => todos.filter(todo => todo.id !== index));
    }

    const handleAdd = (content, day, time, importance, postedAt) => {
        todos.forEach(todo => {
            if(LAST_ID <= todo.id)
                LAST_ID = todo.id + 1;
        });
        setTodos(todos => [...todos, {
            id: LAST_ID,
            content: content,
            day: day,
            time: time,
            importance: importance,
            postedAt: postedAt,
            checked: false
        }]);
    }
    
    if(todos.length === 0) {
        return (
            <>
                <p>Vous n'avez aucune tâche</p>
                <AddTodo add={handleAdd}/>
            </>
        )
    }

    return (
        <div className="todo-list">
            <section className="part">
                <h4 className="list-title">Vos tâches urgentes 🔥</h4>
                <ul>
                    {todos1.length > 0 ?
                        todos1.map(todo =>
                            <Todo
                                key={todo.id}
                                todo={todo}
                                checkTodo={handleCheck}
                                editTodo={handleEdit}
                                deleteTodo={handleDelete}
                            />
                        ) :
                        <p className="list-void">Vous n'avez aucune tâche urgente, ouf !</p>
                    }
                </ul>
            </section>
            <section className="part">
                <h4 className="list-title">À ne pas oublier ⌛</h4>
                <ul>
                    {todos2.length > 0 ?
                        todos2.map(todo =>
                            <Todo
                                key={todo.id}
                                todo={todo}
                                checkTodo={handleCheck}
                                editTodo={handleEdit}
                                deleteTodo={handleDelete}
                            />
                        ) :
                        <p className="list-void">Vous n'avez aucune tâche importante.</p>
                    }
                </ul>
            </section>
            <section className="part">
                <h4 className="list-title">Ça peut attendre 🤙</h4>
                <ul>
                    {todos3.length > 0 ?
                        todos3.map(todo =>
                            <Todo
                                key={todo.id}
                                todo={todo}
                                checkTodo={handleCheck}
                                editTodo={handleEdit}
                                deleteTodo={handleDelete}
                            />
                        ) :
                        <p className="list-void">Vous n'avez aucune tâche secondaire.</p>
                    }
                </ul>
            </section>
            <section className="part">
                <h4 className="list-title">Tâches terminées ✔</h4>
                <ul>
                    {todos.map(todo =>
                        todo.checked ?
                        <Todo
                            key={todo.id}
                            todo={todo}
                            checkTodo={handleCheck}
                            editTodo={handleEdit}
                            deleteTodo={handleDelete}
                        /> :
                        null
                    )}
                </ul>
            </section>
            <AddTodo add={handleAdd}/>
        </div>
    )
}

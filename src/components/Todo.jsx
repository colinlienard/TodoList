import React, { useState, useRef, useEffect, forwardRef } from "react";

const DAYS = [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche"
]

const TextArea = forwardRef(({defaultValue, onValueChange, edit}, ref) => {
    const [value, setValue] = useState(defaultValue);
    const [areaHeight, setAreaHeight] = useState("auto");

    useEffect(() => {
        setAreaHeight(`${ref.current.scrollHeight + 2}px`);
    }, [value, ref])

    const handleChange = (event) => {
        setAreaHeight("auto");
        setValue(event.target.value);
        onValueChange(event);
    }

    return (
        <textarea className={`content ${edit ? "edit" : ""}`} ref={ref} rows={1} style={{height: areaHeight}} value={value} onChange={handleChange}/>
    )
})

export const Todo = ({todo, checkTodo, editTodo, deleteTodo}) => {
    const [value, setValue] = useState(todo);
    const [check, setCheck] = useState(value.checked);
    const [edit, setEdit] = useState(false);

    const inputEdit = useRef(null);

    const handleCheck = () => {
        if(!edit) {
            setCheck(check => !check);
            checkTodo(value.id);
        }
    }

    const handleEdit = () => {
        if(edit) {
            editTodo(value.id, value.content);
            inputEdit.current.blur();
        }
        else
            inputEdit.current.focus();
        setEdit(edit => !edit);
    }

    const handleEditContent = (event) => setValue(value => ({...value, content: event.target.value}));
    
    return (
        <li className={`todo importance-${value.importance} ${check ? "checked": ""}`}>
            <div className="indicator"/>
            <TextArea ref={inputEdit} defaultValue={value.content} onValueChange={handleEditContent} edit={edit}/>
            {check ? null : <p className="posted">postée le {value.postedAt}</p>}
            <p className="date">pour {DAYS[value.day - 1]} à {value.time}</p>
            <div className="button-container">
                <div className="checkbox">
                    <input type="checkbox" onChange={handleCheck} checked={check}/>
                    <img className={check ? "cross" : ""} src={`/assets/${check ? "cross" : "check"}.svg`} alt=""/>
                </div>
                {check ?
                    null :
                    <div className="little-button-container">
                        <button className="little-button" onClick={handleEdit}>
                            <img src={`/assets/${edit ? "save.svg" : "edit.svg"}`} alt=""/>
                        </button>
                        <button className="little-button" onClick={() => deleteTodo(value.id)}>
                            <img src="/assets/trashcan.svg" alt=""/>
                        </button>                    
                    </div>
                }
            </div>
        </li>
    )
}
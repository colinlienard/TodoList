import React, { useState } from "react";

const today = new Date();

export const AddTodo = ({add}) => {
    const [content, setContent] = useState("");
    const [day, setDay] = useState("1");
    const [time, setTime] = useState("12:00");
    const [importance, setImportance] = useState("2");
    const [visible, setVisible] = useState(false);

    const handleChange = (event, setState) => setState(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(content !== "") {
            setContent("");
            setDay("1");
            setTime("12:00");
            setImportance("2");
            setVisible(false);
            const date = today.getDate();
            const month = today.getMonth() + 1;
            add(content, day, time, importance, (date < 10 ? "0" + date : date) + "/" + (month < 10 ? "0" + month : month));
        }
        else
            alert("Tous les champs doivent être remplis.");
    }

    const toggleVisible = () => setVisible(visible => !visible);

    return (
        <>
            <button className="toggle-add" onClick={toggleVisible}>
                <img className={`image ${visible ? "close" : "add"}`} src="/assets/cross.svg" alt="" />
            </button>
            <div className="background-dark-gradient"/>
            <form className={`form-add ${visible ? "open" : ""}`} onSubmit={handleSubmit}>
                <p className="title">Ajouter une tâche</p>
                <label htmlFor="content">Tâche</label>
                <textarea type="text" name="content" placeholder="Rendez-vous chez..." value={content} onChange={event => handleChange(event, setContent)}/>
                <div className="container">
                    <label htmlFor="day">pour</label>
                    <select name="day" value={day} onChange={event => handleChange(event, setDay)}>
                        <option value="1">Lundi</option>
                        <option value="2">Mardi</option>
                        <option value="3">Mercredi</option>
                        <option value="4">Jeudi</option>
                        <option value="5">Vendredi</option>
                        <option value="6">Samedi</option>
                        <option value="7">Dimanche</option>
                    </select>
                    <label htmlFor="time">à</label>
                    <input type="time" name="time" step="900" value={time} onChange={event => handleChange(event, setTime)}/>
                </div>
                <label htmlFor="importance">Importance</label>
                <select name="importance" value={importance} onChange={event => handleChange(event, setImportance)}>
                    <option value="1">Urgent</option>
                    <option value="2">À ne pas oublier</option>
                    <option value="3">Ça peut attendre</option>
                </select>
                <button className="submit">Ajouter</button>
            </form>
        </>
    )
}
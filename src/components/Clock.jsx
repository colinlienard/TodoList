import React, { useState, useEffect } from "react";

const DAYS = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche"
]

const MONTHS = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre"
]

export const Clock = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000)

        return (() => {
            clearInterval(timer);
        })
    }, [])

    return (
        <>
            <h2 className="pretitle">Il est</h2>
            <h3 className="title">{date.getHours() < 10 ? "0" : ""}{date.getHours()}:{date.getMinutes() < 10 ? "0" : ""}{date.getMinutes()}</h3>
            <p className="subtitle">{DAYS[date.getDay() - 1]} {date.getDate()} {MONTHS[date.getMonth()]}</p>
        </>
    )
}
import React, { useEffect, useState } from "react";
import axios from "axios"; // Das axios-Modul ermöglicht es, HTTP-Anfragen zu senden und zu empfangen.

export default function Todolist() {

    const[tasks, setTasks] = useState([])
    const [newtask, setNewtask] = useState("")

    useEffect(() => { // useEffect wird aufgerufen, um die Aufgaben zu laden, sobald die Komponente gerendert wird.
        axios.get("http://192.168.0.176:5000/api/tasks") // Die GET-Anfrage wird an den Server gesendet, um die Aufgaben zu erhalten.
            .then(response => setTasks(response.data)) // Die Antwort wird in den State gespeichert.
            .catch(error => console.log(error)); // Fehlerbehandlung
        }, []);
    
    const addTask = () => {
        axios.post("http://192.168.0.176:5000/api/tasks", {task: newtask}) // Die POST-Anfrage wird an den Server gesendet, um eine neue Aufgabe zu erstellen.
            .then(() => { // Wenn die Anfrage erfolgreich war, wird die Liste der Aufgaben aktualisiert.
                axios.get("http://192.168.0.176:5000/api/tasks") // Die GET-Anfrage wird an den Server gesendet, um die Aufgaben zu erhalten.
                    .then(response => setTasks(response.data)) // Die Antwort wird in den State gespeichert.
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
        setNewtask("") // Der Wert des neuen Tasks wird zurückgesetzt.
    };

    const deleteTask = (id) => { // Die Funktion deleteTask wird aufgerufen, wenn der Benutzer auf den Löschen-Button klickt. Die ID der Aufgabe wird als Parameter übergeben.
        axios.delete(`http://192.168.0.176:5000/api/tasks/${id}`) // Die DELETE-Anfrage wird an den Server gesendet, um die Aufgabe zu löschen.
            .then(() => { // Wenn die Anfrage erfolgreich war, wird die Liste der Aufgaben aktualisiert.
                setTasks(tasks.filter(element => element.id !== id)); // Die Aufgabe wird aus der Liste entfernt.
            })
            .catch(error => console.log(error));
    };

    const saveNewTask = (event) => {
        setNewtask(event.target.value) // Der Wert des neuen Tasks wird aktualisiert, wenn der Benutzer etwas in das Eingabefeld eingibt.
    };

    const list = tasks.map((element, index) => (
            <div key={index} className="task-element">
                <p className="task-text">{element.task}</p>
                <button className="delete-button" onClick={() => deleteTask(element.id)}>-</button>
            </div>
        ));

    return (
        <div>
            <div className="input-element">
                <input className="task-input" type="text" value={newtask} placeholder="Hier eingeben..." onChange={saveNewTask}/>
                <button className="add-button" onClick={addTask}>+</button>
            </div>
            
            <div className="task-list">
                {list}
            </div>
        </div>
    );
}
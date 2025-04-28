import { render, screen, fireEvent, waitFor} from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Todolist from "./Todolist";
import axios from "axios";
import React from "react";

describe("Kommunikation zwischen Frontend und Backend", () => {
    it("fügt eine neue Aufgabe hinzu und überprüft, ob sie in der Datenbank gespeichert wurde", async () => {
        render(<Todolist />);
    
        // Eingabe und Klick auf den Hinzufügen-Button
        const input = screen.getByPlaceholderText("Hier eingeben...");
        fireEvent.change(input, { target: { value: "Datenbank-Test-Aufgabe" } });
    
        const button = screen.getByText("+");
        fireEvent.click(button);
    
        // Warte, bis der neue Eintrag sichtbar ist
        const newTask = await screen.findByText("Datenbank-Test-Aufgabe");
        expect(newTask).toBeInTheDocument();
    
        // Überprüfe mit einer GET-Anfrage, ob die Aufgabe tatsächlich in der Datenbank ist
        const response = await axios.get("http://192.168.0.176:5000/api/tasks");
        const taskExists = response.data.some(task => task.task === "Datenbank-Test-Aufgabe");
        expect(taskExists).toBe(true);
        });
      
    it("ruft Aufgaben vom Server ab", async () => {
        render(<Todolist />);
      
        // Warte, bis die Aufgaben geladen werden
        const task = await screen.findByText("Datenbank-Test-Aufgabe");
        expect(task).toBeInTheDocument();
      
        // Überprüfe, ob die Daten auch manuell abgerufen werden können
        const response = await axios.get("http://192.168.0.176:5000/api/tasks");
        expect(response.status).toBe(200);
        expect(response.data).toEqual(expect.arrayContaining([
          expect.objectContaining({ task: "Datenbank-Test-Aufgabe" }),
        ]));
    });

    it("löscht eine Aufgabe vom Server", async () => {
        render(<Todolist />);
  
        // Finde den Lösch-Button der spezifischen Aufgabe
        const deleteButtons = await screen.findAllByText("-");
        fireEvent.click(deleteButtons[0]); // Lösche die erste Aufgabe
  
        await waitFor(async () => {
            const response = await axios.get("http://192.168.0.176:5000/api/tasks");
            const taskExists = response.data.some(task => task.task === "Datenbank-Test-Aufgabe");
            expect(taskExists).toBe(false); // Aufgabe sollte gelöscht sein
        });    
    });
});
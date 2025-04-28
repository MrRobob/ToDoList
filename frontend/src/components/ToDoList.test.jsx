import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Todolist from "./Todolist";
import axios from "axios";
import React from "react";

describe("Kommunikation zwischen Frontend und Backend", () => {
  it("lädt Aufgaben korrekt vom Backend", async () => {
    render(<Todolist />);

    const task = await screen.findByText("Mocked Task 1");
    expect(task).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledWith("http://192.168.0.176:5000/api/tasks");
  });

  it("fügt eine neue Aufgabe hinzu", async () => {
    render(<Todolist />);

    const input = screen.getByPlaceholderText("Hier eingeben...");
    fireEvent.change(input, { target: { value: "Neue Aufgabe" } });

    const button = screen.getByText("+");
    fireEvent.click(button);

    await waitFor(() => expect(axios.post).toHaveBeenCalledWith(
      "http://192.168.0.176:5000/api/tasks",
      { task: "Neue Aufgabe" }
    ));

    const task = await screen.findByText("Mocked Task 1");
    expect(task).toBeInTheDocument();
  });

  it("löscht eine Aufgabe", async () => {
    render(<Todolist />);

    const deleteButtons = await screen.findAllByText("-");
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => expect(axios.delete).toHaveBeenCalledWith(
      "http://192.168.0.176:5000/api/tasks/1"
    ));

    const task = screen.queryByText("Mocked Task 1");
    expect(task).not.toBeInTheDocument();
  });
});
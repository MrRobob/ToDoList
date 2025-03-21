from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__) # Erstellt eine Flask-Instanz, damit wir die Flask-Funktionen nutzen können
CORS(app) # Erlaubt Cross-Origin-Requests, das sind Anfragen von einer anderen Domain

def get_db_connection():
    conn = sqlite3.connect('todolist.db') # Verbindet sich mit der Datenbank
    conn.row_factory = sqlite3.Row # Gibt die Datenbankzeilen als Dictionary zurück
    return conn # Gibt die Verbindung zurück

def create_table():
    conn = get_db_connection() # Holt sich die Verbindung zur Datenbank
    conn.execute('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT NOT NULL)') # Erstellt die Tabelle, wenn sie noch nicht existiert
    conn.close() # Schließt die Verbindung zur Datenbank

create_table()

@app.route('/api/tasks', methods=['GET', 'POST']) # Definiert die Route und die erlaubten Methoden
def handle_tasks():
    conn = get_db_connection() # Holt sich die Verbindung zur Datenbank
    if request.method == 'POST': # Wenn die Methode POST ist, dann wird ein neuer Task hinzugefügt
        task = request.json.get('task') # Holt sich den Task aus dem Request
        conn.execute('INSERT INTO tasks (task) VALUES (?)', (task,)) # Fügt den Task in die Datenbank ein
        conn.commit() # Speichert die Änderungen
        conn.close() # Schließt die Verbindung zur Datenbank
        return jsonify({'message': 'Task added successfully'}), 201 # Gibt eine Erfolgsmeldung zurück
    else: # Wenn die Methode GET ist, dann werden alle Tasks zurückgegeben
        tasks = conn.execute('SELECT * FROM tasks').fetchall() # Holt sich alle Tasks aus der Datenbank
        conn.close() # Schließt die Verbindung zur Datenbank
        return jsonify([dict(row) for row in tasks]) # Gibt die Tasks als JSON zurück

@app.route('/api/tasks/<int:id>', methods=['DELETE']) # Definiert die Route und die erlaubten Methoden
def delete_task(id): 
    conn = get_db_connection() # Holt sich die Verbindung zur Datenbank
    conn.execute('DELETE FROM tasks WHERE id = ?', (id,)) # Löscht den Task mit der übergebenen ID
    conn.commit() # Speichert die Änderungen
    conn.close() # Schließt die Verbindung zur Datenbank
    return jsonify({'message': 'Task deleted successfully'}), 200 # Gibt eine Erfolgsmeldung zurück

if __name__ == '__main__': # Startet die Flask-App
    app.run(host='0.0.0.0', port=5000) # Startet die App auf dem Host
# Howto

## Backend

1. Installiere das venv: pip install virtualenv
2. Erstelle das venv im Projektordner: python -m venv env
3. Aktiviere es: .\env\Scripts\activate
4. Erstelle weite Abhängigkeiten im backend-Ordner in einer requirements.txt:
    Flask
    flask-cors
5. Installiere sie: pip install -r requirements.txt
6. Erstelle eine server.py

## Frontend

1. Erstelle im frontend-Ordner ein React-Projekt und folge den Anweisungen: npm create vite@latest frontend --template react
2. Lösche alles unnötige.
3. Füge der package.json unter dem punkt scripts Folgendes hinzu: "start": "vite",
4. Erstelle eine Komponente im components-Ordner namens ToDoList.jsx
5. Verbinde diese mit der App.jsx
6. Bearbeite die Styles
7. Starte den Server mit python server.py
8. Starte die Seite im frontend-Ordner mit npm start
9. Wenn du das ganze im Heimnetzwerk erreichba machen möchtest, ersetze localhost überall durch deine ip und
    füge package.json folgendes bei scripts hinzu: "dev": "vite --host 0.0.0.0",. Füge der server.py
    unter if __name__ == '__main__' das hinzu: app.run(host='0.0.0.0', port=5000)

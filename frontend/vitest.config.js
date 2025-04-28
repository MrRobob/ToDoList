export default {
  test: {
    environment: "jsdom", // Simuliert eine Browserumgebung
    setupFiles: "./setupTests.js", // Integriert die Test-Setup-Datei
    globals: true, // Aktiviert globale Testmethoden wie "describe" und "it"
    coverage: {
      reporter: ["text", "html"], // Coverage-Bericht in Text- und HTML-Format
    },
    threads: false, // Deaktiviert Multithreading für Tests
  },
};
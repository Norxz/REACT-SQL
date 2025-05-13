// Importar React y ReactDOM para renderizar la aplicación
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importar el componente principal de la aplicación y la función de medición de rendimiento
import App from './App';
import reportWebVitals from './reportWebVitals';

// Crear el contenedor raíz donde la app será montada
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizar la app envuelta en React.StrictMode para ayudar en la detección de posibles problemas de rendimiento
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si deseas medir el rendimiento de la app, puedes pasar una función que registre los resultados
// por ejemplo: reportWebVitals(console.log), o enviarlos a un endpoint de análisis
// Más información: https://bit.ly/CRA-vitals
reportWebVitals();

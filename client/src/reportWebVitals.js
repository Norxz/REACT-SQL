// Definición de la función reportWebVitals para medir el rendimiento de la aplicación
const reportWebVitals = (onPerfEntry) => {
  // Verifica si se pasó una función como parámetro
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Importa el módulo web-vitals de manera dinámica (solo cuando es necesario)
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Ejecuta las funciones de medición de rendimiento pasando la función callback (onPerfEntry)
      getCLS(onPerfEntry);  // Cumulative Layout Shift (estabilidad visual)
      getFID(onPerfEntry);  // First Input Delay (retardo en la interacción del usuario)
      getFCP(onPerfEntry);  // First Contentful Paint (tiempo hasta que aparece el contenido)
      getLCP(onPerfEntry);  // Largest Contentful Paint (tiempo hasta que se carga el contenido más grande)
      getTTFB(onPerfEntry); // Time to First Byte (tiempo hasta que el primer byte de la respuesta es recibido)
    });
  }
};

// Exporta la función para que pueda ser usada en otras partes de la app
export default reportWebVitals;

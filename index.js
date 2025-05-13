// Importar librerías necesarias
const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

// Middleware para habilitar CORS y procesar JSON
app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: "localhost",       // Dirección del servidor MySQL
    user: "root",           // Usuario de la base de datos
    password: "root",       // Contraseña del usuario
    database: "empleados_CRUD"  // Nombre de la base de datos
});

// Ruta para crear un nuevo empleado
app.post("/create", (req, res) => {
    const { Nombre, Edad, Pais, Cargo, Anios } = req.body;

    // Consulta SQL para insertar un nuevo empleado en la base de datos
    db.query('INSERT INTO empleados(nombre, edad, pais, cargo, anios) VALUES (?,?,?,?,?)', 
    [Nombre, Edad, Pais, Cargo, Anios], (err, result) => {
        if (err) {
            console.log(err);  // Si ocurre un error, lo muestra en la consola
        } else {
            res.send("Empleado registrado con exito!");  // Responde que el empleado fue registrado
        }
    });
});

// Ruta para obtener todos los empleados
app.get("/empleados", (req, res) => {
    // Consulta SQL para obtener todos los empleados
    db.query('SELECT * FROM empleados', (err, result) => {
        if (err) {
            console.log(err);  // Si ocurre un error, lo muestra en la consola
        } else {
            res.send(result);  // Responde con la lista de empleados
        }
    });
});

// Ruta para actualizar un empleado
app.put("/update", (req, res) => {
    const { id, Nombre, Edad, Pais, Cargo, Anios } = req.body;

    // Consulta SQL para actualizar los detalles de un empleado
    db.query('UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE id=?',
    [Nombre, Edad, Pais, Cargo, Anios, id], (err, result) => {
        if (err) {
            console.log(err);  // Si ocurre un error, lo muestra en la consola
        } else {
            res.send("Empleado actualizado con exito!");  // Responde que el empleado fue actualizado
        }
    });
});

// Ruta para eliminar un empleado por su ID
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    // Consulta SQL para eliminar un empleado por su ID
    db.query('DELETE FROM empleados WHERE id=?', id, (err, result) => {
        if (err) {
            console.log(err);  // Si ocurre un error, lo muestra en la consola
        } else {
            res.send("Empleado eliminado con exito!");  // Responde que el empleado fue eliminado
        }
    });
});

// Configuración del servidor para escuchar en el puerto 3001
app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001");
});

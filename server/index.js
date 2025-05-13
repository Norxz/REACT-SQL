const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"empleados_CRUD"
})

app.post("/create",(req,res)=>{
    const Nombre = req.body.Nombre
    const Edad = req.body.Edad
    const Pais = req.body.Pais
    const Cargo = req.body.Cargo
    const Anios = req.body.Anios


    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES (?,?,?,?,?)',[Nombre,Edad,Pais,Cargo,Anios], (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("Empleado registrado con exito!")
        }
    })
})

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001");
})


app.get("/empleados",(req,res)=>{

    db.query('SELECT * FROM empleados',(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.put("/update",(req,res)=>{
    const id=req.body.id
    const Nombre = req.body.Nombre
    const Edad = req.body.Edad
    const Pais = req.body.Pais
    const Cargo = req.body.Cargo
    const Anios = req.body.Anios


    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?',[Nombre,Edad,Pais,Cargo,Anios, id], (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("Empleado actualizado con exito!")
        }
    })
})

app.delete("/delete/:id",(req,res)=>{
    const id=req.params.id

    db.query('DELETE FROM empleados WHERE id=?',id,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("Empleado eliminado con exito!")
        }
    })
})
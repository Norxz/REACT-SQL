import "./App.css";
import { useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Swal from "sweetalert2";

function App() {
  const [Nombre, setNombre] = useState("");
  const [Edad, setEdad] = useState("");
  const [Pais, setPais] = useState("");
  const [Cargo, setCargo] = useState("");
  const [Anios, setAnios] = useState("");
  const [id, setID] = useState(null);
  const [editar, setEditar] = useState(false);

  const [empleadosLista, setEmpleados] = useState([]);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      Nombre: Nombre,
      Edad: Edad,
      Pais: Pais,
      Cargo: Cargo,
      Anios: Anios,
    }).then(() => {
      getEmpleados();
      alert("Empleado registrado");
      limpiarCampos();
      Swal.fire({
        title: "<strong>Resgistro Exitoso</strong>",
        html:
          "<i>El empleado <strong>" +
          Nombre +
          "</strong> fue registrado con exito</i>",
        icon: "success",
        timer: 3000,
      });
    });
  };

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      Nombre: Nombre,
      Edad: Edad,
      Pais: Pais,
      Cargo: Cargo,
      Anios: Anios,
    }).then(() => {
      getEmpleados();
      alert("Actulizado");
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualizacion Exitosa</strong>",
        html:
          "<i>El empleado <strong>" +
          Nombre +
          "</strong> fue actualizado con exito</i>",
        icon: "success",
        timer: 3000,
      });
    });
  };

  const deleteEmple = (val) => {
    Swal.fire({
      title: "Confirmar eliminado??",
      html:
        "<i>Realmente desea eliminar a <strong>" +
        val.nombre +
        "</strong> ?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`)
          .then(() => {
            getEmpleados();
            limpiarCampos();
            Swal.fire({
              title: "Eliminado!",
              text: val.nombre + "fue eliminado",
              icon: "success",
              timer: 3000,
            });
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se logro eliminar el empleado!",
              footer: JSON.parse(JSON.stringify(error)).message
            });
          });
      }
    });
  };

  const limpiarCampos = () => {
    setAnios("");
    setNombre("");
    setPais("");
    setCargo("");
    setEdad("");
    setEditar(false);
  };

  const editarEmpleado = (val) => {
    setEditar(true);
    setNombre(val.nombre || "");
    setEdad(val.edad || "");
    setCargo(val.cargo || "");
    setPais(val.pais || "");
    setAnios(val.anios || "");
    setID(val.id);
  };

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  };

  getEmpleados();

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">Gestion de empleados</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre:
            </span>
            <input
              type="text"
              value={Nombre}
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese un nombre"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Edad:
            </span>
            <input
              type="number"
              value={Edad}
              onChange={(event) => {
                setEdad(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese una Edad"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Pais:
            </span>
            <input
              type="text"
              value={Pais}
              onChange={(event) => {
                setPais(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese un Pais"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Cargo:
          </span>
          <input
            type="text"
            value={Cargo}
            onChange={(event) => {
              setCargo(event.target.value);
            }}
            className="form-control"
            placeholder="Ingrese un Cargo"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Años:
          </span>
          <input
            type="text"
            value={Anios}
            onChange={(event) => {
              setAnios(event.target.value);
            }}
            className="form-control"
            placeholder="Ingrese los Años"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
      <div className="card-footer text-muted">
        {editar ? (
          <div>
            <button className="btn btn-warning m-2 " onClick={update}>
              actualizar
            </button>
            <button className="btn btn-info m-2" onClick={limpiarCampos}>
              Cancelar
            </button>
          </div>
        ) : (
          <button className="btn btn-success" onClick={add}>
            Registrar
          </button>
        )}
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosLista.map((val) => {
            return (
              <tr key={val.id}>
                <th>{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.cargo}</td>
                <td>{val.pais}</td>
                <td>{val.anios}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        editarEmpleado(val);
                      }}
                      className="btn btn-info"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteEmple(val)}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;

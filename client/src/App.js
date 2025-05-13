// Importación de estilos, hooks y librerías externas
import "./App.css"; // Estilos personalizados
import { useState } from "react"; // Hook de estado de React
import Axios from "axios"; // Cliente HTTP para hacer peticiones
import "bootstrap/dist/css/bootstrap.min.css"; // Estilos de Bootstrap
import Swal from "sweetalert2"; // Librería para mostrar alertas modales

function App() {
  // Estados para los campos del formulario
  const [Nombre, setNombre] = useState("");
  const [Edad, setEdad] = useState("");
  const [Pais, setPais] = useState("");
  const [Cargo, setCargo] = useState("");
  const [Anios, setAnios] = useState("");

  // Estado para almacenar el ID del empleado y modo de edición
  const [id, setID] = useState(null);
  const [editar, setEditar] = useState(false);

  // Lista de empleados obtenida del backend
  const [empleadosLista, setEmpleados] = useState([]);

  // Función para agregar un nuevo empleado
  const add = () => {
    Axios.post("http://localhost:3001/create", {
      Nombre: Nombre,
      Edad: Edad,
      Pais: Pais,
      Cargo: Cargo,
      Anios: Anios,
    }).then(() => {
      getEmpleados(); // Actualizar la lista
      alert("Empleado registrado"); // Alerta simple
      limpiarCampos(); // Limpiar formulario
      // Alerta personalizada con SweetAlert
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

  // Función para actualizar un empleado existente
  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      Nombre: Nombre,
      Edad: Edad,
      Pais: Pais,
      Cargo: Cargo,
      Anios: Anios,
    }).then(() => {
      getEmpleados(); // Actualizar lista
      alert("Actulizado"); // Alerta simple
      limpiarCampos(); // Limpiar formulario
      // Alerta personalizada con SweetAlert
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

  // Función para eliminar un empleado
  const deleteEmple = (val) => {
    // Mostrar confirmación con SweetAlert
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
        // Si se confirma, realizar la eliminación
        Axios.delete(`http://localhost:3001/delete/${val.id}`)
          .then(() => {
            getEmpleados(); // Actualizar lista
            limpiarCampos(); // Limpiar formulario
            // Alerta de éxito
            Swal.fire({
              title: "Eliminado!",
              text: val.nombre + "fue eliminado",
              icon: "success",
              timer: 3000,
            });
          })
          .catch(function (error) {
            // Alerta de error en caso de fallo
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

  // Función para limpiar los campos del formulario
  const limpiarCampos = () => {
    setAnios("");
    setNombre("");
    setPais("");
    setCargo("");
    setEdad("");
    setEditar(false);
  };

  // Función para cargar los datos del empleado en el formulario para editar
  const editarEmpleado = (val) => {
    setEditar(true);
    setNombre(val.nombre || "");
    setEdad(val.edad || "");
    setCargo(val.cargo || "");
    setPais(val.pais || "");
    setAnios(val.anios || "");
    setID(val.id);
  };

  // Función para obtener la lista de empleados del backend
  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data); // Guardar empleados en el estado
    });
  };

  getEmpleados(); // Llamado inicial para cargar la lista de empleados

  // Renderizado del componente
  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">Gestion de empleados</div>
        <div className="card-body">
          {/* Campo de entrada: Nombre */}
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

          {/* Campo de entrada: Edad */}
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

          {/* Campo de entrada: País */}
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

        {/* Campo de entrada: Cargo */}
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

        {/* Campo de entrada: Años de experiencia */}
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

      {/* Botones de acción: Registrar o Actualizar */}
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

      {/* Tabla de empleados */}
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
                    {/* Botón para editar */}
                    <button
                      type="button"
                      onClick={() => {
                        editarEmpleado(val);
                      }}
                      className="btn btn-info"
                    >
                      Editar
                    </button>
                    {/* Botón para eliminar */}
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

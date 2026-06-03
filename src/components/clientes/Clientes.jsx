import { useState } from "react";
import "./Clientes.css";

const EMPTY_CLIENT = {
  codigo: "",
  nombre: "",
  dni: "",
  telefono: "",
  direccion: "",
};

function Clientes({ clientes, setClientes }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [clienteActual, setClienteActual] = useState(EMPTY_CLIENT);

  const abrirAgregar = () => {
    setModoEdicion(false);
    setClienteActual(EMPTY_CLIENT);
    setMostrarFormulario(true);
  };

  const abrirEditar = (cliente) => {
    setModoEdicion(true);
    setClienteActual({
      codigo: cliente.codigo,
      nombre: cliente.nombre,
      dni: cliente.dni,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
    });
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setClienteActual(EMPTY_CLIENT);
  };

  const eliminarCliente = (codigo) => {
    setClientes((prev) => prev.filter((cliente) => cliente.codigo !== codigo));
  };

  const guardarCliente = (event) => {
    event.preventDefault();

    const nuevoCliente = {
      codigo: clienteActual.codigo,
      nombre: clienteActual.nombre,
      dni: clienteActual.dni,
      telefono: clienteActual.telefono,
      direccion: clienteActual.direccion,
    };

    if (modoEdicion) {
      setClientes((prev) =>
        prev.map((cliente) =>
          cliente.codigo === nuevoCliente.codigo ? nuevoCliente : cliente
        )
      );
    } else {
      const existe = clientes.some(
        (cliente) => cliente.codigo === nuevoCliente.codigo
      );

      if (existe) {
        alert("Ya existe un cliente con ese codigo");
        return;
      }

      setClientes((prev) => [...prev, nuevoCliente]);
    }

    cerrarFormulario();
  };

  return (
    <section className="clientes-view">
      <div className="clientes-banner">
        <div className="clientes-banner__info">
          <div className="clientes-banner__icon" aria-hidden="true">
            <span className="clientes-banner__head" />
            <span className="clientes-banner__body" />
          </div>

          <div>
            <h1>Clientes</h1>
            <p>{clientes.length} clientes registrados</p>
          </div>
        </div>

        <button
          type="button"
          className="clientes-banner__button"
          onClick={abrirAgregar}
        >
          + Agregar Cliente
        </button>
      </div>

      <section className="clientes-table-card">
        <table className="clientes-table">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Cliente</th>
              <th>DNI</th>
              <th>Telefono</th>
              <th>Direccion</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.codigo}>
                <td>{cliente.codigo}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.dni}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.direccion}</td>
                <td>
                  <div className="clientes-actions">
                    <button
                      type="button"
                      className="clientes-actions__edit"
                      onClick={() => abrirEditar(cliente)}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className="clientes-actions__delete"
                      onClick={() => eliminarCliente(cliente.codigo)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {clientes.length === 0 && (
              <tr>
                <td colSpan="6" className="clientes-table__empty">
                  No hay clientes registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {mostrarFormulario && (
        <div className="clientes-modal">
          <form className="clientes-form" onSubmit={guardarCliente}>
            <h2>{modoEdicion ? "Editar Cliente" : "Agregar Cliente"}</h2>

            <input
              type="text"
              placeholder="Codigo"
              value={clienteActual.codigo}
              onChange={(event) =>
                setClienteActual({
                  ...clienteActual,
                  codigo: event.target.value,
                })
              }
              disabled={modoEdicion}
              required
            />

            <input
              type="text"
              placeholder="Nombre"
              value={clienteActual.nombre}
              onChange={(event) =>
                setClienteActual({
                  ...clienteActual,
                  nombre: event.target.value,
                })
              }
              required
            />

            <input
              type="text"
              placeholder="DNI"
              value={clienteActual.dni}
              onChange={(event) =>
                setClienteActual({
                  ...clienteActual,
                  dni: event.target.value,
                })
              }
              required
            />

            <input
              type="text"
              placeholder="Telefono"
              value={clienteActual.telefono}
              onChange={(event) =>
                setClienteActual({
                  ...clienteActual,
                  telefono: event.target.value,
                })
              }
              required
            />

            <input
              type="text"
              placeholder="Direccion"
              value={clienteActual.direccion}
              onChange={(event) =>
                setClienteActual({
                  ...clienteActual,
                  direccion: event.target.value,
                })
              }
              required
            />

            <div className="clientes-form__actions">
              <button type="submit" className="clientes-form__save">
                Guardar
              </button>

              <button
                type="button"
                className="clientes-form__cancel"
                onClick={cerrarFormulario}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

export default Clientes;

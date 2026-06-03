import { useState, useEffect } from "react";

import "./Clientes.css";

function Clientes() {
    const [clientes, setClientes] = useState(() => {
        const datosGuardados = localStorage.getItem("clientes");

        return datosGuardados
            ? JSON.parse(datosGuardados)
            : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "clientes",
            JSON.stringify(clientes)
        );
    }, [clientes]);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);

    const [clienteActual, setClienteActual] = useState({
        codigo: "",
        nombre: "",
        dni: "",
        telefono: "",
        direccion: "",
    });

    const abrirAgregar = () => {
        setModoEdicion(false);

        setClienteActual({
            codigo: "",
            nombre: "",
            dni: "",
            telefono: "",
            direccion: "",
        });

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

    const eliminarCliente = (codigo) => {
        setClientes((prev) =>
            prev.filter((cliente) => cliente.codigo !== codigo)
        );
    };

    const guardarCliente = (e) => {
        e.preventDefault();

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
                    cliente.codigo === nuevoCliente.codigo
                        ? nuevoCliente
                        : cliente
                )
            );
        } else {
            const existe = clientes.some(
                (cliente) => cliente.codigo === nuevoCliente.codigo
            );

            if (existe) {
                alert("Ya existe un cliente con ese código");
                return;
            }

            setClientes((prev) => [...prev, nuevoCliente]);
        }

        setMostrarFormulario(false);

        setClienteActual({
            codigo: "",
            nombre: "",
            dni: "",
            telefono: "",
            direccion: "",
        });
    };

    return (
        <div className="productos-container">
            <div className="encabezado">
                <h1>Gestión de Clientes</h1>

                <button
                    className="btn-agregar"
                    onClick={abrirAgregar}
                >
                    + Agregar Cliente
                </button>
            </div>

            <table className="tabla-productos">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Cliente</th>
                        <th>DNI</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
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
                                <div className="acciones">
                                    <button
                                        className="btn-editar"
                                        onClick={() => abrirEditar(cliente)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn-eliminar"
                                        onClick={() =>
                                            eliminarCliente(cliente.codigo)
                                        }
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}

                    {clientes.length === 0 && (
                        <tr>
                            <td colSpan="6">
                                No hay clientes registrados
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {mostrarFormulario && (
                <div className="modal">
                    <form
                        className="formulario-producto"
                        onSubmit={guardarCliente}
                    >
                        <h2>
                            {modoEdicion
                                ? "Editar Cliente"
                                : "Agregar Cliente"}
                        </h2>

                        <input
                            type="text"
                            placeholder="Código"
                            value={clienteActual.codigo}
                            onChange={(e) =>
                                setClienteActual({
                                    ...clienteActual,
                                    codigo: e.target.value,
                                })
                            }
                            disabled={modoEdicion}
                            required
                        />

                        <input
                            type="text"
                            placeholder="Nombre"
                            value={clienteActual.nombre}
                            onChange={(e) =>
                                setClienteActual({
                                    ...clienteActual,
                                    nombre: e.target.value,
                                })
                            }
                            required
                        />

                        <input
                            type="text"
                            placeholder="DNI"
                            value={clienteActual.dni}
                            onChange={(e) =>
                                setClienteActual({
                                    ...clienteActual,
                                    dni: e.target.value,
                                })
                            }
                            required
                        />

                        <input
                            type="text"
                            placeholder="Teléfono"
                            value={clienteActual.telefono}
                            onChange={(e) =>
                                setClienteActual({
                                    ...clienteActual,
                                    telefono: e.target.value,
                                })
                            }
                            required
                        />

                        <input
                            type="text"
                            placeholder="Dirección"
                            value={clienteActual.direccion}
                            onChange={(e) =>
                                setClienteActual({
                                    ...clienteActual,
                                    direccion: e.target.value,
                                })
                            }
                            required
                        />

                        <div className="botones-formulario">
                            <button type="submit">
                                Guardar
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setMostrarFormulario(false)
                                }
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Clientes;
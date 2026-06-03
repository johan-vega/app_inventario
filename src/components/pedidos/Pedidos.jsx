import { useMemo, useState } from "react";
import "./Pedidos.css";

const STATUS_OPTIONS = ["Cancelado", "Pendiente", "Enviado", "Entregado"];

const getNextOrderId = (pedidos) => {
  if (pedidos.length === 0) {
    return 1;
  }

  return Math.max(...pedidos.map((pedido) => Number(pedido.id) || 0)) + 1;
};

const createEmptyOrder = (pedidos, clientes) => ({
  id: getNextOrderId(pedidos),
  cliente: clientes[0]?.nombre ?? "",
  fecha: "2026-06-01",
  total: "0.00",
  estado: "Pendiente",
  entrega: "Taypac",
});

const formatOrderDate = (value) => {
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
};

function Pedidos({ pedidos, setPedidos, clientes }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [pedidoActual, setPedidoActual] = useState(createEmptyOrder(pedidos, clientes));

  const clientNames = useMemo(
    () => clientes.map((cliente) => cliente.nombre).filter(Boolean),
    [clientes]
  );

  const abrirNuevoPedido = () => {
    setModoEdicion(false);
    setPedidoActual(createEmptyOrder(pedidos, clientes));
    setMostrarFormulario(true);
  };

  const abrirEdicion = (pedido) => {
    setModoEdicion(true);
    setPedidoActual({
      id: pedido.id,
      cliente: pedido.cliente,
      fecha: pedido.fecha,
      total: String(pedido.total),
      estado: pedido.estado,
      entrega: pedido.entrega,
    });
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
  };

  const eliminarPedido = (id) => {
    setPedidos((prev) => prev.filter((pedido) => pedido.id !== id));
  };

  const guardarPedido = (event) => {
    event.preventDefault();

    const pedidoGuardado = {
      id: Number(pedidoActual.id),
      cliente: pedidoActual.cliente,
      fecha: pedidoActual.fecha,
      total: Number(pedidoActual.total),
      estado: pedidoActual.estado,
      entrega: pedidoActual.entrega,
    };

    if (modoEdicion) {
      setPedidos((prev) =>
        prev.map((pedido) =>
          pedido.id === pedidoGuardado.id ? pedidoGuardado : pedido
        )
      );
    } else {
      setPedidos((prev) => [...prev, pedidoGuardado]);
    }

    cerrarFormulario();
  };

  return (
    <section className="pedidos-view">
      <div className="pedidos-banner">
        <div className="pedidos-banner__info">
          <div className="pedidos-banner__icon" aria-hidden="true">
            <span className="pedidos-banner__tag" />
            <span className="pedidos-banner__hole" />
          </div>

          <div>
            <h1>Pedidos</h1>
            <p>{pedidos.length} pedidos realizados</p>
          </div>
        </div>

        <button
          type="button"
          className="pedidos-banner__button"
          onClick={abrirNuevoPedido}
        >
          + Crear Nuevo Pedido
        </button>
      </div>

      <section className="pedidos-table-card">
        <table className="pedidos-table">
          <thead>
            <tr>
              <th>N° Pedido</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Entrega</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.cliente}</td>
                <td>{formatOrderDate(pedido.fecha)}</td>
                <td>S/.{Number(pedido.total).toFixed(2)}</td>
                <td>
                  <span
                    className={`pedidos-status pedidos-status--${pedido.estado.toLowerCase()}`}
                  >
                    {pedido.estado}
                  </span>
                </td>
                <td>{pedido.entrega}</td>
                <td>
                  <div className="pedidos-actions">
                    <button
                      type="button"
                      className="pedidos-actions__view"
                      onClick={() => abrirEdicion(pedido)}
                      title="Editar pedido"
                    >
                      Ver
                    </button>

                    <button
                      type="button"
                      className="pedidos-actions__delete"
                      onClick={() => eliminarPedido(pedido.id)}
                      title="Eliminar pedido"
                    >
                      Borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {pedidos.length === 0 && (
              <tr>
                <td colSpan="7" className="pedidos-table__empty">
                  No hay pedidos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {mostrarFormulario && (
        <div className="pedidos-modal">
          <form className="pedidos-form" onSubmit={guardarPedido}>
            <h2>{modoEdicion ? "Editar Pedido" : "Crear Pedido"}</h2>

            <input
              type="text"
              value={pedidoActual.id}
              disabled
              placeholder="Numero de pedido"
            />

            {clientNames.length > 0 ? (
              <select
                value={pedidoActual.cliente}
                onChange={(event) =>
                  setPedidoActual((prev) => ({
                    ...prev,
                    cliente: event.target.value,
                  }))
                }
              >
                {clientNames.map((nombre) => (
                  <option key={nombre} value={nombre}>
                    {nombre}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={pedidoActual.cliente}
                placeholder="Cliente"
                onChange={(event) =>
                  setPedidoActual((prev) => ({
                    ...prev,
                    cliente: event.target.value,
                  }))
                }
                required
              />
            )}

            <input
              type="date"
              value={pedidoActual.fecha}
              onChange={(event) =>
                setPedidoActual((prev) => ({
                  ...prev,
                  fecha: event.target.value,
                }))
              }
              required
            />

            <input
              type="number"
              min="0"
              step="0.01"
              value={pedidoActual.total}
              placeholder="Total"
              onChange={(event) =>
                setPedidoActual((prev) => ({
                  ...prev,
                  total: event.target.value,
                }))
              }
              required
            />

            <select
              value={pedidoActual.estado}
              onChange={(event) =>
                setPedidoActual((prev) => ({
                  ...prev,
                  estado: event.target.value,
                }))
              }
            >
              {STATUS_OPTIONS.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={pedidoActual.entrega}
              placeholder="Entrega"
              onChange={(event) =>
                setPedidoActual((prev) => ({
                  ...prev,
                  entrega: event.target.value,
                }))
              }
              required
            />

            <div className="pedidos-form__actions">
              <button type="submit" className="pedidos-form__save">
                Guardar
              </button>

              <button
                type="button"
                className="pedidos-form__cancel"
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

export default Pedidos;

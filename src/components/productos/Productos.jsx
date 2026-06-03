import { useState } from "react";
import "./Productos.css";

const EMPTY_PRODUCT = {
  codigo: "",
  nombre: "",
  precio: "",
  stock: "",
};

const countProducts = (productos) =>
  Object.values(productos).reduce(
    (total, categoryItems) => total + categoryItems.length,
    0
  );

function Productos({ productos, setProductos }) {
  const [categoria, setCategoria] = useState("Empaquetados");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoActual, setProductoActual] = useState(EMPTY_PRODUCT);

  const abrirAgregar = () => {
    setModoEdicion(false);
    setProductoActual(EMPTY_PRODUCT);
    setMostrarFormulario(true);
  };

  const abrirEditar = (producto) => {
    setModoEdicion(true);
    setProductoActual({
      codigo: producto.codigo,
      nombre: producto.nombre,
      precio: String(producto.precio),
      stock: String(producto.stock),
    });
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setProductoActual(EMPTY_PRODUCT);
  };

  const eliminarProducto = (codigo) => {
    setProductos((prev) => ({
      ...prev,
      [categoria]: prev[categoria].filter((producto) => producto.codigo !== codigo),
    }));
  };

  const guardarProducto = (event) => {
    event.preventDefault();

    const productoNuevo = {
      codigo: productoActual.codigo,
      nombre: productoActual.nombre,
      precio: Number(productoActual.precio),
      stock: Number(productoActual.stock),
    };

    if (modoEdicion) {
      setProductos((prev) => ({
        ...prev,
        [categoria]: prev[categoria].map((product) =>
          product.codigo === productoNuevo.codigo ? productoNuevo : product
        ),
      }));
    } else {
      const existe = productos[categoria].some(
        (product) => product.codigo === productoNuevo.codigo
      );

      if (existe) {
        alert("Ya existe un producto con ese codigo");
        return;
      }

      setProductos((prev) => ({
        ...prev,
        [categoria]: [...prev[categoria], productoNuevo],
      }));
    }

    cerrarFormulario();
  };

  return (
    <section className="productos-view">
      <div className="productos-banner">
        <div className="productos-banner__info">
          <div className="productos-banner__icon" aria-hidden="true">
            <span className="productos-banner__box" />
            <span className="productos-banner__stack" />
          </div>

          <div>
            <h1>Productos</h1>
            <p>{countProducts(productos)} productos registrados</p>
          </div>
        </div>

        <button
          type="button"
          className="productos-banner__button"
          onClick={abrirAgregar}
        >
          + Agregar Producto
        </button>
      </div>

      <section className="productos-table-card">
        <div className="productos-categorias">
          <button
            className={categoria === "Empaquetados" ? "activo" : ""}
            onClick={() => setCategoria("Empaquetados")}
          >
            Empaquetados
          </button>

          <button
            className={categoria === "Enlatados" ? "activo" : ""}
            onClick={() => setCategoria("Enlatados")}
          >
            Enlatados
          </button>

          <button
            className={categoria === "Bebidas" ? "activo" : ""}
            onClick={() => setCategoria("Bebidas")}
          >
            Bebidas
          </button>
        </div>

        <table className="productos-table">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos[categoria].map((producto) => (
              <tr key={producto.codigo}>
                <td>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td>S/. {Number(producto.precio).toFixed(2)}</td>
                <td>{producto.stock}</td>
                <td>
                  <div className="productos-actions">
                    <button
                      type="button"
                      className="productos-actions__edit"
                      onClick={() => abrirEditar(producto)}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className="productos-actions__delete"
                      onClick={() => eliminarProducto(producto.codigo)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {productos[categoria].length === 0 && (
              <tr>
                <td colSpan="5" className="productos-table__empty">
                  No hay productos registrados en esta categoria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {mostrarFormulario && (
        <div className="productos-modal">
          <form className="productos-form" onSubmit={guardarProducto}>
            <h2>{modoEdicion ? "Editar Producto" : "Agregar Producto"}</h2>

            <input
              type="text"
              placeholder="Codigo"
              value={productoActual.codigo}
              onChange={(event) =>
                setProductoActual({
                  ...productoActual,
                  codigo: event.target.value,
                })
              }
              disabled={modoEdicion}
              required
            />

            <input
              type="text"
              placeholder="Nombre"
              value={productoActual.nombre}
              onChange={(event) =>
                setProductoActual({
                  ...productoActual,
                  nombre: event.target.value,
                })
              }
              required
            />

            <input
              type="number"
              step="0.01"
              placeholder="Precio"
              value={productoActual.precio}
              onChange={(event) =>
                setProductoActual({
                  ...productoActual,
                  precio: event.target.value,
                })
              }
              required
            />

            <input
              type="number"
              placeholder="Stock"
              value={productoActual.stock}
              onChange={(event) =>
                setProductoActual({
                  ...productoActual,
                  stock: event.target.value,
                })
              }
              required
            />

            <div className="productos-form__actions">
              <button type="submit" className="productos-form__save">
                Guardar
              </button>

              <button
                type="button"
                className="productos-form__cancel"
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

export default Productos;

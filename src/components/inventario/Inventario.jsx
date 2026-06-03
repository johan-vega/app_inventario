import { useMemo, useState } from "react";
import "./Inventario.css";

const CATEGORY_OPTIONS = ["Empaquetados", "Bebidas", "Enlatados"];

const createEmptyProduct = () => ({
  codigo: "",
  nombre: "",
  precio: "",
  stock: "",
  categoria: CATEGORY_OPTIONS[0],
});

const getInventoryRows = (productos) =>
  Object.entries(productos).flatMap(([categoria, items]) =>
    Array.isArray(items)
      ? items.map((item) => ({
          codigo: String(item.codigo ?? ""),
          nombre: item.nombre ?? "",
          precio: String(item.precio ?? ""),
          stock: String(item.stock ?? ""),
          categoria,
        }))
      : []
  );

function Inventario({ productos, setProductos, setModuloActivo }) {
  const inventario = useMemo(() => getInventoryRows(productos), [productos]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoActual, setProductoActual] = useState(createEmptyProduct());

  const abrirEdicion = (product) => {
    setProductoActual({ ...product });
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setProductoActual(createEmptyProduct());
  };

  const eliminarProducto = (codigo, categoria) => {
    setProductos((prev) => ({
      ...prev,
      [categoria]: prev[categoria].filter((product) => product.codigo !== codigo),
    }));
  };

  const guardarProducto = (event) => {
    event.preventDefault();

    setProductos((prev) => {
      const previousCategory = Object.keys(prev).find((categoria) =>
        prev[categoria].some((product) => product.codigo === productoActual.codigo)
      );

      const nextState = { ...prev };

      if (previousCategory && previousCategory !== productoActual.categoria) {
        nextState[previousCategory] = nextState[previousCategory].filter(
          (product) => product.codigo !== productoActual.codigo
        );
      }

      const updatedProduct = {
        codigo: productoActual.codigo,
        nombre: productoActual.nombre,
        precio: Number(productoActual.precio),
        stock: Number(productoActual.stock),
      };

      nextState[productoActual.categoria] = nextState[productoActual.categoria].some(
        (product) => product.codigo === productoActual.codigo
      )
        ? nextState[productoActual.categoria].map((product) =>
            product.codigo === productoActual.codigo ? updatedProduct : product
          )
        : [...nextState[productoActual.categoria], updatedProduct];

      return nextState;
    });

    cerrarFormulario();
  };

  return (
    <section className="inventario-view">
      <div className="inventario-banner">
        <div className="inventario-banner__info">
          <div className="inventario-banner__icon" aria-hidden="true">
            <span className="inventario-banner__sheet" />
            <span className="inventario-banner__check" />
          </div>

          <div>
            <h1>Inventario</h1>
            <p>{inventario.length} productos registrados</p>
          </div>
        </div>

        <button
          type="button"
          className="inventario-banner__button"
          onClick={() => setModuloActivo("productos")}
        >
          Editar Productos
        </button>
      </div>

      <section className="inventario-table-card">
        <table className="inventario-table">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoria</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {inventario.map((product) => (
              <tr key={`${product.categoria}-${product.codigo}`}>
                <td>{product.codigo}</td>
                <td>{product.nombre}</td>
                <td>S/. {Number(product.precio).toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>{product.categoria}</td>
                <td>
                  <div className="inventario-actions">
                    <button
                      type="button"
                      className="inventario-actions__edit"
                      onClick={() => abrirEdicion(product)}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className="inventario-actions__delete"
                      onClick={() => eliminarProducto(product.codigo, product.categoria)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {inventario.length === 0 && (
              <tr>
                <td colSpan="6" className="inventario-table__empty">
                  No hay productos en inventario.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {mostrarFormulario && (
        <div className="inventario-modal">
          <form className="inventario-form" onSubmit={guardarProducto}>
            <h2>Editar producto</h2>

            <input
              type="text"
              value={productoActual.codigo}
              disabled
              placeholder="Codigo"
            />

            <input
              type="text"
              value={productoActual.nombre}
              placeholder="Producto"
              onChange={(event) =>
                setProductoActual((prev) => ({
                  ...prev,
                  nombre: event.target.value,
                }))
              }
              required
            />

            <input
              type="number"
              min="0"
              step="0.01"
              value={productoActual.precio}
              placeholder="Precio"
              onChange={(event) =>
                setProductoActual((prev) => ({
                  ...prev,
                  precio: event.target.value,
                }))
              }
              required
            />

            <input
              type="number"
              min="0"
              step="1"
              value={productoActual.stock}
              placeholder="Stock"
              onChange={(event) =>
                setProductoActual((prev) => ({
                  ...prev,
                  stock: event.target.value,
                }))
              }
              required
            />

            <select
              value={productoActual.categoria}
              onChange={(event) =>
                setProductoActual((prev) => ({
                  ...prev,
                  categoria: event.target.value,
                }))
              }
            >
              {CATEGORY_OPTIONS.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <div className="inventario-form__actions">
              <button type="submit" className="inventario-form__save">
                Guardar
              </button>

              <button
                type="button"
                className="inventario-form__cancel"
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

export default Inventario;

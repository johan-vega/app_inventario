import { useState, useEffect } from 'react'
import './Productos.css'

function Productos() {
  const [categoria, setCategoria] = useState("Empaquetados");

  const [productos, setProductos] = useState(() => {
    const datosGuardados = localStorage.getItem("productos");

    return datosGuardados
      ? JSON.parse(datosGuardados)
      : {
        Empaquetados: [],
        Enlatados: [],
        Bebidas: [],
      };
  });

  useEffect(() => {
    localStorage.setItem(
      "productos",
      JSON.stringify(productos)
    );
  }, [productos])

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [productoActual, setProductoActual] = useState({
    codigo: "",
    nombre: "",
    precio: "",
    stock: "",
  });

  const abrirAgregar = () => {
    setModoEdicion(false);

    setProductoActual({
      codigo: "",
      nombre: "",
      precio: "",
      stock: "",
    });

    setMostrarFormulario(true);
  };

  const abrirEditar = (producto) => {
    setModoEdicion(true);
    setProductoActual(producto);
    setMostrarFormulario(true);
  };

  const eliminarProducto = (codigo) => {
    setProductos((prev) => ({
      ...prev,
      [categoria]: prev[categoria].filter(
        (producto) => producto.codigo !== codigo
      ),
    }));
  };

  const guardarProducto = (e) => {
    e.preventDefault();

    const productoNuevo = {
      codigo: productoActual.codigo,
      nombre: productoActual.nombre,
      precio: Number(productoActual.precio),
      stock: Number(productoActual.stock),
    };

    if (modoEdicion) {
      setProductos((prev) => ({
        ...prev,
        [categoria]: prev[categoria].map((p) =>
          p.codigo === productoNuevo.codigo ? productoNuevo : p
        ),
      }));
    } else {
      const existe = productos[categoria].some(
        (p) => p.codigo === productoNuevo.codigo
      );

      if (existe) {
        alert("Ya existe un producto con ese código");
        return;
      }

      setProductos((prev) => ({
        ...prev,
        [categoria]: [...prev[categoria], productoNuevo],
      }));
    }

    setMostrarFormulario(false);
  };

  return (
    <div className="productos-container">
      <div className="encabezado">
        <h1>Gestión de Productos</h1>

        <button
          className="btn-agregar"
          onClick={abrirAgregar}
        >
          + Agregar Producto
        </button>
      </div>

      <div className="categorias">
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

      <table className="tabla-productos">
        <thead>
          <tr>
            <th>Código</th>
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
              <td>S/. {producto.precio.toFixed(2)}</td>
              <td>{producto.stock}</td>

              <td>
                <div className="acciones">
                  <button
                    className="btn-editar"
                    onClick={() => abrirEditar(producto)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn-eliminar"
                    onClick={() =>
                      eliminarProducto(producto.codigo)
                    }
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {mostrarFormulario && (
        <div className="modal">
          <form
            className="formulario-producto"
            onSubmit={guardarProducto}
          >
            <h2>
              {modoEdicion
                ? "Editar Producto"
                : "Agregar Producto"}
            </h2>

            <input
              type="text"
              placeholder="Código"
              value={productoActual.codigo}
              onChange={(e) =>
                setProductoActual({
                  ...productoActual,
                  codigo: e.target.value,
                })
              }
              disabled={modoEdicion}
              required
            />

            <input
              type="text"
              placeholder="Nombre"
              value={productoActual.nombre}
              onChange={(e) =>
                setProductoActual({
                  ...productoActual,
                  nombre: e.target.value,
                })
              }
              required
            />

            <input
              type="number"
              step="0.01"
              placeholder="Precio"
              value={productoActual.precio}
              onChange={(e) =>
                setProductoActual({
                  ...productoActual,
                  precio: e.target.value,
                })
              }
              required
            />

            <input
              type="number"
              placeholder="Stock"
              value={productoActual.stock}
              onChange={(e) =>
                setProductoActual({
                  ...productoActual,
                  stock: e.target.value,
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

export default Productos;
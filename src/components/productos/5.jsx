import { useState } from "react";
import "./5.css";


const Productos = () => {
  const [categoria, setCategoria] = useState("Empaquetados");

  const [productos, setProductos] = useState({
    Empaquetados: [
      { codigo: "1001", nombre: "Galletas", precio: 3.5, stock: 50 },
      { codigo: "1002", nombre: "Arroz", precio: 4.2, stock: 80 },
      { codigo: "1003", nombre: "Fideos", precio: 2.8, stock: 65 },
    ],

    Enlatados: [
      { codigo: "2001", nombre: "Atún", precio: 8, stock: 30 },
      { codigo: "2002", nombre: "Frejoles", precio: 6, stock: 25 },
      { codigo: "2003", nombre: "Duraznos", precio: 7, stock: 20 },
    ],

    Bebidas: [
      { codigo: "3001", nombre: "Monster", precio: 8, stock: 30 },
      { codigo: "3002", nombre: "Coca Cola", precio: 4, stock: 45 },
      { codigo: "3003", nombre: "Inca Kola", precio: 4, stock: 50 },
    ],
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [productoActual, setProductoActual] = useState({
    codigo: "",
    nombre: "",
    precio: "",
    stock: "",
  });

  const eliminarProducto = (codigo) => {
    setProductos({
      ...productos,
      [categoria]: productos[categoria].filter(
        (producto) => producto.codigo !== codigo
      ),
    });
  };

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

    setProductoActual({
      codigo: producto.codigo,
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
    });

    setMostrarFormulario(true);
  };

  const guardarProducto = (e) => {
    e.preventDefault();

    const productoFormateado = {
      ...productoActual,
      precio: Number(productoActual.precio),
      stock: Number(productoActual.stock),
    };

    if (modoEdicion) {
      setProductos({
        ...productos,
        [categoria]: productos[categoria].map((p) =>
          p.codigo === productoFormateado.codigo
            ? productoFormateado
            : p
        ),
      });
    } else {
      setProductos({
        ...productos,
        [categoria]: [
          ...productos[categoria],
          productoFormateado,
        ],
      });
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
              <td>S/. {Number(producto.precio).toFixed(2)}</td>
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
                    onClick={() => eliminarProducto(producto.codigo)}
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
                onClick={() => setMostrarFormulario(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Productos;
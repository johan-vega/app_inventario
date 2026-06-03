import "./Navbar.css";
import logo from "../assets/stockflow.png";

function Navbar({ setModuloActivo }) {
  return (
    <aside className="navbar-lateral">
      <img src={logo} alt="Logo de StockFlow" className="navbar-logo" />


      <ul className="navbar-menu">
        <li>
          <button onClick={() => setModuloActivo("dashboard")}>
            Dashboard
          </button>
        </li>

        <li>
          <button onClick={() => setModuloActivo("productos")}>
            Productos
          </button>
        </li>

        <li>
          <button onClick={() => setModuloActivo("clientes")}>
            Clientes
          </button>
        </li>

        <li>
          <button onClick={() => setModuloActivo("pedidos")}>
            Pedidos
          </button>
        </li>

        <li>
          <button onClick={() => setModuloActivo("inventario")}>
            Inventario
          </button>
        </li>

        

      </ul>
    </aside>
  );
}

export default Navbar;
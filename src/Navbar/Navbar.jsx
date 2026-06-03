import "./Navbar.css";
import logo from "../assets/stockflow.png";

function Navbar({ setModuloActivo }) {
  return (
    <aside className="navbar-lateral">
      <p className="navbar-heading">DASHBOARD</p>
      <span className="navbar-subtitle">SISTEMA DE INVENTARIO</span>

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

      <div className="navbar-turno-card">
        <span className="navbar-turno-label">TURNO ACTIVO</span>
        <strong>08:00 AM - 06:00 PM</strong>
        <p>
          Tenemos un inventario de diferentes productos en stock,
          administrador encargado.
        </p>
      </div>
    </aside>
  );
}

export default Navbar;

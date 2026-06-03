import { useState } from "react";

import Navbar from "./Navbar/Navbar";

import Productos from "./components/productos/Productos";

import Clientes from "./components/clientes/Clientes";

const Inventario = () => <h2>Módulo Inventario en desarrollo</h2>;

const Pedidos = () => <h2>Módulo Pedidos en desarrollo</h2>;

function Dashboard() {
  const [moduloActivo, setModuloActivo] = useState("dashboard");

  const renderModulo = () => {
    switch (moduloActivo) {
      case "productos":
        return <Productos />;

      case "clientes":
        return <Clientes />;

      case "inventario":
        return <Inventario />;

      case "pedidos":
        return <Pedidos />;

      default:
        return (
          <div className="text-center">
            <h1>Dashboard</h1>
            <p>Bienvenido a StockFlow</p>
          </div>
        );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Navbar setModuloActivo={setModuloActivo} />

      <main
        style={{
          flex: 1,
          padding: "20px",
          background: "#f5f5f5",
        }}
      >
        {renderModulo()}
      </main>
    </div>
  );
}

export default Dashboard;
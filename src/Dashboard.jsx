import { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import DashboardHome from "./components/dashboard/Dashboard";
import Productos from "./components/productos/Productos";
import Clientes from "./components/clientes/Clientes";
import Inventario from "./components/inventario/Inventario";
import Pedidos from "./components/pedidos/Pedidos";

const PRODUCT_STORAGE_KEY = "productos";
const CLIENT_STORAGE_KEY = "clientes";
const ORDER_STORAGE_KEY = "pedidos";

const DEFAULT_PRODUCTS = {
  Empaquetados: [],
  Enlatados: [],
  Bebidas: [],
};

const DEFAULT_ORDERS = [
  {
    id: 1,
    cliente: "Carlos",
    fecha: "2026-06-01",
    total: 40,
    estado: "Cancelado",
    entrega: "Taypac",
  },
  {
    id: 2,
    cliente: "Luis",
    fecha: "2026-06-01",
    total: 50,
    estado: "Pendiente",
    entrega: "Taypac",
  },
  {
    id: 3,
    cliente: "Ramos",
    fecha: "2026-06-01",
    total: 60,
    estado: "Enviado",
    entrega: "Taypac",
  },
  {
    id: 4,
    cliente: "Ramos",
    fecha: "2026-06-01",
    total: 70,
    estado: "Entregado",
    entrega: "Taypac",
  },
  {
    id: 5,
    cliente: "Alejandra",
    fecha: "2026-06-01",
    total: 80,
    estado: "Cancelado",
    entrega: "Taypac",
  },
];

const readJsonStorage = (storageKey, fallbackValue) => {
  if (typeof window === "undefined") {
    return fallbackValue;
  }

  try {
    const savedValue = window.localStorage.getItem(storageKey);
    return savedValue ? JSON.parse(savedValue) : fallbackValue;
  } catch {
    return fallbackValue;
  }
};

function Dashboard() {
  const [moduloActivo, setModuloActivo] = useState("dashboard");
  const [productos, setProductos] = useState(() =>
    readJsonStorage(PRODUCT_STORAGE_KEY, DEFAULT_PRODUCTS)
  );
  const [clientes, setClientes] = useState(() =>
    readJsonStorage(CLIENT_STORAGE_KEY, [])
  );
  const [pedidos, setPedidos] = useState(() =>
    readJsonStorage(ORDER_STORAGE_KEY, DEFAULT_ORDERS)
  );

  useEffect(() => {
    window.localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    window.localStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(clientes));
  }, [clientes]);

  useEffect(() => {
    window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(pedidos));
  }, [pedidos]);

  const renderModulo = () => {
    switch (moduloActivo) {
      case "productos":
        return <Productos productos={productos} setProductos={setProductos} />;

      case "clientes":
        return <Clientes clientes={clientes} setClientes={setClientes} />;

      case "inventario":
        return (
          <Inventario
            productos={productos}
            setProductos={setProductos}
            setModuloActivo={setModuloActivo}
          />
        );

      case "pedidos":
        return (
          <Pedidos
            pedidos={pedidos}
            setPedidos={setPedidos}
            clientes={clientes}
          />
        );

      default:
        return (
          <DashboardHome
            productos={productos}
            clientes={clientes}
            setModuloActivo={setModuloActivo}
          />
        );
    }
  };

  return (
    <div className="dashboard-layout">
      <Navbar setModuloActivo={setModuloActivo} />
      <main className="dashboard-main">{renderModulo()}</main>
    </div>
  );
}

export default Dashboard;

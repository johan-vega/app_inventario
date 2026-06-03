import "./Dashboard.css";

const getProductList = (productos) =>
  Object.values(productos).flatMap((categoryProducts) =>
    Array.isArray(categoryProducts) ? categoryProducts : []
  );

function DashboardHome({ productos, clientes, setModuloActivo }) {
  const productList = getProductList(productos);
  const featuredProducts = productList.slice(0, 5);
  const relevantClients = clientes.slice(0, 5);

  return (
    <section className="dashboard-home">
      <header className="dashboard-home__header">
        <span className="dashboard-home__eyebrow">Panel administrativo</span>

        <div className="dashboard-home__hero-grid">
          <div className="dashboard-home__hero-copy">
            <h1>Aplicacion de nuestro gestion de inventario para la tienda</h1>

            <p>
              Desde aqui el administrador puede revisar el turno de la tienda,
              abrir el dashboard y navegar entre las secciones preparadas para
              productos, clientes, pedidos, inventario y cierre de sesion.
            </p>

            <button
              type="button"
              className="dashboard-home__cta"
              onClick={() => setModuloActivo("productos")}
            >
              Ir a Productos
            </button>
          </div>

          <div className="dashboard-home__hero-aside">
            <article className="dashboard-home__mini-card">
              <span>Acceso actual</span>
              <strong>Admin</strong>
              <p>Sesion protegida para la administracion del negocio.</p>
            </article>

            <article className="dashboard-home__mini-card">
              <span>Base activa</span>
              <strong>Productos</strong>
              <p>
                El sistema esta enlazado con productos y categorias para
                realizar algun pedido.
              </p>
            </article>
          </div>
        </div>
      </header>

      <div className="dashboard-home__stats">
        <article className="dashboard-home__stat-card">
          <span>Productos disponibles</span>
          <strong>{productList.length}</strong>
          <p>Nuevos productos agregados recientemente.</p>
        </article>

        <article className="dashboard-home__stat-card">
          <span>Clientes</span>
          <strong>{clientes.length}</strong>
          <p>Listas de los clientes que se registraron.</p>
        </article>
      </div>

      <div className="dashboard-home__content-grid">
        <article className="dashboard-home__panel dashboard-home__panel--tall">
          <span>Recomendados</span>
          <h2>Productos Destacados</h2>

          {featuredProducts.length > 0 ? (
            <ul className="dashboard-home__list">
              {featuredProducts.map((product) => (
                <li key={product.codigo}>
                  <strong>{product.nombre}</strong>
                  <span>
                    Codigo {product.codigo} - Stock {product.stock}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="dashboard-home__empty">
              Aun no hay productos registrados. Agrega productos para verlos
              destacados aqui.
            </p>
          )}
        </article>

        <article className="dashboard-home__panel dashboard-home__panel--tall">
          <span>Vista rapida</span>
          <h2>Clientes Relevantes</h2>

          {relevantClients.length > 0 ? (
            <ul className="dashboard-home__list dashboard-home__list--clients">
              {relevantClients.map((client) => (
                <li key={client.codigo}>
                  <strong>{client.nombre}</strong>
                  <span>{client.telefono || client.dni}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="dashboard-home__empty">
              Aun no hay clientes registrados para mostrar en este panel.
            </p>
          )}
        </article>
      </div>
    </section>
  );
}

export default DashboardHome;

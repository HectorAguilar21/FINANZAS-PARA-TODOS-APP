import React from "react";

export default function Landing({
  setViewLanding,
  setViewPresupuesto,
  setViewCuentas,
}) {
  const handlePresupuesto = () => {
    setViewLanding(false);
    setViewPresupuesto(true);
    setViewCuentas(false);
  };

  const handleCuentas = () => {
    setViewLanding(false);
    setViewPresupuesto(false);
    setViewCuentas(true);
  };

  return (
    <>
      <h1 className="h1-landing">Finanzas para Todos</h1>
      <main className="main-landing">
        <div className="presupuesto">
          <button className="btn btn-presupuesto" onClick={handlePresupuesto}>
            <h2>Definir presupuesto</h2>
            <img
              src="img/imgLanding/presupuesto.png"
              alt="imagen de presupuesto"
              title="imagen obtenida en: 'https://www.flaticon.es/iconos-gratis/direccion Dirección iconos creados por kerismaker'"
            />
          </button>
        </div>
        <div className="cuentas">
          <button className="btn btn-cuentas" onClick={handleCuentas}>
            <h2>Gestionar cuentas</h2>
            <img
              src="img/imgLanding/cuentas.png"
              alt="imagen de cuentas"
              title="imagen obtenida en: 'https://www.flaticon.es/iconos-gratis/direccion Dirección iconos creados por kerismaker'"
            />
          </button>
        </div>
      </main>
    </>
  );
}

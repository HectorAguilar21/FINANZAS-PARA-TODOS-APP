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
              src="/src/assets/imgLanding/presupuesto.png"
              alt="imagen de presupuesto"
            />
          </button>
        </div>
        <div className="cuentas">
          <button className="btn btn-cuentas" onClick={handleCuentas}>
            <h2>Gestionar cuentas</h2>
            <img
              src="/src/assets/imgLanding/cuentas.png"
              alt="imagen de cuentas"
            />
          </button>
        </div>
      </main>
    </>
  );
}

{
  /* <a
  href="https://www.flaticon.es/iconos-gratis/direccion"
  title="dirección iconos"
>
  Dirección iconos creados por kerismaker - Flaticon
</a>; */
}

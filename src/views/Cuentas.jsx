import React, { useEffect, useState } from "react";
import FormPresupuesto from "../components/reusableComponents/FormPresupuesto";
import PanelCuentas from "../components/componentsCuentasView/PanelCuentas";
import Modal from "../components/reusableComponents/Modal";

export default function Cuentas({
  setFormPresupuesto,
  formPresupuesto,
  setFormValorPresupuesto,
  formValorPresupuesto,
  setIdModal,
  idModal,
  setViewCuentas,
  setViewLanding,
}) {
  const [activeResumen, setActiveResumen] = useState(true);
  const handleButtonResumen = () => {
    setActiveResumen(true);
  };
  const handleButtonEstadisticas = () => {
    setActiveResumen(false);
  };
  useEffect(() => {
    setIdModal("nuevoRegistroCuentas");
  }, []);

  return (
    <div className="cuentas-view">
      <h1>Cuentas</h1>
      {formPresupuesto && (
        <div className="botones-p-cuentas">
          <button onClick={handleButtonResumen}>Resumen</button>
          <button onClick={handleButtonEstadisticas}>Estadisticas</button>
        </div>
      )}
      <main className={`${activeResumen === false && "main-correcion"}`}>
        {formPresupuesto ? (
          <PanelCuentas
            formValorPresupuesto={formValorPresupuesto}
            setFormValorPresupuesto={setFormValorPresupuesto}
            setFormPresupuesto={setFormPresupuesto}
            activeResumen={activeResumen}
            idModal={idModal}
            setViewCuentas={setViewCuentas}
            setViewLanding={setViewLanding}
          />
        ) : (
          <FormPresupuesto
            setFormPresupuesto={setFormPresupuesto}
            setFormValorPresupuesto={setFormValorPresupuesto}
            formValorPresupuesto={formValorPresupuesto}
          />
        )}
      </main>
    </div>
  );
}

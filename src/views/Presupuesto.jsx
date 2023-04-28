import React, { useEffect } from "react";
import FormPresupuesto from "../components/reusableComponents/FormPresupuesto";
import PanelGastos from "../components/componentsPresupuestoView/PanelGastos";

export default function Presupuesto({
  viewPresupuesto,
  setFormPresupuesto,
  formPresupuesto,
  setFormValorPresupuesto,
  formValorPresupuesto,
  setIdModal,
  idModal,
  setViewPresupuesto,
  setViewLanding,
}) {
  useEffect(() => {
    setIdModal("nuevoGasto");
  }, []);
  return (
    <div className="presupuesto-view">
      <h1>Presupuesto</h1>
      <main>
        {formPresupuesto ? (
          <PanelGastos
            setFormPresupuesto={setFormPresupuesto}
            formValorPresupuesto={formValorPresupuesto}
            setFormValorPresupuesto={setFormValorPresupuesto}
            idModal={idModal}
            setViewPresupuesto={setViewPresupuesto}
            setViewLanding={setViewLanding}
          />
        ) : (
          <FormPresupuesto
            setFormPresupuesto={setFormPresupuesto}
            setFormValorPresupuesto={setFormValorPresupuesto}
            formValorPresupuesto={formValorPresupuesto}
            viewPresupuesto={viewPresupuesto}
          />
        )}
      </main>
    </div>
  );
}

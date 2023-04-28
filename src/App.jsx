import React, { useEffect } from "react";
import { useState } from "react";
import Landing from "./views/Landing";
import Presupuesto from "./views/Presupuesto";
import Cuentas from "./views/Cuentas";

function App() {
  const [viewLanding, setViewLanding] = useState(true);
  const [viewPresupuesto, setViewPresupuesto] = useState(
    Boolean(localStorage.getItem("viewPresupuesto")) ?? false
  );
  const [viewCuentas, setViewCuentas] = useState(
    Boolean(localStorage.getItem("viewCuentas")) ?? false
  );
  const [formPresupuesto, setFormPresupuesto] = useState(
    Boolean(localStorage.getItem("formPresupuesto")) ?? false
  );
  const [formValorPresupuesto, setFormValorPresupuesto] = useState(
    Number(localStorage.getItem("ValorPresupuesto")) ?? 0
  );
  const [idModal, setIdModal] = useState("");

  useEffect(() => {
    localStorage.setItem("ValorPresupuesto", formValorPresupuesto ?? 0);
  }, [formValorPresupuesto]);

  useEffect(() => {
    const valorPresupuestoLS =
      Number(localStorage.getItem("ValorPresupuesto")) ?? 0;

    if (valorPresupuestoLS > 0 && viewPresupuesto) {
      setViewLanding(false);
      localStorage.setItem("viewPresupuesto", true);
      localStorage.setItem("formPresupuesto", true);
    } else if (!isNaN(valorPresupuestoLS) && viewCuentas) {
      setViewLanding(false);
      localStorage.setItem("viewCuentas", true);
      localStorage.setItem("formPresupuesto", true);
    }
  }, [formPresupuesto]);

  return (
    <>
      {viewLanding ? (
        <Landing
          setViewLanding={setViewLanding}
          setViewPresupuesto={setViewPresupuesto}
          setViewCuentas={setViewCuentas}
        />
      ) : (
        (viewPresupuesto && viewCuentas === false && (
          <Presupuesto
            viewPresupuesto={viewPresupuesto}
            setFormPresupuesto={setFormPresupuesto}
            formPresupuesto={formPresupuesto}
            setFormValorPresupuesto={setFormValorPresupuesto}
            formValorPresupuesto={formValorPresupuesto}
            setIdModal={setIdModal}
            idModal={idModal}
            setViewPresupuesto={setViewPresupuesto}
            setViewLanding={setViewLanding}
          />
        )) ||
        (viewCuentas && viewPresupuesto === false && (
          <Cuentas
            setFormPresupuesto={setFormPresupuesto}
            formPresupuesto={formPresupuesto}
            setFormValorPresupuesto={setFormValorPresupuesto}
            formValorPresupuesto={formValorPresupuesto}
            setIdModal={setIdModal}
            idModal={idModal}
            setViewCuentas={setViewCuentas}
            setViewLanding={setViewLanding}
          />
        ))
      )}
    </>
  );
}

export default App;

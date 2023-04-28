import React from "react";
import Gasto from "./Gasto";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";

export default function HistorialGastos({
  gastos,
  setEditarGasto,
  idModal,
  eliminarGasto,
  eliminatMonto,
}) {
  defineElement(lottie.loadAnimation);

  return (
    <div className="historial-container">
      <div>
        <h2>Historial de gastos</h2>
        <section>
          {!gastos.length ? (
            <h2>Aun no hay gastos</h2>
          ) : (
            gastos.map((gasto) => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setEditarGasto={setEditarGasto}
                idModal={idModal}
                eliminarGasto={eliminarGasto}
                eliminatMonto={eliminatMonto}
              />
            ))
          )}
        </section>
      </div>
    </div>
  );
}

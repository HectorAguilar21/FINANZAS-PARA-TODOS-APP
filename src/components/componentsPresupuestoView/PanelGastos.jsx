import React from "react";
import { useEffect, useState } from "react";
import ResumenGastos from "./ResumenGastos";
import HistorialGastos from "./HistorialGastos";
import Modal from "../reusableComponents/Modal";
import { generarId } from "../../helpers";

export default function PanelGastos({
  setFormPresupuesto,
  formValorPresupuesto,
  idModal,
  setFormValorPresupuesto,
  setViewPresupuesto,
  setViewLanding,
}) {
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );
  const [editarGasto, setEditarGasto] = useState({});
  const guardarGasto = (gasto) => {
    if (gasto.id) {
      const gastosActualizados = gastos.map((gastoActual) =>
        gastoActual.id === gasto.id ? gasto : gastoActual
      );
      setGastos(gastosActualizados);
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
  };
  const eliminarGasto = (gastoId) => {
    const gastosActualizados = gastos.filter(
      (gastoActual) => gastoActual.id !== gastoId
    );
    setGastos(gastosActualizados);
  };

  const handleLimpiarModal = () => {
    setEditarGasto({});
  };

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  return (
    <div className="panel-gastos">
      <ResumenGastos
        formValorPresupuesto={formValorPresupuesto}
        setFormValorPresupuesto={setFormValorPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
        setFormPresupuesto={setFormPresupuesto}
        setViewPresupuesto={setViewPresupuesto}
        setViewLanding={setViewLanding}
      />
      <HistorialGastos
        gastos={gastos}
        setEditarGasto={setEditarGasto}
        idModal={idModal}
        eliminarGasto={eliminarGasto}
      />

      <button
        type="button"
        className="boton-modal"
        data-bs-toggle="modal"
        data-bs-target={`#${idModal}`}
        onClick={handleLimpiarModal}
      >
        +
      </button>
      <Modal
        idModal={idModal}
        guardarGasto={guardarGasto}
        editarGasto={editarGasto}
        handleLimpiarModal={handleLimpiarModal}
      />
    </div>
  );
}

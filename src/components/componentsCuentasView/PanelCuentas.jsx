import React, { useEffect, useState } from "react";
import Resumen from "./Resumen";
import Estadisticas from "./Estadisticas";
import Modal from "../reusableComponents/Modal";
import { generarId } from "../../helpers";

export default function PanelCuentas({
  activeResumen,
  formValorPresupuesto,
  setFormValorPresupuesto,
  idModal,
  setFormPresupuesto,
  setViewCuentas,
  setViewLanding,
}) {
  const [saldoInicial, setSaldoInicial] = useState(0);
  useEffect(() => {
    setSaldoInicial(formValorPresupuesto);
  }, [formValorPresupuesto]);

  const [cuentasIngresos, setCuentasIngresos] = useState(
    localStorage.getItem("cuentasIngresos")
      ? JSON.parse(localStorage.getItem("cuentasIngresos"))
      : []
  );
  const guardarRegistroIngreso = (registroIngreso) => {
    if (registroIngreso.id) {
      const registrosIngresosActualizados = cuentasIngresos.map(
        (registroActual) =>
          registroActual.id === registroIngreso.id
            ? registroIngreso
            : registroActual
      );
      setCuentasIngresos(registrosIngresosActualizados);
    } else {
      registroIngreso.id = generarId();
      registroIngreso.fecha = Date.now();
      setCuentasIngresos([...cuentasIngresos, registroIngreso]);
    }
  };

  const [cuentasEgresos, setCuentasEgresos] = useState(
    localStorage.getItem("cuentasEgresos")
      ? JSON.parse(localStorage.getItem("cuentasEgresos"))
      : []
  );
  const guardarRegistroEgreso = (registroEgreso) => {
    if (registroEgreso.id) {
      const registrosEgresosActualizados = cuentasEgresos.map(
        (registroActual) =>
          registroActual.id === registroEgreso.id
            ? registroEgreso
            : registroActual
      );
      setCuentasEgresos(registrosEgresosActualizados);
    } else {
      registroEgreso.id = generarId();
      registroEgreso.fecha = Date.now();
      setCuentasEgresos([...cuentasEgresos, registroEgreso]);
    }
  };

  const [editarRegistro, setEditarRegistro] = useState({});

  const eliminarRegistroIngreso = (registroId) => {
    const registrosIngresosActualizados = cuentasIngresos.filter(
      (registroActual) => registroActual.id !== registroId
    );
    setCuentasIngresos(registrosIngresosActualizados);
  };

  const eliminarRegistroEgreso = (registroId) => {
    const registrosEgresosActualizados = cuentasEgresos.filter(
      (registroActual) => registroActual.id !== registroId
    );
    setCuentasEgresos(registrosEgresosActualizados);
  };

  const handleLimpiarModal = () => {
    setEditarRegistro({});
  };

  const handleResetApp = () => {
    const confirmacion = confirm(
      "¿Deseas reinicar la app y perder todos los datos?"
    );

    if (confirmacion) {
      setCuentasIngresos([]);
      setCuentasEgresos([]);
      setFormValorPresupuesto(0);
      localStorage.setItem("viewCuentas", "");
      localStorage.setItem("formPresupuesto", "");
      setViewCuentas(false);
      setFormPresupuesto(false);
      setViewLanding(true);
      localStorage.setItem("cuentasIngresos", "");
      localStorage.setItem("cuentasEgresos", "");
    }
  };

  useEffect(() => {
    localStorage.setItem(
      "cuentasIngresos",
      JSON.stringify(cuentasIngresos) ?? []
    );
    localStorage.setItem(
      "cuentasEgresos",
      JSON.stringify(cuentasEgresos) ?? []
    );
  }, [cuentasIngresos, cuentasEgresos]);

  return (
    <div className="panel-cuentas">
      {!activeResumen && (
        <button
          className="btn-reset reset-cuentas"
          type="button"
          onClick={handleResetApp}
        >
          Reiniciar app
        </button>
      )}
      {activeResumen ? (
        <Resumen
          saldoInicial={saldoInicial}
          cuentasIngresos={cuentasIngresos}
          cuentasEgresos={cuentasEgresos}
          setEditarRegistro={setEditarRegistro}
          eliminarRegistroIngreso={eliminarRegistroIngreso}
          eliminarRegistroEgreso={eliminarRegistroEgreso}
          idModal={idModal}
        />
      ) : (
        <Estadisticas
          cuentasIngresos={cuentasIngresos}
          cuentasEgresos={cuentasEgresos}
        />
      )}
      <button
        className="btn-nuevo-registro"
        type="button"
        data-bs-toggle="modal"
        data-bs-target={`#${idModal}`}
        onClick={handleLimpiarModal}
      >
        Nuevo Registro
      </button>
      <Modal
        idModal={idModal}
        guardarRegistroIngreso={guardarRegistroIngreso}
        guardarRegistroEgreso={guardarRegistroEgreso}
        editarRegistro={editarRegistro}
        handleLimpiarModal={handleLimpiarModal}
      />
    </div>
  );
}

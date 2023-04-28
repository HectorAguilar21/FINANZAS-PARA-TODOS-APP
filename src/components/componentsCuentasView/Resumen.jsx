import React, { useEffect, useState } from "react";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";
import Ingreso from "./Ingreso";
import Egreso from "./Egreso";
import { formatoDinero } from "../../helpers";

export default function Resumen({
  saldoInicial,
  cuentasIngresos,
  cuentasEgresos,
  setEditarRegistro,
  eliminarRegistroIngreso,
  eliminarRegistroEgreso,
  idModal,
}) {
  defineElement(lottie.loadAnimation);

  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalEgresos, setTotalEgresos] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const totalGastadoIngresos = cuentasIngresos.reduce(
      (total, ingreso) => ingreso.cantidad + total,
      0
    );
    setTotalIngresos(totalGastadoIngresos);
  }, [cuentasIngresos]);

  useEffect(() => {
    const totalGastadoEgresos = cuentasEgresos.reduce(
      (total, egreso) => egreso.cantidad + total,
      0
    );
    setTotalEgresos(totalGastadoEgresos);
  }, [cuentasEgresos]);

  useEffect(() => {
    const balanceActual = saldoInicial + totalIngresos - totalEgresos;
    setBalance(balanceActual);
  }, [saldoInicial, totalIngresos, totalEgresos]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  const [viewIOE, setViewIOE] = useState("ingresos");

  const handleVerIOE = () => {
    if (viewIOE === "ingresos") {
      setViewIOE("egresos");
    } else {
      setViewIOE("ingresos");
    }
  };
  return (
    <div className="resumen-control">
      {viewIOE === "ingresos" || windowWidth > 1279 ? (
        <div className="ingresos">
          <div className="titulos titulo-ingresos">
            <h2>{formatoDinero(totalIngresos)}</h2>
            <h3>Ingresos</h3>
          </div>
          <div className="container-ingresos">
            {!cuentasIngresos.length ? (
              <h2>Aun no hay ingresos</h2>
            ) : (
              cuentasIngresos.map((ingreso) => (
                <Ingreso
                  key={ingreso.id}
                  ingreso={ingreso}
                  setEditarRegistro={setEditarRegistro}
                  eliminarRegistroIngreso={eliminarRegistroIngreso}
                  idModal={idModal}
                />
              ))
            )}
          </div>
        </div>
      ) : null}
      {viewIOE === "egresos" || windowWidth > 1279 ? (
        <div className="egresos">
          <div className="titulos titulo-egresos">
            <h2>{`-${formatoDinero(totalEgresos)}`}</h2>
            <h3>Egresos</h3>
          </div>
          <div className="container-egresos">
            {!cuentasEgresos.length ? (
              <h2>Aun no hay egresos</h2>
            ) : (
              cuentasEgresos.map((egreso) => (
                <Egreso
                  key={egreso.id}
                  egreso={egreso}
                  setEditarRegistro={setEditarRegistro}
                  eliminarRegistroEgreso={eliminarRegistroEgreso}
                  idModal={idModal}
                />
              ))
            )}
          </div>
        </div>
      ) : null}
      <div
        className={`balance ${balance < 0 ? "color-rojo" : ""}`}
      >{`Balance: ${formatoDinero(balance)}`}</div>

      <button className="btn-viewIOE" type="button" onClick={handleVerIOE}>
        {viewIOE === "ingresos" ? "Ver Egresos" : "Ver Ingresos"}
      </button>

      <div className="saldo-inicial">{`Saldo inicial: ${formatoDinero(
        saldoInicial
      )}`}</div>
    </div>
  );
}

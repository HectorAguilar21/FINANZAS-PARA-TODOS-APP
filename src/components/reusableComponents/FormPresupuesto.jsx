import React, { useState } from "react";
import Mensaje from "./Mensaje";

export default function FormPresupuesto({
  setFormPresupuesto,
  setFormValorPresupuesto,
  formValorPresupuesto,
  viewPresupuesto,
}) {
  const [mensaje, setMensaje] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (viewPresupuesto) {
      if (!formValorPresupuesto || formValorPresupuesto < 0) {
        setMensaje("No es un presupuesto valido");
        return;
      }
    }

    setMensaje("");
    setFormPresupuesto(true);
  };

  const obtenerPresupuesto = (e) => {
    setFormValorPresupuesto(Number(e.target.value));
  };

  return (
    <div className="form-container">
      <form className="formulario" onSubmit={handleFormSubmit}>
        <div className="campo">
          <label htmlFor="">
            {viewPresupuesto ? "Definir Presupuesto" : "Inicia tus cuentas"}
          </label>
          {!viewPresupuesto && (
            <h5>
              Nota: puedes iniciar con saldo positivo, ej: $2000, con saldo
              negativo, ej: -$2000 o con saldo $0
            </h5>
          )}
          <br />
          <input
            type="number"
            className="nuevo-presupuesto"
            placeholder={`${
              viewPresupuesto ? "Definir Presupuesto" : "Ingresa valor inicial"
            }`}
            value={formValorPresupuesto}
            onChange={obtenerPresupuesto}
            required
          />
        </div>
        <input type="submit" value="AÑADIR" />
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  );
}

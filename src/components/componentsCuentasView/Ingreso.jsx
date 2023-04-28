import React from "react";
import { formatoDinero, generarFecha } from "../../helpers";

export default function Ingreso({
  ingreso,
  setEditarRegistro,
  idModal,
  eliminarRegistroIngreso,
}) {
  const handleEditarbtn = () => {
    setEditarRegistro(ingreso);
  };

  const handleEliminarbtn = () => {
    eliminarRegistroIngreso(ingreso.id);
  };

  return (
    <div className="container-info">
      <div className="info">
        <div className="info-parrafo">
          <p>
            Titulo: <span>{ingreso.nombre}</span>
          </p>
          <p>
            Categoria: <span>{ingreso.categoriaCuentasIngresos}</span>
          </p>
          <p>
            Fecha: <span>{generarFecha(ingreso.fecha)}</span>
          </p>
        </div>
        <div className="valor-actions">
          <div className="btn-actions">
            <div
              onClick={handleEditarbtn}
              type="button"
              data-bs-toggle="modal"
              data-bs-target={`#${idModal}`}
            >
              <lord-icon
                src="https://cdn.lordicon.com/puvaffet.json"
                trigger="hover"
                colors="primary:#eeca66,secondary:#e8b730"
              ></lord-icon>
            </div>
            <div onClick={handleEliminarbtn}>
              <lord-icon
                src="https://cdn.lordicon.com/gsqxdxog.json"
                trigger="hover"
                colors="primary:#c71f16,secondary:#ee6d66"
              ></lord-icon>
            </div>
          </div>
          <div className="valor">
            <p>{formatoDinero(ingreso.cantidad)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
